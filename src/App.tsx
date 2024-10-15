import './App.css'
import MainLayout from './layouts/MainLayout';
import AdminDashboard from './pages/admin/adminDashboard';
import Home from './pages/Home';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ProductHome from './pages/products/ProductHome';
import Cart from './pages/cart/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import YourOrders from './pages/profile/YourOrders';
import ProductView from './pages/products/ProductView';
import BillingDetailsPage from './pages/checkout/checkoutDetails';
import OrdersPage from './pages/checkout/checkoutOrders';

function App() {
  
  return (
    <>
      <MainLayout>
      <Router>
            <Routes>
                <Route path='/' index element={<Home />} />
                <Route path='/about' element={<AdminDashboard />} />
                <Route path='/products' element={<ProductHome />} />
                <Route path='/product/:id' element={<ProductView />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/account' element={<Profile />} />
                <Route path='/orders' element={<YourOrders />} />
                <Route path='/checkoutbilling' element={<BillingDetailsPage />} />
                <Route path='/checkoutorder' element={<OrdersPage />} />
            </Routes>
        </Router>
      </MainLayout>
        
    </>
  )
}

export default App
