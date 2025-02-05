import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootState, store } from './redux/store';
import { LoginPage } from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoleBasedRoute from './components/RoleBasedRoutes';
import UserProfile from './pages/user/Profile';
import Home from './pages/Home';
import UserDashboard from './pages/user/DashBord';
import AdminUserManagement from './pages/Admin/AdminUserMangment';
const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token , role } = useSelector((state: RootState) => state.auth);

  if (token) {
    if(role === 'admin'){
      return  <Navigate to="/admin" replace /> 
    }else if(role === 'user'){
      return <Navigate to="/user" replace /> ;
    }
    else{
      return <Navigate to="/" replace />
    }
  }

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthGuard><LoginPage /></AuthGuard>} />
          <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
          <Route path='/' element={<Home/>} />

          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/user-management" element={<AdminUserManagement />} />
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={['user']} />}>
            <Route path='/user' element={<UserDashboard />} />
          </Route>

          <Route element={<RoleBasedRoute allowedRoles={['user']} />}>
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;