const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("note", NoteSchema);
