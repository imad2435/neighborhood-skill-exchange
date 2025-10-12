import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import BookingForm from "./pages/BookingForm"; 
import MyBookings from "./pages/MyBookings";   
import ProviderRequests from "./pages/ProviderRequests"; 

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
       <Route path="/book/:providerId" element={<BookingForm />} /> 
      <Route path="/my-bookings" element={<MyBookings />} />       
      <Route path="/provider-requests" element={<ProviderRequests />} />
      <Route path="*" element={<Profile />} /> 
    </Routes>
  );
}

export default App;
