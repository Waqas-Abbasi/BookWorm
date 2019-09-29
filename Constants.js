import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const ColorConstants = {
	primary: '#9795f0',
	primaryGradient: '#fbc8d4',
	borderColor: 'silver',
	cardboard: '#F9FAFB',
	// cardboard: '#f5f5f5',
	cardBoardSecondary: '#f5f5f5',
	cardboardDark: '#b6b6b6',
	Danger: '#ff0000',
	button: '#007AFF',
};

export const StringConstants = {
	SCHEDULE_NOTIFICATIONS: 'SCHEDULE_NOTIFICATIONS',
};

export const ThemeConstants = {
	shadowElevateButton: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
	},
	imageShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
	},
	shadowElevateButtonLow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	shadowElevateButtonExtremeLow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,
	},
	windowWidth: Dimensions.get('window').width / 1.08,
	cardRadius: 5,
	BottomMenu: {
		modal: {
			flex: 1,
			width: Dimensions.get('window').width,
			position: 'absolute',
			bottom: 0,
			margin: 0,
			alignItems: 'center',
			marginBottom: getStatusBarHeight() - 15,
		},
		modalViewContainer: {
			flex: 1,
			width: Dimensions.get('window').width / 1.08,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
			borderRadius: 7,
		},
		innerModalButtonContainer: {
			width: Dimensions.get('window').width / 1.08,
			justifyContent: 'center',
			alignItems: 'center',
		},
		bottomButtonButton: {
			borderBottomWidth: 0,
		},
		modalButton: {
			height: 60,
			backgroundColor: 'white',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			borderRadius: 7,
		},
		modalButtonBorder: {
			borderBottomWidth: 0.3,
			borderBottomColor: ColorConstants.borderColor,
		},
		cancelModalView: {
			flex: 1,
			borderRadius: 7,
			backgroundColor: 'white',
			width: Dimensions.get('window').width / 1.08,
			marginTop: 7,
		},
		cancelModalText: {
			fontSize: 18,
			color: ColorConstants.button,
		},
		modalHeaderTitleView: {
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			borderBottomWidth: 0.3,
			borderBottomColor: 'silver',
			height: 40,
		},
		modalText: {
			padding: 10,
			fontSize: 18,
			textAlign: 'center',
			color: ColorConstants.button,
		},
		modalDangerText: {
			padding: 10,
			fontSize: 17,
			textAlign: 'center',
			color: ColorConstants.Danger,
		},
		modalHeaderTitleText: {
			fontSize: 13,
			color: 'gray',
		},
	},
};

export const DaysOfWeek = [
	{
		day: 'Sunday',
		value: 'Every Sunday',
		short: 'Sun'
	},
	{
		day: 'Monday',
		value: 'Every Monday',
		short: 'Mon',
	},
	{
		day: 'Tuesday',
		value: 'Every Tuesday',
		short: 'Tue'
	},
	{
		day: 'Wednesday',
		value: 'Every Wednesday',
		short: 'Wed'
	},
	{
		day: 'Thursday',
		value: 'Every Thursday',
		short: 'Thu'
	},
	{
		day: 'Friday',
		value: 'Every Friday',
		short: 'Fri'
	},
	{
		day: 'Saturday',
		value: 'Every Saturday',
		short: 'Sat'
	},
];
