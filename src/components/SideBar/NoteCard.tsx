import React, { useContext } from 'react'
import { Note } from '../../types/Note'
import { NoteFunctions } from '../Main'
import '../../styles/note_card.scss'

interface Props {
    note: Note
}

///// DONE: Note Card
///// *** : show Title
///// *** : rename Note 
///// *** : Delete Note


// TODO: Style the Card Note

const NoteCard = (props: Props) => {
    const { title, body, order } = props.note
    const NoteF = useContext(NoteFunctions)

    return (
        <div className="note-card">
            {order}
            <h2>{title}</h2>
            <p>{body}</p>
            <button className="note-delete" onClick={(e) =>
                NoteF?.DeleteNote(props.note)
            }>D</button>
            <button className="note-rename" onClick={(e) => {
                const newTitle = window.prompt("enter the new title", title)
                NoteF?.RenameNote(props.note, newTitle ? newTitle : title)
            }}>R</button>
        </div>
    )
}

export default NoteCard
