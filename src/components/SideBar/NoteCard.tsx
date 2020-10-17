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
// *** 

const NoteCard = (props: Props) => {
    const { title, body, order } = props.note
    const noteFunctions = useContext(NoteFunctions)

    return (
        <div className="note_card" onClick={(e) => {
            noteFunctions?.ChangeCurrentNote(props.note)
        }
        }>
            {order}
            <p className="note_card-title">
                <strong >{title}</strong>
            </p>
            {/* <h2 className="note_card-title">{title}</h2> */}
            <p className="note_card-body">{body.length > 80 ? body.substring(0, 80) + "..." : body}</p>
            <div className="note_card-buttons">
                <button className="note-delete btn btn-warning" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    noteFunctions?.DeleteNote(props.note)
                }
                }>Delete</button>

                <button className="note-rename btn btn-primary" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const newTitle = window.prompt("enter the new title", title)
                    noteFunctions?.RenameNote(props.note, newTitle ? newTitle : title)
                }}>Rename</button>
            </div>
        </div>
    )
}

export default NoteCard
