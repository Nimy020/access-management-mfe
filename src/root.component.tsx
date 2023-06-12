import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccessManagement from "./AccessManagement";
import "./index.css";
export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/feature"} element={<AccessManagement />} />
        <Route path={"/feature/:id"} element={<AccessManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
