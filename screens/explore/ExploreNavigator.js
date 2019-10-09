import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import ExploreScreen from './ExploreScreen';

const SearchNavigator = createStackNavigator({
    Explore: ExploreScreen,
}, {
    initialRouteName: 'Explore'
});


export default createAppContainer(SearchNavigator);
