import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { FormControl, FormGroup } from 'react-bootstrap';

interface IContentCellProps {
    changeFunc(value: any, type: string): any;
    type: string;
    placeholder?: string;
}

export class ContentCell extends React.Component<IContentCellProps, {}> {
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
                    placeholder={this.props.placeholder || "Description, Overview, etc."}
                    onChange={this.updateValue.bind(this)}
                    componentClass="textarea"
                    rows='6'
                />
                <FormControl.Feedback />
            </FormGroup>

        </div>;
    }

}