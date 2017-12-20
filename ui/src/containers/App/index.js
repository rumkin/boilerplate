import React, {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

import './style.css';

// Service pages
import NotFoundPage from '../../components/NotFoundPage';

// Other
import InnerLayout from '../InnerLayout';
import OuterLayout from '../OuterLayout';

import {getApp} from '../../store/App/selectors';
import {history} from '../../store.js';
import * as routes from '../../routes.js';

function mapToProps(state) {
    return {
        app: getApp(state),
    };
}

class App extends PureComponent {
    static propTypes = {
        app: PropTypes.object,
    }

    render() {
        const {
            app,
        } = this.props;

        if (! app.loaded) {
            return this.renderLoading();
        }
        else if (app.error) {
            return this.renderError();
        }
        else {
            return this.renderLoaded();
        }
    }

    renderLoading() {
        return (
            <div className='App'>
                Loading...
            </div>
        );
    }

    renderError() {
        return (
            <div className='App'>
                Oooops! Looks like something bad happened! :(
            </div>
        );
    }

    renderLoaded() {
        const {app} = this.props;

        return (
            <ConnectedRouter history={history}>
                <div className='App'>
                    {app.actor ? this.renderAuth() : this.renderUnauth()}
                </div>
            </ConnectedRouter>
        );
    }

    renderUnauth() {
        return (
            <OuterLayout>
                {this.renderRoutes()}
            </OuterLayout>
        );
    }

    renderAuth() {
        return (
            <InnerLayout>
                {this.renderRoutes()}
            </InnerLayout>
        );
    }

    renderRoutes() {
        return (
            <Switch>
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}

export default connect(mapToProps)(App);
