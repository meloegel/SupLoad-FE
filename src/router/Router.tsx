import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/Login";
import Register from "../account/Register";
import Home from "../pages/Home";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
