import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIssues } from '../redux/issues';

// header/footer
import Header from './Header';
import Footer from './Footer';

// body
import IssuesList from './IssuesList';

class App extends Component {
    componentDidMount() {
        this.props.getIssues();
    }

    render() {
        return (
            <div className='app'>
                <Header />
                <IssuesList {...this.props.issues} />
                <Footer />
            </div>
        )
    }

}

export default connect(state => state, { getIssues })(App);
