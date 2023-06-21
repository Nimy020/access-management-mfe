import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
import routes from "./routes";
import { NavigationProvider } from "./context/NavigationProvider";
import { ModalProvider } from "./context/ModalProvider";
import { ADMIN_URL } from "./utils/constants";

export default function Root(props) {
  return (
    <NavigationProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to={ADMIN_URL} />} />
            {routes.map((route, id) => {
              return (
                <Route
                  key={route.path}
                  path={ADMIN_URL + route.path}
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
