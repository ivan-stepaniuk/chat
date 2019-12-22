import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {animateScroll} from "react-scroll";
import moment from "moment";

import Header from "./Header";
import {db} from "./index.js";
class History extends React.Component {
    constructor(props) {
        super(props);

        this.getMessages().then(messages => {
            this.setState({messages: messages.reverse()});
        });
        const authorized = window.localStorage.getItem('authorized');

        if (!authorized) {
            window.location.href = '/login';
        }

        this.state = {
            messages: [],
            userName: window.localStorage.getItem('name'),
            authorized: window.localStorage.getItem('authorized'),
        };
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "messages-block"
        });
    }

    getMessages() {
        return db.collection('messages').orderBy("date", "desc").get().then((postObj) => {
            return postObj.docs.map(doc => {
                return doc.data()
            })
        });
    }

    render() {
        const messages = this.state.messages;

        return (
            <div>
                <Header userName={this.state.userName} authorized={this.state.authorized} title={'History'}/>

                <List id="messages-block" className='messages-block history'>
                    {
                        messages.map(message => {
                            return (<ListItem>
                                    <span>
                                    </span>
                                    <ListItemText
                                        primary={message.message}
                                        secondary={`by ${(message.name || 'anonymous')}  ${moment(message.date).fromNow()}`}
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default History