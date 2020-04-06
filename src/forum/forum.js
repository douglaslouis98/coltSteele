import React from 'react'
import CommentBar from './commentBar/commentBar'
import Comment from './comments/Comment'
import  app from '../config/Config'
import 'firebase/database';
import './forum.css'

class Forum extends React.Component{
    // forum class which will hold Comment and commentBar components
    // comments are generated in render method from this.state.comments
    constructor(props){
        super(props);
        // set up firebase variables
        this.database = app.database();
        this.ref = this.database.ref('comments');
        //set state variables
        this.state = {
            //set comments empty initially
            comments:[],
        }
        // bind class functions
        this.myButtonPressed = this.myButtonPressed.bind(this);
        this.addComment = this.addComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
    }

    async componentWillMount(){
        // defines what should happen to firebase data just once
        const firebaseComments = await this.ref.once('value')
        .then(function(snapshot){
            console.log('datasnapshot :', snapshot.val())
            var dataToReturn = [];
            var obj = snapshot.val();
            var keys = Object.keys(obj);
            console.log('keys',keys);
            for (var key of keys){
                dataToReturn.push({
                    id: obj[key].id, message: obj[key].message,
                    key:key
                });
            }
            return dataToReturn;
        });

        this.setState({
            comments: firebaseComments
        })
        console.log(this.state.comments);
        console.log('mounting');
    }


    addComment(message){
        // This is called after a new comment has benn added to state from 
        // the CommentBar component
        //push a comment to firebase after it has been pushed to state
        this.ref.push({
            id:this.state.comments.length+1,
            message: message
        })
    }

    myButtonPressed(){
        //add a comment but don't push to firebase
        this.setState({
            comments:this.state.comments.concat({id:'me', message:'greetings'})
        });
    }

    removeComment(id){
        console.log('removing comment id '+id);
        var prevcomments = this.state.comments;
        for (var i = 0; i < prevcomments.length; i++){
            if (prevcomments[i].id === id){
                console.log('found comment');
                this.ref.child(prevcomments[i].key).remove();
                prevcomments.splice(i,1);
            }
        }
        console.log(prevcomments);
        this.setState({
            comments: prevcomments
        });
        console.log(this.state.comments);
    }

    render(){
        if (!this.state.comments.length){
            return(
                <div className='Forum'>
                    <CommentBar Forum={this}/>
                    <button onClick = {this.myButtonPressed}></button>
                </div>
                );
        }
        else{
            return(
                
            <div className='Forum'>
                <CommentBar Forum={this}/>
                {
                this.state.comments.map((comment)=>{
                    return(
                        <Comment Forum={this} key={comment.key} id={comment.id} commentText={comment.message}/>
                    );
                }, this)
                }
                <button onClick={this.myButtonPressed}></button>
            </div>
            );
        }
    }
}

export default Forum;