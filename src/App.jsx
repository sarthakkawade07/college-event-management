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
import PaymentVerification from "./pages/Admin/PaymentVerification";

import Payment from "./pages/Payment/Payment";
import Certificate from "./pages/Certificate/Certificate";

import { EventProvider } from "./context/EventContext";

// ==========================================
// ROUTE PROTECTION
// ==========================================

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";


function App() {
  return (
    <EventProvider>

      <div className="app-layout">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="app-main">

          <Routes>

            {/* ==================================
                PUBLIC ROUTES
            ================================== */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/events"
              element={<Events />}
            />

            <Route
              path="/events/:id"
              element={<EventDetails />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />

            <Route
              path="/otp-verification"
              element={<OTPVerification />}
            />


            {/* ==================================
                USER PROTECTED ROUTES
            ================================== */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/my-events"
                element={<MyEvents />}
              />

              <Route
                path="/registration/:id"
                element={<Registration />}
              />

              <Route
                path="/payment/:id"
                element={<Payment />}
              />

              <Route
                path="/certificate"
                element={<Certificate />}
              />

            </Route>


            {/* ==================================
                ADMIN PROTECTED ROUTES
            ================================== */}

            <Route element={<AdminRoute />}>

              <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
              />

              <Route
                path="/add-event"
                element={<AddEvent />}
              />

              <Route
                path="/participants"
                element={<Participants />}
              />

              <Route
                path="/manage-events"
                element={<ManageEvents />}
              />

              <Route
                path="/payment-verification"
                element={<PaymentVerification />}
              />

            </Route>


            {/* ==================================
                404
            ================================== */}

            <Route
              path="*"
              element={
                <h1>404 Page Not Found</h1>
              }
            />

          </Routes>

        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </EventProvider>
  );
}

export default App;