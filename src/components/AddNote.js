import React from "react";
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <h2>Add Your Notes</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            placeholder="titleName"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            placeholder="this is description"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="this is Tag"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
      </div>
      <div className="container my-3" onClick={handleClick} >
        <button style={{backgroundColor:"#4e4e5e",color:"white",borderRadius: "10px"}} disabled={note.title.length<5 ||note.description.length<5}>Submit</button>
      </div>
    </>
  );
};

export default AddNote;
