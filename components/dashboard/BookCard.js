import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ColorConstants, ThemeConstants} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation'

const backgroundColor = id => {
    switch (id) {
        case 0:
            return ['#24C6DC', '#5fcfde'];
            break;
        case 1:
            return ['#0052D4', '#6FB1FC'];
            break;
        case 2:
            return ['#FF9988', '#fcc9c0'];
            break;
        case 3:
            return ['#43C6AC', '#5cd1ba', '#5cd1ba', '#43C6AC'];
            break;
        case 4:
            return ['#ff8c8d', '#ffbfc0'];
            break;
        case 5:
            return ['#cb8aff', '#e6c7ff'];

            break;
    }
};

//TODO Fix CSS when Title name increases i.e. Dynamic CSS
//TODO Fix CSS when author name increases, i.e. Dynamic CSS
const BookCard = props => {
    const bookProgress = Math.round((props.book.pagesRead / props.book.totalPages) * 100);

    const openSessionPage = () => {
      props.navigation.navigate('Sessions', {
          sessionList: props.book.sessionList
      })
    };

    return (
        <TouchableOpacity onPress={openSessionPage} activeOpacity={0.8}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.book.img.uri}} resizeMode='cover'/>
                </View>
                <View style={styles.shadow}>
                    <LinearGradient colors={backgroundColor(props.colorID)} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.cardContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.titleView}>
                                <Text style={[styles.cardText, styles.largeText]}>{props.book.title}</Text>
                                <Text style={[styles.cardText, styles.mediumText]}>{props.book.author}</Text>
                            </View>
                            <View style={styles.bookProgress}>
                                <View>
                                    <Text style={styles.bookProgressTitle}>Pages Read</Text>
                                    <Text style={[styles.cardText, styles.mediumText]}>{props.book.pagesRead}</Text>
                                </View>
                                <View style={styles.bookProgressSub}>
                                    <Text style={styles.bookProgressTitle}>Book Progress</Text>
                                    <Text style={[styles.cardText, styles.mediumText]}>{bookProgress + '%'}</Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ColorConstants.cardboard,
    },
    cardContainer: {
        marginRight: Dimensions.get('window').width - Dimensions.get('window').width / 1.15,
        height: 165,
        paddingTop: 10,
        paddingBottom: 10,
        width: Dimensions.get('window').width / 1.15,
        flexDirection: 'row',
        borderRadius: 7,
    },
    titleView: {
        height: 70,
    },
    imageContainer: {
        zIndex: 1,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        marginRight: Dimensions.get('window').width - Dimensions.get('window').width / 1.15,
        height: 165,
        borderRadius: 7,
        width: Dimensions.get('window').width / 1.15,
        backgroundColor: ColorConstants.cardboard,
        ...ThemeConstants.shadowElevateButton
    },
    image: {
        position: 'absolute',
        right: -70,
        width: 110,
        height: 145,
        borderRadius: 7,
        ...ThemeConstants.imageShadow,
    },
    textContainer: {
        paddingLeft: 80,
    },
    cardText: {
        fontWeight: '500',
        color: 'white',
    },
    largeText: {
        fontSize: 21,
        marginBottom: 5,
    },
    mediumText: {
        fontSize: 16,
    },
    bookProgress: {
        marginTop: 10,
        flexDirection: 'row',
    },
    bookProgressTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#e8e8e8',
        marginBottom: 5
    },
    bookProgressSub: {
        paddingLeft: 10,
    }
});

export default withNavigation(BookCard);
