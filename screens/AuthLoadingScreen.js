import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-community/async-storage';
import {requestNewToken} from '../api/TokenAuthentication';

const AuthLoadingScreen = props => {

    const checkTokens = async() => {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if(refreshToken){
            const resp = await requestNewToken();
            props.navigation.navigate(resp ? 'MainApp' : 'LoginScreen', {
                registerUser: false
            });
        }else{
            props.navigation.navigate('LoginScreen');
        }
    };
    useEffect(() => {
        checkTokens().then();
    }, []);


    return (
        <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Bookworm</Text>
                <Text style={styles.subtitle}>Make Reading A True Experience</Text>
            </View>
            <View style={styles.loadingContainer}>
                <ActivityIndicator style={styles.loadingIcon} size="large" color="silver"/>
                <Text style={styles.loadingContainerText}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fffcdc',
        paddingTop: getStatusBarHeight(),
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center', alignItems: 'center'
    },
    loadingIcon: {
        marginBottom: 10,
    },
    textContainer: {
        marginTop: getStatusBarHeight() * 2,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 5,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '400',
    },
});


export default AuthLoadingScreen;
