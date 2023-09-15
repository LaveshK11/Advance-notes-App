import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/NoteSubmit.jsx";


render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById("app"));
