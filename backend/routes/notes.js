const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/FetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get All notes using Get: "/api/auth/getAllNotes", Require Auth
router.get("/getAllNotes", fetchUser, async (req, res) => {
  try {

   console.log(req);
    const notes = await Notes.find({ user: req.user.id });

    res.send(notes);

  } catch (error) {
    console.error("Error saving user:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});


//Route 2: Add a new notes using Post: "/api/auth/addNote", Require Auth
router.post("/addNote", fetchUser,
  [   // Apply validations
    body("title", "Enter a valid Title.").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters.").isLength({
      min: 5,
    }),
  ], async (req, res) => {

    //return validation error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

  try {

     const {title, description, tag} = req.body;

     const note = new Notes({
      title, description, tag, user: req.user.id
     });

     const saveNote = await note.save();

     res.send(saveNote);



  } catch (error) {
    console.error("Error saving user:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

//Route 3: Update notes using Put: "/api/auth/updateNote/:id", Require Auth

router.put('/updateNote/:id', fetchUser, async (req, res) =>{
  const {title, description, tag} = req.body;

  try{
     
    //create an object for update
    const updateNote = {};
    if(title){updateNote.title = title};
    if(description){updateNote.description = description};
    if(tag){updateNote.tag = tag};

  
    //Find a note to be Updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found!");
    }
    console.log("object"+note);

    //Check valid user is update notes
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }

    //Note Upadte by using id
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: updateNote}, {new: true});
    res.json(note);

  } 
  catch (error) {
    console.error("Error saving user:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});


//Route 4: Dlete existing notes using Delete: "/api/auth/deleteNote/:id", Require Auth

router.delete('/deleteNote/:id', fetchUser, async (req, res) =>{
  try{

    //Find a note to be Delete and Delete it
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found!");
    }
    console.log("object"+note);

    //Allow deletion only if user own this Note
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }

    //Note Upadte by using id
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success" : "Note has been deleted" , note : note});

  } 
  catch (error) {
    console.error("Error saving user:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});



module.exports = router;
