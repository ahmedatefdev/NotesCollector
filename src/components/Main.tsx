import React, { Component } from 'react'
import Content from './Content'
import { Header } from './Header'
import SideBar from './SideBar/SideBar'
import '../styles/layout.scss'
import { Note } from '../types/Note'
import { LocalStorageKeys } from '../enums/LocalStorageKeys'
import { NoteFunctionsProvider } from '../types/Context'
import debounce from '../helpers'

interface Props {

}
interface State {
    sideBarIsVisible: boolean
    notes: Note[]
    currentNote: Note | null
}


export const NoteFunctions = React.createContext<NoteFunctionsProvider | null>(null)


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
        if (oldNotes !== null && oldNotes !== undefined) {
            const notes = JSON.parse(oldNotes)
            this.setState({ ...this.state, notes: notes as Note[], currentNote: notes[0] })
        }
    }

    ChangeCurrentNote = (note: Note) => {
        this.setState({ ...this.state, currentNote: note })
    }

    SaveNote(title: string): boolean {
        if (!this.isTitleValued(title)) return false
        const newNote = { title, body: "" }
        const newNotes = [...this.state.notes, newNote]
        this.updateLocalStorageNotes(newNotes)
        this.setState({ ...this.state, notes: newNotes, currentNote: newNote })
        return true
    }

    RenameNote = (oldNote: Note, newTitle: string) => {
        if (newTitle.trim() === oldNote.title) return true
        else if (!this.isTitleValued(newTitle)) return false
        const note = this.state.notes.find((note) => oldNote.title === note.title)
        if (!note) return false
        note.title = newTitle
        this.updateLocalStorageNotes(this.state.notes)
        this.setState({ ...this.state, currentNote: this.state?.currentNote?.title === oldNote.title ? { ...this.state.currentNote, title: newTitle } as Note : this.state.currentNote })
        return true
    }

    EditNoteBody = (newBody: string | undefined) => {

        // const note = this.state.notes.find((note) => this.state.currentNote!.title === note.title)
        if (!this.state.currentNote || !newBody || newBody === this.state.currentNote.body) return false
        // note.body = newBody
        // this.updateLocalStorageNotes(this.state.notes)
        this.setState({ ...this.state, currentNote: { ...this.state.currentNote, body: newBody } })
        this.deBounceUpdate(this.state.currentNote.title, newBody)
        return true
    }
    deBounceUpdate =
        debounce((title: string, newBody: string) => {
            console.log('Bounce');
            if (title !== this.state.currentNote?.title) return
            const note = this.state.notes.find((note) => this.state.currentNote!.title === note.title)
            if (!note || !this.state.currentNote) return false
            note.body = newBody
            this.updateLocalStorageNotes(this.state.notes)
            this.setState({ ...this.state })
        }, 1500)

    DeleteNote = (oldNote: Note) => {
        if (!window.confirm(`Are you sure you want to delete note with (${oldNote.title})`)) return false
        const newNotes = this.state.notes.filter((note) => oldNote.title !== note.title)
        this.updateLocalStorageNotes(newNotes)
        this.setState({ ...this.state, notes: newNotes, currentNote: this.state.currentNote?.title === oldNote.title ? null : this.state.currentNote })
        return true
    }

    private isTitleValued = (title: string): boolean => {
        if (title.trim() === "") {
            alert("The Note cannot be saved because it is title is empty")
            return false
        }
        else if (this.state.notes.some((note) =>
            note.title === title)) {
            alert("this title is used before you have to use new title")
            return false
        }
        else if (title.trim().length > 25) {
            alert("this title is very long place chooses another one")
            return false
        }
        return true
    }

    private updateLocalStorageNotes(newNotes: (Note | { title: string; body: string })[]) {
        localStorage.setItem(LocalStorageKeys.NOTES, JSON.stringify(newNotes))
    }

    render() {
        return (

            <NoteFunctions.Provider value={{ ChangeCurrentNote: this.ChangeCurrentNote, DeleteNote: this.DeleteNote, RenameNote: this.RenameNote }}>
                <div className="layout">
                    <Header handelSideBar={this.handelSideBar} noteTitle={this.state.currentNote?.title} sideBarIsVisible={this.state.sideBarIsVisible} />
                    <SideBar sideBarIsVisible={this.state.sideBarIsVisible} SaveNote={this.SaveNote} notes={this.state.notes} />
                    <Content
                        sideBarIsVisible={this.state.sideBarIsVisible}
                        currentNote={this.state.currentNote}
                        notes={this.state.notes}
                        EditNoteBody={this.EditNoteBody}
                    />
                </div>
            </NoteFunctions.Provider>
        )
    }
    componentDidMount() {
        this.LoadNotes()
    }
}

export default Main
