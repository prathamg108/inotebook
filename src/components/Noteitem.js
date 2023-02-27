import React from "react";
import NoteContext from "../context/notes/noteContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updatedNote } = props;
  return (
    <div className="col-md-3 mx-4">
      <div className="card my-3">
        <div className="card-body mx-3">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updatedNote(note);
              }}
            ></i>
            <span style={{left: "90%!important"}}  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {note.tag}
            </span>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
