import React, { useState } from 'react'
import '../styles/side_bar.scss'
import { FaPlusSquare, FaCheckSquare } from 'react-icons/fa'
interface Props {
    sideBarIsVisible: boolean
}
// TODO: New Note
// *** : add title 
// *** : begin edit the new one 
// *** : save new note for future update


// TODO: Old notes
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
                    if (e.key === "Enter") {
                        console.log("ent");
                        //! save the title 
                    }
                }
                } />
            <FaCheckSquare
                size="2em"
                onClick={(e) => {
                    //! save the title 
                }
                } />
        </div >
    )
}

export default SideBar
