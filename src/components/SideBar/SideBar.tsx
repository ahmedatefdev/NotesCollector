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
    return (
        <div className={classNames}>
            {/* <Search /> */}
            <button className="">Add new Note <span><FaPlusSquare size="2em" /></span> </button>
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
                        if (props.SaveNote(title)) setTitle("")
                }
                } />
            <FaCheckSquare
                size="2em"
                onClick={(e) => {
                    if (props.SaveNote(title)) setTitle("")
                }
                } />
            {props.notes.map((note, i) => <NoteCard note={note} key={i} />)}
        </div >
    )
}

export default SideBar
