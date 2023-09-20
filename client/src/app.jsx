import "./app.css";
import { BrowserRouter as Main, Routes, Route } from 'react-router-dom';
import AddNotes from "./pages/AddNotes/addNotes";
import Header from './common/header/Header'
import NotFound from "./pages/NotFound/NotFound";
export function App() {
  return (
    <>
    <Main>
      <Header/>
      <Routes>
        <Route exact path = "/" element= {<AddNotes />}> </Route>
       <Route path="*" element={<NotFound />} />
      </Routes>
    </Main>
    </>
  );
}
