import React, { useCallback } from 'react'
import '../styles/content.scss'
import { FaListAlt } from 'react-icons/fa'
import { Note } from '../types/Note'
import ReactQuill from 'react-quill'
interface Props {
    sideBarIsVisible: boolean
    currentNote: Note | null,
    notes: Note[],
    EditNoteBody: (newBody: string | undefined) => boolean

}


const Content = (props: Props) => {

    const changeBody = useCallback((content: string | undefined) => {
        if (!content) return
        props.EditNoteBody(content)
    }, [props])

    let classNames = "content "
    classNames += props.sideBarIsVisible ? `content--is_minimum` : "content--is_full"
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
    return (
        <div className={classNames}>
            <div className="content-quill" style={{ height: "100%" }}>
                {props.currentNote ? <ReactQuill style={{ height: "100%" }} value={props.currentNote.body || ""}
                    onChange={changeBody}
                    modules={modules}
                    formats={formats}
                    bounds={'.app'}
                    placeholder={"Write something..."} /> :
                    <h1 style={{ textAlign: "center" }}>{props.notes.length > 0 ?
                        "Begin editing by select note from the sidebar!"
                        :
                        "Add new note to begin editing!"
                    }</h1>}
            </div>
        </div>
    )
}

export default Content
