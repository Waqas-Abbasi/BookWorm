import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {ColorConstants, ThemeConstants} from '../../Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import CameraModal from '../../components/CameraModal';
import * as Font from 'expo-font';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {addBook} from '../../redux/actions/bookActions';
import {connect} from 'react-redux';

//TODO Change Alerts, and Permission Requests text
//TODO Error Handling, Try Catch
//TODO Add Loading Icon, Inside Camera, and when Image Picker is Launched
//TODO Text Verification, i.e. things should not be blank
const AddCustomBookScreen = props => {

    const [addImageOptionsActive, setAddImageOptionsActive] = useState(false);
    const [photoPermissions, setPhotoPermissions] = useState(false);
    const [cameraPermission, setCameraPermission] = useState(false);
    const [cameraModalActive, setCameraModalActive] = useState(false);

    const [book, setBook] = useState({
        title: '',
        author: '',
        totalPages: '',
        pagesRead: '',
        img: {
            uri: null,
        }
    });

    useEffect(() => {
        Font.loadAsync({
            'camera_flip_ios': require('../../assets/fonts/camera_flip_ios/icomoon.ttf'),

        });
        getCameraPermissionAsync().catch(err => console.log(err));
        getCameraRollPermissionAsync().catch(err => console.log(err));
    }, []);

    const handleValueChange = key => value => {
        setBook({
            ...book,
            [key]: value,
        });
    };

    const handleTitleChange = handleValueChange('title');
    const handleAuthorChange = handleValueChange('author');
    const handleTotalPagesChange = handleValueChange('totalPages');
    const handlePagesReadChange = handleValueChange('pagesRead');

    const toggleAddImageOptions = () => {
        setAddImageOptionsActive(!addImageOptionsActive);
    };


    useEffect(() => {
        props.navigation.setParams({
            saveBook,
        });
    }, []);

    useEffect(() => {
        props.navigation.setParams({
            saveBook,
        })
    }, [book]);

    const saveBook = () => {
        props.addBook(book);
        props.navigation.popToTop();
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const getCameraRollPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status == 'granted') {
                setPhotoPermissions(true);
            }
        }
    };

    const getCameraPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if (status == 'granted') {
                await setCameraPermission(true);
            }
        }
    };

    const openCamera = () => {
        //Close the Image Options Modal First
        setAddImageOptionsActive(false);
        setTimeout(() => toggleCamera(), 400);
    };

    const toggleCamera = async () => {
        if (!cameraPermission) {
            alert('Sorry, We need Camera and Camera Roll permissions to make this work!');
            return;
        }
        if (!cameraModalActive) {
            setCameraModalActive(true);
        } else {
            setCameraModalActive(false);
        }
    };

    const openImagePickerDelay = async () => {
        //Close the Image Options Modal First
        setAddImageOptionsActive(false);
        setTimeout(() => openImagePicker(), 400);
    };

    const openImagePicker = async () => {
        if (!photoPermissions) {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (!result.cancelled) {
                setBook({
                    ...book,
                    img: result
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const cancelImage = () => {
        setBook({
            ...book,
            img: {
                uri: null,
            }
        });

    };

    const selectedImage = img => {
        setBook({
            ...book,
            img: img,
        });
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View>
                    <CameraModal isVisible={cameraModalActive} toggleCameraModal={toggleCamera}
                                 selectedImage={selectedImage}/>
                    {/*Image Options Modal*/}
                    <Modal
                        isVisible={addImageOptionsActive}
                        style={styles.bottomMenuModal}
                        onBackdropPress={toggleAddImageOptions}>
                        <View style={styles.modalViewContainer}>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={openCamera}>
                                    <Text style={styles.modalTextOptions}>Take Picture</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={openImagePickerDelay}>
                                    <Text style={styles.modalTextOptions}>Import From Library</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cancelModalView}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={toggleAddImageOptions}>
                                <Text style={styles.cancelModalText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <View style={styles.bookInformation}>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={200}>
                            <View style={styles.addPictureView}>
                                {book.img && book.img.uri ?
                                    <View>
                                        <Image source={{uri: book.img.uri}} style={styles.image}/>
                                        <TouchableOpacity style={styles.cancelImageButton} onPress={cancelImage}>
                                            <EntypoIcon name='circle-with-cross' size={25} color='white'/>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <TouchableOpacity activeOpacity={0.8} onPress={toggleAddImageOptions}>
                                        <View style={styles.uploadImage}>
                                            <AntDesignIcon name='pluscircle' size={35} color='green'/>
                                            <Text style={styles.addPictureText}>Add Picture</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={styles.textInformation}>
                                <Text style={styles.textInputHeader}>Title</Text>
                                <TextInput style={styles.textInput} value={book.title}
                                           onChangeText={handleTitleChange}/>
                                <Text style={styles.textInputHeader}>Author</Text>
                                <TextInput style={styles.textInput} value={book.author}
                                           onChangeText={handleAuthorChange}/>
                                <Text style={styles.textInputHeader}>Total Pages</Text>
                                <TextInput style={styles.textInput} value={book.totalPages}
                                           onChangeText={handleTotalPagesChange}/>
                                <Text style={styles.textInputHeader}>Pages Read</Text>
                                <TextInput style={styles.textInput} value={book.pagesRead}
                                           onChangeText={handlePagesReadChange}/>
                            </View>
                        </KeyboardAvoidingView>
                    </View>

                    <View style={styles.userInformation}>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

AddCustomBookScreen.navigationOptions = ({navigation}) => ({
    title: 'Add Custom Book',
    headerStyle: {
        backgroundColor: ColorConstants.cardboard,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        fontSize: 22,
        fontWeight: '600',
    },
    headerLeft: (
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <Ionicon name='ios-arrow-back' size={30}/>
        </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity style={styles.addButton} onPress={navigation.getParam('saveBook')}>
            <Text style={styles.modalText}>Save</Text>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstants.cardboard,
    },
    modalText: {
        fontSize: 18,
    },
    addButton: {
        height: 40,
        width: 50,
        justifyContent: 'center',
    },
    bookInformation: {
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center'
    },
    addPictureView: {
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    uploadImage: {
        width: 130,
        height: 170,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#a4a4a4',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 130,
        height: 170,
        borderRadius: 7,
    },
    textInformation: {
        paddingLeft: 10,
        marginTop: 15,
    },
    textInputHeader: {
        fontSize: 18,
        color: '#a4a4a4',
        marginBottom: 5,
    },
    textInput: {
        width: Dimensions.get('window').width / 1.1,
        height: 35,
        marginBottom: 10,
        fontSize: 17,
        borderRadius: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#a4a4a4'
    },
    addPictureText: {
        marginTop: 5,
        fontSize: 14,
        color: '#a4a4a4',
    },
    bottomMenuModal: {
        flex: 1,
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        margin: 0,
        alignItems: 'center',
        marginBottom: getStatusBarHeight() - 15,
    },
    modalViewContainer: {
        ...ThemeConstants.BottomMenu.modalViewContainer
    },
    innerModalButtonContainer: {
        ...ThemeConstants.BottomMenu.innerModalButtonContainer
    },
    modalTextOptions: {
        ...ThemeConstants.BottomMenu.modalText
    },
    modalButton: {
        ...ThemeConstants.BottomMenu.modalButton
    },
    modalButtonBorder: {
        ...ThemeConstants.BottomMenu.modalButtonBorder
    },
    cancelModalText: {
        ...ThemeConstants.BottomMenu.cancelModalText
    },
    cancelModalView: {
        ...ThemeConstants.BottomMenu.cancelModalView
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    },
    cancelImageButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    }

});

const mapDispatchToProps = {
    addBook,
};

export default connect(null, mapDispatchToProps)(AddCustomBookScreen);
