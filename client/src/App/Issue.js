import React from 'react'
// shared
import Form from './shared/Form';
import Toggler from './shared/Toggler';
// components
import CommentForm from './CommentForm';
// redux
import { connect } from 'react-redux';
import { addComment, deleteIssue, editIssue } from '../redux/issues';

function Issue(props) {
    const { title, description, votes, comments, _id, deleteIssue, editIssue, addComment } = props;
    return (
        <div className='issue'>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{votes}</p>
            <button onClick={() => editIssue(_id, { votes: (votes + 1) })} className='upvote'>Upvote +</button>
            <button onClick={() => editIssue(_id, { votes: (votes - 1) })} className='downvote'>Downvote -</button>
            {/* <DataList data={comments} className='commentsList' render={props => <Comment comment={props} />} /> */}
            {comments.map((comment, i) => <p key={i}>{comment.text}</p>)}
            <Toggler render={({ toggle, isToggled }) =>
                <div>
                    <Toggler render={({ toggle, isToggled }) =>
                        <div className='menuButton'>
                            <button onClick={toggle}>☰</button>
                            {isToggled && <div>
                                <button>Edit</button>
                                <button onClick={() => deleteIssue(_id)}>Delete</button>
                            </div>}
                        </div>
                    } />

                    {isToggled ?
                        <div className='toggleComment'>
                            <Form
                                resetInputs
                                inputs={{ text: "" }}
                                submit={inputs => addComment(_id, inputs)}
                                render={props => <CommentForm {...props} />} />
                            <button onClick={toggle}>&times;</button>
                        </div>
                        : <button onClick={toggle} className='commentButton'>Comment on this post</button>}
                </div>
            } />
        </div>
    )
}

export default connect(state => state, { addComment, deleteIssue, editIssue })(Issue)
