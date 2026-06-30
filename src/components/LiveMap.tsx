import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LiveMapProps {
  senderAddress: string;
  destination: string;
  status: string;
}

const SENDER_DEFAULT: [number, number] = [29.7604, -95.3698]; // Houston, TX

function getStatusProgress(status: string): number {
  const statusOrder = ['Pending', 'Processing', 'Packed', 'Shipped', 'In Transit', 'Delivered'];
  const idx = statusOrder.indexOf(status);
  if (idx <= 0) return 0;
  if (idx >= statusOrder.length - 1) return 1;
  return idx / (statusOrder.length - 1);
}

async function geocode(address: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { 'User-Agent': 'SeagateMetals/1.0' } }
    );
    const data = await res.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch { /* ignore */ }
  return null;
}

function interpolate(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export default function LiveMap({ senderAddress, destination, status }: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const senderMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const [senderPos, setSenderPos] = useState<[number, number]>(SENDER_DEFAULT);
  const [destPos, setDestPos] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const animFrameRef = useRef<number>(0);

  // Geocode addresses
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [s, d] = await Promise.all([
        geocode(senderAddress),
        geocode(destination || 'Dallas, TX'),
      ]);
      if (cancelled) return;
      if (s) setSenderPos(s);
      if (d) setDestPos(d);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [senderAddress, destination]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView(SENDER_DEFAULT, 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);
    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // Update markers and animation
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || loading) return;

    // Clear old markers
    if (senderMarkerRef.current) map.removeLayer(senderMarkerRef.current);
    if (destMarkerRef.current) map.removeLayer(destMarkerRef.current);
    if (markerRef.current) map.removeLayer(markerRef.current);
    if (routeLineRef.current) map.removeLayer(routeLineRef.current);
    cancelAnimationFrame(animFrameRef.current);

    const senderIcon = L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:#22c55e;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="width:8px;height:8px;background:white;border-radius:50%"></div></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const destIcon = L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:#e4002b;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center"><div style="width:8px;height:8px;background:white;border-radius:50%"></div></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const truckIcon = L.divIcon({
      className: '',
      html: `<div style="width:36px;height:36px;background:#e4002b;border:3px solid white;border-radius:50%;box-shadow:0 2px 12px rgba(228,0,43,0.5);display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1">🚛</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

    // Sender marker
    const sMarker = L.marker(senderPos, { icon: senderIcon })
      .addTo(map)
      .bindPopup(`<b>Sender</b><br>${senderAddress}`);
    senderMarkerRef.current = sMarker;

    const progress = getStatusProgress(status);

    if (destPos) {
      // Destination marker
      const dMarker = L.marker(destPos, { icon: destIcon })
        .addTo(map)
        .bindPopup(`<b>Destination</b><br>${destination}`);
      destMarkerRef.current = dMarker;

      // Route line
      const route = L.polyline([senderPos, destPos], {
        color: '#e4002b',
        weight: 3,
        opacity: 0.4,
        dashArray: '10 10',
      }).addTo(map);
      routeLineRef.current = route;

      if (status === 'Delivered') {
        // Show at destination
        const marker = L.marker(destPos, { icon: truckIcon })
          .addTo(map)
          .bindPopup(`<b>Status:</b> Delivered`);
        markerRef.current = marker;
        map.fitBounds([senderPos, destPos], { padding: [50, 50] });
      } else if (progress > 0) {
        // Animate truck along route
        const startPos = interpolate(senderPos, destPos, Math.max(0, progress - 0.15));
        const endPos = interpolate(senderPos, destPos, progress);
        const marker = L.marker(startPos, { icon: truckIcon })
          .addTo(map)
          .bindPopup(`<b>Status:</b> ${status}`);
        markerRef.current = marker;

        let start = 0;
        const duration = 3000;
        const animate = (ts: number) => {
          if (!start) start = ts;
          const elapsed = ts - start;
          const t = Math.min(elapsed / duration, 1);
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const pos = interpolate(startPos, endPos, eased);
          marker.setLatLng(pos);
          if (t < 1) animFrameRef.current = requestAnimationFrame(animate);
        };
        animFrameRef.current = requestAnimationFrame(animate);

        // Fit map to show full route
        const bounds = L.latLngBounds([senderPos, destPos]);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // Pending/Processing - just at sender
        map.setView(senderPos, 8);
      }
    } else {
      // No destination geocoded, just show sender
      map.setView(senderPos, 10);
    }
  }, [senderPos, destPos, status, loading, senderAddress, destination]);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
          <div className="text-sm text-gray-500">Loading map...</div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-[400px] border border-gray-200" />
      {/* Legend */}
      <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" /> Sender
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#e4002b]" /> {status === 'Delivered' ? 'Delivered' : 'Destination'}
        </div>
        {status === 'In Transit' || status === 'Shipped' ? (
          <div className="flex items-center gap-1.5">
            <span>🚛</span> In Transit
          </div>
        ) : null}
      </div>
    </div>
  );
}
