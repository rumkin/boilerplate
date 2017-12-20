import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Segment, Dimmer, Loader} from 'semantic-ui-react';

import './style.css';

class Shield extends PureComponent {
    static propTypes = {};

    static propTypes = {
        stateProp: PropTypes.string.isRequired,
        initAction: PropTypes.func.isRequired,
    };

    static contextTypes = {
        store: PropTypes.object,
    }

    componentWillMount() {
        const {store} = this.context;

        this.page = store.getState()[this.props.stateProp];

        this.unsubscribe = store.subscribe(() => {
            const nextPage = store.getState()[this.props.stateProp];

            if (this.page !== nextPage) {
                this.page = nextPage;
                this.forceUpdate();
            }
        });

        store.dispatch(this.props.initAction());
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.unsubscribe = null;
    }

    renderLoading() {
        return (
            <Segment style={{minHeight: '100%'}}>
                <Dimmer active inverted>
                    <Loader indeterminate size='big'>
                        Loading...
                    </Loader>
                </Dimmer>
            </Segment>
        );
    }

    renderError() {
        const {error} = this.page;

        return (
            <Segment style={{minHeight: '100%'}}>
                <h1>Error</h1>
                <p>{error.message}</p>
            </Segment>
        );
    }

    render() {
        const {page} = this;

        if (page.loading) {
            return this.renderLoading();
        }
        else if (page.error) {
            return this.renderError();
        }
        else if (! page.loaded) {
            return null; // Unknown state...
        }
        else {
            return this.props.children;
        }
    }
}

export default Shield;

export const withShield = (stateProp, initAction) => (Wrapped) => (props) => (
    <Shield stateProp={stateProp} initAction={initAction}>
        <Wrapped {...props} />
    </Shield>
);
