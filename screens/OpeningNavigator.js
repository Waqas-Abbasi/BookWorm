import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreen';
import TabNavigator from './TabNavigator';

const OpeningNavigator = createStackNavigator({
    LoginScreen: LoginScreen,
    MainApp: TabNavigator
}, {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});


export default createAppContainer(OpeningNavigator);
