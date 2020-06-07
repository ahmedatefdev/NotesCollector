import React from 'react'
import '../styles/content.scss'
import { FaListAlt } from 'react-icons/fa'
interface Props {
    handelSideBar: () => void
    sideBarIsVisible: boolean
}

const Content = (props: Props) => {
    let classNames = "content "
    classNames += props.sideBarIsVisible ? `content--is_minimum` : "content--is_full"
    return (
        <div className={classNames}>
            <FaListAlt onClick={props.handelSideBar} size="2em" />
            Content1
        </div>
    )
}

export default Content
