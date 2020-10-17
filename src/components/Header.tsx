import React from 'react'
import '../styles/header.scss'
import logo from '../img/logo.svg'
import { FaAngleDoubleRight } from 'react-icons/fa'

interface Props {
    noteTitle: string | undefined
    handelSideBar: () => void
    sideBarIsVisible: boolean

}

export const Header = ({ noteTitle, handelSideBar, sideBarIsVisible }: Props) => {


    return (
        <div className="header">
            <div className="header-left_side">
                <div className="header-logo">
                    <img src={logo} alt="logo" height="24px" width="24px" />
                    <strong>
                        Notes
                </strong>
                </div>
                <button className={"header-sidebar_toggle " + (sideBarIsVisible ? " header-sidebar_toggle--close" : " header-sidebar_toggle--open")}>
                    <FaAngleDoubleRight onClick={handelSideBar} size="2em" />
                </button>

            </div>
            <div className="header-note_title">
                <h2>
                    {noteTitle ? noteTitle : "........"}
                </h2>
            </div>
        </div>
    )
}
