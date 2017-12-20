import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';

class NotFoundPage extends PureComponent {
    static propTypes = {}

    render() {
        return (
            <div>
                <h1>Nothing Found</h1>
                <p>There is no such page!</p>
                <p><em>Sowwy...</em></p>
            </div>
        );
    }
}

export default NotFoundPage;
