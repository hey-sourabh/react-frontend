import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from 'react-router-dom';
import './App.css';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
type User = {
  isAuthenticated: boolean;
  name: string;
};
const DashBoardLayout = () => {
  const user: User = { isAuthenticated: true, name: 'John' };
  if (!user.isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <div>header</div>
      <div>layout</div>
      <Outlet context={user} />
      <div>footer</div>
    </>
  );
};
const DashBoard = () => {
  const user = useOutletContext<User>();
  return (
    <div>
      <h1>DashBoard Page</h1>
      <p>Welcome {user.name}</p>
    </div>
  );
};
const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};
const Settings = () => {
  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  );
};

const RestrictedRoute = () => {
  const user = { isAuthenticated: false };
  if (user.isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <div>header</div>
      <div>layout</div>
      <Outlet />
      <div>footer</div>
    </>
  );
};

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
};
const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HomePage component */}
        <Route path="/" element={<HomePage />} />
        {/* Private Routes or Protect Route only authenticated user can access */}
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Restricted Routes only non authenticated user can access */}
        <Route element={<RestrictedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
