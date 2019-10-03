import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {ThemeConstants} from '../Constants';

const FBLoginButton = props => {

    const login = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Login Cancelled');
                } else {
                    console.log(result);
                }
            },
            function (error) {
                alert('Login failed with error: ' + error);
            }
        );
    };

    return (
            <TouchableOpacity style={styles.mainButton} onPress={login} activeOpacity={0.8}>
               <FontAwesome5Icon name={'facebook'} size={30} color={'white'} style={styles.facebookStyle}/>
               <Text style={styles.buttonText}>Login With Facebook</Text>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: '#3B5999',
        height: 50,
        borderRadius: 5,
        width: Dimensions.get('window').width / 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        ...ThemeConstants.shadowElevateButtonLow
    },
    facebookStyle: {
      paddingRight: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '500',
    }
});

module.exports = FBLoginButton;
