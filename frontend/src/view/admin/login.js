import React, {Component} from 'react'
import {Input, Button, Card, Row, Col, Icon, notification } from 'antd';
import {Redirect} from "react-router-dom/";
import ApiConnector from "../../utils/ApiConnector"

export default class Login extends Component {
    constructor(){
        super();
        this.state = {isAuthenticated: ApiConnector.isAuthenticated()};
    }

    render() {
        const {isAuthenticated} = this.state;
        if(isAuthenticated === true){
            return (<Redirect to='/admin/articles'/>);
        }
        return (
            <Row>
                <Col span={6} offset={9}><Card style={{width: "100%"}}>
                    <div className="logo-holder" style={{marginBottom: 45}}>
                        <h2>Admin login</h2>
                    </div>
                    <div style={{marginBottom: 16}}>
                        <Input placeholder="Username" type="text" ref='username'
                               prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                    </div>
                    <div style={{marginBottom: 16}}>
                        <Input placeholder="Password" type="password" ref='password'
                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" icon="login" style={{width: '100%'}} onClick={(event) => this.handleClick(event)}>Login</Button>
                    </div>
                </Card>
                </Col>
            </Row>

        )
    }

    handleClick(event) {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.input.value.trim(), password: password.input.value.trim() };
        const _this = this;
        ApiConnector.loginUser(creds).then((data) => {
            console.log("login success! " + data);
            _this.setState({isAuthenticated: true});
            notification.success({
                message: 'Success',
                description: "Login successful!",
            });
        }).catch((err) => {
            notification.error({
                message: 'Error',
                description: err,
            });
        });
    }

}

