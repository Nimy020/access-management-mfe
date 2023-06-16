import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccessManagement from "./pages/AccessManagement";
import "./index.css";
import FeatureDetail from "./pages/FeatureDetail";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Navigate to="/access-management/" />}
        />
        <Route
          path={"/access-management/"}
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
