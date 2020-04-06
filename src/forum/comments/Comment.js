import React from 'react';
import './Comment.css';


class Comment extends React.Component{
    constructor(props){
        
        super(props);
        this.state = {
            // commentText is generated from Forum.state.comments
            commentText:this.props.commentText
        }
        this.handleRemoveComment=this.handleRemoveComment.bind(this);
    }

    handleRemoveComment(){
        //console.log(this.props.Forum);
        this.props.Forum.removeComment(this.props.id);
    }

    render(){
        return(
            <div className='Comment'>
                <span className='removebtn' onClick={this.handleRemoveComment}>&times;</span>
                <p>{this.state.commentText}</p>
            </div>
        )
    }
}

export default Comment;