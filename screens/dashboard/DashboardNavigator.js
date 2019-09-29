import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import DashboardScreen from './DashboardScreen';
import AddBookScreen from './AddBookScreen';
import AddCustomBookScreen from './AddCustomBookScreen';

const BookNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    AddBook: AddBookScreen,
    AddCustomBook: AddCustomBookScreen,
}, {
    initialRouteName: 'AddCustomBook'
});


export default createAppContainer(BookNavigator);
