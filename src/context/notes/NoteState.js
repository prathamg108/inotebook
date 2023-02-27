import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialnote = [];

  const [notes, setNotes] = useState(initialnote);

  //get a note
  //////////////////////////////////////////////////////////////////////////
  const getNote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  ///////////////////////////////////////////////////////////////////////////
  //Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //logic for adding note
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  ////////////////////////////////////////////////////////////////////////
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Deletes note ", id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  /////////////////////////////////////////////////////////////////////
  //Update a note
  const updateNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    //logic for editing note
    const newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, updateNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
