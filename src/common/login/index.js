import React from "react"
import './style.css';
import LoadComponent from "../../componet/load/LoadComponent";
const BackGround = LoadComponent(import('../background/index'));
const LoginForm = LoadComponent(import('../login/LoginForm'));

/*登录页面*/
const LoginPage = (props) =>{
    const domain = window.location.host;
    return(
        <div id='login-page'>
            <BackGround url={'http://'+domain+'/wallhaven.jpg'}>
                <div className={'container'}>
                    <div className={`box showBox`}>
                        <LoginForm history={props.history}/>
                    </div>
                </div>
            </BackGround>
        </div>
    )
}

export default LoginPage
