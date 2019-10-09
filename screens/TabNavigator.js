import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DashboardNavigator from "./dashboard/DashboardNavigator";
import SearchNavigator from './explore/ExploreNavigator';


const TabNavigator = createBottomTabNavigator(
	{
		Dashboard: DashboardNavigator,
		Search: SearchNavigator,
	},
	{
		initialRouteName: 'Dashboard'
	}
);
export default createAppContainer(TabNavigator);
