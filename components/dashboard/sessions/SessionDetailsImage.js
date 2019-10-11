import React, {useState} from 'react';
import {Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeConstants} from '../../../Constants';
import {material} from 'react-native-typography';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const SessionDetailsImage = props => {

    const [imageViewerVisible, setImageViewerVisible] = useState(false);

    const title = props.note.state.imageTitle;
    const imgURI = props.note.state.img.uri;

    const toggleImageViewer = () => {
        setImageViewerVisible(!imageViewerVisible);
    };

    const imageViewerHeader = () => (

        <TouchableOpacity onPress={toggleImageViewer} activeOpacity={0.8}>
            <View style={styles.imageViewerHeader}>
                <Text style={styles.imageViewerHeaderText}>Back</Text>
            </View>
        </TouchableOpacity>

    );
    return (
        <View style={styles.mainContainer}>
            <Text style={[material.headline, styles.title]}>{title}</Text>
            <TouchableOpacity onPress={toggleImageViewer} activeOpacity={0.9}>
                <Image
                    source={{uri: imgURI}}
                    style={styles.image}/>
            </TouchableOpacity>
            <Modal visible={imageViewerVisible} transparent={true}>
                <ImageViewer
                    renderHeader={imageViewerHeader}
                    saveToLocalByLongPress={false}
                    imageUrls={[{url: imgURI}]}/>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: 'white',
        borderRadius: 8,
        ...ThemeConstants.shadowElevateButton
    },
    title: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    image: {
        height: 400,
        borderRadius: 8,
    },
    imageViewerHeaderText: {
        fontSize: 18,
        color: 'white',
    },
    imageViewerHeader: {
        zIndex: 2,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
        marginLeft: 10,
    }
});

export default SessionDetailsImage;
