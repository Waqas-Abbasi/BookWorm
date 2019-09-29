import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ColorConstants, ThemeConstants} from '../Constants';
import _ from 'lodash';

class BookListCard extends React.Component {

	state = {
		isBookActive: false,
	};

	//#TODO Fix Performance Issue when selecting a book
	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		//If book is currently active and the next selected book is not the same as this book,
		//then set isBookActive to false and re-render so highlight is taken off.
		if (this.state.isBookActive && !_.isEqual(nextProps.activeBook, this.props.bookData)) {
			this.setState({
				isBookActive: false,
			});
			return true;
		}
		// If book is not active, and the next selected book is this book then set isBookActive to true,
		// and re-render so it is highlighted
		else if (!this.state.isBookActive && _.isEqual(nextProps.activeBook, this.props.bookData)) {
			this.setState({
				isBookActive: true,
			});
			return true;
		}
		// Most likely case, if the book is not active and the next selected book is not this one,
		// then don't render
		else if (!this.state.isBookActive && !_.isEqual(nextProps.activeBook, this.props.bookData)) {
			return false;
		}

		return true;
	}

	selectBook = () => {
		this.props.onBookSelect(this.props.bookData);
	};

	render() {
		return (
			<TouchableOpacity onPress={this.selectBook} activeOpacity={1}>
				<View style={[styles.row, this.state.isBookActive ? styles.active : styles.notActive]}>
					<Image source={{uri: this.props.bookData.img}} style={styles.ImagePoster}/>
					<View style={styles.textContainer}>
						<Text style={styles.bookName}>{this.props.bookData.name}</Text>
						<Text style={styles.cardFont}>{this.props.bookData.author}</Text>
						<Text style={styles.cardFont}>{this.props.bookData.totalPages}</Text>
						<Text style={styles.cardFont}>{this.props.bookData.currentPage}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		width: '100%',
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 5,
		marginBottom: 10,
		...ThemeConstants.shadowElevateButtonLow,
	},
	notActive: {
		backgroundColor: 'white',
	},
	active: {
		backgroundColor: '#dedeff',
	},
	textContainer: {
		flex: 1,
		paddingLeft: 7,
	},
	ImagePoster: {
		width: 90,
		height: 100,
		borderRadius: 5,
		opacity: 0.9,
	},
	cardFont: {
		fontSize: 14,
		color: '#929ea6'
	},
	bookName: {
		fontSize: 16,
		color: '#929ea6'
	},
});
export default BookListCard;
