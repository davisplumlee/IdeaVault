import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { FormControl, FormGroup } from 'react-bootstrap';

interface ITitleCellProps {
    changeFunc(value: any, type: string): any;
    type: string
}

export class TitleCell extends React.Component<ITitleCellProps, {}> {
    constructor() {
        super();
    }

    updateValue(e) {
        let { type } = this.props;
        this.props.changeFunc(e.target.value, type);
    }

    public render() {

        return <div>

            <FormGroup>
                <FormControl
                    type="text"
                    placeholder="New Idea"
                    onChange={this.updateValue.bind(this)}
                />
                <FormControl.Feedback />
            </FormGroup>

        </div>;
    }

}
