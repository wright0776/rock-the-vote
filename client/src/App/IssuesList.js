import React from 'react';
// shared
import Loading from './shared/Loading';
import ErrorHandler from './shared/ErrorHandler';
import SortedDataList from './shared/SortedDataList';
import Form from './shared/Form';
import Toggler from './shared/Toggler';
// components
import Issue from './Issue';
import IssueForm from './IssueForm';
// redux
import { connect } from 'react-redux';
import { addIssue } from '../redux/issues';

function IssuesList(props) {
    const { loading, errMsg, data, addIssue } = props;
    return (
        <div className='issuesListCont'>
            <Loading loading={loading} render={() => <div>...Loading</div>}>
                <ErrorHandler errMsg={errMsg} render={props => <div>Error {props.code}: {props.msg}</div>}>
                    {data.length < 1 && <p>There are no issues</p>}
                    <SortedDataList data={data} className='issuesList' render={props => <Issue {...props} />} />
                </ErrorHandler>
            </Loading>
            <Toggler render={({ toggle, isToggled }) =>
                <div>
                    <button onClick={toggle}>Add New Issue</button>
                    {isToggled && <Form
                        inputs={{ title: "", description: "", votes: 0, comments: [] }}
                        submit={inputs => {
                            addIssue(inputs);
                            toggle()
                        }}
                        render={props => <IssueForm {...props} />}
                    />}
                </div>
            }>
            </Toggler>
        </div>
    )
}

export default connect(state => state, { addIssue })(IssuesList)
