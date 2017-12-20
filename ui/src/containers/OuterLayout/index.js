import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withRouter, Link} from 'react-router-dom';
import Layout from '../../components/Layout';

import './style.css';

function mapToProps(state) {
    return {};
}

function dispatchToProps(dispatch) {
    return {};
}

class OuterLayout extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
    };

    render() {
        const {children} = this.props;

        return (
            <Layout>
                <header className="OuterLayout-Header">
                    AppHeader goes here
                </header>
                <main className="OuterLayout-Main">{children}</main>
                <footer className="OuterLayout-Footer">
                    &copy; CrypoDoc, 2017
                </footer>
            </Layout>
        );
    }
}

export default withRouter(connect(mapToProps, dispatchToProps)(OuterLayout));
