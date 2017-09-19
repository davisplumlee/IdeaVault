import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IDashboardState {
    idea: IIdea;
}

interface IIdea {
    id: string;
    content: string;
    comments: Array<IComment>;
    date: Date;
}

interface IComment {
    content: string;
    id: string;
    date: Date;
}

export class Dashboard extends React.Component<RouteComponentProps<{}>, IDashboardState> {
    constructor() {
        super();
        this.state = {
            idea: undefined
        }
    }

    public render() {

        if (!this.state.idea) { 
            return <div> 
                Loading... 
                <button onClick={ () => { this.fetchData() } }>Fetch</button>
            </div>

        };

        return <div>

            <button onClick={ () => { this.fetchData() } }>Fetch</button>
    
            <h3> { this.state.idea.content }</h3>

            {
                this.state.idea.comments.map(c => {
                    return <p key={c.id}> {c.content} </p>
                })
            }

        </div>;
    }

    fetchData() {
        fetch('/api/idea', {
            credentials: 'include'
        })
        .then(response => response.json() as Promise<IIdea>)
        .then(data => {
            this.setState({ idea: data });
        });
    }

    
}
