import "./app.css";
import Header from "./common/header/Header";
import WriteBox from "./components/WriteBox";
import AddNotes from "./pages/AddNotes/addNotes";
import UserLoginSingup from "./pages/users/UserLoginSingup";

export function App() {
  return (
    <>
      <UserLoginSingup></UserLoginSingup>
      {/* <AddNotes></AddNotes> */}
    </>
  );
}
