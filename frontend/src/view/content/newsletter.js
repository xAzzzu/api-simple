import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import {List, Avatar, Icon, Skeleton} from 'antd';
import ApiConnector from "../../utils/ApiConnector";


class Newsletter extends Component {
    constructor(){
        super();
        this.state = {isFetching: false, articleList: []};
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

    render() {

        const {isFetching, articleList} = this.state;
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
                <h1>Newsletter</h1>
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
                            actions={[<span><Icon type="read" /> Lesen</span>]}
                            key={item.title}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={"Autor: " + item.author.login}
                            />
                        </List.Item>)
                    }}
                />
            </div>
        );
    }
}

export default Newsletter;
