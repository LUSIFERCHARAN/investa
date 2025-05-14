import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './Home';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import Profile from './Profile';
import PrivateRoute from './components/PrivateRoute';
import StockMarketPage from './stock.js';
import AddFavorite from './AddFavourite';
import FavoriteStocks from './FavouriteStocks';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stock" element={
          <PrivateRoute>
          <StockMarketPage />
          </PrivateRoute>}/>
            <Route path="/FavoriteStocks" element={
          <PrivateRoute>
          <FavoriteStocks />
          </PrivateRoute>}/>
            <Route path="/AddFavorite " element={
          <PrivateRoute>
          <AddFavorite />
          </PrivateRoute>}/>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
