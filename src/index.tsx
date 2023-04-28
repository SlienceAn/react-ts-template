import React from "react";
import { render } from 'react-dom';
import './index.scss';
import Img from './assets/images/demo.jpg'
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
            <img src={Img}></img>
            <button className="hello" onClick={func}>say hi</button>
        </div>
    )
}

render(<App />, rootElement)