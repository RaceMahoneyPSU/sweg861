import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Form';
import ProfileDashboard from './components/ProfileDashboard'
import { UserProvider, UserContext } from './UserContext';
import logo from './logo.svg';
import './App.css';

function App() {

  return (
      <div className="App">
          <UserProvider>
              <Router>
                  <Routes>
                      {/* Default Route */}
                      <Route path="/" element={<Navigate to="/login" />} />

                      {/* Route for Login Page */}
                      <Route path="/login" element={<Login />} />

                      {/* Route for Register Page */}
                      <Route path="/register" element={<Register />} />

                      {/* Protected Route for ProfileDashboard */}
                      <Route
                          path="/dashboard"
                          element={
                              <RequireAuth>
                                  <ProfileDashboard />
                              </RequireAuth>
                          }
                      />

                      {/* Protected Route for Form Page */}
                      <Route
                          path="/form"
                          element={
                              <RequireAuth>
                                  <Form />
                              </RequireAuth>
                          }
                      />
                  </Routes>
              </Router>
          </UserProvider>
          
      </div>
  );
}

function RequireAuth({ children }) {
    const { user } = React.useContext(UserContext);

    // If no user is logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If user is logged in, render the children (protected route)
    return children;
}

export default App;
