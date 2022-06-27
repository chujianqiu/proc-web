import React, {useEffect, useState} from "react";
import {Form, Input, Row, Col, message} from "antd";
import InPutBox from "../../componet/inputbox";
import {randomNum} from '../../utils/util'
import {get, login} from "../../utils/rest";
import './iconfont.css';
import {observer, inject} from 'mobx-react';

/*登录*/
const LoginForm = (props) => {
    const [form] = Form.useForm();
    const ref = React.useRef();
    const {getFieldError} = form;
    const [code, setCode] = useState('');
    const [focusPoint, setFocus] = useState(-1);
    const {authStore} = props.store;
    let canvas = null;

    useEffect(() => {
        _createCode();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    //提交
    const onSubmit = async () => {
        let history = props.history;
        let user = form.getFieldsValue();
        let currentCode = ref.current.clearableInput.props.value;

        if (!currentCode) {
            message.error('验证码为空');
            return;
        }

        if (currentCode.toUpperCase() !== code.toUpperCase()) {
            message.error('验证码错误');
            return;
        }

        operation(user).then(() => {
            message.success('登录成功!');
            history.push({pathname: '/home', state: {data: {}}});
        }).catch(() => {
            message.error(`登陆失败,请校验用户名密码!`);
        })
    }

    //操作
    const operation = async (user) => {
        //获取token
        await login(`/user/login`, {...user}).then(res => {
            let auth = res.data.data ? res.data.data : {};
            sessionStorage.setItem('auth', JSON.stringify(auth));
        })

        //获取用户信息
        await get(`/user/info`).then(res => {
            let info = res.data.data ? res.data.data : {};
            let {user,roles,menu,button} = info;
            user['roles'] = roles;
            authStore.setUser(user);
            authStore.setMenu(menu);
            authStore.setButton(button);
        })

        //获取差异性字段
        await get('/requirementConf/findAll').then(res => {
            let columns = res.data.data ? res.data.data : [];
            sessionStorage.setItem('columns', JSON.stringify(columns));
        })
    }

    //生成验证码
    const _createCode = () => {
        const ctx = canvas.getContext('2d');
        const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let code = '';
        ctx.clearRect(0, 0, 80, 40);
        for (let i = 0; i < 4; i++) {
            const char = chars[randomNum(0, 57)];
            code += char;
            ctx.font = randomNum(20, 25) + 'px SimHei';//设置字体随机大小
            ctx.fillStyle = '#d3d7f7';
            ctx.textBaseline = 'middle';
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            let x = 80 / 5 * (i + 1);
            let y = 40 / 2;
            let deg = randomNum(-25, 25);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(char, 0, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y)
        }
        setCode(code)
    };

    const changeCaptcha = () => {
        _createCode()
    };

    return (
        <div>
            <div className="title">运营任务调度平台</div>
            <Form form={form} hideRequiredMark>
                <Form.Item
                    name='username'
                    help={<InPutBox info={getFieldError('username') && getFieldError('username')[0]}/>}
                    style={{marginBottom: 10}}
                    wrapperCol={{span: 20, pull: focusPoint === 0 ? 1 : 0}}
                    labelCol={{span: 3, pull: focusPoint === 0 ? 1 : 0}}
                    label={<span className='iconfont icon-denglu1' style={{opacity: focusPoint === 0 ? 1 : 0.6}}/>}
                    colon={false}>
                    <Input
                        onFocus={() => setFocus(0)}
                        onBlur={() => setFocus(-1)}
                        onPressEnter={onSubmit}
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name='password'
                    help={<InPutBox info={getFieldError('password') && getFieldError('password')[0]}/>}
                    style={{marginBottom: 10}}
                    wrapperCol={{span: 20, pull: focusPoint === 1 ? 1 : 0}}
                    labelCol={{span: 3, pull: focusPoint === 1 ? 1 : 0}}
                    label={<span className='iconfont icon-password' style={{opacity: focusPoint === 1 ? 1 : 0.6}}/>}
                    colon={false}>
                    <Input
                        type="password"
                        onFocus={() => setFocus(1)}
                        onBlur={() => setFocus(-1)}
                        onPressEnter={onSubmit}
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    style={{marginBottom: 20}}
                    help={<InPutBox info={getFieldError('captcha') && getFieldError('captcha')[0]}/>}
                    wrapperCol={{span: 20, pull: focusPoint === 2 ? 1 : 0}}
                    labelCol={{span: 3, pull: focusPoint === 2 ? 1 : 0}}
                    label={<span className='iconfont icon-code' style={{opacity: focusPoint === 2 ? 1 : 0.6}}/>}
                    colon={false}>
                    <Row gutter={8}>
                        <Col span={15}>
                            <Input
                                ref={ref}
                                type='text'
                                className="myInput"
                                onFocus={() => setFocus(2)}
                                onBlur={() => setFocus(-1)}
                                onPressEnter={onSubmit}
                                placeholder="验证码"
                            />
                        </Col>
                        <Col span={9}>
                            <canvas onClick={changeCaptcha} width="80" height='40' ref={el => canvas = el}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <div className="btn-box">
                        <div className="loginBtn" onClick={onSubmit}>登录</div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject('store')(observer(LoginForm))