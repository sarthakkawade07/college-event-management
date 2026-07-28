import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/EventDetails/EventDetails";
import Registration from "./pages/Registration/Registration";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import OTPVerification from "./pages/OTPVerification/OTPVerification";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import MyEvents from "./pages/MyEvents/MyEvents";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddEvent from "./pages/Admin/AddEvent";
import Participants from "./pages/Admin/Participants";
import ManageEvents from "./pages/Admin/ManageEvents";
import Payment from "./pages/Payment/Payment";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/registration/:id" element={<Registration />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password"element={<ResetPassword />}/>
        <Route path="/otp-verification"element={<OTPVerification />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/participants" element={<Participants />} />
<Route path="/manage-events" element={<ManageEvents />} />
<Route path="/payment/:id" element={<Payment />} />
</Routes>
      <Footer />
    </>
  );
}

export default App;