import React from "react";
import { render } from 'react-dom';

const rootElement = document.getElementById('root');
const App = () => {
    const func = () => {
        console.log("../")
    }
    return <div className="hello">Hello</div>
}

render(<App />, rootElement)