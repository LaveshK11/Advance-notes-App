import "./app.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNotes from "./pages/AddNotes/addNotes";
import Header from './common/header/Header'
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/users/login/Login";
import Signup from "./pages/users/singup/Singup";
import UserProfile from "./pages/users/profile/userProfile";

const routes = [
  { path: "/", element: <AddNotes />, exact: true },
  { path: "/add-notes", element: <AddNotes />, exact: true },
  { path: "/all-notes", element: <UserProfile />, exact: true },
  { path: "/login", element: <Login />, exact: true },
  { path: "/signup", element: <Signup />, exact: true },
  { path: "*", element: <NotFound /> },
];

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            caseSensitive={false}
            exact={route.exact || false}
          />
        ))}
      </Routes>
    </Router>
  );
}
