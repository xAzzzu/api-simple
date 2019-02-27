import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { List, Avatar, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        title: `Artikel ${i}`,
        description: 'Author',
        content: 'Numquam pariatur perferendis quaerat quas quia ratione reiciendis repellendus reprehenderit rerum saepe sit tempore totam veritatis vero voluptate. Ab eius, quos? Accusantium aliquid eaque, esse fuga itaque laborum maiores nostrum quaerat, repudiandae sapiente sequi suscipit tenetur veritatis voluptate voluptatem. Accusamus, commodi corporis cupiditate ducimus exercitationem ullam!',
    });
}

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);


class Newsletter extends Component {
    render() {
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
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Newsletter;
