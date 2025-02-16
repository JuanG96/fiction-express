import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "../AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Library from "./Library";
import Login from "./Login";
import ReadBook from "./ReadBook.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/read-book/:id"
            element={
              <ProtectedRoute>
                <ReadBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
