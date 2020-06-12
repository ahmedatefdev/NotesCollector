import React, { Component } from 'react'
import Content from './Content'
import { Header } from './Header'
import SideBar from './SideBar'
import '../styles/layout.scss'

interface Props {

}
interface State {
    sideBarIsVisible: boolean
}

// DONE: make responsive sidebar 
///// *** : add button for hide the side bar
///// *** : auto hide in mobile when the width is low
/////     - when change make the content take all the width

// TODO: save new note
///// *** : make type for notes
// *** : save note in the local storage
// *** : begin edit the new one 
// TODO: add main colors to all sections



class Main extends Component<Props, State> {
    state: State;
    constructor(props: Props) {
        super(props)
        this.state = {
            sideBarIsVisible: true
        }
        this.handelSideBar = this.handelSideBar.bind(this)
    }
    componentDidMount() {
    }
    handelSideBar(): void {
        this.setState({ ...this.state, sideBarIsVisible: !this.state.sideBarIsVisible })
    }
    SaveNewNote(title: string): void {
        this.setState({ ...this.state, sideBarIsVisible: !this.state.sideBarIsVisible })
    }
    render() {
        return (
            <div className="layout">
                <Header />
                <SideBar sideBarIsVisible={this.state.sideBarIsVisible} />
                <Content handelSideBar={this.handelSideBar} sideBarIsVisible={this.state.sideBarIsVisible} />
            </div>
        )
    }
}

export default Main
