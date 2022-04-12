import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/Login";
import Register from "../account/Register";
import Header from "../common/Header";
import AddContact from "../pages/AddContact";
import Home from "../pages/Home";
import MyContact from "../pages/MyContact";
import UploadContact from "../pages/UploadContact";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/upload-contact" element={<UploadContact />} />
        <Route path="/my-contact" element={<MyContact />} />
      </Routes>
    </BrowserRouter>
  );
}
