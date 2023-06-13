import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccessManagement from "./pages/AccessManagement";
import "./index.css";
import FeatureDetail from "./FeatureDetail";

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
          element={<FeatureDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}
