import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../account/Login";
import Register from "../account/Register";

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
