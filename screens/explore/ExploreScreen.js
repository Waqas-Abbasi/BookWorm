import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ColorConstants, ThemeConstants} from '../../Constants';
import {Icon} from 'react-native-elements';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {searchOnline} from '../../api/googleApi';
import SearchResultRow from '../../components/search/SearchResultRow';

//TODO Clear Textfield button  does not properly clear the field when first clicked
const ExploreScreen = props => {

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [endReached, setEndReached] = useState(false);

    useEffect(() => {
        setSearchResults([
            {
                'title': 'The 4-Hour Work Week',
                'subtitle': 'Escape the 9-5, Live Anywhere and Join the New Rich',
                'authors': ['Timothy Ferriss', 'Timothy Ferriss'],
                'publishedDate': '2011-08-31',
                'description': 'A new, updated and expanded edition of this New York Times bestseller on how to reconstruct your life so it\'s not all about work Forget the old concept of retirement and the rest of the deferred-life plan - there is no need to wait and every reason not to, especially in unpredictable economic times. Whether your dream is escaping the rat race, experiencing high-end world travel, earning a monthly five-figure income with zero management, or just living more and working less, this book is the blueprint. This step-by step guide to luxury lifestyle design teaches: * How Tim went from $40,000 dollars per year and 80 hours per week to $40,000 per MONTH and 4 hours per week * How to outsource your life to overseas virtual assistants for $5 per hour and do whatever you want * How blue-chip escape artists travel the world without quitting their jobs * How to eliminate 50% of your work in 48 hours using the principles of a forgotten Italian economist * How to trade a long-haul career for short work bursts and frequent \'mini-retirements\'. This new updated and expanded edition includes: More than 50 practical tips and case studies from readers (including families) who have doubled their income, overcome common sticking points, and reinvented themselves using the original book as a starting point * Real-world templates you can copy for eliminating email, negotiating with bosses and clients, or getting a private chef for less than £5 a meal * How lifestyle design principles can be suited to unpredictable economic times * The latest tools and tricks, as well as high-tech shortcuts, for living like a diplomat or millionaire without being either.',
                'pageCount': 416,
                'imageLinks': {
                    'smallThumbnail': 'http://books.google.com/books/content?id=tQ1C-rvAfJUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    'thumbnail': 'http://books.google.com/books/content?id=tQ1C-rvAfJUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                }
            }
        ]);
    }, []);

    const onTextChange = text => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        setSearchValue(text);
        setErrorMsg('');

        if (text.trim().length < 1) {
            setSearchResults([]);
            setLoading(false);
        } else {
            setLoading(true);
        }


        const timeout = setTimeout(() => {
            if (text.trim().length > 0) {
                searchOnline(text).then(result => {
                    if (result.length > 0) {
                        setSearchResults(result);
                    } else {
                        setSearchResults([]);
                        setErrorMsg('No Results Found!');
                    }
                    setLoading(false);
                });
            }
        }, 1000);
        setSearchTimeout(timeout);
    };

    const clearTextField = () => {
        setSearchValue('');
    };


    const renderSearchResult = ({item, index}) => (
        <SearchResultRow book={item} colorID={index % 6}/>
    );

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const updateBookList = () => {
        if (!endReached) {
            setEndReached(true);
            console.log('end');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.main}>
            <ScrollView
                style={styles.mainContainer}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.searchView}>

                    <View style={styles.searchIcon}>
                        <Icon name="search" size={30}/>
                    </View>

                    <TextInput
                        value={searchValue}
                        onChangeText={onTextChange}
                        style={styles.searchBarInner}
                        placeholder={'Search Book Online'}
                    placeholderTextColor={ColorConstants.placeholderText}/>


                    {searchValue.length > 0 &&
                    <TouchableOpacity onPress={clearTextField}>
                        <View style={styles.clearIcon}>
                            <AntDesignIcon name="closecircle" size={20}/>
                        </View>
                    </TouchableOpacity>}
                </View>

                {loading && <ActivityIndicator style={styles.loadingIcon} size="large"/>}

                {!loading && searchResults.length > 0 &&
                <View style={styles.listView}>
                    <FlatList
                        data={searchResults}
                        renderItem={renderSearchResult}
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        extraData={searchResults}
                        onScrollEndDrag={updateBookList}
                        />
                </View>
                }

                {errorMsg.length > 0 &&
                <View style={styles.errorMsg}>
                    <Text style={styles.errorMsgText}>{errorMsg}</Text>
                </View>}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    main:{
        flex: 1
    },
    mainContainer: {
        flex: 1,
        paddingTop: getStatusBarHeight() * 2,
        backgroundColor: ColorConstants.cardboard,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: 50,
    },
    searchBarInner: {
        borderRadius: 7,
        ...ThemeConstants.shadowElevateButton,
        height: 40,
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: 'white',
        paddingStart: 32,
        paddingEnd: 15,
        fontSize: 18,
    },
    searchView: {
        flexDirection: 'row',
        backgroundColor: ColorConstants.cardboard,
    },
    searchIcon: {
        position: 'absolute',
        zIndex: 2,
        top: 5,
    },
    clearIcon: {
        position: 'absolute',
        zIndex: 2,
        top: 10,
        right: 5
    },
    loadingIcon: {
        position: 'absolute',
        marginTop: Dimensions.get('window').height / 2.1
    },
    listView: {
        backgroundColor: ColorConstants.cardboard,
        marginTop: 15,
    },
    errorMsg: {
        position: 'absolute',
        marginTop: Dimensions.get('window').height / 2
    },
    errorMsgText: {
        fontSize: 18,
        color: ColorConstants.placeholderText,
    }
});

ExploreScreen.navigationOptions = () => ({
    header: null,
});

export default ExploreScreen;
