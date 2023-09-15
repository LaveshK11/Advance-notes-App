import React, { useState } from "react";
import "./note.css";
import Header from "../../common/header/Header";
import WriteBox from "../../components/WriteBox";
import { useSelector } from 'react-redux';
import { subitNotes } from "../../helpers/submitNotes";


export default function (STATE) {
  const [show, setShow] = useState(false);

  const data = useSelector((state) => {
    return state.notes
  })

  const shoWriteBox = async (e) => {
    e.preventDefault();
    setShow(true);
  };

  const submitNotes = async (e) => {
    e.preventDefault();
    subitNotes(data)
  }

  return (
    <>
      <Header />
      <div className="wrapper" style={{ display: show === false ? "block" : "none" }}>
        <li className="add-box">
          <div className="icon">
            <i className="uil uil-plus"></i>
          </div>
          <p onClick={(e) => shoWriteBox(e)}>Add new note</p>
        </li>
      </div>
      <div className="writebox" style={{ display: show ? "block" : "none", backgroundColor: "white" }}>
        <WriteBox />
      </div>
      <div className="btns">
        <button className="backBtn" style={{ display: show ? "block" : "none", textAlign: "center" }} onClick={(e) => setShow(false)}> Back </button>
        <button type="submit" className="backBtn" style={{ display: show ? "block" : "none", textAlign: "center" }}
          onClick={e => submitNotes(e)} > Submit </button>
      </div>
    </>
  );
}
