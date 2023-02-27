const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../model/Notes");
const { body, validationResult } = require("express-validator");

// creating a route for fetching all notes using GET "/api/notes/fetchnotes".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

// creating a route forAdding a note using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title minimum length must be 3").isLength({ min: 3 }),
    body("description", "description minimum length must be 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// creating a route for updating a note using PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //creating a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //finding the note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    //checking whether user is correct or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You can't access this file");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});
// creating a route for deleting a note using DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //finding the note to delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    //checking whether user is correct or not i.e user own this note or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("You can't access this file");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been successfully deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
