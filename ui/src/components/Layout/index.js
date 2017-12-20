import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Layout extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
    }

    render() {
        const {children} = this.props;
        return (
            <div className='Layout'>
                {children}
            </div>
        );
    }
}

export default Layout;
