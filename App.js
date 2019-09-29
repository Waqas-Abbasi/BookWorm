import React from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import MainNavigator from './screens/TabNavigator';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
        );
    }
}

export default App;
