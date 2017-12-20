import Record, {withDefaults} from '../lib/record';

const defaults = {
    loaded: false,
    loading: false,
    error: null,
};

class App extends Record {};

export default withDefaults(defaults)(App);
