import axios from 'axios';

const initialState = {
    data: [],
    loading: true,
    errMsg: "",
    currentIssue: {},
    currentLoading: true,
    currentErrMsg: "",
}

const issuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        case "GET_ISSUES":
            return {
                ...state,
                data: action.issues,
                loading: false
            }
        case "ADD_ISSUE":
            return {
                ...state,
                data: [...state.data, action.issue],
                loading: false
            }
        case "GET_ISSUE":
            return {
                ...state,
                currentIssue: action.issue,
                loading: false
            }
        case "EDIT_ISSUE":
            return {
                ...state,
                data: state.data.map(issue => action.id === issue._id ? action.issue : issue),
                loading: false
            }
        case "ADD_COMMENT":
            return {
                ...state,
                data: state.data.map(issue => {
                   if(action.id === issue._id) {
                       const updatedIssue = {...issue};
                       updatedIssue.comments = action.comments;
                       return updatedIssue;
                   }
                   return issue;
                }),
                loading: false
            }
        case "DELETE_ISSUE":
            return {
                ...state,
                data: state.data.filter(issue => action.id !== issue._id),
                loading: false
            }
        default:
            return state;
    }
}

export const getIssues = () => {
    return dispatch => {
        axios.get("/api/issues")
            .then(response => {
                dispatch({
                    type: "GET_ISSUES",
                    issues: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: 'Sorry, issues are not available.'
                })
            })
    }
}

export const addIssue = (newIssue) => {
    return dispatch => {
        axios.post("/api/issues", newIssue)
            .then(response => {
                dispatch({
                    type: "ADD_ISSUE",
                    issue: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't post new issue right now."
                })
            })
    }
}

export const getIssue = (id) => {
    return dispatch => {
        axios.get("/api/issues/" + id)
            .then(response => {
                dispatch({
                    type: "GET_ISSUE",
                    issue: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't get issue right now."
                })
            })
    }
}

export const editIssue = (id, newIssue) => {
    return dispatch => {
        axios.put("/api/issues/" + id, newIssue)
            .then(response => {
                dispatch({
                    type: "EDIT_ISSUE",
                    issue: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't edit issue right now."
                })
            })
    }
}
export const addComment = (id, comment) => {
    return dispatch => {
        axios.put("/api/issues/" + id + "/add-comment", comment)
            .then(response => {
                dispatch({
                    type: "ADD_COMMENT",
                    comments: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't edit issue right now."
                })
            })
    }
}



export const deleteIssue = (id) => {
    return dispatch => {
        axios.delete("/api/issues/" + id)
            .then(response => {
                dispatch({
                    type: "DELETE_ISSUE",
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry, can't delete issue right now."
                })
            })
    }
}

export default issuesReducer;