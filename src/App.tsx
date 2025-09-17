import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Home from './pages/Home';
import CryptoTools from './pages/CryptoTools';
import ICOList from './pages/ICOList';
import ForexDirectory from './pages/ForexDirectory';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ToolDetail from './pages/ToolDetail';
import ICODetail from './pages/ICODetail';
import PropFirmDetail from './pages/PropFirmDetail';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<CryptoTools />} />
                <Route path="/tools/:id" element={<ToolDetail />} />
                <Route path="/ico" element={<ICOList />} />
                <Route path="/ico/:id" element={<ICODetail />} />
                <Route path="/forex" element={<ForexDirectory />} />
                <Route path="/forex/:id" element={<PropFirmDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;