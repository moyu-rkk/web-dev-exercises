import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);

    function expand() {
        setExpanded(true);
    }

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        console.log(event.target) // event指change这个事件，target指发生变化的元素，这里有input和textarea，name和value来自于元素属性
        const { name, value } = event.target;
        console.log(name, value)

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note); // equals to calling addNote, note is the note above
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    return (
        <div>
            <form className="create-note">
                {
                    isExpanded ? <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        placeholder="Title"
                    /> : null
                }

                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />

                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;