import type { Product, NewsItem } from '@/types';

export const products: Product[] = [
  // ═══════════════════════════════════════════
  // PIPES (15 products)
  // ═══════════════════════════════════════════
  {
    id: '1',
    name: 'API 5CT Drill Pipe 5" OD S135',
    category: 'Pipes',
    price: 2850.00,
    partNumber: 'DP-5IN-S135',
    stock: 48,
    image: '/images/product-drill-pipe.jpg',
    description: 'High-strength drill pipe manufactured to API 5CT specifications. S135 grade steel with NC50 connections. Suitable for deep well drilling operations.',
    specs: { 'OD': '5.0 in', 'Grade': 'S135', 'Weight': '19.5 lb/ft', 'Connection': 'NC50', 'Length': '31 ft' }
  },
  {
    id: '2',
    name: 'API 5CT Drill Pipe 3-1/2" S135',
    category: 'Pipes',
    price: 1950.00,
    partNumber: 'DP-3.5IN-S135',
    stock: 62,
    image: '/images/product-drill-pipe.jpg',
    description: 'Compact drill pipe for slim hole drilling. S135 grade with NC38 connections. Ideal for workover and intervention operations.',
    specs: { 'OD': '3.5 in', 'Grade': 'S135', 'Weight': '13.3 lb/ft', 'Connection': 'NC38', 'Length': '31 ft' }
  },
  {
    id: '3',
    name: 'API 5CT Drill Pipe 4-1/2" G105',
    category: 'Pipes',
    price: 2400.00,
    partNumber: 'DP-4.5IN-G105',
    stock: 38,
    image: '/images/product-drill-pipe.jpg',
    description: 'Medium grade drill pipe for directional and horizontal drilling. G105 steel with NC46 connections. Internal plastic coating available.',
    specs: { 'OD': '4.5 in', 'Grade': 'G105', 'Weight': '16.6 lb/ft', 'Connection': 'NC46', 'Length': '31 ft' }
  },
  {
    id: '4',
    name: 'API 5CT Drill Pipe 5-1/2" V150',
    category: 'Pipes',
    price: 3800.00,
    partNumber: 'DP-5.5IN-V150',
    stock: 20,
    image: '/images/product-drill-pipe.jpg',
    description: 'Ultra-high strength drill pipe for extended reach and deep well drilling. V150 grade with 6-5/8 REG connections. Premium steel construction.',
    specs: { 'OD': '5.5 in', 'Grade': 'V150', 'Weight': '25.6 lb/ft', 'Connection': '6-5/8 REG', 'Length': '31 ft' }
  },
  {
    id: '5',
    name: 'API 5CT Casing 7" N80 BTC',
    category: 'Pipes',
    price: 1800.00,
    partNumber: 'CAS-7IN-N80',
    stock: 40,
    image: '/images/product-casing.jpg',
    description: 'Seamless casing pipe for intermediate casing strings. N80 grade with buttress thread and coupling. API 5CT certified.',
    specs: { 'OD': '7.0 in', 'Grade': 'N80', 'Weight': '29 lb/ft', 'Thread': 'BTC', 'Length': '40 ft' }
  },
  {
    id: '6',
    name: 'API 5CT Casing 13-3/8" J55',
    category: 'Pipes',
    price: 2200.00,
    partNumber: 'CAS-13.375-J55',
    stock: 25,
    image: '/images/product-casing.jpg',
    description: 'Large bore surface casing for conductor and surface sections. J55 grade with short thread and coupling. Cost-effective for shallow wells.',
    specs: { 'OD': '13.375 in', 'Grade': 'J55', 'Weight': '54.5 lb/ft', 'Thread': 'STC', 'Length': '40 ft' }
  },
  {
    id: '7',
    name: 'API 5CT Production Tubing 2-7/8" N80',
    category: 'Pipes',
    price: 680.00,
    partNumber: 'TUB-2.875-N80',
    stock: 80,
    image: '/images/product-drill-pipe.jpg',
    description: 'Seamless production tubing for oil and gas well completions. N80 grade with EUE connections. Internal epoxy coating for corrosion protection.',
    specs: { 'OD': '2.875 in', 'Grade': 'N80', 'Weight': '6.5 lb/ft', 'Thread': 'EUE', 'Length': '30 ft' }
  },
  {
    id: '8',
    name: 'Heavy Weight Drill Pipe 5"',
    category: 'Pipes',
    price: 3200.00,
    partNumber: 'HWDP-5IN-S135',
    stock: 18,
    image: '/images/product-drill-pipe.jpg',
    description: 'Heavy weight drill pipe for transition between drill collars and drill pipe. Integral wear pads and center upset. Reduces drill string fatigue.',
    specs: { 'OD': '5.0 in', 'Grade': 'S135', 'Weight': '49.3 lb/ft', 'Connection': 'NC50', 'Length': '31 ft' }
  },
  {
    id: '9',
    name: 'API 5CT Casing 5-1/2" K55',
    category: 'Pipes',
    price: 1100.00,
    partNumber: 'CAS-5.5IN-K55',
    stock: 55,
    image: '/images/product-casing.jpg',
    description: 'Surface casing for shallow well applications. K55 grade with STC connections. Economical choice for conductor and surface sections.',
    specs: { 'OD': '5.5 in', 'Grade': 'K55', 'Weight': '17 lb/ft', 'Thread': 'STC', 'Length': '40 ft' }
  },
  {
    id: '10',
    name: 'API 5CT Casing 10-3/4" L80',
    category: 'Pipes',
    price: 2900.00,
    partNumber: 'CAS-10.75-L80',
    stock: 28,
    image: '/images/product-casing.jpg',
    description: 'Intermediate casing for H2S service environments. L80 grade with premium connections. Sour service compliant per NACE MR0175.',
    specs: { 'OD': '10.75 in', 'Grade': 'L80', 'Weight': '40.5 lb/ft', 'Thread': 'BTC', 'Length': '40 ft' }
  },
  {
    id: '11',
    name: 'API 5L Line Pipe 8" X65',
    category: 'Pipes',
    price: 1650.00,
    partNumber: 'LP-8IN-X65',
    stock: 32,
    image: '/images/product-drill-pipe.jpg',
    description: 'Seamless line pipe for production gathering and transmission lines. X65 grade with beveled ends. DNV and API certified for pipeline service.',
    specs: { 'OD': '8.0 in', 'Grade': 'X65', 'Weight': '28.6 lb/ft', 'Wall': '0.500 in', 'Length': '40 ft' }
  },
  {
    id: '12',
    name: 'CRA Lined Pipe 4" Duplex',
    category: 'Pipes',
    price: 2100.00,
    partNumber: 'CRA-4IN-DPX',
    stock: 15,
    image: '/images/product-casing.jpg',
    description: 'Corrosion resistant alloy lined carbon steel pipe. Duplex 2205 stainless steel liner for aggressive production fluids. Factory welded.',
    specs: { 'OD': '4.5 in', 'Liner': '2205 Duplex', 'Wall': '0.337 in', 'Length': '40 ft', 'Pressure': '5000 psi' }
  },
  {
    id: '13',
    name: 'API 5CT Drill Pipe 6-5/8" V150',
    category: 'Pipes',
    price: 4200.00,
    partNumber: 'DP-6.625-V150',
    stock: 12,
    image: '/images/product-drill-pipe.jpg',
    description: 'Large bore drill pipe for top hole and conductor drilling. V150 grade steel for maximum tensile strength. 7-5/8 REG connections.',
    specs: { 'OD': '6.625 in', 'Grade': 'V150', 'Weight': '33.04 lb/ft', 'Connection': '7-5/8 REG', 'Length': '31 ft' }
  },
  {
    id: '14',
    name: 'API 5CT Casing 4-1/2" P110',
    category: 'Pipes',
    price: 1450.00,
    partNumber: 'CAS-4.5IN-P110',
    stock: 42,
    image: '/images/product-casing.jpg',
    description: 'Production casing for high-pressure wells. P110 grade with premium gas-tight connections. Suitable for HPHT environments.',
    specs: { 'OD': '4.5 in', 'Grade': 'P110', 'Weight': '12.6 lb/ft', 'Thread': 'VAM TOP', 'Length': '40 ft' }
  },
  {
    id: '15',
    name: 'Composite Drill Pipe 4"',
    category: 'Pipes',
    price: 5500.00,
    partNumber: 'CDP-4IN-CMP',
    stock: 8,
    image: '/images/product-drill-pipe.jpg',
    description: 'Advanced composite drill pipe for extended reach drilling. 40% lighter than steel with equivalent torque capacity. Corrosion immune.',
    specs: { 'OD': '4.0 in', 'Material': 'CFRP Composite', 'Weight': '4.2 lb/ft', 'Tensile': '500 kips', 'Length': '30 ft' }
  },

  // ═══════════════════════════════════════════
  // VALVES (15 products)
  // ═══════════════════════════════════════════
  {
    id: '16',
    name: 'Carbon Steel Gate Valve 6" Class 150',
    category: 'Valves',
    price: 1240.00,
    partNumber: 'GV-6IN-CS150',
    stock: 22,
    image: '/images/product-valve.jpg',
    description: 'Flanged gate valve, Class 150, carbon steel body with stainless steel trim. Rising stem design with handwheel operator.',
    specs: { 'Size': '6 in', 'Class': '150', 'Body': 'A216 WCB', 'Trim': '13Cr', 'End': 'RF Flanged' }
  },
  {
    id: '17',
    name: 'Stainless Steel Ball Valve 3" Full Port',
    category: 'Valves',
    price: 560.00,
    partNumber: 'BV-3IN-316',
    stock: 40,
    image: '/images/product-valve.jpg',
    description: 'Full port floating ball valve, 316 stainless steel body and ball. PTFE seats, lever operated, NPT threaded ends.',
    specs: { 'Size': '3 in', 'Class': '1000 WOG', 'Body': 'CF8M', 'Seat': 'PTFE', 'End': 'NPT' }
  },
  {
    id: '18',
    name: 'Butterfly Valve 8" Wafer Type',
    category: 'Valves',
    price: 890.00,
    partNumber: 'BFV-8IN-WFR',
    stock: 18,
    image: '/images/product-valve.jpg',
    description: 'Wafer-style butterfly valve for flow control in process piping. Ductile iron body with SS disc and EPDM seat. Lug type available.',
    specs: { 'Size': '8 in', 'Pressure': '150 WOG', 'Body': 'GGG40', 'Disc': 'CF8M', 'Seat': 'EPDM' }
  },
  {
    id: '19',
    name: 'Check Valve 4" Swing Type',
    category: 'Valves',
    price: 420.00,
    partNumber: 'CKV-4IN-SWING',
    stock: 35,
    image: '/images/product-valve.jpg',
    description: 'Swing check valve for backflow prevention. Carbon steel body with stainless steel disc. Horizontal or vertical installation.',
    specs: { 'Size': '4 in', 'Class': '150', 'Body': 'A216 WCB', 'Disc': 'CF8', 'End': 'RF Flanged' }
  },
  {
    id: '20',
    name: 'Globe Valve 3" Class 300 Flanged',
    category: 'Valves',
    price: 1680.00,
    partNumber: 'GLV-3IN-300',
    stock: 14,
    image: '/images/product-valve.jpg',
    description: 'Forged steel globe valve for precise flow regulation. Class 300 rating with union bonnet design. Packed stuffing box.',
    specs: { 'Size': '3 in', 'Class': '300', 'Body': 'A105', 'Trim': '13Cr', 'End': 'RF Flanged' }
  },
  {
    id: '21',
    name: 'Plug Valve 2" Full Port Lubricated',
    category: 'Valves',
    price: 780.00,
    partNumber: 'PV-2IN-FP',
    stock: 25,
    image: '/images/product-valve.jpg',
    description: 'Lubricated plug valve for heavy-duty service. Carbon steel body with chrome-plated plug. Quarter-turn operation with handle.',
    specs: { 'Size': '2 in', 'Class': '150', 'Body': 'A216 WCB', 'Plug': 'Chrome-Plated', 'End': 'Threaded' }
  },
  {
    id: '22',
    name: 'Gate Valve 10" Class 150 OS&Y',
    category: 'Valves',
    price: 3400.00,
    partNumber: 'GV-10IN-CS150',
    stock: 8,
    image: '/images/product-valve.jpg',
    description: 'Outside screw and yoke gate valve for mainline isolation. Full bore design with welded bonnet. Handwheel or gear operator.',
    specs: { 'Size': '10 in', 'Class': '150', 'Body': 'A216 WCB', 'Trim': '13Cr', 'End': 'RF Flanged' }
  },
  {
    id: '23',
    name: 'Ball Valve 2" 3-Piece Full Port',
    category: 'Valves',
    price: 340.00,
    partNumber: 'BV-2IN-3PC',
    stock: 60,
    image: '/images/product-valve.jpg',
    description: '3-piece body ball valve for easy maintenance. 316 SS construction with blowout-proof stem. Lever or pneumatic actuator.',
    specs: { 'Size': '2 in', 'Pressure': '1000 WOG', 'Body': 'CF8M', 'Ball': '316 SS', 'End': 'Socket Weld' }
  },
  {
    id: '24',
    name: 'Check Valve 6" Dual Plate',
    category: 'Valves',
    price: 1120.00,
    partNumber: 'CKV-6IN-DP',
    stock: 20,
    image: '/images/product-valve.jpg',
    description: 'Dual plate wafer check valve for compact installation. Spring-assisted for rapid closure. Low pressure drop design.',
    specs: { 'Size': '6 in', 'Pressure': '150 WOG', 'Body': 'GGG40', 'Plates': 'CF8M', 'Spring': 'SS316' }
  },
  {
    id: '25',
    name: 'Gate Valve 4" Class 300 Forged',
    category: 'Valves',
    price: 2100.00,
    partNumber: 'GV-4IN-F300',
    stock: 12,
    image: '/images/product-valve.jpg',
    description: 'Forged steel gate valve for high-pressure service. Class 300 with bolted bonnet. Rising stem with non-rising handwheel.',
    specs: { 'Size': '4 in', 'Class': '300', 'Body': 'A105 F316', 'Trim': 'SS316', 'End': 'RF Flanged' }
  },
  {
    id: '26',
    name: 'Butterfly Valve 12" Lug Type',
    category: 'Valves',
    price: 1850.00,
    partNumber: 'BFV-12IN-LUG',
    stock: 10,
    image: '/images/product-valve.jpg',
    description: 'Lug-type butterfly valve for dead-end service. Ductile iron body with stainless steel disc. Suitable for water and slurry applications.',
    specs: { 'Size': '12 in', 'Pressure': '150 WOG', 'Body': 'GGG40', 'Disc': 'CF8M', 'Seat': 'EPDM' }
  },
  {
    id: '27',
    name: 'Pressure Relief Valve 2" Spring Loaded',
    category: 'Valves',
    price: 920.00,
    partNumber: 'PRV-2IN-SPR',
    stock: 30,
    image: '/images/product-valve.jpg',
    description: 'Spring-loaded pressure relief valve for overpressure protection. Carbon steel body with SS spring. Adjustable set pressure.',
    specs: { 'Size': '2 in', 'Set Pressure': '150-3000 psi', 'Body': 'A105', 'Seat': 'SS316', 'End': 'Flanged' }
  },
  {
    id: '28',
    name: 'Control Valve 6" with Pneumatic Actuator',
    category: 'Valves',
    price: 8500.00,
    partNumber: 'CV-6IN-PNEU',
    stock: 5,
    image: '/images/product-valve.jpg',
    description: 'Globe-style control valve with pneumatic diaphragm actuator. Positioner equipped for precise flow control. Fail-safe closed.',
    specs: { 'Size': '6 in', 'Actuator': 'Pneumatic', 'Cv': '250', 'Body': 'WCB', 'Trim': 'SS316' }
  },
  {
    id: '29',
    name: 'Subsea Gate Valve 7-1/16" 10K',
    category: 'Valves',
    price: 45000.00,
    partNumber: 'SGV-7.0625-10K',
    stock: 2,
    image: '/images/product-valve.jpg',
    description: 'API 17D subsea gate valve for deepwater applications. 10,000 psi working pressure with ROV bucket interface. DNV certified.',
    specs: { 'Size': '7-1/16 in', 'WP': '10,000 psi', 'Body': 'F22 Duplex', 'Standard': 'API 17D', 'Depth': '10,000 ft' }
  },
  {
    id: '30',
    name: 'Gate Valve 2" Class 800 Forged Steel',
    category: 'Valves',
    price: 480.00,
    partNumber: 'GV-2IN-F800',
    stock: 45,
    image: '/images/product-valve.jpg',
    description: 'Compact forged steel gate valve for high-pressure instrumentation. Class 800 with union bonnet. Socket weld ends.',
    specs: { 'Size': '2 in', 'Class': '800', 'Body': 'A105', 'Trim': '13Cr', 'End': 'Socket Weld' }
  },

  // ═══════════════════════════════════════════
  // DRILLING TOOLS (15 products)
  // ═══════════════════════════════════════════
  {
    id: '31',
    name: 'Tricone Drill Bit 12-1/4" IADC 537',
    category: 'Drilling Tools',
    price: 4500.00,
    partNumber: 'BIT-12.25-537',
    stock: 15,
    image: '/images/product-drill-bit.jpg',
    description: 'Tungsten carbide insert tricone rock bit for medium-hard formations. Sealed bearing journal design for extended drilling life.',
    specs: { 'Size': '12-1/4 in', 'IADC': '537', 'Bearing': 'Sealed Journal', 'Connection': '6-5/8 REG', 'Tooth': 'TCI' }
  },
  {
    id: '32',
    name: 'Double Ram BOP 11" 5000 psi',
    category: 'Drilling Tools',
    price: 45000.00,
    partNumber: 'BOP-11-5K-DBL',
    stock: 4,
    image: '/images/product-bop.jpg',
    description: 'Hydraulic double ram blowout preventer for well control operations. Manual locking screws, side outlets with studded connections. API 16A compliant.',
    specs: { 'Bore': '11 in', 'WP': '5000 psi', 'Type': 'Double Ram', 'Standard': 'API 16A', 'Operator': 'Hydraulic' }
  },
  {
    id: '33',
    name: 'PDC Drill Bit 8-1/2" 5 Blade',
    category: 'Drilling Tools',
    price: 3200.00,
    partNumber: 'PDC-8.5-5BLD',
    stock: 22,
    image: '/images/product-drill-bit.jpg',
    description: 'Polycrystalline diamond compact bit for soft to medium formations. 5-blade design with 16mm cutters. Premiumgrade diamond table.',
    specs: { 'Size': '8.5 in', 'Blades': '5', 'Cutters': '16mm PDC', 'Connection': '4-1/2 IF', 'IADC': 'M433' }
  },
  {
    id: '34',
    name: 'Hole Opener 17-1/2" 3-Wing',
    category: 'Drilling Tools',
    price: 6800.00,
    partNumber: 'HOP-17.5-3W',
    stock: 8,
    image: '/images/product-drill-bit.jpg',
    description: 'Three-wing hole opener for enlarging pilot holes. Tungsten carbide teeth with stabilizer pads. Suitable for conductor and surface sections.',
    specs: { 'Size': '17.5 in', 'Wings': '3', 'Teeth': 'Tungsten Carbide', 'Connection': '7-5/8 REG', 'Pilot': '12-1/4 in' }
  },
  {
    id: '35',
    name: 'Near Bit Stabilizer 12"',
    category: 'Drilling Tools',
    price: 2800.00,
    partNumber: 'NBS-12IN',
    stock: 14,
    image: '/images/product-bop.jpg',
    description: 'Near-bit stabilizer for directional control. Spiral blade design with hardfacing. Reduces dogleg severity and improves ROP.',
    specs: { 'OD': '12 in', 'Length': '9 ft', 'Blades': '3 Spiral', 'Connection': '6-5/8 REG', 'Material': 'AISI 4145H' }
  },
  {
    id: '36',
    name: 'Hydraulic Jar Tool 6-1/2"',
    category: 'Drilling Tools',
    price: 12500.00,
    partNumber: 'JAR-6.5-HYD',
    stock: 6,
    image: '/images/product-bop.jpg',
    description: 'Hydraulic drilling jar for freeing stuck pipe. High impact force with adjustable trip load. Bi-directional operation.',
    specs: { 'OD': '6.5 in', 'Force': '50 kips', 'Stroke': '12 in', 'Connection': '5-1/2 IF', 'Type': 'Hydraulic' }
  },
  {
    id: '37',
    name: 'Float Sub 6-5/8" x 3-1/2"',
    category: 'Drilling Tools',
    price: 1900.00,
    partNumber: 'FS-6.625-3.5',
    stock: 20,
    image: '/images/product-bop.jpg',
    description: 'Float sub with check valve for drill string. Prevents backflow of drilling fluid. Chrome-plated bore for wear resistance.',
    specs: { 'Top': '6-5/8 REG', 'Bottom': '3-1/2 IF', 'Valve': 'Spring Check', 'Bore': '2.25 in', 'Material': 'AISI 4145H' }
  },
  {
    id: '38',
    name: 'Crossover Sub NC38 x NC50',
    category: 'Drilling Tools',
    price: 650.00,
    partNumber: 'XSUB-NC38-NC50',
    stock: 40,
    image: '/images/product-fittings.jpg',
    description: 'Premium crossover sub for connecting different thread connections. Heat-treated alloy steel with phosphate coating. Double-shoulder design.',
    specs: { 'Top': 'NC38', 'Bottom': 'NC50', 'Material': '4145H Mod', 'Length': '18 in', 'Torque': '28,000 ft-lb' }
  },
  {
    id: '39',
    name: 'Drill Collar 8" x 3" Bore',
    category: 'Drilling Tools',
    price: 4800.00,
    partNumber: 'DC-8IN-3B',
    stock: 16,
    image: '/images/product-bop.jpg',
    description: 'Non-magnetic drill collar for MWD/LWD applications. 316 stainless steel construction. Provides weight on bit and stiffness.',
    specs: { 'OD': '8.0 in', 'Bore': '3.0 in', 'Weight': '98 lb/ft', 'Connection': '6-5/8 REG', 'Length': '31 ft' }
  },
  {
    id: '40',
    name: 'Reamer Shoe 12-1/4"',
    category: 'Drilling Tools',
    price: 3500.00,
    partNumber: 'RS-12.25',
    stock: 12,
    image: '/images/product-drill-bit.jpg',
    description: 'Pilot reamer shoe for casing advancement. Tungsten carbide matrix body with centering guides. Smooth transition from pilot to full gauge.',
    specs: { 'Size': '12.25 in', 'Pilot': '8.5 in', 'Body': 'Carbide Matrix', 'Connection': '6-5/8 REG', 'Blades': '3' }
  },
  {
    id: '41',
    name: 'Cementing Collar 9-5/8"',
    category: 'Drilling Tools',
    price: 2200.00,
    partNumber: 'CC-9.625',
    stock: 18,
    image: '/images/product-bop.jpg',
    description: 'Float collar for primary cementing operations. Dual check valve design with wiper plug. Provides floatation during casing running.',
    specs: { 'Size': '9-5/8 in', 'Valve': 'Dual Check', 'Inner': '8.535 in', 'Length': '5 ft', 'Pressure': '5000 psi' }
  },
  {
    id: '42',
    name: 'Whipstock 9-5/8" Sidetrack',
    category: 'Drilling Tools',
    price: 4200.00,
    partNumber: 'WS-9.625-STD',
    stock: 7,
    image: '/images/product-drill-bit.jpg',
    description: 'Casing whipstock for sidetrack operations. Milled steel body with carbide face. Anchor packer for positive set in casing.',
    specs: { 'Casing': '9-5/8 in', 'Angle': '3°', 'Length': '12 ft', 'Anchor': 'Packer Type', 'Face': 'Carbide' }
  },
  {
    id: '43',
    name: 'Junk Basket 9-5/8" Wire Line',
    category: 'Drilling Tools',
    price: 1800.00,
    partNumber: 'JB-9.625-WL',
    stock: 10,
    image: '/images/product-bop.jpg',
    description: 'Wireline-retrievable junk basket for fishing operations. Grapple-type design for recovering lost items from the wellbore.',
    specs: { 'Size': '9-5/8 in', 'Type': 'Grapple', 'Method': 'Wireline', ' OD': '8.5 in', 'Length': '6 ft' }
  },
  {
    id: '44',
    name: 'Roller Reamer 12-1/4"',
    category: 'Drilling Tools',
    price: 5200.00,
    partNumber: 'RR-12.25',
    stock: 9,
    image: '/images/product-drill-bit.jpg',
    description: 'Roller reamer for hole gauge maintenance. Three roller cones with tungsten carbide inserts. Reduces drill string vibration.',
    specs: { 'Size': '12.25 in', 'Rollers': '3', 'Inserts': 'TCI', 'Connection': '6-5/8 REG', 'Gauge': 'Full' }
  },
  {
    id: '45',
    name: 'Annular BOP 18-1/2" 2000 psi',
    category: 'Drilling Tools',
    price: 38000.00,
    partNumber: 'ABOP-18.5-2K',
    stock: 3,
    image: '/images/product-bop.jpg',
    description: 'Annular blowout preventer for versatile well control. Rubber element seals around any shape in the wellbore. API 16A certified.',
    specs: { 'Bore': '18.5 in', 'WP': '2000 psi', 'Type': 'Annular', 'Element': 'Rubber', 'Standard': 'API 16A' }
  },

  // ═══════════════════════════════════════════
  // SAFETY EQUIPMENT (10 products)
  // ═══════════════════════════════════════════
  {
    id: '46',
    name: 'Full Body Safety Harness Pro',
    category: 'Safety Equipment',
    price: 189.00,
    partNumber: 'HARNESS-FB-PRO',
    stock: 120,
    image: '/images/product-safety-harness.jpg',
    description: 'ANSI Z359.11 compliant full body harness with quick-connect buckles, padded waist and leg straps. Includes dorsal D-ring and side positioning D-rings.',
    specs: { 'Standard': 'ANSI Z359.11', 'Capacity': '420 lb', 'Webbing': 'Polyester', 'D-Rings': '3', 'Buckles': 'Quick-Connect' }
  },
  {
    id: '47',
    name: 'Hard Hat with Integrated Face Shield',
    category: 'Safety Equipment',
    price: 65.00,
    partNumber: 'HH-FS-IPS',
    stock: 200,
    image: '/images/product-safety-harness.jpg',
    description: 'Type I Class E hard hat with ratcheting adjustment. Integrated polycarbonate face shield with anti-fog coating. UV stabilizer.',
    specs: { 'Standard': 'ANSI Z89.1', 'Class': 'E (20kV)', 'Shell': 'HDPE', 'Visor': 'PC Anti-Fog', 'Adjust': 'Ratchet' }
  },
  {
    id: '48',
    name: 'Safety Goggles ANSI Z87.1',
    category: 'Safety Equipment',
    price: 28.00,
    partNumber: 'SG-Z87-DF',
    stock: 350,
    image: '/images/product-safety-harness.jpg',
    description: 'Indirect ventilated safety goggles for splash and dust protection. Anti-fog polycarbonate lens with adjustable headband. Fits over prescription glasses.',
    specs: { 'Standard': 'ANSI Z87.1+', 'Lens': 'Polycarbonate', 'Coating': 'Anti-Fog', 'Ventilation': 'Indirect', 'UV': '99.9%' }
  },
  {
    id: '49',
    name: 'Steel Toe Safety Boots EH Rated',
    category: 'Safety Equipment',
    price: 175.00,
    partNumber: 'STB-EH-WP',
    stock: 85,
    image: '/images/product-safety-harness.jpg',
    description: 'Waterproof composite safety boots with electrical hazard rating. ASTM F2413 compliant steel toe and puncture-resistant plate. Oil-resistant sole.',
    specs: { 'Standard': 'ASTM F2413', 'Toe': 'Steel (2500 lb)', 'EH': 'Yes', 'Waterproof': 'Yes', 'Sole': 'Rubber Oil-Resist' }
  },
  {
    id: '50',
    name: 'Flame Resistant Coveralls Nomex',
    category: 'Safety Equipment',
    price: 220.00,
    partNumber: 'FRC-NOM-7OZ',
    stock: 60,
    image: '/images/product-safety-harness.jpg',
    description: 'Inherent flame resistant coveralls made from Nomex IIIA fabric. Arc rating 8 cal/cm². Two-way zip with storm flap. Multiple pockets.',
    specs: { 'Fabric': 'Nomex IIIA 7oz', 'Arc Rating': '8 cal/cm²', 'Standard': 'NFPA 2112', 'Color': 'Navy/Gray', 'Sizes': 'S-3XL' }
  },
  {
    id: '51',
    name: '4-Gas Personal Monitor',
    category: 'Safety Equipment',
    price: 890.00,
    partNumber: 'GAS-4MON-LEL',
    stock: 25,
    image: '/images/product-safety-harness.jpg',
    description: 'Portable 4-gas detector for LEL, O2, CO, and H2S. Man-down alarm with lone worker feature. IP67 rated for harsh environments.',
    specs: { 'Gases': 'LEL/O2/CO/H2S', 'Runtime': '14 hours', 'Rating': 'IP67', 'Alarm': 'Visual/Audible/Vibrate', 'Standard': 'IECEx/ATEX' }
  },
  {
    id: '52',
    name: 'Class 3 Hi-Vis Safety Vest',
    category: 'Safety Equipment',
    price: 35.00,
    partNumber: 'SV-CL3-HIV',
    stock: 300,
    image: '/images/product-safety-harness.jpg',
    description: 'ANSI/ISEA 107 Class 3 high-visibility safety vest. 2-inch reflective tape with 360° visibility. Zipper closure with D-ring slot.',
    specs: { 'Class': 'ANSI 107 Class 3', 'Material': 'Polyester Mesh', 'Reflective': '2 in Silver', 'Closure': 'Zipper', 'Sizes': 'XS-5XL' }
  },
  {
    id: '53',
    name: 'Fall Protection Starter Kit',
    category: 'Safety Equipment',
    price: 450.00,
    partNumber: 'FPK-START-KIT',
    stock: 30,
    image: '/images/product-safety-harness.jpg',
    description: 'Complete fall protection kit with harness, shock-absorbing lanyard, and D-ring connector. Meets OSHA 1926.502 requirements.',
    specs: { 'Harness': 'Full Body D-Ring', 'Lanyard': '6 ft Shock Absorb', 'Capacity': '310 lb', 'Standard': 'OSHA 1926.502', 'Inspection': 'Included' }
  },
  {
    id: '54',
    name: 'Half Face Respirator with Cartridges',
    category: 'Safety Equipment',
    price: 85.00,
    partNumber: 'RES-HF-6200',
    stock: 75,
    image: '/images/product-safety-harness.jpg',
    description: 'Silicone half face respirator with twin cartridge design. Low breathing resistance with cool flow technology. Includes P100/OV cartridges.',
    specs: { 'Type': 'Half Face', 'Material': 'Silicone', 'Cartridges': 'P100/OV', 'Fit': 'Medium/Large', 'Standard': 'NIOSH 42 CFR84' }
  },
  {
    id: '55',
    name: 'Cut Resistant Gloves Level 5',
    category: 'Safety Equipment',
    price: 22.00,
    partNumber: 'CRG-LV5-NIT',
    stock: 500,
    image: '/images/product-safety-harness.jpg',
    description: 'ANSI A5 cut resistant gloves with nitrile palm coating. HPPE fiber construction for maximum cut protection. Touchscreen compatible.',
    specs: { 'Cut Level': 'ANSI A5', 'Material': 'HPPE/Nitrile', 'Grip': 'Wet/Dry', 'Touchscreen': 'Yes', 'Sizes': 'S-XXL' }
  },

  // ═══════════════════════════════════════════
  // PUMPS (10 products)
  // ═══════════════════════════════════════════
  {
    id: '56',
    name: 'Centrifugal Process Pump 8x6',
    category: 'Pumps',
    price: 6780.00,
    partNumber: 'PUMP-8X6-CENT',
    stock: 8,
    image: '/images/product-pump.jpg',
    description: 'Heavy-duty centrifugal process pump for oilfield applications. Ductile iron casing with 316 stainless steel impeller. 150 HP motor included.',
    specs: { 'Suction': '8 in', 'Discharge': '6 in', 'HP': '150', 'RPM': '1800', 'Material': 'DI/316SS' }
  },
  {
    id: '57',
    name: 'Triplex Mud Pump 1200 HP',
    category: 'Pumps',
    price: 85000.00,
    partNumber: 'MP-1200-TRI',
    stock: 2,
    image: '/images/product-mud-pump.jpg',
    description: 'High-pressure triplex mud pump for deep well drilling. 1200 HP with forged fluid end. Variable speed drive compatible.',
    specs: { 'HP': '1200', 'Pressure': '7500 psi', 'Flow': '800 GPM', 'Strokes': '120 SPM', ' liners': '7 in' }
  },
  {
    id: '58',
    name: 'ESP Submersible Pump 4"',
    category: 'Pumps',
    price: 12500.00,
    partNumber: 'ESP-4IN-400',
    stock: 5,
    image: '/images/product-pump.jpg',
    description: 'Electric submersible pump system for artificial lift. 400 bbl/day capacity with 400 HP motor. Includes gas separator and protector.',
    specs: { 'Capacity': '400 bbl/day', 'HP': '400', 'Voltage': '2300V', 'Stages': '60', 'Size': '4.56 in' }
  },
  {
    id: '59',
    name: 'Chemical Injection Pump Diaphragm',
    category: 'Pumps',
    price: 3200.00,
    partNumber: 'CIP-DIAG-SS',
    stock: 15,
    image: '/images/product-pump.jpg',
    description: 'Precision chemical injection pump for well treatment. SS316 diaphragm with PTFE coating. Adjustable 0-100% stroke with digital controller.',
    specs: { 'Type': 'Diaphragm', 'Flow': '0-50 GPH', 'Pressure': '3000 psi', 'Material': 'SS316/PTFE', 'Control': 'Digital' }
  },
  {
    id: '60',
    name: 'Centrifugal Booster Pump 4x3',
    category: 'Pumps',
    price: 3800.00,
    partNumber: 'BP-4X3-75',
    stock: 12,
    image: '/images/product-pump.jpg',
    description: 'Booster pump for pressure augmentation in water and fluid systems. 75 HP motor with mechanical seal. Close-coupled design.',
    specs: { 'Suction': '4 in', 'Discharge': '3 in', 'HP': '75', 'Head': '280 ft', 'Material': 'CS/316SS' }
  },
  {
    id: '61',
    name: 'Transfer Pump 6x4 Horizontal',
    category: 'Pumps',
    price: 4500.00,
    partNumber: 'TP-6X4-100',
    stock: 10,
    image: '/images/product-pump.jpg',
    description: 'Horizontal transfer pump for fluid movement. 100 HP with heavy-duty bearings. Self-priming design with external mechanical seal.',
    specs: { 'Suction': '6 in', 'Discharge': '4 in', 'HP': '100', 'RPM': '1780', 'Priming': 'Self-Priming' }
  },
  {
    id: '62',
    name: 'Air Operated Diaphragm Pump 2"',
    category: 'Pumps',
    price: 1200.00,
    partNumber: 'AODP-2IN-SS',
    stock: 25,
    image: '/images/product-pump.jpg',
    description: 'Double diaphragm air-operated pump for slurry and chemical transfer. SS316 body with PTFE diaphragms. Deadhead capable without damage.',
    specs: { 'Size': '2 in', 'Material': 'SS316', 'Diaphragm': 'PTFE', 'Flow': '50 GPM', 'Air': '25-100 psi' }
  },
  {
    id: '63',
    name: 'Progressing Cavity Pump 3x2',
    category: 'Pumps',
    price: 5800.00,
    partNumber: 'PCP-3X2-SS',
    stock: 7,
    image: '/images/product-pump.jpg',
    description: 'Progressing cavity pump for viscous fluid handling. Stator/rotor design for gentle pumping action. Handles solids up to 40% by volume.',
    specs: { 'Size': '3x2 in', 'Flow': '40 GPM', 'Pressure': '250 psi', 'Material': 'SS316/Stator', 'Viscosity': '1,000,000 cP' }
  },
  {
    id: '64',
    name: 'Heavy Duty Slurry Pump 10x8',
    category: 'Pumps',
    price: 18500.00,
    partNumber: 'SP-10X8-400',
    stock: 4,
    image: '/images/product-mud-pump.jpg',
    description: 'Heavy-duty centrifugal slurry pump for abrasive applications. Chrome iron wetted parts with 400 HP motor. Liner and impeller easily replaced.',
    specs: { 'Suction': '10 in', 'Discharge': '8 in', 'HP': '400', 'Head': '180 ft', 'Material': 'Cr27 Cast Iron' }
  },
  {
    id: '65',
    name: 'Fire Fighting Pump 6x4 Diesel',
    category: 'Pumps',
    price: 22000.00,
    partNumber: 'FFP-6X4-DSL',
    stock: 3,
    image: '/images/product-pump.jpg',
    description: 'Diesel-driven fire fighting pump for emergency response. 200 HP turbo diesel with self-priming capability. NFPA 1901 compliant.',
    specs: { 'HP': '200', 'Flow': '1000 GPM', 'Pressure': '150 psi', 'Engine': 'Turbo Diesel', 'Standard': 'NFPA 1901' }
  },

  // ═══════════════════════════════════════════
  // FITTINGS (10 products)
  // ═══════════════════════════════════════════
  {
    id: '66',
    name: 'Buttweld Fitting Set 4" SCH80',
    category: 'Fittings',
    price: 340.00,
    partNumber: 'FIT-4IN-BWSET',
    stock: 65,
    image: '/images/product-fittings.jpg',
    description: 'Complete buttweld fitting set including elbows, tees, reducers, and caps. Carbon steel A234 WPB, Schedule 80 wall thickness.',
    specs: { 'Size': '4 in', 'Schedule': '80', 'Material': 'A234 WPB', 'Type': 'Buttweld', 'Set Qty': '12 pcs' }
  },
  {
    id: '67',
    name: 'API Tool Joint Crossover 4-1/2"',
    category: 'Fittings',
    price: 425.00,
    partNumber: 'XOVER-4.5-API',
    stock: 55,
    image: '/images/product-fittings.jpg',
    description: 'API tool joint crossover sub for drill string connections. Premium threaded connections with phosphate coating for thread protection.',
    specs: { 'Size': '4-1/2 in', 'Top': 'NC38', 'Bottom': 'NC50', 'Material': '4145H', 'Coating': 'Phosphate' }
  },
  {
    id: '68',
    name: 'Hammer Union 2" Fig 1502',
    category: 'Fittings',
    price: 185.00,
    partNumber: 'HU-2IN-1502',
    stock: 120,
    image: '/images/product-fittings.jpg',
    description: 'High-pressure hammer union for well test and stimulation. Fig 1502 rated to 15,000 psi WP. Wing nut design for quick make-up.',
    specs: { 'Size': '2 in', 'Fig': '1502', 'WP': '15,000 psi', 'Material': 'AISI 4130', 'Connection': 'Line' }
  },
  {
    id: '69',
    name: 'Hammer Union 3" Fig 602',
    category: 'Fittings',
    price: 220.00,
    partNumber: 'HU-3IN-602',
    stock: 90,
    image: '/images/product-fittings.jpg',
    description: 'Medium pressure hammer union for mud and water transfer. Fig 602 rated to 6,000 psi. Bronze seat for metal-to-metal seal.',
    specs: { 'Size': '3 in', 'Fig': '602', 'WP': '6,000 psi', 'Material': 'AISI 4130', 'Seal': 'Bronze' }
  },
  {
    id: '70',
    name: 'Weld Neck Flange 6" 150#',
    category: 'Fittings',
    price: 280.00,
    partNumber: 'WNF-6IN-150',
    stock: 50,
    image: '/images/product-fittings.jpg',
    description: 'ASME B16.5 weld neck flange for high-integrity pipe connections. Raised face with bolt holes. Carbon steel with heat number traceability.',
    specs: { 'Size': '6 in', 'Class': '150', 'Face': 'RF', 'Material': 'A105', 'Standard': 'ASME B16.5' }
  },
  {
    id: '71',
    name: 'Slip-On Flange 8" 150#',
    category: 'Fittings',
    price: 350.00,
    partNumber: 'SOF-8IN-150',
    stock: 40,
    image: '/images/product-fittings.jpg',
    description: 'Slip-on flange for easy pipe alignment. Carbon steel with raised face. Internal and external weld for high-pressure service.',
    specs: { 'Size': '8 in', 'Class': '150', 'Face': 'RF', 'Material': 'A105', 'Bore': '7.938 in' }
  },
  {
    id: '72',
    name: 'Weld Neck Flange 6" 300#',
    category: 'Fittings',
    price: 480.00,
    partNumber: 'WNF-6IN-300',
    stock: 30,
    image: '/images/product-fittings.jpg',
    description: 'High-pressure weld neck flange for critical service. Class 300 with raised face. Full penetration weld end for maximum strength.',
    specs: { 'Size': '6 in', 'Class': '300', 'Face': 'RF', 'Material': 'A105', 'Bore': '6.065 in' }
  },
  {
    id: '73',
    name: 'Threaded Elbow 2" SCH80',
    category: 'Fittings',
    price: 35.00,
    partNumber: 'TE-2IN-S80',
    stock: 200,
    image: '/images/product-fittings.jpg',
    description: '90-degree threaded elbow for pipe direction change. Schedule 80 carbon steel with NPT threads. Hot-dip galvanized option available.',
    specs: { 'Size': '2 in', 'Schedule': '80', 'Angle': '90°', 'Thread': 'NPT', 'Material': 'A106 Gr.B' }
  },
  {
    id: '74',
    name: 'Pipe Nipple 3" SCH40',
    category: 'Fittings',
    price: 28.00,
    partNumber: 'PN-3IN-S40-12',
    stock: 150,
    image: '/images/product-fittings.jpg',
    description: 'Seamless pipe nipple for short pipe connections. Schedule 40 carbon steel, 12 inches long. Beveled ends for welding.',
    specs: { 'Size': '3 in', 'Schedule': '40', 'Length': '12 in', 'Material': 'A106 Gr.B', 'End': 'Beveled' }
  },
  {
    id: '75',
    name: 'Concentric Reducer 6"x4" SCH80',
    category: 'Fittings',
    price: 120.00,
    partNumber: 'CR-6X4-S80',
    stock: 45,
    image: '/images/product-fittings.jpg',
    description: 'Concentric pipe reducer for diameter transition. Schedule 80 carbon steel. Smooth bore for optimal flow characteristics.',
    specs: { 'Large': '6 in', 'Small': '4 in', 'Schedule': '80', 'Material': 'A234 WPB', 'Type': 'Concentric' }
  },

  // ═══════════════════════════════════════════
  // CABLES (8 products)
  // ═══════════════════════════════════════════
  {
    id: '76',
    name: 'Wire Rope 1-3/8" 6x36 IWRC',
    category: 'Cables',
    price: 12.50,
    partNumber: 'WR-1.375-6X36',
    stock: 500,
    image: '/images/product-cable.jpg',
    description: 'Extra improved plow steel wire rope with independent wire rope core. 6x36 construction for excellent fatigue resistance in lifting applications.',
    specs: { 'Diameter': '1-3/8 in', 'Construction': '6x36 IWRC', 'Grade': 'EIPS', 'MBL': '120 tons', 'Core': 'IWRC' }
  },
  {
    id: '77',
    name: 'Marine Grade Electrical Cable 3-Core',
    category: 'Cables',
    price: 8.75,
    partNumber: 'MGC-3C-10AWG',
    stock: 800,
    image: '/images/product-cable.jpg',
    description: 'Marine-grade tinned copper electrical cable. 3-conductor with XLPE insulation and PVC jacket. Exceeds ABYC standards.',
    specs: { 'Conductors': '3', 'Gauge': '10 AWG', 'Insulation': 'XLPE', 'Jacket': 'PVC', 'Rating': '600V' }
  },
  {
    id: '78',
    name: 'Fiber Optic Cable 12-Core Armored',
    category: 'Cables',
    price: 3.50,
    partNumber: 'FOC-12C-ARM',
    stock: 2000,
    image: '/images/product-cable.jpg',
    description: 'Tight-buffered fiber optic cable for industrial data communications. 12-core single-mode with steel wire armor. Outdoor/indoor rated.',
    specs: { 'Cores': '12', 'Type': 'Single-Mode', 'Armor': 'Steel Wire', 'Rating': 'OS2', 'Jacket': 'LSZH' }
  },
  {
    id: '79',
    name: 'Armored Power Cable 1-0 MCM',
    category: 'Cables',
    price: 15.80,
    partNumber: 'APC-1-0-3C',
    stock: 350,
    image: '/images/product-cable.jpg',
    description: 'Interlocked armor power cable for exposed installations. Copper conductors with XLPE insulation. Direct burial rated.',
    specs: { 'Gauge': '1-0 MCM', 'Conductors': '3', 'Insulation': 'XLPE', 'Armor': 'Aluminum ISA', 'Voltage': '600V' }
  },
  {
    id: '80',
    name: 'Control Cable 14-Core Shielded',
    category: 'Cables',
    price: 4.20,
    partNumber: 'CC-14C-SHD',
    stock: 600,
    image: '/images/product-cable.jpg',
    description: 'Shielded control cable for instrument and signal circuits. 14-conductor with individual foil shields. Overall braided shield for EMI protection.',
    specs: { 'Cores': '14', 'Gauge': '16 AWG', 'Shield': 'Foil+Braid', 'Insulation': 'PE', 'Voltage': '300V' }
  },
  {
    id: '81',
    name: 'Welding Cable 2/0 AWG Single Conductor',
    category: 'Cables',
    price: 6.90,
    partNumber: 'WC-2-0-RED',
    stock: 400,
    image: '/images/product-cable.jpg',
    description: 'Ultra-flexible welding cable with EPDM jacket. Fine-stranded copper conductor for maximum flexibility. Oil and flame resistant.',
    specs: { 'Gauge': '2/0 AWG', 'Conductor': 'Fine-Strand Cu', 'Jacket': 'EPDM', 'Voltage': '600V', 'Temp': '-50°C to +105°C' }
  },
  {
    id: '82',
    name: 'Hoist Wire Rope 3/4" 6x19 IWRC',
    category: 'Cables',
    price: 5.80,
    partNumber: 'HR-0.75-6X19',
    stock: 700,
    image: '/images/product-cable.jpg',
    description: 'Wire rope for hoisting and crane applications. 6x19 class with independent wire rope core. Right-hand regular lay.',
    specs: { 'Diameter': '3/4 in', 'Construction': '6x19 IWRC', 'Grade': 'EIPS', 'Lay': 'RHRL', 'MBL': '48 tons' }
  },
  {
    id: '83',
    name: 'Subsea Power Cable 3-Core Armored',
    category: 'Cables',
    price: 85.00,
    partNumber: 'SPC-3C-SUB',
    stock: 100,
    image: '/images/product-cable.jpg',
    description: 'Heavy-duty subsea power cable for offshore platforms. Double armored with copper conductors. Pressure-tested to 10,000 ft depth.',
    specs: { 'Cores': '3', 'Gauge': '4/0 AWG', 'Armor': 'Double Steel', 'Depth': '10,000 ft', 'Voltage': '3.3 kV' }
  },

  // ═══════════════════════════════════════════
  // SPARE PARTS (7 products)
  // ═══════════════════════════════════════════
  {
    id: '84',
    name: 'Mud Pump Liner & Piston 7"',
    category: 'Spare Parts',
    price: 890.00,
    partNumber: 'MPP-7IN-ZIR',
    stock: 30,
    image: '/images/product-mud-pump.jpg',
    description: 'Chrome-plated mud pump liner with bonded polyurethane piston. Fits all major triplex pump models. Zirconia ceramic liner option available.',
    specs: { 'Size': '7 in', 'Liner': 'Chrome/Zirconia', 'Piston': 'Polyurethane', 'Pressure': '5000 psi', 'Type': 'Triplex' }
  },
  {
    id: '85',
    name: 'Radial Bearing Assembly 6312-2RS',
    category: 'Spare Parts',
    price: 245.00,
    partNumber: 'BRG-6312-2RS',
    stock: 40,
    image: '/images/product-mud-pump.jpg',
    description: 'Sealed radial ball bearing for pump and motor applications. Dual rubber seals with polyurethane grease. ABEC-3 precision.',
    specs: { 'Bore': '60 mm', 'OD': '130 mm', 'Width': '31 mm', 'Seal': '2RS', 'Precision': 'ABEC-3' }
  },
  {
    id: '86',
    name: 'Cartridge Mechanical Seal 1"',
    category: 'Spare Parts',
    price: 380.00,
    partNumber: 'MCS-1IN-SSC',
    stock: 25,
    image: '/images/product-mud-pump.jpg',
    description: 'Spring-loaded cartridge mechanical seal for centrifugal pumps. Silicon carbide vs. silicon carbide faces. Universal mounting.',
    specs: { 'Size': '1 in', 'Faces': 'SiC vs SiC', 'O-Ring': 'Viton', 'Pressure': '200 psi', 'Temp': '-40° to 400°F' }
  },
  {
    id: '87',
    name: 'Industrial O-Ring Kit 327-Piece',
    category: 'Spare Parts',
    price: 125.00,
    partNumber: 'ORK-327-VIT',
    stock: 80,
    image: '/images/product-mud-pump.jpg',
    description: 'Comprehensive O-ring assortment in 25 popular sizes. Viton material for chemical and temperature resistance. Labeled storage case.',
    specs: { 'Pieces': '327', 'Material': 'Viton FKM', 'Sizes': '25 sizes', 'Temp': '-15° to 400°F', 'Resistance': 'Chemical/Oil' }
  },
  {
    id: '88',
    name: 'Spiral Wound Gasket Set 4"',
    category: 'Spare Parts',
    price: 85.00,
    partNumber: 'SWG-4IN-SET10',
    stock: 100,
    image: '/images/product-mud-pump.jpg',
    description: 'Spiral wound gaskets with inner and outer rings. Graphite filler with 304 SS windings. Class 150/300 mixed set of 10.',
    specs: { 'Size': '4 in', 'Material': 'SS304/Graphite', 'Class': '150/300', 'Qty': '10 pcs', 'Standard': 'ASME B16.20' }
  },
  {
    id: '89',
    name: 'Valve Seat & Seal Kit Gate Valve',
    category: 'Spare Parts',
    price: 320.00,
    partNumber: 'VSK-GV-6IN',
    stock: 35,
    image: '/images/product-mud-pump.jpg',
    description: 'Complete valve seat and seal repair kit for 6" gate valves. Includes seat rings, stem packing, and bonnet gaskets. Aftermarket compatible.',
    specs: { 'Valve Size': '6 in', 'Type': 'Gate Valve', 'Seat': '13Cr SS', 'Packing': 'Graphite', 'Kit Includes': 'Seats/Packing/Gaskets' }
  },
  {
    id: '90',
    name: 'Centrifugal Pump Impeller 6" CI',
    category: 'Spare Parts',
    price: 650.00,
    partNumber: 'IMP-6IN-CI',
    stock: 12,
    image: '/images/product-mud-pump.jpg',
    description: 'Cast iron closed impeller for centrifugal pumps. Keyed bore for direct shaft mounting. Dynamically balanced for smooth operation.',
    specs: { 'Diameter': '6 in', 'Material': 'Cast Iron', 'Type': 'Closed', 'Bore': '1.125 in Keyed', 'Balance': 'ISO 1940 G6.3' }
  }
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Advanced Drilling Technology Partnership Announced',
    excerpt: 'Heritage Industrial Supply partners with leading manufacturers to bring next-generation drilling equipment to market, reducing operational costs by up to 30%.',
    image: '/images/news-drilling-tech.jpg',
    date: '2026-06-15',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'New Valve Manufacturing Facility Opens in Houston',
    excerpt: 'Our expanded valve production facility is now operational, increasing capacity by 40% and reducing lead times for critical industrial valves.',
    image: '/images/news-valves.jpg',
    date: '2026-06-10',
    category: 'Company News'
  },
  {
    id: '3',
    title: 'Renewable Energy Infrastructure Solutions',
    excerpt: 'Heritage expands its product line to support offshore wind and solar installations with specialized cables, fittings, and mounting hardware.',
    image: '/images/news-renewable.jpg',
    date: '2026-06-05',
    category: 'Energy Transition'
  },
  {
    id: '4',
    title: 'Comprehensive Safety Equipment Program Launched',
    excerpt: 'New safety initiative provides comprehensive fall protection, respiratory, and PPE solutions with certified training programs for field teams.',
    image: '/images/news-safety.jpg',
    date: '2026-05-28',
    category: 'Safety'
  },
  {
    id: '5',
    title: 'Pump Systems Upgrade for Enhanced Efficiency',
    excerpt: 'Latest centrifugal and positive displacement pump models now available with IoT-enabled monitoring for predictive maintenance capabilities.',
    image: '/images/news-pumps.jpg',
    date: '2026-05-20',
    category: 'Products'
  },
  {
    id: '6',
    title: 'Industrial Cable Solutions for Harsh Environments',
    excerpt: 'New armored cable product line designed for extreme temperature and chemical exposure in offshore and refinery applications.',
    image: '/images/news-cables.jpg',
    date: '2026-05-15',
    category: 'Products'
  }
];

export const categories = ['All', 'Pipes', 'Valves', 'Drilling Tools', 'Safety Equipment', 'Pumps', 'Fittings', 'Cables', 'Spare Parts'];
