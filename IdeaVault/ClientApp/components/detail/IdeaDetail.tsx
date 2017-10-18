import * as React from 'react';
import { IIdea } from '../Dashboard';

interface IIdeaDetailProps {
    id: string;
}

interface IIdeaDetailState {
    idea: IIdea
}

export class IdeaDetail extends React.Component<IIdeaDetailProps, IIdeaDetailState> {
    constructor() {
        super();
        this.state = {
            idea: undefined
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


    public render() {
        return <div>

            

        </div>;
    }

}
