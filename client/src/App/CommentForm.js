import React from 'react'

function CommentForm(props) {
    const { handleSubmit, handleChange, inputs } = props;
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Comment:
                <textarea onChange={handleChange} value={inputs.text} name="text" type="text"/>
            </label>
            <button>Submit</button>
        </form>
    )
}

export default CommentForm