import React, { Component } from 'react';
import ApiConnector from "../../utils/ApiConnector";
import {List, Avatar, Icon, Skeleton} from 'antd';

class Artikel extends Component {
    constructor() {
        super();
        this.state = {article: undefined};
    }

    componentDidMount() {
        if (this.props.match.params.id !== undefined) {
            ApiConnector.getArticle(this.props.match.params.id).then((article) => {
                console.log(article);
                this.setState({article});
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.article !== undefined ? <h1>{this.state.article.title}</h1>:<Skeleton paragraph={false} active={true}/>
                }
                {
                    this.state.article !== undefined &&
                    <div className="content" dangerouslySetInnerHTML={{__html: this.state.article.content}}>

                    </div>
                }
                {
                    this.state.article === undefined &&
                    <Skeleton title={false} paragraph={{rows: 20}} active={true}/>
                }
            </div>
        );
    }
}

export default Artikel;
