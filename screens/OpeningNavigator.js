import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreen';
import TabNavigator from './TabNavigator';
import AuthLoadingScreen from './AuthLoadingScreen';

const OpeningNavigator = createSwitchNavigator({
    MainApp: TabNavigator,
}, {
    //TODO Reset
    initialRouteName: 'MainApp',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});


export default createAppContainer(OpeningNavigator);
