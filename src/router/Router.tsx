import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/Login";
import Register from "../account/Register";
import Header from "../common/Header";
import AddContact from "../pages/AddContact";
import Home from "../pages/Home";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}
