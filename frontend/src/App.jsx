// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Feeds from "./pages/Dashboard/Feeds";
import Profile from "./pages/Dashboard/Profile";
import CreatePost from "./pages/Dashboard/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Feeds />} />
          <Route path="profile" element={<Profile />} />
          <Route path="post" element={<CreatePost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
