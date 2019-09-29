import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import DashboardNavigator from "./dashboard/DashboardNavigator";


const TabNavigator = createBottomTabNavigator(
	{
		Dashboard: DashboardNavigator,
	},
	{
		initialRouteName: 'Dashboard'
	}
);
export default createAppContainer(TabNavigator);
