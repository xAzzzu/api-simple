import React, { Component } from 'react';
import {List, Button, Drawer, Skeleton, Col, Row, Input, notification, Icon, Modal} from 'antd';
import ApiConnector from "../../utils/ApiConnector"
import {Redirect} from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

const confirm = Modal.confirm;

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

const pStyle = {
    fontSize: 16,
    color: 'rgba(0,0,0,0.85)',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};


class Article extends Component {
    constructor(){
        super();
        this.state = {isAuthenticated: ApiConnector.isAuthenticated(), content:"", isFetching: false, articleList: [], visible: false, mode: 'create', activeArticle: 0, title: ''};
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleAddArticle = this.handleAddArticle.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }

    handleEditorChange(content) {
        this.setState({ content });
    }

    changeTitle(e){
        this.setState({title: e.target.value});
    }

    editArticle(article) {
        this.setState({ mode: "edit", activeArticle: article, content: article.content, title: article.title });
        this.showDrawer();
    }

    deleteArticle(article) {
        const _this = this;
        confirm({
            title: 'Möchtest du diesen Artikel löschen ?',
            content: 'Title: '+ article.title,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                ApiConnector.deleteArticle(article.id).then(() => {
                    _this.fetchArticleList();
                });
            },
        });
    }

    componentDidMount(){
        this.fetchArticleList();
    }

    fetchArticleList(){
        this.setState({isFetching: true});
        const _this = this;
        ApiConnector.getArticles().then((articles) => {
            _this.setState({isFetching: false, articleList: articles});
        })
    }

    handleAddArticle(){
        const article = {title: this.refs.title.input.value, content: this.state.content.replace(/\n/g, '')};
        const _this = this;
        ApiConnector.addArticle(article).then(() => {
            notification.success({
                message: 'Erfolg',
                description: "Artikel " + article.title + " wurde hinzugefügt!",
            });
            _this.onClose();
            _this.fetchArticleList();
        });
    }

    handleUpdateArticle(){
        const article = {id: this.state.activeArticle.id ,title: this.refs.title.input.value, content: this.state.content.replace(/\n/g, '')};
        const _this = this;
        ApiConnector.updateArticle(article).then(() => {
            notification.success({
                message: 'Erfolg',
                description: "Artikel " + article.title + " wurde editiert!",
            });
            _this.onClose();
            _this.fetchArticleList();
        });
    }

    addArticle = () => {
        this.setState({ mode: "create", content: "", title: "" });
        this.showDrawer();
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {isAuthenticated, isFetching, articleList} = this.state;
        if(isAuthenticated === false){
            return (<Redirect to='/admin/login'/>);
        }
        let listData;
        if(isFetching === true){
            listData = [];
            for(let i = 0; i < 4; i++){
                listData.push({isLoading: true});
            }
        } else {
            listData = articleList;
        }


        return (
            <div>
                <Button type="primary" onClick={() => {this.addArticle()}}>Artikel hinzufügen</Button>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: 4,
                    }}
                    dataSource={listData}
                    renderItem={item => {
                        if(item.isLoading === true){
                            return (<Skeleton active/>);
                        }
                        return (<List.Item
                            key={item.title}
                            actions={[<span onClick={() => {this.editArticle(item)}}><Icon type="edit" /> Editieren</span>, <span onClick={() => {this.deleteArticle(item)}}><Icon type="delete"/> Löschen</span>]}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={"Autor: " + item.author.login}
                            />
                        </List.Item>)
                    }}
                />
                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>Artikel</p>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="Titel" content={
                                <Input ref="title" value={this.state.title} onChange={this.changeTitle}/>
                            } />{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem title="Inhalt" content={<Editor
                                onEditorChange={this.handleEditorChange}
                                value={this.state.content}
                                init={{
                                    plugins: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime lists wordcount imagetools textpattern help',
                                    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                                    statusbar: false,
                                }}
                            />} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            {this.state.mode === "create" &&
                            <Button type="primary"
                                    onClick={this.handleAddArticle}>Artikel hinzufügen</Button>
                            }
                            {this.state.mode === "edit" &&
                            <Button type="primary"
                                    onClick={
                                        () => {this.handleUpdateArticle()}
                                    }>Artikel editieren</Button>
                            }
                        </Col>
                    </Row>
                </Drawer>
            </div>
        );
    }
}

export default Article;
