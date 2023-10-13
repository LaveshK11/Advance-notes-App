import "./app.css";
import { BrowserRouter as Main, Routes, Route } from 'react-router-dom';
import AddNotes from "./pages/AddNotes/addNotes";
import Header from './common/header/Header'
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/users/login/Login";
import Signup from "./pages/users/singup/Singup";

export function App() {
  return (
    <>
      <Main>
        <Header />
        <Routes>
          <Route exact path="/" element={<AddNotes />}> </Route>
          <Route exact path="/add-notes" element={<AddNotes />}> </Route>
          <Route exact path="/all-notes" element={<AddNotes />}> </Route>
          <Route exact path="/login" element={<Login />}> </Route>
          <Route exact path="/singup" element={<Signup />}> </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}
