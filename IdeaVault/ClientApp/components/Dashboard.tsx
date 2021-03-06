import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Button, Row, Col } from 'react-bootstrap';
import { Idea } from './Idea'

interface IDashboardState {
    ideas: Array<IIdea>;
    editingContent: string;
}

export interface IIdea {
    id: string;
    content: string;
    comments: Array<IComment>;
    date: Date;
    title: string;
}

export interface IComment {
    content: string;
    id: string;
    date: Date;
}

export class Dashboard extends React.Component<RouteComponentProps<{}>, IDashboardState> {
    constructor() {
        super();
        this.state = {
            ideas: undefined,
            editingContent: ''
        }
    }

    componentWillMount(){
        this.fetchData();
    }

    // CHANGED FOR LOCAL DEVEOPMENT *****************
    postData(){
        fetch('api/SampleData/add', {
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({
                content: this.state.editingContent,
                date: new Date(),
                comments: []
            })
        }).then(data => {
            this.setState({editingContent: ''});
            this.fetchData();
        })
        
    }

    // CHANGED FOR LOCAL DEVEOPMENT *****************
    fetchData(){
        fetch('api/SampleData', {
            credentials: 'include'
        })
        .then(response => response.json() as Promise<IIdea[]>)
        .then(data => {
            console.log(data)
            this.setState({ ideas: data });
        });
    }

    // deleteIdea(id){
    //     fetch('/api/idea/' + id, {
    //         credentials: 'include',
    //         method: 'DELETE',
    //     }).then(data => {
    //         this.fetchData();
    //     })
    // }

    handleChange(e){
        this.setState({ editingContent: e.target.value})
    }

    public render() {

        let plus = <i className="fa fa-plus" aria-hidden={true} />;

        if (!this.state.ideas) { 
            return <h2>Loading...</h2>
        };

        return <div>

            {
                (this.state.ideas.length == 0) ? 
                    <h2>No Ideas Yet</h2>
                : 
                    <h2 style={ {padding: '0.5em 0.0em'} }>Ideas</h2>
            }

            <ButtonToolbar>
                <Link to={"/add"}>
                    <Button bsStyle="default">
                        {plus} {" "} Idea
                    </Button>
                </Link>
            </ButtonToolbar>
            <br/>
            <Row>
                <div className="tableHeader">
                    <Col sm={2}><strong>Title</strong></Col>
                    <Col sm={8}><strong>Description</strong></Col>
                    <Col sm={2}><strong>Comments</strong></Col>
                </div>
            </Row>

            {   
                this.state.ideas.map(idea => {
                    return <Idea key={idea.id} updateFunc={this.fetchData.bind(this)} idea={idea}/>
                })
            }

            {/* <form>
                <input type="text" placeholder="New Idea" value={this.state.editingContent} onChange={this.handleChange.bind(this)} />
                <Button bsStyle="primary" onClick={this.postData.bind(this)}>Add Idea</Button>
            </form>

            <br/>
    
            {   
                this.state.ideas.map(idea => {
                    return <div key={idea.id}>
                        <h3>{ idea.content } <a onClick={this.deleteIdea.bind(this, idea.id)}>Delete</a></h3>
                        {
                            (idea.comments.length != 0) ? (
                                idea.comments.map(c => {
                                    return <p key={c.id}> {c.content} </p>
                                })
                            ) : (
                                <div />
                            )
                        }
                    </div>
                })
            } */}

        </div>;
    }

}
