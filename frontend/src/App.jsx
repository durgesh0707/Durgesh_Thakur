import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListing from './pages/MyListing';
import ViewCard from './pages/ViewCard';
import MyBooking from './pages/MyBooking';
import Booked from './pages/Booked';
import AdminDashboard from './pages/AdminDashboard';

import { userDataContext } from './Context/UserContext';
import { PrivateRoute, AdminRoute } from './Component/ProtectedRoute';

function App() {
  const { loading } = useContext(userDataContext);

  // Show loading screen while fetching user info
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Protected User Routes */}
        <Route path='/listingpage1' element={<PrivateRoute><ListingPage1 /></PrivateRoute>} />
        <Route path='/listingpage2' element={<PrivateRoute><ListingPage2 /></PrivateRoute>} />
        <Route path='/listingpage3' element={<PrivateRoute><ListingPage3 /></PrivateRoute>} />
        <Route path='/mylisting' element={<PrivateRoute><MyListing /></PrivateRoute>} />
        <Route path='/viewcard' element={<PrivateRoute><ViewCard /></PrivateRoute>} />
        <Route path='/mybooking' element={<PrivateRoute><MyBooking /></PrivateRoute>} />
        <Route path='/booked' element={<PrivateRoute><Booked /></PrivateRoute>} />

        {/* Admin-only Route */}
        <Route path='/admin' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;
