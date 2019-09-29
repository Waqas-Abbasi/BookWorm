import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import DashboardScreen from './DashboardScreen';

const BookNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
}, {
    initialRouteName: 'Dashboard'
});


export default createAppContainer(BookNavigator);
