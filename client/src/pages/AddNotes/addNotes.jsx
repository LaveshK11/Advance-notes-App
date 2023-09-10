import React, { useState } from "react";
import "./note.css";
import Header from "../../common/header/Header";
import WriteBox from "../../components/WriteBox";

export default function () {
  const [show, setShow] = useState(false);

  const shoWriteBox = async (e) => {
    e.preventDefault();
    setShow(true);
  };

  const submitNotes = async (e) =>{
    e.preventDefault(); 
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
      <div className="writebox" style={{ display: show ? "block" : "none" }}>
        <WriteBox/>
      </div>
      <div className="btns">   <button  className = "backBtn" style={{ display: show ? "block" : "none" , textAlign : "center" }} onClick={(e) => setShow(false)}> Back </button>
      <button  type="submit" className = "submit" style={{ display: show ? "block" : "none" , textAlign : "center" }} 
      onClick={e => submitNotes(e)} > Submit </button>
      </div>
    </>
  );
}
