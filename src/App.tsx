import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreProvider } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Categories from '@/pages/Categories';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import Login from '@/pages/Login';
import Account from '@/pages/Account';
import Checkout from '@/pages/Checkout';
import OrderConfirmed from '@/pages/OrderConfirmed';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmed" element={<OrderConfirmed />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}
