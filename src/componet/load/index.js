import React from "react";
import './style.css';

/*加载动画*/
const Loading = () =>{
    return(
        <div id="dots-loading">
            <div className="loader"/>
            <div className="shadow"/>
        </div>
    )
}

export default Loading