//TODO Must hash the password before sending it
//Password is SHA256 hashed on the client before being sent to the server (never simply rely on https and send plaintext passwords over the wire!!)
import {updateAccessToken, updateRefreshToken} from './TokenAuthentication';
import request from './RequestMiddleware';

//TODO Needs to handle server errors
export const registerUser = async (user) => {
    try {
        const response = await fetch('http://localhost:3000/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        return response;
    } catch (e) {
        console.log(e);
    }
};


export const loginUser = async (user) => {
    try {
        const response = await request('http://localhost:3000/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

        if (response.headers.get('refreshToken')) {
            await updateRefreshToken(response.headers.get('refreshToken'));
            await updateAccessToken(response.headers.get('accessToken'));
        }

        return response;
    } catch (e) {
        console.log(e);
    }
};
