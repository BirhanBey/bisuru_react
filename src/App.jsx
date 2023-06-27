import './App.css';
import LoginPage from './components/LoginPage';
import AdminPanel from './AdminPanel';
import CooperativesPanel from './CoopComponents/CooperativePanel';
import Register from './Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FarmerController from './components/FarmerController';
import FarmController from './components/FarmController';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/adminpanel',
      element: <AdminPanel />,
    },
    {
      path: '/cooperativepanel',
      element: <CooperativesPanel />,
    },
    {
      path: '/farmers',
      element: <FarmerController />,
    },
    {
      path: '/farms',
      element: <FarmController />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ]);
  return (
    <div className="App" style={{backgroundColor: "#8E9AAF"}}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
