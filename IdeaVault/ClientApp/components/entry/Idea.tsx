import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Button, Row, Col } from 'react-bootstrap';
import { IIdea } from '../Dashboard';
import { TitleCell } from './resources/TitleCell';
import { ContentCell } from './resources/ContentCell';
import { Redirect } from 'react-router-dom';

interface IIdeaState {
    editing: IdeaEdit;
    redirect: boolean;
    disable: boolean;
}

interface IdeaEdit {
    title: string;
    content: string;
}

export class Idea extends React.Component<RouteComponentProps<{}>, IIdeaState> {
    constructor() {
        super();
        this.state = {
            editing: {
                title: '',
                content: ''
            },
            redirect: false,
            disable: false
        }
    }

    // CHANGED FOR LOCAL DEVEOPMENT *****************
    postData(){
        this.setState({disable: true})
        fetch('/api/SampleData/add', {
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({
                title: this.state.editing.title,
                content: this.state.editing.content,
                date: new Date(),
                comments: []
            })
        }).then(data => {
            this.setState({redirect: true})
        })
        
    }

    handleChange(value, type){
        let {state} = this;
        state.editing[type] = value;
        this.setState(state);
    }

    public render() {
        let disabled = this.state.disable;
        if (this.state.redirect) {
            return <Redirect push to={"/"} />;
        }
        return <div>

            <h2 style={ {padding: '0.5em 0.0em'} }>New Idea</h2>

            <Row>
                <Col sm={4}>
                    <TitleCell type="title" changeFunc={this.handleChange.bind(this)}/>
                </Col>
            </Row>
            <br/>
            <ContentCell type="content" changeFunc={this.handleChange.bind(this)}/>

            <Button disabled={this.state.editing.title == '' || this.state.editing.content == '' || disabled} bsStyle="primary" onClick={this.postData.bind(this)}>Add Idea</Button>

        </div>;
    }

}
