import React, {useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorConstants, ThemeConstants} from '../../Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import AddCustomBookScreen from './AddCustomBookScreen';

const AddBookScreen = props => {

    const [barcodeModalActive, setBarcodeModalActive] = useState(false);

    const toggleBarcodeModal = () => {
        setBarcodeModalActive(!barcodeModalActive);
    };

    const toggleSearchBookModal = () => {
        props.navigation.popToTop();
        props.navigation.navigate('Explore');
    };

    const toggleAddCustomBook = () => {
        props.navigation.navigate('AddCustomBook');
    };

    return (
        <View style={styles.mainContainer}>
            {/*Scan ISBN Barcode Modal*/}
            <Modal
                isVisible={barcodeModalActive}
                style={styles.modal}>
                <Button title='Dismiss' onPress={toggleBarcodeModal}/>
            </Modal>

            <Image
                source={require('../../assets/MaxPixel.net-Cute-Child-Bear-Teddy-Cute-Bear-Cartoon-Animal-3334899.png')}
                style={styles.bannerImage}/>
            <TouchableOpacity style={styles.optionButton} onPress={toggleBarcodeModal} activeOpacity={0.6}>
                <Text style={styles.optionFont}>Scan ISBN Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={toggleSearchBookModal} activeOpacity={0.6}>
                <Text style={styles.optionFont}>Search Book Online</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={toggleAddCustomBook} activeOpacity={0.6}>
                <Text style={styles.optionFont}>Add Custom Book</Text>
            </TouchableOpacity>
        </View>
    );
};

AddBookScreen.navigationOptions = ({navigation}) => ({
    title: 'Add Book',
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
    )
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: ColorConstants.cardboard,
        alignItems: 'center',
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    },
    optionButton: {
        height: 50,
        width: Dimensions.get('window').width / 1.3,
        borderRadius: 5,
        borderWidth: 0.5,
        ...ThemeConstants.shadowElevateButton,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: '#5765FF',
        borderColor: '#5765FF',
    },
    optionFont: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    },
    bannerImage: {
        height: Dimensions.get('window').height / 2.5,
        width: Dimensions.get('window').width / 3,
    },
});

export default AddBookScreen;
