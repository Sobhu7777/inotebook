const express = require("express");
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");
const { body,validationResult } = require('express-validator')

const router = express.Router();

//Route1: Fetch Notes using : GET '/api/notes/fetchNotes'  require authorisation  : login required
router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Error Occured");
  }
});
//Route2: Add a new Note : POST '/api/notes/addNotes'  require authorisation  : login required
router.post("/addNotes", fetchuser,[
        body('title','title Not enough').isLength({min:3}),
        body('description','description Not enough').isLength({min:6})
],async (req, res) => {
    // if there are errors return the errors and a bad request
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
        });
        const savedNotes = await notes.save();
        res.json(savedNotes);
    } catch (error) {
        console.error({ error: error.message });
        res.status(500).send("Internal Error Occured");
    }
});
//Route3: Update a Note : PUT '/api/notes/updatenote'  require authorisation  : login required
router.put("/updatenote/:id", fetchuser,async (req, res) => {
  const { title, description, tag} = req.body;
  try {
    // create a Note object
  const newNote = {}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}
  // find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
  note =  await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note})
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Error Occured");
  }
});
//Route4: Delete a Note : DELETE '/api/notes/deletenote'  require authorisation  : login required
router.delete("/deletenote/:id", fetchuser,async (req, res) => {
  try {
    // find the note to be deleted and delete it
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}
  // Allow deletion only if user owns this Note
  if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
  note =  await Notes.findByIdAndDelete(req.params.id)
  res.json({"success":"Note has been deleted",Note:note})
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send("Internal Error Occured"); 
  }
});
module.exports = router;
