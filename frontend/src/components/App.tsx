import Dashboard from './Dashboard.tsx';
import { Route, Routes } from 'react-router';
import LoginPage from './LoginPage.tsx';
import ErrorPage from './ErrorPage.tsx';
import Layout from './Layout.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
