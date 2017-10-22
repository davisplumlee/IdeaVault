import * as React from 'react';
import { IIdea, IComment } from '../Dashboard';
import { Button, Row, Col } from 'react-bootstrap';
import * as moment from 'moment';

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
                <Col sm={2}>{moment(this.props.data.date).format("MM/DD/YYYY")}</Col>
            </Row>
            <hr/>
        </div>;
    }

}
