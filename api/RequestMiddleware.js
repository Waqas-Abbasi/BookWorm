import {requestNewToken} from './TokenAuthentication';

//Make sure facebook Token is checked if Facebook is used to login
const request = async (urlPath, fetchParams = {}) => {

    const response = await fetch(urlPath, fetchParams);

    if (response.status == 406) {
        await requestNewToken();
    }

    return response;
};

export default request;
