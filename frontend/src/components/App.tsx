import Dashboard from './Dashboard.tsx';
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage.tsx';
import ErrorPage from './ErrorPage.tsx';
import Layout from './Layout.tsx';
import UploadFilePage from './UploadFilePage.tsx';
import RegisterPage from './RegisterPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/generate" element={<UploadFilePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
