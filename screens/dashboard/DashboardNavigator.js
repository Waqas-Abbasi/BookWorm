import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import DashboardScreen from './DashboardScreen';
import AddBookScreen from './AddBookScreen';

const BookNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    AddBook: AddBookScreen,
}, {
    initialRouteName: 'Dashboard'
});


export default createAppContainer(BookNavigator);
