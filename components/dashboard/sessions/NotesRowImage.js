import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CameraModal from '../../CameraModal';
import {Icon} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import NModal from 'react-native-modal';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ColorConstants, ThemeConstants} from '../../../Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';

//TODO Permissions for Android
class NotesRowImage extends React.Component {

    state = {
        img: {},
        isCameraModalVisible: false,
        photosPermission: false,
        isImageModalVisible: false,
        imageTitle: '',
        isImageMoreMenuVisible: false,
        imageMenu: false,
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.img !== this.state.img || prevState.imageTitle !== this.state.imageTitle) {
            const imgNote = {
                ...this.props.note,
                state: {
                    img: this.state.img,
                    imageTitle: this.state.imageTitle,
                }
            };

            this.props.updateNote(imgNote);
        }
    }

    handleImageTitle = val => {
        this.setState({
            imageTitle: val,
        });
    };

    toggleImageMenu = () => {
        this.setState(prevState => ({
            imageMenu: !prevState.imageMenu,
        }));
    };

    getCameraRollPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status === 'granted') {
                this.setState({
                    photosPermission: true,
                });
            }
        }
    };

    getCameraPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if (status === 'granted') {
                this.setState({
                    cameraPermission: true,
                });
            }
        }
    };

    openCamera = async () => {
        if (!this.state.isCameraModalVisible) {
            await this.getCameraPermissionAsync();
            await this.getCameraRollPermissionAsync();
            if (!this.state.cameraPermission) {
                alert('Sorry, We need Camera and Camera Roll permissions to make this work!');
            }

            this.setState({
                isCameraModalVisible: true,
            });
        } else {
            this.setState({
                isCameraModalVisible: false,
            });
        }
    };

    toggleCamera = () => {
        if (this.state.isImageMoreMenuVisible) {
            this.toggleImageMoreMenu();
            setTimeout(this.openCamera, 500);
        } else {
            this.openCamera().catch(err => console.log(err));
        }
    };

    openImagePicker = async () => {
        await this.getCameraRollPermissionAsync();
        if (!this.state.photosPermission) {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({img: result});
        }
    };
    openPhotosAsync = async () => {
        if (this.state.isImageMoreMenuVisible) {
            this.toggleImageMoreMenu();
            setTimeout(this.openImagePicker, 500);
        } else {
            this.openImagePicker();
        }
    };

    cancelImage = () => {
        if (this.state.isImageMoreMenuVisible) {
            this.toggleImageMoreMenu();
        }
        this.setState({
            img: {
                uri: null,
            },
        });

    };

    selectedImage = img => {
        this.setState({
            img: img
        });
    };

    toggleImageModal = () => {
        this.setState(prevState => ({
            isImageModalVisible: !prevState.isImageModalVisible,
        }));
    };

    imageViewerHeader = () => (
        <View style={styles.imageViewerHeader}>
            <TouchableOpacity onPress={this.toggleImageModal} activeOpacity={0.8}>
                <Text style={styles.imageViewerHeaderText}>Back</Text>
            </TouchableOpacity>
        </View>
    );

    toggleImageMoreMenu = () => {
        this.setState(prevState => ({
            isImageMoreMenuVisible: !prevState.isImageMoreMenuVisible
        }));
    };

    render() {
        return (
            <View style={styles.imageContainer}>
                <CameraModal isVisible={this.state.isCameraModalVisible} toggleCameraModal={this.toggleCamera}
                             selectedImage={this.selectedImage}/>
                {this.state.img.uri ?
                    <View style={styles.imagePlaceHolder}>
                        <View style={styles.imageTitle}>
                            <TextInput
                                style={styles.textInputTitle}
                                value={this.state.imageTitle}
                                onChangeText={val => this.handleImageTitle(val)}
                                placeholder='Title'
                                placeholderTextColor={'silver'}/>
                            <TouchableOpacity onPress={this.toggleImageMoreMenu} style={styles.imageMoreMenu}>
                                <Icon
                                    name='more-vert'
                                    size={30}
                                    color='grey'/>
                            </TouchableOpacity>
                        </View>
                        <Modal visible={this.state.isImageModalVisible} transparent={true}>
                            <ImageViewer
                                renderHeader={this.imageViewerHeader}
                                saveToLocalByLongPress={false}
                                imageUrls={[{url: this.state.img.uri}]}/>
                        </Modal>
                        <TouchableOpacity activeOpacity={1} onPress={this.toggleImageModal}>
                            <Image source={{uri: '' + this.state.img.uri}} style={{
                                height: this.state.img.height < 500 ? this.state.img.height : 500,
                                width: Dimensions.get('window').width / 1.03,
                            }}/>
                        </TouchableOpacity>
                        <NModal
                            isVisible={this.state.isImageMoreMenuVisible}
                            animationIn='slideInUp'
                            onBackdropPress={this.toggleImageMoreMenu}
                            style={styles.modal}
                            deviceWidth={this.deviceWidth}>
                            <View>
                                <View style={styles.modalViewContainer}>
                                    <View style={styles.innerModalButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.modalButton, styles.modalButtonBorder]}
                                            onPress={this.toggleCamera}>
                                            <Text style={styles.modalText}>Take New Picture</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.innerModalButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.modalButton, styles.modalButtonBorder]}
                                            onPress={this.openPhotosAsync}>
                                            <Text style={styles.modalText}>Choose New Picture From
                                                Library</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.innerModalButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.modalButton, styles.modalButtonBorder]}
                                            onPress={this.cancelImage}>
                                            <Text style={styles.modalDangerText}>Remove Picture</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.innerModalButtonContainer}>
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={this.props.deleteNoteRow}>
                                            <Text style={styles.modalDangerText}>Delete Image Component</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.cancelModalView}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={this.toggleImageMoreMenu}>
                                        <Text style={styles.cancelModalText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </NModal>
                    </View>
                    :
                    <View style={styles.noImagePlaceholder}>
                        <TouchableOpacity onPress={this.toggleImageMenu} style={styles.imageMenu}>
                            <Icon
                                name='more-vert'
                                size={30}
                                color='grey'/>
                        </TouchableOpacity>
                        <NModal
                            isVisible={this.state.imageMenu}
                            animationIn='slideInUp'
                            onBackdropPress={this.toggleImageMenu}
                            style={styles.modal}
                            deviceWidth={this.deviceWidth}>
                            <View style={styles.modalViewContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={this.props.deleteNoteRow}>
                                    <Text style={styles.modalDangerText}>Delete Image Component</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cancelModalView}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={this.toggleImageMenu}>
                                    <Text style={styles.cancelModalText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </NModal>
                        <TouchableOpacity
                            style={styles.uploadImageBoxButton}
                            onPress={this.toggleCamera}>
                            <Text style={styles.noImageText}>Take Picture</Text>
                        </TouchableOpacity>
                        <Text style={styles.uploadImageBoxText}>
                            Or
                        </Text>
                        <TouchableOpacity
                            style={styles.uploadImageBoxButton}
                            onPress={this.openPhotosAsync}>
                            <Text style={styles.noImageText}>Select Photos</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3b3b3b',
        marginBottom: 12,
        width: Dimensions.get('window').width,
        ...ThemeConstants.shadowElevateButtonLow,
    },
    textInputTitle: {
        lineHeight: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'justify',
        flex: 1,
        width: Dimensions.get('window').width / 1.1,
        height: 60,
        fontSize: 22,
        fontWeight: '500',
        borderBottomWidth: 0.25,
        borderColor: ColorConstants.placeholderText,
        marginBottom: 10,
        borderRadius: 2,
        padding: 5,
        color: 'white'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    noImagePlaceholder: {
        height: 150,
        width: Dimensions.get('window').width / 1.1,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'silver',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImageText: {
        margin: 10,
        fontSize: 17,
        color: ColorConstants.primary,
        fontWeight: '600'
    },
    uploadImageBoxText: {
        fontSize: 17,
        color: 'silver',
    },
    imageViewerHeaderText: {
        fontSize: 18,
        color: 'white',
        marginTop: getStatusBarHeight() * 1.5,
        marginLeft: 10,
        height: 60,
        width: 60,
    },
    imageTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageMoreMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12.5,
    },
    ...ThemeConstants.BottomMenu,
    imageMenu: {
        position: 'absolute',
        top: 5,
        right: 5,
    }
});


export default NotesRowImage;
