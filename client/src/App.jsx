import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthSuccess from "./pages/AuthSuccess";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
