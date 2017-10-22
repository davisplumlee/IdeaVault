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
        var idea = this.state.idea
        return <div>

            <h1>{idea.title}</h1>
            <br/>

            <h4>{idea.content}</h4>

            <hr/>
            <h3>Comments</h3>
            {idea.comments.length == 0 ? <h5>No comments yet</h5>
            :    
                idea.comments.map(comment => {
                    return <Comment data={comment} />
                })
            }

        </div>;
    }

}
