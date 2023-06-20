import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './index.css';
import routes from './routes';

export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/access-management/' />} />
        {routes.map((route, id) => {
          return <Route key={id} path={route.path} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}
