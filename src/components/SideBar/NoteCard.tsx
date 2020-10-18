import React, { useContext } from 'react'
import { Note } from '../../types/Note'
import { NoteFunctions } from '../Main'
import '../../styles/note_card.scss'
import { removeHTMLTags } from '../../helpers'

interface Props {
    note: Note
}


const NoteCard = (props: Props) => {
    const { title, body, order } = props.note
    const noteFunctions = useContext(NoteFunctions)

    const bodyToShow = removeHTMLTags(body)
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
            <p className="note_card-body">{bodyToShow.length > 80 ? bodyToShow.substring(0, 80) + "..." : bodyToShow}</p>
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
