import React from 'react';
import {Alert, Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Icon} from 'react-native-elements';
import {ColorConstants, ThemeConstants} from '../../../Constants';
import BackgroundTimer from 'react-native-background-timer';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';

class NotesRowAudio extends React.Component {

    state = {
        audioPermissions: false,
        audioTitle: '',
        audioMoreMenuVisible: false,
        time: {
            secs: 0,
            mins: 0,
            hours: 0,
            counter: 0,
            timerActive: false,
        },
        recordingStartAnim: new Animated.Value(0),
        opacityAnimation: new Animated.Value(0),
        opacityAnimationOnce: new Animated.Value(0),
        recorder: new Recorder(this.props.id + '.mp4', {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
        }),
        playButtonVisible: false,
        player: new Player(this.props.id + '.mp4'),
        progress: 0,
        progressInterval: 0,
        playerActive: false,
        playerPosition: 0,
        lastSeek: 0,
        loading: false,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.time !== this.state.time || prevState.audioTitle !== this.state.audioTitle || prevState.player !== this.state.player) {
            const audioNote = {
                ...this.props.note,
                state: {
                    time: this.state.time,
                    audioTitle: this.state.audioTitle,
                    player: this.state.player
                }
            };

            this.props.updateNote(audioNote);
        }
    }

    startRecordingAnimation = () => {
        Animated.timing(
            this.state.recordingStartAnim,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();

        Animated.timing(
            this.state.opacityAnimationOnce,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();

        Animated.timing(
            this.state.opacityAnimation,
            {
                toValue: 1,
                duration: 250,
            }
        ).start();


    };

    startRecording = async () => {
        this.startRecordingAnimation();
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                timerActive: true,
            }
        }));

        BackgroundTimer.runBackgroundTimer(() => {
            this.setState(prevState => ({
                time: {
                    ...prevState.time,
                    counter: prevState.time.counter + 1,
                    secs: (prevState.time.secs + 1) % 60,
                    mins: Math.floor(((prevState.time.counter) + 1) / 60) % 60,
                    hours: Math.floor(((prevState.time.counter) + 1) / 3600) % 60,
                },
            }));
        }, 1000);

        this.state.recorder.toggleRecord();
    };

    stopAnimation = () => {
        Animated.timing(
            this.state.recordingStartAnim,
            {
                toValue: 0,
                duration: 500,
            }
        ).start();

        setTimeout(() => {
            Animated.timing(
                this.state.opacityAnimation,
                {
                    toValue: 0,
                    duration: 250,
                }
            ).start();
        }, 300);
    };

    pauseRecording = () => {
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                timerActive: false,
            }
        }));

        BackgroundTimer.stopBackgroundTimer();
        this.state.recorder.pause((err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    stopRecording = () => {
        if (this.state.recorder.state == 5) {
            this.state.recorder.toggleRecord();
        }
        this.setState({
            playButtonVisible: true,
        });
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                timerActive: false,
            }
        }));

        BackgroundTimer.stopBackgroundTimer();

        this.stopAnimation();
        this.state.recorder.stop((err) => {
            if (err) {
                console.log('called 0');
                console.log(err);
            }
        });

        this.setState({
            loading: true,
        });
        this.state.player.prepare(() => {
            this.setState({
                loading: false,
            });
        });
    };

    playPlayback = async () => {
        if (this.state.player.isPaused) {
            this.state.player.play();
            this.setState({
                playerActive: true,
            });
        } else {
            this.state.player.prepare(() => {
                this.state.player.play();
                this.setState({
                    playerActive: true,
                });
            });
        }
    };

    pausePlayback = async () => {
        this.state.player.pause();

        this.setState({
            playerActive: false,
        });
    };

    handleAudioTitleChange = val => {
        this.setState({
            audioTitle: val,
        });
    };

    getAudioPermissions = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            if (status === 'granted') {
                this.setState({
                    audioPermissions: true
                });
            }
        }
    };

    toggleAudioMoreMenu = () => {
        this.setState({
            audioMoreMenuVisible: !this.state.audioMoreMenuVisible
        });
    };

    _shouldUpdateProgressBar() {
        // Debounce progress bar update by 200 ms
        return Date.now() - this.state.lastSeek > 200;
    }

    updateProgressBar = () => {
        const progressInterval = setInterval(() => {
            if (this.state.player && this._shouldUpdateProgressBar()) {
                let currentProgress = Math.max(0, this.state.player.currentTime) / this.state.player.duration;
                if (isNaN(currentProgress)) {
                    currentProgress = 0;
                }
                this.setState({progress: currentProgress});
                if (this.state.player.isStopped) {
                    this.setState({
                        playerActive: false,
                    });
                }
            }

        }, 100);

        this.setState({
            progressInterval
        });
    };

    componentDidMount() {
        this.getAudioPermissions().catch(err => console.log(err));
    }

    componentWillMount() {
        this.updateProgressBar();
    }

    componentWillUnmount() {
        clearInterval(this.state.progressInterval);
    }

    seek(percentage) {
        if (!this.state.player) {
            return;
        }

        this.state.lastSeek = Date.now();

        let position = percentage * this.state.player.duration;

        this.state.player.seek(position);
    }

    removeAudio = () => {
        Alert.alert(
            'Delete Recorded Audio Note?',
            'This will remove your recorded audio note. You cannot undo this action',
            [
                {
                    text: 'Remove', onPress: () => {
                        this.toggleAudioMoreMenu();
                        this.setState({
                            audioMoreMenuVisible: false,
                            time: {
                                secs: 0,
                                mins: 0,
                                hours: 0,
                                counter: 0,
                                timerActive: false,
                            },
                            recordingStartAnim: new Animated.Value(0),
                            opacityAnimation: new Animated.Value(0),
                            opacityAnimationOnce: new Animated.Value(0),
                            recorder: new Recorder(this.props.id + '.mp4', {
                                bitrate: 256000,
                                channels: 2,
                                sampleRate: 44100,
                                quality: 'max'
                            }),
                            playButtonVisible: false,
                            player: new Player(this.props.id + '.mp4'),
                            progress: 0,
                            progressInterval: 0,
                            playerActive: false,
                            playerPosition: 0,
                            lastSeek: 0,
                            loading: false,
                        });

                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        this.toggleAudioMoreMenu();
                    },
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    render() {
        const hoursDisplay = this.state.time.hours < 10 ? '0' + this.state.time.hours : this.state.time.hours;
        const minsDisplay = this.state.time.mins < 10 ? '0' + this.state.time.mins : this.state.time.mins;
        const secsDisplay = this.state.time.secs < 10 ? '0' + this.state.time.secs : this.state.time.secs;

        const secsPlayback = Math.floor(this.state.player.currentTime / 1000) % 60;
        const minsPlayback = Math.floor(secsPlayback / 60) % 60;
        const hoursPlayback = Math.floor(minsPlayback / 3600) % 60;

        const secsPlaybackDisplay = secsPlayback < 0 ? '0' + 0 : secsPlayback < 10 ? '0' + secsPlayback : secsPlayback;
        const minsPlaybackDisplay = minsPlayback < 0 ? '0' + 0 : minsPlayback < 10 ? '0' + minsPlayback : minsPlayback;
        const hoursPlaybackDisplay = hoursPlayback < 0 ? '0' + 0 : hoursPlayback < 10 ? '0' + hoursPlayback : hoursPlayback;
        return (

            <View style={styles.mainContainer}>
                {/*AudioHeader*/}
                <View style={styles.audioTitle}>
                    <TextInput
                        style={styles.textInputTitle}
                        value={this.state.audioTitle}
                        onChangeText={val => this.handleAudioTitleChange(val)}
                        placeholder='Title'
                        placeholderTextColor={'silver'}/>
                    <TouchableOpacity onPress={this.toggleAudioMoreMenu} style={styles.audioMoreMenu}>
                        <Icon
                            name='more-vert'
                            size={28}
                            color='silver'
                            style={styles.audioPauseIcon}/>
                    </TouchableOpacity>
                </View>

                {/*AudioDisplayInformation*/}
                {!this.state.playButtonVisible ?
                    <View style={styles.audioTimer}>
                        <View style={styles.audioTimerDisplay}>
                            <Text style={styles.audioTimerText}>{hoursDisplay}</Text>
                            <Text style={styles.audioTimerTextSecondary}>:</Text>
                            <Text style={styles.audioTimerText}>{minsDisplay}</Text>
                            <Text style={styles.audioTimerTextSecondary}>:</Text>
                            <Text style={styles.audioTimerText}>{secsDisplay}</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.audioTimer}>
                        <View style={styles.audioTimerDisplay}>
                            <Text style={styles.audioTimerText}>{hoursPlaybackDisplay}</Text>
                            <Text style={styles.audioTimerTextSecondary}>:</Text>
                            <Text style={styles.audioTimerText}>{minsPlaybackDisplay}</Text>
                            <Text style={styles.audioTimerTextSecondary}>:</Text>
                            <Text style={styles.audioTimerText}>{secsPlaybackDisplay}</Text>
                        </View>
                    </View>}

                {/*Slider*/}
                <View style={styles.sliderView}>
                    {this.state.playButtonVisible &&
                    <Slider
                        onValueChange={(percentage) => this.seek(percentage)}
                        style={styles.slider}
                        step={0.00001}
                        value={this.state.progress}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        // disabled={true}
                    />
                    }
                </View>

                {/*AudioButtons*/}
                <View
                    style={styles.audioButtonContainer}>
                    <Animated.View style={{
                        ...styles.stopRecordingButton,
                        zIndex: 3,
                        opacity: this.state.opacityAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0]
                        })
                    }}>
                        {this.state.playButtonVisible &&
                        (this.state.playerActive ?
                                <TouchableOpacity onPress={this.pausePlayback}>
                                    <View style={styles.pauseRecording}>
                                        <FeatherIcon
                                            name={'pause'}
                                            size={25}
                                            color={'white'}/>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={this.playPlayback} activeOpacity={0.7}
                                                  disabled={!this.state.playButtonVisible}>
                                    <AntDesignIcon name={'playcircleo'} size={51} color={'white'}/>
                                </TouchableOpacity>
                        )

                        }
                    </Animated.View>
                    <Animated.View style={{
                        zIndex: 2,
                        opacity: this.state.opacityAnimationOnce.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0]
                        })
                    }}>
                        <TouchableOpacity onPress={this.startRecording} activeOpacity={1}
                                          disabled={this.state.playButtonVisible}>
                            <View style={styles.outerCircle}>
                                <View style={styles.innerCircle}>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.stopRecordingButton,
                            opacity: this.state.opacityAnimation,
                            transform: [
                                {
                                    translateX: this.state.recordingStartAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 80]
                                    })
                                },
                            ]
                        }}>
                        <TouchableOpacity onPress={this.stopRecording}>
                            <View style={styles.recordingActiveOuter}>
                                <View style={styles.recordingActiveInner}>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={{
                            ...styles.stopRecordingButton,
                            opacity: this.state.opacityAnimation,
                            transform: [
                                {
                                    translateX: this.state.recordingStartAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -75]
                                    })
                                },
                            ]
                        }}>
                        {
                            this.state.time.timerActive ?
                                <TouchableOpacity onPress={this.pauseRecording} disabled={!this.state.time.timerActive}>
                                    <View style={styles.pauseRecording}>
                                        <FeatherIcon
                                            name={'pause'}
                                            size={25}
                                            color={'white'}/>
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={this.startRecording} activeOpacity={1}
                                                  disabled={this.state.time.timerActive}>
                                    <View style={styles.outerCircle}>
                                        <View style={styles.innerCircle}>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                        }
                    </Animated.View>
                </View>

                {/*AudioMoreMenu*/}
                <Modal
                    isVisible={this.state.audioMoreMenuVisible}
                    animationIn='slideInUp'
                    onBackdropPress={this.toggleAudioMoreMenu}
                    style={styles.modal}
                    deviceWidth={this.deviceWidth}>
                    <View>
                        <View style={styles.modalViewContainer}>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={this.removeAudio}>
                                    <Text style={styles.modalText}>Delete Recorded Audio</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={this.props.deleteNoteRow}>
                                    <Text style={styles.modalDangerText}>Delete Audio Component</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cancelModalView}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={this.toggleImageMoreMenu}>
                                <Text style={styles.cancelModalText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    ...ThemeConstants.BottomMenu,
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#3b3b3b',
        marginBottom: 12,
        width: Dimensions.get('window').width,
        ...ThemeConstants.shadowElevateButtonLow,
    },
    audioTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioMoreMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12.5,
    },
    textInputTitle: {
        flex: 1,
        width: Dimensions.get('window').width / 1.1,
        height: 60,
        fontSize: 22,
        fontWeight: '500',
        borderBottomWidth: 0.25,
        borderColor: ColorConstants.placeholderText,
        marginBottom: 10,
        borderRadius: 2,
        padding: 5,
        color: 'white'
    },
    audioTimerDisplay: {
        flexDirection: 'row',
    },
    audioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    audioTimerText: {
        width: 60,
        height: 60,
        fontSize: 45,
        textAlign: 'center',
        color: 'white',
    },
    audioTimerTextSecondary: {
        width: 20,
        height: 60,
        fontSize: 35,
        textAlign: 'center',
        color: 'white'
    },
    outerCircle: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 2,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    innerCircle: {
        backgroundColor: 'red',
        height: 45,
        width: 45,
        borderRadius: 30,
    },
    recordingActiveOuter: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 2,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    recordingActiveInner: {
        backgroundColor: 'red',
        height: 25,
        width: 25,
        borderRadius: 3,
    },
    pauseRecording: {
        height: 50,
        width: 50,
        borderRadius: 30,
        borderWidth: 2,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    audioPauseIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopRecordingButton: {
        position: 'absolute',
    },
    sliderView: {
        height: 10,
        marginTop: 10,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        width: Dimensions.get('window').width / 1.1,
    },
});

export default NotesRowAudio;
