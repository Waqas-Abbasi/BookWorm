import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const updateRefreshToken = async refreshToken => {
    console.log('refreshToken');
    console.log(refreshToken);
    try {
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (e) {
        console.log(e);
    }
};

export const updateAccessToken = async accessToken => {
    console.log('accessToken');
    console.log(accessToken);
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
    } catch (e) {
        console.log(e);
    }
};


export const addToken = async requestObject => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken !== null) {
            const returnObject = {
                ...requestObject,
                accessToken,
            };

            return returnObject;
        }
    } catch (e) {
        console.log(e);
    }
};

export const requestNewToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    const response = await fetch('http://localhost:3000/authenticate', {
        method: 'GET',
        headers: {
            'refreshToken': refreshToken,
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('Refreshed Access Token');
        await updateAccessToken(response.headers.get('accessToken'));
        return response.ok
    } else if (response.status === 406) {
        console.log('Token Expired + ResponseCode: ' + response.status);
        Alert.alert(
            'Your Session Expired',
        );
        await AsyncStorage.setItem('refreshToken', '');
        return null;
    } else {
        console.log(response.status);
        console.log(response.headers);
        console.log(response.text());
    }
};
