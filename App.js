import React, {useEffect} from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';
import OpeningNavigator from './screens/OpeningNavigator';
import {AccessToken} from 'react-native-fbsdk';


YellowBox.ignoreWarnings(['Remote debugger']);

const App = props => {
    return (
        <Provider store={store}>
            <OpeningNavigator/>
        </Provider>
    );

};

export default App;
