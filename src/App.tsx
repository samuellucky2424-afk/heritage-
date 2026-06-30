import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { OrderProvider } from '@/context/OrderContext';
import { ProductProvider } from '@/context/ProductContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import TrackPage from '@/pages/TrackPage';
import AdminPage from '@/pages/AdminPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import ReceiptPage from '@/pages/ReceiptPage';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/receipt/:id" element={<ReceiptPage />} />
              <Route path="/admin/heritage/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
