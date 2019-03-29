import React, {Component} from 'react';
import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Baukasten from './content/baukasten'
import BeispielProjekt from './content/beispielProjekt'
import Newsletter from './content/newsletter'
import Fakten from './content/fakten'
import FAQ from './content/faq'
import AktuelleProjekte from './content/aktuelleProjekte'
import Info from './content/info'
import Login from './admin/login'
import Article from './admin/article'

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class App extends Component {
    render() {
        return (
            <Router>
                <Layout style={{height: '100%'}}>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['home']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <SubMenu key="sub2" title={<span>Inhalte</span>}>
                                    <Menu.Item key="5"><Link to="/inhalte/beispiel-projekt">Beispiel Projekt</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/inhalte/newsletter">Newsletter</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/inhalte/info">Info</Link></Menu.Item>
                                    <Menu.Item key="8"><Link to="/inhalte/faq">FAQ</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span>Recherche</span>}>
                                    <Menu.Item key="9"><Link to="/recherche/aktuelle-projekte">Aktuelle Projekte</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to="/recherche/fakten">Fakten</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '24px 24px 24px'}}>
                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                <Route path="/technisch/baukasten" component={Baukasten}/>
                                <Route path="/inhalte/beispiel-projekt" component={BeispielProjekt}/>
                                <Route path="/inhalte/newsletter" component={Newsletter}/>
                                <Route path="/inhalte/info" component={Info}/>
                                <Route path="/inhalte/faq" component={FAQ}/>
                                <Route path="/recherche/aktuelle-projekte" component={AktuelleProjekte}/>
                                <Route path="/recherche/fakten" component={Fakten}/>


                                <Route path="/admin/login" component={Login}/>
                                <Route path="/admin/articles" component={Article}/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;
