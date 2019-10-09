import React, {useEffect, useState} from 'react';
import {
    Button,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {ColorConstants, ThemeConstants} from '../Constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {loginUser, registerUser} from '../redux/actions/userActions';
import {connect} from 'react-redux';

//TODO Reset Password
//TODO Clicking the thing you have read etc. Terms and Services
//TODO Make sure both passwords are same
const LoginScreen = props => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [userLoginInfo, setUserLoginInfo] = useState({
        //TODO Fix so that it checks email over Username in backend
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerShow, setRegisterShow] = useState(true);


    const handleTextChange = key => (
        val => {
            setUserInfo({
                ...userInfo,
                [key]: val
            });
        }
    );

    const handleValueChange = key => val => {
        setUserLoginInfo({
            ...userLoginInfo,
            [key]: val
        });
    };

    const handleEmailChange = handleTextChange('email');
    const handlePasswordChange = handleTextChange('password');
    const handleRepeatPassword = handleTextChange('repeatPassword');

    const handleEmailLoginChange = handleValueChange('email');
    const handlePasswordLoginChange = handleValueChange('password');


    useEffect(() => {
        setRegisterShow(props.navigation.getParam('registerUser'));
    }, []);
    useEffect(() => {
        if (props.user.error) {
            setError(props.user.error);
        } else {
            setError(null);
        }

        if (props.user.registerSuccess) {
            setRegisterSuccess(true);
            setRegisterShow(false);
        } else {
            setRegisterSuccess(false);
        }

        if (props.user.loginSuccess) {
            setLoginSuccess(true);
        } else {
            setLoginSuccess(false);
        }
    }, [props.user]);
    //Loading Icon When Successful Login

    const inputValidate = () => {
        setError(null);
        let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (registerShow) {
            if (userInfo.email == '' || userInfo.password == '' || userInfo.repeatPassword == '') {
                setError('Please enter and fill all the fields.');
                return false;
            }

            if (userInfo.password != userInfo.repeatPassword) {
                setError('Your passwords do not match.');
                return false;
            }

            if (!emailReg.test(userInfo.email)) {
                setError('Please enter a valid email address.');
                return false;
            }

            return true;
        } else {
            if (userLoginInfo.email == '' && userLoginInfo.password == '') {
                setError('You must enter your email address & your password.');
                return false;
            } else if (userLoginInfo.email == '') {
                setError('You must enter your email address.');
                return false;
            } else if (userLoginInfo.password == '') {
                setError('You must enter your password.');
                return false;
            }

            if (!emailReg.test(userLoginInfo.email)) {
                setError('Please enter a valid email address.');
                return false;
            }


            return true;
        }
    };

    const loginUser = () => {
        if (inputValidate()) {
            props.loginUser(userLoginInfo);
        }
    };

    const registerUser = () => {
        if (inputValidate()) {
            props.registerUser(userInfo);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const toggleRegister = () => {
        setError('');
        setRegisterShow(!registerShow);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.mainContainer}>
            <View style={styles.mainContainer}>
                <KeyboardAvoidingView behavior='position'>
                    <View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Bookworm</Text>
                            <Text style={styles.subtitle}>Make Reading A True Experience</Text>
                        </View>
                        {registerShow ?
                            //Register Text
                            <View style={styles.appLogin}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Email'}
                                    placeholderTextColor={ColorConstants.placeholderText}
                                    onChangeText={handleEmailChange}
                                    value={userInfo.email}/>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Password'}
                                    placeholderTextColor={ColorConstants.placeholderText}
                                    onChangeText={handlePasswordChange}
                                    secureTextEntry={true}
                                    value={userInfo.password}/>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Repeat Password'}
                                    placeholderTextColor={ColorConstants.placeholderText}
                                    onChangeText={handleRepeatPassword}
                                    secureTextEntry={true}
                                    value={userInfo.repeatPassword}/>

                                <TouchableOpacity style={styles.button} onPress={registerUser}>
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <View style={styles.login}>
                                    <Text style={styles.loginText}>
                                        Already Have An Account?
                                    </Text>
                                    <Button title={'Sign In'} onPress={toggleRegister}/>
                                </View>

                                {error ?
                                    <View style={styles.errorView}>
                                        <Text style={styles.error}>{error}</Text>
                                    </View> : null
                                }

                                {registerSuccess ?
                                    <View style={styles.successView}>
                                        <Text style={styles.success}>Successfully Registered!</Text>
                                    </View> : null
                                }
                            </View> :
                            //Login Text
                            <View style={styles.appLogin}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Email'}
                                    placeholderTextColor={ColorConstants.placeholderText}
                                    onChangeText={handleEmailLoginChange}
                                    value={userLoginInfo.email}/>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={'Password'}
                                    placeholderTextColor={ColorConstants.placeholderText}
                                    onChangeText={handlePasswordLoginChange}
                                    secureTextEntry={true}
                                    value={userLoginInfo.password}/>

                                <TouchableOpacity style={styles.button} onPress={loginUser}>
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>

                                <View style={styles.login}>
                                    <Text style={styles.loginText}>
                                        New Here?
                                    </Text>
                                    <Button title={'Sign Up'} onPress={toggleRegister}/>
                                </View>

                                {error ?
                                    <View style={styles.errorView}>
                                        <Text style={styles.error}>{error}</Text>
                                    </View> : null
                                }

                                {loginSuccess ?
                                    <View style={styles.successView}>
                                        <Text style={styles.success}>Logged In Successfully!</Text>
                                    </View> : null
                                }
                            </View>
                        }


                    </View>

                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>

    );
};

LoginScreen.navigationOptions = ({navigation}) => ({
    header: null,
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fffcdc',
        paddingTop: getStatusBarHeight(),
        alignItems: 'center',
    },
    appLogin: {
        marginBottom: 5,
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: ColorConstants.placeholderText,
        height: 50,
        fontSize: 18,
        padding: 5,
        paddingStart: 5,
        marginTop: 5,
        marginBottom: 10,
    },
    button: {
        height: 50,
        borderRadius: 5,
        width: Dimensions.get('window').width / 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E44D26',
        ...ThemeConstants.shadowElevateButtonLow
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '500',
    },
    lineBreakOr: {
        flexDirection: 'row',
        width: Dimensions.get('window').width / 1.3,
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linebreak: {
        width: Dimensions.get('window').width / 3.5,
        marginRight: 10,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: ColorConstants.placeholderText,
    },
    orText: {
        color: ColorConstants.placeholderText,
        fontSize: 20,
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
    login: {
        width: Dimensions.get('window').width / 1.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 17.5,
        color: '#767676',
    },
    errorView: {
        padding: 5,
        marginTop: 10,
        backgroundColor: '#ffcccb',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 1.3,
        ...ThemeConstants.shadowElevateButtonLow
    },
    error: {
        color: ColorConstants.Danger,
        fontSize: 15,
    },
    successView: {
        padding: 5,
        marginTop: 10,
        backgroundColor: '#90ee90',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 1.3,
        ...ThemeConstants.shadowElevateButtonLow
    },
    success: {
        color: 'green',
        fontSize: 15,
    }
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    registerUser,
    loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
