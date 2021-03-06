import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { IIdea, IComment } from './Dashboard';
import { Link } from 'react-router-dom';
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
        let commentIcon = <span style={{padding: '0.3em'}}><i className="fa fa-comments" aria-hidden={true} /></span>;
        return <div>
            <hr/>
            <em>{moment(this.props.idea.date).format("MM/DD/YYYY")}</em>{deleteIcon}
            <Row>
                <Col sm={2}><Link to={"/idea?id=" + this.props.idea.id}><a style={{cursor: 'pointer'}}><strong>{this.props.idea.title}</strong></a></Link></Col>
                <Col sm={9}>{this.props.idea.content}</Col>
                <Col sm={1}><Link to={"/idea?id=" + this.props.idea.id}><a style={{cursor: 'pointer'}}>{this.props.idea.comments.length}{commentIcon}</a></Link></Col>
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
