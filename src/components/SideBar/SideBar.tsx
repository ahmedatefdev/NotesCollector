import React, { useState } from 'react'
import '../../styles/side_bar.scss'
import { FaPlusSquare, FaCheckSquare } from 'react-icons/fa'
import { Note } from '../../types/Note'
import NoteCard from './NoteCard'

interface Props {
    sideBarIsVisible: boolean
    SaveNote: (title: string) => boolean
    notes: Note[]
}
///// DONE: New Note
///// *** : add title 
///// *** : save new note for future update

// TODO: Old notes
// *** : add card for each note 

// *** : edit old one
//     - edit title 
// *** : delete old one
// *** : search for old note by title
// *** : update old note 


const SideBar = (props: Props) => {
    let classNames = "side_bar "
    classNames += props.sideBarIsVisible ? `side_bar--is-visible` : `side_bar--is-hidden`
    const [title, setTitle] = useState("")
    const [addTitle, setAddTitle] = useState(false)
    return (
        <div className={classNames}>
            {/* <Search /> */}
            <button className="btn btn-primary size-l add_note-button" onClick={() => { setAddTitle(!addTitle) }
            }>{addTitle ? "Cancel" : "Add new Note"}</button>
            <div className={"add_note-container " + (addTitle ? "add_note-container--visible" : "add_note-container--hidden")}>
                <input
                    type="text"
                    name="title"
                    onChange={
                        (event) => {
                            setTitle(event.target.value)
                        }
                    }
                    value={title}
                    onKeyUp={(e) => {
                        if (e.key === "Enter")
                            if (props.SaveNote(title)) {
                                setTitle("")
                                setAddTitle(false)
                            }
                    }
                    } />
                <FaCheckSquare
                    color="#36a6d6"
                    size="2em"
                    onClick={(e) => {
                        if (props.SaveNote(title)) {
                            setTitle("")
                            setAddTitle(false)
                        }
                    }
                    } />
            </div>
            <div className={"note_cards_container " + (!addTitle ? "note_cards_container--full_height" : "note_cards_container--minimum_height")}>
                {props.notes.map((note, i) => <NoteCard note={note} key={i} />)}
            </div>
        </div >
    )
}

export default SideBar
