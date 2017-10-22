import * as React from 'react';
import { IIdea, IComment } from '../Dashboard';
import { Comment } from './Comment';
import { Button, Row, Col, Modal, FormControl, FormGroup } from 'react-bootstrap';

interface IIdeaDetailProps {
    id: string;
}

interface IIdeaDetailState {
    idea: IIdea;
    show: boolean;
    editing: string;
}

export class IdeaDetail extends React.Component<IIdeaDetailProps, IIdeaDetailState> {
    constructor() {
        super();
        this.state = {
            idea: undefined,
            show: false,
            editing: ''
        }
    }

    componentWillMount(){
        this.fetchData();
    }

    fetchData(){
        fetch('api/SampleData/'+this.props.id, {
            credentials: 'include'
        })
        .then(response => response.json() as Promise<IIdea>)
        .then(data => {
            console.log(data)
            this.setState({ idea: data });
        });
    }

    open(){
        this.setState({show: true})
    }

    cancel(){
        this.setState({show: false, editing: ''})
    }

    updateValue(e) {
        var data = e.target.value;
        this.setState({editing: data});
    }

    addComment(){
        let idea = this.state.idea
        idea.comments.push({
            date: new Date(),
            content: this.state.editing,
            id: (Math.floor(Math.random() * 1000) + '')
        })
        console.log(idea)
        this.setState({show: false, editing: '', idea: idea})

        //
        // TODO: ADD API UPDATE CALL
        //

    }


    public render() {
        let addIcon = <a onClick={this.open.bind(this)}><i className="fa fa-plus pull-right" aria-hidden={true} /></a>;
        if(!this.state.idea){
            return <h3>Loading...</h3>
        }
        return <div>

            <h1>{this.state.idea.title}</h1>

            <br/>

            <p>{this.state.idea.content}</p>

            <hr/>
            <h3>Comments{addIcon}</h3>
            {
                this.state.idea.comments.length == 0 ? <p><strong>No comments yet</strong></p>
            :    
                this.state.idea.comments.map(comment => {
                    return <Comment key={comment.id} data={comment} />
                })
            }

            <Modal 
                show={this.state.show} 
                onHide={this.cancel.bind(this)}>
                <Modal.Body>
                    <FormGroup>
                        <FormControl
                            placeholder={"Add Comment"}
                            onChange={this.updateValue.bind(this)}
                            componentClass="textarea"
                            rows='3'
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="default" onClick={this.cancel.bind(this)}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.addComment.bind(this)}><strong>Post</strong></Button>
                </Modal.Footer>
            </Modal>

        </div>;
    }

}
