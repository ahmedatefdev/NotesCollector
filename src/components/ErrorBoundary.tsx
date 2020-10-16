import React, { Component } from 'react'

export class ErrorBoundary extends Component {

    // componentDidCatch(error, info) {
    //     console.log(error);
    //     console.log(info);

    // }
    render() {
        return (
            <div>
                something wrong
            </div>
        )
    }
}

export default ErrorBoundary
