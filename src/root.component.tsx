import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccessManagement from "./AccessManagement";
import "./index.css";
export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/access-management/feature" />}
        />
        <Route
          path={"/access-management/feature"}
          element={<AccessManagement />}
        />
        <Route
          path={"/access-management/feature/:id"}
          element={<AccessManagement />}
        />
      </Routes>
    </BrowserRouter>
  );
}
