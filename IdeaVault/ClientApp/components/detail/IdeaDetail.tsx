import * as React from 'react';
import { IIdea } from '../Dashboard';
import { Comment } from './Comment';

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
        if(!this.state.idea){
            return <h3>Loading...</h3>
        }
        return <div>

            <h1>{this.state.idea.title}</h1>

            <br/>

            <p>{this.state.idea.content}</p>

            <hr/>
            <h3>Comments</h3>
            {
                this.state.idea.comments.length == 0 ? <p><strong>No comments yet</strong></p>
            :    
                this.state.idea.comments.map(comment => {
                    return <Comment data={comment} />
                })
            }

        </div>;
    }

}
