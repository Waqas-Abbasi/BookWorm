import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DashboardNavigator from "./dashboard/DashboardNavigator";
import ExploreNavigator from './explore/ExploreNavigator';


const TabNavigator = createBottomTabNavigator(
	{
		Dashboard: DashboardNavigator,
		Explore: ExploreNavigator,
	},
	{
		initialRouteName: 'Dashboard'
	}
);
export default createAppContainer(TabNavigator);
