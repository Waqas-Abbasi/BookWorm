import React from 'react'
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import Modal from "react-native-modal";
import {getStatusBarHeight} from "react-native-status-bar-height";
import Icon from './icon/camera_flip_ios';

class CameraModal extends React.Component {


    state = {
        camera: {
            autoFocus: Camera.Constants.AutoFocus.on,
            type: Camera.Constants.Type.back,
            flashMode: Camera.Constants.FlashMode.off,
            ratio: '1:1',
            img: {},
        }

    };

    toggleModal = () => {
        // this.cancelImage()
        this.props.toggleCameraModal();
    };

    flipCamera = () => {
        this.setState({
            camera: {
                ...this.state.camera,
                type:
                    this.state.camera.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
            },
        });
    };

    toggleFlash = () => {
        this.setState(prevState => ({
            camera: {
                ...prevState.camera,
                flashMode: prevState.camera.flashMode == Camera.Constants.FlashMode.on ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on,
            }
        }))
    };

    captureImage = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.setState(prevState => ({
                camera: {
                    ...prevState.camera,
                    img: photo,
                }
            }))
        }
    };

    imageSelected = async () => {
        this.props.selectedImage(this.state.camera.img);
        this.toggleModal();
    };

    cancelImage = () => {
        if (this.state.camera.img && this.state.camera.img.uri) {
            this.setState(prevState => ({
                camera: {
                    ...prevState.camera,
                    img: {
                        uri: null
                    },
                }
            }))
        } else {
            this.toggleModal()
        }
    };

    render() {
        return (
            <Modal isVisible={this.props.isVisible} style={styles.modalContainer} coverScreen={true}>
                <View style={styles.cameraHeader}>
                    <TouchableOpacity onPress={this.toggleFlash}>
                        <Text
                            style={styles.cancelButtonText}>{this.state.camera.flashMode == Camera.Constants.FlashMode.on ? 'Flash On' : 'Flash Off'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cameraFlipButton} onPress={this.flipCamera}>
                        <Icon name='flip_camera_ios' size={35} color='white'/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.camera.img.uri ?
                        <View style={styles.imagePreviewContainer}>
                            <Image source={{uri: this.state.camera.img.uri}} style={styles.imagePreviewStyle}/>
                        </View>
                        :
                        <Camera
                            type={this.state.camera.type}
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.camera}
                            autoFocus={this.state.camera.autoFocus}
                            flashMode={this.state.camera.flashMode}
                            ratio={this.state.camera.ratio}>
                        </Camera>

                }
                <View style={styles.cameraFooter}>
                    <TouchableOpacity style={styles.cancelButton} onPress={this.cancelImage}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={styles.captureButton}>
                        <View style={styles.captureButtonOuter}>
                            <TouchableOpacity onPress={this.captureImage} activeOpacity={0.7}>
                                <View style={styles.captureButtonInner}>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={this.imageSelected}>
                        <Text style={styles.cancelButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    camera: {
        flex: 1,
        height: Dimensions.get('window').height - getStatusBarHeight() * 12,
    },
    imagePreviewStyle: {
        height: '100%',
        width: Dimensions.get('window').width,
    },
    imagePreviewContainer: {
        flex: 1,
        height: Dimensions.get('window').height - getStatusBarHeight() * 12,
        width: Dimensions.get('window').width,
    },
    cameraHeader: {
        height: getStatusBarHeight() * 2,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    cameraFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: getStatusBarHeight() * 5,
        backgroundColor: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
    },
    cancelImageButton: {
        // position: 'absolute',
        // top: 5,
        // right: 10,
    },
    captureButton: {
        paddingRight: 10,
    },
    captureButtonOuter: {
        borderWidth: 5,
        borderRadius: 35,
        borderColor: 'white',
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        backgroundColor: 'white',
        height: 55,
        width: 55,
        borderWidth: 5,
        borderRadius: 35,
        borderColor: 'white',
    },
});

export default CameraModal;
