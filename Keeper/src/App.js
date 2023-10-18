import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";

let noteData = [];

function App() {
    // check if data already exist and render
    const data = JSON.parse(localStorage.getItem('notes'));
    if(!data) return;
    noteData = data;

    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        console.log(newNote); //note from CreateArea useState note

        //save notes to localStorage
        noteData.push(newNote)
        localStorage.setItem('notes', JSON.stringify(noteData))

        setNotes(prevNotes => {
            return [...prevNotes, newNote]
        })
    }

    function deleteNote(id) {
        console.log('Delete was triggered.')

        setNotes(prevNotes => {
            return prevNotes.filter((noteIteam, index) => {
                return index !== id;
            })
        })

        //remove note in localStorage
        noteData.splice(id, 1)
        localStorage.setItem('notes', JSON.stringify(noteData))
    }

    return <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {noteData.map((noteIteam, index) => {
            return <Note
                key={index}
                id={index}
                title={noteIteam.title}
                content={noteIteam.content}
                onDelete={deleteNote}
            />
        })}
        <Footer />
    </div>
}

export default App;