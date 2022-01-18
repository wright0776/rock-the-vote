import React from 'react'

function IssueForm(props) {
    const { handleSubmit, handleChange, inputs } = props;
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input onChange={handleChange} value={inputs.title} name="title" type="text"/>
            </label>
            <label>
                Description:
                <input onChange={handleChange} value={inputs.description} name="description" type="text"/>
            </label>
            <button>Submit</button>
        </form>
    )
}

export default IssueForm
