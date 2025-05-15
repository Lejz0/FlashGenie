import Dashboard from './Dashboard.tsx';
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage.tsx';
import ErrorPage from './ErrorPage.tsx';
import Layout from './Layout.tsx';
import UploadFilePage from './UploadFilePage.tsx';
import RegisterPage from './RegisterPage.tsx';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import ExportPage from './ExportPage.tsx';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='/generate' element={<UploadFilePage />} />
        <Route path='export/:id' element={<ExportPage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
