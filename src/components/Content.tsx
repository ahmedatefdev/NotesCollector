import React from 'react'
import '../styles/content.scss'
import { FaListAlt } from 'react-icons/fa'
import { Note } from '../types/Note'
interface Props {
    handelSideBar: () => void
    sideBarIsVisible: boolean
    currentNote: Note | null,
    notes: Note[]
}

const Content = (props: Props) => {
    let classNames = "content "
    classNames += props.sideBarIsVisible ? `content--is_minimum` : "content--is_full"
    return (
        <div className={classNames}>
            <FaListAlt onClick={props.handelSideBar} size="2em" />
            Content1
            <div>
                {JSON.stringify(props.currentNote)}
            </div>
            <div>{JSON.stringify(props.notes)}</div>
        </div>
    )
}

export default Content
