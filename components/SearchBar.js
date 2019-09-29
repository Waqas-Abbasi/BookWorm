import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {ColorConstants, ThemeConstants} from '../Constants';
import {Icon} from 'react-native-elements';

class SearchBar extends React.Component {

	constructor(props) {
		super(props);

		styles.textInputContainer = {
			...styles.textInputContainer,
			...this.props.customStyle
		}

	}

	textInputHandler = text => {
		this.props.handleValueChange(text);
	};


	render() {
		return (
			<View style={styles.textInputContainer}>
				<TextInput
					value={this.props.value}
					onChangeText={text => this.textInputHandler(text)}
					style={styles.textInput}
					placeholder="Search Book"/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textInputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: ColorConstants.borderColor,
		flexDirection: 'row',
		backgroundColor: 'white',
		...ThemeConstants.shadowElevateButtonLow,
		borderRadius: 8,
		padding: 5,
	},
	searchIcon: {
		flex: 1,
	},
	textInput: {
		flex: 1,
		paddingStart: 10,
		width: ThemeConstants.windowWidth,
		backgroundColor: 'white',
		height: 25,
	}
});

export default SearchBar;
