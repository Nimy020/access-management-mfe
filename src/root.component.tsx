import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import routes from "./routes";
import { NavigationProvider } from "./context/NavigationProvider";
import { ModalProvider } from "./context/ModalProvider";

export default function Root(props) {
  return (
    <NavigationProvider>
      <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Navigate to="/csc-agent-platform/admin/access-management" />
            }
          />
          {routes.map((route, id) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
      </ModalProvider>
    </NavigationProvider>
  );
}
