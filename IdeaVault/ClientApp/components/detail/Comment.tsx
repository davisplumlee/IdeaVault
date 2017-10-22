import * as React from 'react';
import { IIdea, IComment } from '../Dashboard';
import { Button, Row, Col } from 'react-bootstrap';

interface ICommentProps {
    data: IComment;
}

export class Comment extends React.Component<ICommentProps, {}> {
    constructor() {
        super();

    }


    public render() {
        return <div>

            <Row>
                <Col sm={10}>{this.props.data.content}</Col>
                <Col sm={2}>{this.props.data.date}</Col>
            </Row>

        </div>;
    }

}
