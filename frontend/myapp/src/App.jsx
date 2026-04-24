import React from "react";
import Home from "./Pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import TrainResults from "./components/TrainResults";
import TicketPage from "./components/TicketPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookTicketPage from "./components/BookTicketPage";
import TicketConfirm from "./components/TicketConfirm";
import MyTickets from "./Pages/MyTickets.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import ServicesPage from "./Pages/ServicesPage.jsx";
import Pnr from "./Pages/Pnr.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/results" element={<TrainResults />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ticket/:train_number" element={<TicketPage />} />
          <Route path="/ticket-confirm" element={<TicketConfirm />} />
          <Route path="/MyTickets" element={<MyTickets />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/Pnr" element={<Pnr />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/book-ticket/:train_number"
            element={<BookTicketPage />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
