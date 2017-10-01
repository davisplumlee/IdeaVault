import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { IIdea, IComment } from './Dashboard'
import * as moment from 'moment';

interface IIdeaState {
    showDelete: boolean;
}

interface IIdeaProps {
    idea: IIdea;
    updateFunc():any;
}

export class Idea extends React.Component<IIdeaProps, IIdeaState> {
    constructor() {
        super();
        this.state = {
            showDelete: false
        }
    }

    cancelDelete() {
        this.setState({showDelete: false})
    }

    openDelete() {
        this.setState({showDelete: true})
    }

    deleteIdea(){
        fetch('/api/idea/' + this.props.idea.id, {
            credentials: 'include',
            method: 'DELETE',
        }).then(data => {
            this.props.updateFunc();
        })
    }

    public render() {

        let deleteIcon = <a onClick={this.openDelete.bind(this)}><i className="fa fa-trash-o pull-right" aria-hidden={true} /></a>;

        return <div>
            <hr/>
            {moment(this.props.idea.date).format("MM/DD/YYYY")}{deleteIcon}
            <Row>
                <Col sm={2}>{this.props.idea.title}</Col>
                <Col sm={10}>{this.props.idea.content}</Col>   
            </Row>

            <Modal 
                show={this.state.showDelete} 
                onHide={this.cancelDelete.bind(this)}>
                <Modal.Body>
                    <h2>Are you sure?</h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="default" onClick={this.cancelDelete.bind(this)}>No, Cancel</Button>
                    <Button bsStyle="danger" onClick={this.deleteIdea.bind(this)}><strong>Yes, Delete</strong></Button>
                </Modal.Footer>
            </Modal>

        </div>;
    }

}
