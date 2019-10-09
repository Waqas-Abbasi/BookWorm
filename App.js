import React, {useEffect} from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';
import OpeningNavigator from './screens/OpeningNavigator';
import NavigationService from './api/NavigationService';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = props => {

    return (
        <Provider store={store}>
            <OpeningNavigator
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        </Provider>
    );

};

export default App;
