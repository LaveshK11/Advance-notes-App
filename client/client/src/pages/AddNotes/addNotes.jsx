import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { submitNotes } from "../../helpers/submitNotes";
import { setInputBoxEmpty } from "../../redux/slice/noteSlice";
import 'react-toastify/dist/ReactToastify.css';
import "./note.css";
import WriteBox from "../../components/inputBox/WriteBox";
import { removeUserTokens } from "../../redux/slice/userSlice,";

export default function () {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const content = useSelector((state) => state.notes.editorHtml)

  const userToken = useSelector((state) => state.user.tokens)


  const shoWriteBox = async (e) => {
    e.preventDefault();
    setShow(true);
  };

  const submit = async (e) => {

    e.preventDefault();

    if (content.length) {

      let dataSaved = await submitNotes(content, userToken)

      console.log(dataSaved)

      if (dataSaved === true) {
        toast.success('Notes Saved Successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        dispatch(setInputBoxEmpty(""));
      }
      else if (dataSaved?.statusCode === 401 || dataSaved == 401) {
        dispatch(removeUserTokens())
        toast.error("Please login before submitting Notes", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else {
        toast.error("Error While Saving Notes!", {
          position: toast.POSITION.TOP_RIGHT
        });
        dispatch(setInputBoxEmpty(""));
      }

    }
    else {
      toast.error("Empty Input Box  ", {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(setInputBoxEmpty(""));
    }
  }


  return (
    <>
      <div className="wrapper" style={{ display: show === false ? "block" : "none" }}>
        <li className="add-box">
          <div className="icon">
            <i className="uil uil-plus"></i>
          </div>
          <p onClick={(e) => shoWriteBox(e)}>Add new note</p>
        </li>
      </div>
      <div className="writebox" style={{ display: show ? "block" : "none", backgroundColor: "white" }}>
        <WriteBox></WriteBox>
      </div>
      <div className="btns">
        <button className="backBtn" style={{ display: show ? "block" : "none", textAlign: "center" }} onClick={(e) => setShow(false)}> Back </button>
        <button type="submit" className="backBtn" style={{ display: show ? "block" : "none", textAlign: "center" }}
          onClick={e => submit(e)} > Submit </button>
      </div>
      <ToastContainer />
    </>
  );
}
