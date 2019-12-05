// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Notes (DATA)
// =============================================================
var storedNotes = fs.readFileSync("./db/db.json", "utf-8");
if (storedNotes) {
    var otherNotes = JSON.parse(storedNotes);
    notes = otherNotes;
}
else {
    notes = [];
}

// Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

//Creating specialized id for each note
function noteId() {
    for (var i = 0; i < notes.length; i++) {
        notes[i].id = i;
    }
}

// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
    noteId();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function(err) {
        if (err) throw err
    });
});

// Delete Notes
app.delete("/api/notes/:notes", function (req, res) {
    var chosen = parseInt(req.body.id);
    notes.splice(chosen, 1);
    console.log(chosen);

    for (var i = 0; i < notes.length; i++) {
        notes[i].id = i;
    }

    var notesAfterDelete = JSON.stringify(notes);
    fs.writeFile("db/db.json", notesAfterDelete, function (err) {
        if (err) throw err
    });
    res.sendFile(path.join(__dirname, "public/notes.html"));
 
    });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});