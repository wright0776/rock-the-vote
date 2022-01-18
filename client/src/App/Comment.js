import React from 'react'

function Comment(props) {
    const {comment} = props;
    console.log(props)
    return (
        <div className='comment'>
            <p>comment:{comment}</p>
        </div>
    )
}

export default Comment
