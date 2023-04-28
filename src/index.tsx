import React from "react";
import { render } from 'react-dom';

const rootElement = document.getElementById('root');
const App = () => {
    function func<T>(a: T): T {
        alert(a)
        return a
    }
    func<number>(187)
    return (
        <div className="hello">
            <div>H E L L O</div>
            <button className="hello" onClick={func}>say hi</button>
        </div>
    )
}

render(<App />, rootElement)