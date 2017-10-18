import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IdeaDetail } from './IdeaDetail';


interface IEntryState {
    id: string;
}

export class Entry extends React.Component<RouteComponentProps<{}>, IEntryState> {
    constructor() {
        super();
        this.state = {
            id: undefined
        }
    }

    componentWillMount() {
        let search = window.location.search;
        search = search.replace("?", "");
        let args = search.split('&');
        let newState = {}
        args.forEach(a => {
            let splitArg = a.split('=');
            newState[splitArg[0]] = splitArg[1];
        });
        this.setState(newState);
    }

    public render() {
        return (
            <div>
                <IdeaDetail id={this.state.id}/>
            </div>
        )
    }
}
