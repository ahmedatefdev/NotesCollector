import React, { Component } from 'react'
import Content from './Content'
import { Header } from './Header'
import SideBar from './SideBar'
import '../styles/layout.scss'
import { Note } from '../types/Note'
import { LocalStorageKeys } from '../enums/LocalStorageKeys'
import { isNullOrUndefined } from 'util'

interface Props {

}
interface State {
    sideBarIsVisible: boolean
    notes: Note[]
    currentNote: Note | null
}

///// DONE: make responsive sidebar 
///// *** : add button for hide the side bar
///// *** : auto hide in mobile when the width is low
/////     - when change make the content take all the width

// TODO: save new note
///// *** : make type for notes
///// *** : save note in the local storage
// *** : begin edit the new one 
// TODO: add main colors to all sections



class Main extends Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props)
        this.state = {
            sideBarIsVisible: true,
            notes: []
            , currentNote: null
        }
        this.handelSideBar = this.handelSideBar.bind(this)
        this.SaveNote = this.SaveNote.bind(this)
    }

    handelSideBar(): void {
        this.setState({ ...this.state, sideBarIsVisible: !this.state.sideBarIsVisible })
    }

    LoadNotes = () => {
        const oldNotes = localStorage.getItem(LocalStorageKeys.NOTES)
        if (oldNotes !== null && oldNotes !== undefined) this.setState({ ...this.state, notes: JSON.parse(oldNotes) as Note[] })
    }

    isTitleValued = (title: string): boolean => {

        if (title.trim() === "") {
            alert("The Note cannot be saved because it is title is empty")
            return false
        }
        if (this.state.notes.some((note) =>
            note.title === title)) {
            alert("this title is used before you have to use new title")
            return false
        }
        return true
    }

    SaveNote(title: string): boolean {
        if (!this.isTitleValued(title)) return false
        const newNote = { title, body: "" }
        const newNotes = [...this.state.notes, newNote]
        localStorage.setItem(LocalStorageKeys.NOTES, JSON.stringify(newNotes))
        this.setState({ ...this.state, notes: newNotes, currentNote: newNote })
        return true
    }

    render() {
        return (
            <div className="layout">
                <Header />
                <SideBar sideBarIsVisible={this.state.sideBarIsVisible} SaveNote={this.SaveNote} />
                <Content
                    handelSideBar={this.handelSideBar}
                    sideBarIsVisible={this.state.sideBarIsVisible}
                    currentNote={this.state.currentNote}
                    notes={this.state.notes}
                />
            </div>
        )
    }
    componentDidMount() {
        this.LoadNotes()
    }
}

export default Main
