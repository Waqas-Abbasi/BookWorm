import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColorConstants} from '../../Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicon from 'react-native-vector-icons/Ionicons';

const AddBookScreen = props => {

    return (
        <View style={styles.mainContainer}>
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
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    }
});

export default AddBookScreen;
