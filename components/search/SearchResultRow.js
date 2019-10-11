import React, {useState} from 'react';
import {Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorConstants, ThemeConstants} from '../../Constants';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {addBook} from '../../redux/actions/bookActions';
import {withNavigation} from 'react-navigation';

//TODO CSS If there is overflow of text
const SearchResultRow = props => {

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

    const [moreDetailsModalVisible, setMoreDetailsModalVisible] = useState(false);

    const toggleBookDetails = () => {
        setMoreDetailsModalVisible(!moreDetailsModalVisible);
    };

    function createBook() {
        const book = {
            key: props.books.length,
            title: props.book.title,
            author: authors,
            totalPages: props.book.pageCount,
            pagesRead: 0,
            img: {
                uri: props.book.imageLinks.smallThumbnail
            },
            sessionList: [],
        };

        return book;
    }

    const addBookToLibrary = () => {
        Alert.alert(
            'Add ' + props.book.title + ' To Library?',
            'Doing so add this book to your collection.',
            [
                {
                    text: 'Add Book', onPress: () => {
                        props.addBook(createBook());
                        toggleBookDetails();
                        props.navigation.navigate('Dashboard', {
                            scrollBottom: true
                        });
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    const authors = props.book.authors && (props.book.authors.length > 1 ? props.book.authors.reduce((a, b) => a + ', ' + b) : props.book.authors[0]);
    return (
        <View>
            <TouchableOpacity onPress={toggleBookDetails} activeOpacity={0.8}>
                <View style={styles.mainContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.book.imageLinks.smallThumbnail}}
                               resizeMode='cover'/>
                    </View>
                    <View style={styles.shadow}>
                        <LinearGradient colors={backgroundColor(props.colorID)} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={styles.cardContainer}>
                            <View style={styles.textContainer}>
                                <View style={styles.titleView}>
                                    <Text style={[styles.cardText, styles.largeText]}>{props.book.title}</Text>
                                    <Text style={[styles.cardText, styles.mediumText]}>{props.book.subtitle}</Text>
                                </View>
                                <View style={styles.author}>
                                    <Text style={[styles.cardText, styles.mediumText]}>{authors}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={moreDetailsModalVisible}
                animationIn='slideInUp'
                onBackdropPress={toggleBookDetails}
                style={styles.modal}
                deviceWidth={this.deviceWidth}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewModal}
                    bounce={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <LinearGradient colors={backgroundColor(props.colorID)} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={toggleBookDetails}>
                                <EntypoIcon name='cross' size={32} color={'white'}/>
                            </TouchableOpacity>
                            <Text style={[styles.cardText, styles.largeTextModal]}>{props.book.title}</Text>
                            <TouchableOpacity style={styles.centerItem} onPress={addBookToLibrary}>
                                <Text style={[styles.cardText, styles.addText]}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.bookMainInfoView}>
                            <View style={styles.bookMainInfo}>
                                <Image style={styles.imageModal} source={{uri: props.book.imageLinks.smallThumbnail}}
                                       resizeMode='stretch'/>
                                <View style={styles.textInfo}>
                                    <View style={styles.titleView}>
                                        <Text style={[styles.cardText, styles.mediumText]}>{props.book.subtitle}</Text>
                                        <Text style={[styles.cardText, styles.mediumText, styles.spacingText]}>Total
                                            Pages: {props.book.pageCount}</Text>
                                    </View>
                                    <View style={styles.authorModal}>
                                        <Text style={[styles.cardText, styles.mediumText]}>Authored By: {authors}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={styles.bookInfo}>
                        <Text
                            style={[styles.cardText, styles.paragraphText]}>Description: {props.book.description}</Text>
                    </View>
                    <TouchableOpacity onPress={addBookToLibrary} style={styles.addBookButton}>
                        <Text style={styles.addBookButtonText}>Add Book To Library</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </View>
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
    bookMainCardText: {
        fontWeight: '500',
        color: 'black',
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
    },
    author: {
        position: 'absolute',
        left: 80,
        bottom: 10,
    },
    modal: {
        margin: 0,
        backgroundColor: ColorConstants.cardboard,
        marginTop: getStatusBarHeight() * 5,
        borderRadius: 8,
        justifyContent: 'flex-start',
    },
    bookMainInfoView: {
        padding: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    addButton: {
        height: 40,
        width: 50,
        justifyContent: 'center',
    },
    modalTextHeader: {
        fontSize: 18,
    },
    headerTitle: {
        fontSize: 27,
        fontWeight: '600',
        bottom: 5,
    },
    bookMainInfo: {
        flexDirection: 'row',
    },

    imageModal: {
        height: 150,
        width: 100,
        borderRadius: 7,
        ...ThemeConstants.imageShadow,
        marginRight: 10,
    },
    authorModal: {
        position: 'absolute',
        bottom: 10,
    },
    textInfo: {
        flex: 1,
    },
    largeTextModal: {
        fontSize: 22,
        marginBottom: 5,
        marginTop: 5,
    },
    bookInfo: {
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: ColorConstants.cardboard,
    },
    paragraphText: {
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'justify',
        color: 'black',
        fontWeight: '400',
    },
    centerItem: {
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
    },
    addText: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    addBookButton: {
        width: ThemeConstants.windowWidth,
        backgroundColor: '#23b033',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        ...ThemeConstants.shadowElevateButton,
    },
    addBookButtonText: {
        fontSize: 18,
        color: 'white',
    },
    scrollViewModal: {
        alignItems: 'center',
    },
    modalView: {
        width: Dimensions.get('window').width
    },
    spacingText: {
        marginTop: 5,
    }
});

const mapDispatchToProps = {
    addBook,
}

const mapStateToProps = state => ({
   books: state.books,
});
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SearchResultRow));
