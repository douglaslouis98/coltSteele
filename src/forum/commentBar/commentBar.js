import React from 'react';
import './CommentBar.css';

class CommentBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            barText:'',
        }
        this.updateText = this.updateText.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    updateText(e){
        this.setState({
            barText:e.target.value
        })
    }

    submitComment(){
        // pushes a new comment to Forum.state.comments
        var prevComments = this.props.Forum.state.comments;
        this.props.Forum.setState({
            comments: prevComments.concat(
                {id: prevComments.length+1, message: this.state.barText}
            )
        })
        // Forum.addComment will push a comment to firebase
        this.props.Forum.addComment(this.state.barText);
        // return barText to empty
        this.setState({
            barText:''
        })
    }
    render(){
        return(
            <div className='CommentBar'>
                <input type='text' id='CommentBar' placeholder='Write a comment'
                onChange={this.updateText} value={this.state.barText}/><br/>
                <input type="submit" value="Submit" onClick={this.submitComment}/>
            </div>
        )
    }
}

export default CommentBar;