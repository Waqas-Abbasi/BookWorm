import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import DashboardScreen from './DashboardScreen';
import AddBookScreen from './AddBookScreen';
import AddCustomBookScreen from './AddCustomBookScreen';
import SessionScreen from './SessionScreen';
import AddSessionScreen from './AddSessionScreen';

const BookNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    AddBook: AddBookScreen,
    AddCustomBook: AddCustomBookScreen,
    Sessions: SessionScreen,
    AddSession: AddSessionScreen,
}, {
    // initialRouteName: 'Dashboard'
    initialRouteName: 'AddSession'
});

export default createAppContainer(BookNavigator);
