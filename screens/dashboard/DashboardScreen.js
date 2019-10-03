import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BookCard from '../../components/dashboard/BookCard';
import {connect} from 'react-redux';
import {ColorConstants} from '../../Constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SearchBar from '../../components/SearchBar';
import {Icon} from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';

//TODO Add Skeleton Loading for Assets
const DashboardScreen = props => {

    const [searchValue, handleSearchValue] = useState('');
    const [slideSearchBarAnim] = useState(new Animated.Value(0));
    const [bookList, setBookList] = useState(props.books);

    //TODO Maybe make the search more advanced?
    useEffect(() => {
        setBookList(props.books.filter(item => item.title.indexOf(searchValue) !== -1));
    }, [searchValue]);

    const openSearchBar = () => {
        Animated.timing(
            slideSearchBarAnim,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();
    };

    useEffect(() => {
        setBookList(props.books);
    }, [props.books]);

    const closeSearchBar = () => {
        Keyboard.dismiss();

        if (searchValue == '') {
            Animated.timing(
                slideSearchBarAnim,
                {
                    toValue: 0,
                    duration: 500,
                }
            ).start();
        } else {
            handleSearchValue('');
        }
    };
    const renderBook = ({item, index}) => (
        <BookCard book={item} colorID={index % 6}/>
    );

    addBook = () => {
        props.navigation.navigate('AddBook');
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.dashboardHeader}>
                {/*Add Book Icon*/}
                <View style={styles.centerItem}>
                    <Animated.View style={{
                        transform: [
                            {
                                scaleY: slideSearchBarAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                })
                            },
                            {
                                scaleX: slideSearchBarAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                })
                            },
                        ]
                    }}>
                        <TouchableOpacity style={[styles.centerItem, styles.addIcon]} onPress={addBook}>
                            <AntDesignIcon
                                name='plus'
                                size={25}/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/*Main Header*/}
                <Animated.View style={{
                    transform: [
                        {
                            translateX: slideSearchBarAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -155]
                            })
                        },
                        {
                            scaleY: slideSearchBarAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            })
                        },
                        {
                            scaleX: slideSearchBarAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            })
                        },
                    ]
                }}>
                    <Text style={styles.mainHeader}>Library</Text>
                </Animated.View>

                {/*Search Bar*/}
                <View>
                    <Animated.View style={{
                        ...styles.searchIcon,
                        transform: [
                            {
                                translateX: slideSearchBarAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -Dimensions.get('window').width / 1.15]
                                })
                            },
                        ]
                    }}>
                        <TouchableOpacity style={styles.centerItem} onPress={openSearchBar}>
                            <Icon name="search" size={30}/>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.searchBar,
                            transform: [
                                {
                                    translateX: slideSearchBarAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -Dimensions.get('window').width / 1.07]
                                    })
                                },
                            ],
                            width: slideSearchBarAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, Dimensions.get('window').width / 1.05]
                            }),
                            opacity: slideSearchBarAnim
                        }}>
                        <SearchBar value={searchValue} customStyle={styles.searchBarInner}
                                   handleValueChange={handleSearchValue}
                                   placeholderText='Search My Books'/>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.closeSearchIcon,
                            transform: [
                                {
                                    scaleY: slideSearchBarAnim
                                },
                                {
                                    scaleX: slideSearchBarAnim
                                },
                            ],
                            opacity: slideSearchBarAnim
                        }}>
                        <TouchableOpacity onPress={closeSearchBar}>
                            <EntypoIcon name='cross' size={32}/>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            <FlatList data={bookList} renderItem={renderBook} keyExtractor={(item, index) => item + index}/>
        </View>
    );
};

DashboardScreen.navigationOptions = () => ({
    header: null,
});

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: ColorConstants.cardboard,
        flex: 1,
        paddingTop: getStatusBarHeight(),
    },
    dashboardHeader: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: ColorConstants.cardboard,
    },
    addIcon: {
        bottom: 5,
    },
    mainHeader: {
        fontSize: 27,
        fontWeight: '600',
        bottom: 5,
    },
    centerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        zIndex: 1,
    },
    searchBar: {
        position: 'absolute',
        left: 22,
        bottom: 5,
        height: 40,
    },
    searchBarInner: {
        paddingStart: 25,
        paddingEnd: 25,
    },
    closeSearchIcon: {
        position: 'absolute',
        height: 40,
        bottom: 2.5,
        right: 5,
        opacity: 0,
    },

});

const mapStateToProps = state => ({
    books: state.books
});
export default connect(mapStateToProps)(DashboardScreen);
