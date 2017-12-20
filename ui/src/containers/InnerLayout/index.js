import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Button} from 'semantic-ui-react';
import {withRouter, Link} from 'react-router-dom';

import Layout from '../../components/Layout';
import * as actions from '../../store/App/actions';

import './style.css';

function mapToProps(state) {
    return {};
}

function dispatchToProps(dispatch) {
    return {
        signOut() {
            dispatch(actions.signOut());
        },
    };
}

class InnerLayout extends PureComponent {
    static propTypes = {
        signOut: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
    };

    render() {
        const {children, signOut} = this.props;

        return (
            <Layout>
                <header className="InnerLayout-Header">
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <Link to='/' className='InnerLayout-BrandName'>
                                    <h2>App</h2>
                                </Link>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column textAlign='right'>
                                <Button
                                    icon='sign out'
                                    content='Sign Out'
                                    secondary
                                    onClick={signOut}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </header>
                <main className="InnerLayout-Main">{children}</main>
                <footer className="InnerLayout-Footer">
                    &copy; App, 2017
                </footer>
            </Layout>
        );
    }
}

export default withRouter(connect(mapToProps, dispatchToProps)(InnerLayout));
