import React from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {ColorConstants, ThemeConstants} from '../../Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import BackgroundTimer from 'react-native-background-timer';
import NotesRow from '../../components/dashboard/sessions/NotesRow';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {addSession} from '../../redux/actions/bookActions';

//TODO Checkbox - Update Ending Page On Dashboard
class AddSessionScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Add Session',
        headerStyle: {
            backgroundColor: ColorConstants.cardboard,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: '600',
        },
        headerRight: (
            <TouchableOpacity style={styles.addButton} onPress={navigation.getParam('saveSession')}>
                <Text style={styles.modalTextHeader}>Save</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
                <Ionicon name='ios-arrow-back' size={30}/>
            </TouchableOpacity>
        )
    });

    state = {
        time: {
            secs: 0,
            mins: 0,
            hours: 0,
            counter: 0,
            dateStarted: new Date(),
            timerActive: false,
        },
        isAddNotesModalActive: false,
        notesList: [
        ],
        sessionName: '',
        startingPage: this.props.navigation.getParam('pagesRead') + '',
        endingPage: '',
        sessionNameRequired: false,
        startingPageRequired: true,
        endingPageRequired: false,
    };

    updateNoteState = note => {
        const targetNoteIndex = this.state.notesList.findIndex(item => item.id === note.id);

        const notesListTemp = [...this.state.notesList];
        notesListTemp[targetNoteIndex] = note;

        this.setState({
            notesList: notesListTemp,
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.notesList !== this.state.notesList) {
            this.props.navigation.setParams({
                saveSession: this.saveSession,
            });
        }
    }

    saveSession = () => {
        let saveSession = true;
        if (this.state.sessionName === '') {
            this.setState({
                sessionNameRequired: true,
            });
            saveSession = false;
        } else {
            this.setState({
                sessionNameRequired: false,
            });
        }

        if (this.state.startingPage === '') {
            this.setState({
                startingPageRequired: true,
            });
            saveSession = false;
        } else {
            this.setState({
                startingPageRequired: false,
            });
        }

        if (this.state.endingPage === '') {
            this.setState({
                endingPageRequired: true,
            });
            saveSession = false;
        } else {
            this.setState({
                endingPageRequired: false,
            });
        }

        if (saveSession) {
            const session = {
                bookKey: this.props.navigation.getParam('bookKey'),
                time: {...this.state.time},
                notesList: [...this.state.notesList],
                sessionName: this.state.sessionName,
                startingPage: this.state.startingPage,
                endingPage: this.state.endingPage,
            };

            this.props.addSession(session);
            this.props.navigation.goBack();
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({
            saveSession: this.saveSession,
        });
    }

    handleInput = key => (
        val => {
            this.setState({[key]: val});
        }
    );

    handleStartingPage = this.handleInput('startingPage');
    handleEndingPage = this.handleInput('endingPage');
    handleSessionName = this.handleInput('sessionName');

    startTimer = () => {
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                timerActive: true,
                dateStarted: new Date(),
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
    };

    pauseTimer = () => {
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                timerActive: false,
            }
        }));

        BackgroundTimer.stopBackgroundTimer();
    };

    resetTimer = () => {
        this.setState(prevState => ({
            time: {
                ...prevState.time,
                counter: 0,
                secs: 0,
                mins: 0,
                hours: 0,
                timerActive: false,
            },
        }));

        BackgroundTimer.stopBackgroundTimer();
    };

    addNotesModalToggle = () => {
        this.setState(prevState => ({
            isAddNotesModalActive: !prevState.isAddNotesModalActive,
        }));
    };

    addTextBox = () => {
        this.setState(prevState => ({
            notesList: [...prevState.notesList, {
                id: prevState.notesList.length,
                noteType: 0,
                state: {}
            }]
        }));
        this.addNotesModalToggle();
    };

    addImageBox = () => {
        this.setState(prevState => ({
            notesList: [...prevState.notesList, {
                id: prevState.notesList.length,
                noteType: 1,
                state: {}
            }]
        }));
        this.addNotesModalToggle();
    };

    addAudioBox = () => {
        this.setState(prevState => ({
            notesList: [...prevState.notesList, {
                id: prevState.notesList.length,
                noteType: 2,
                state: {}
            }]
        }));
        this.addNotesModalToggle();
    };

    deleteNoteRow = item => {
        let noteType;
        switch (item.id) {
            case 0 :
                noteType = 'Text';
                break;
            case 1:
                noteType = 'Image';
                break;
            case 2:
                noteType = 'Audio';
                break;
        }
        Alert.alert(
            'Delete ' + noteType + ' Component?',
            'This will remove the ' + noteType + ' component from your session. You cannot undo this action',
            [
                {
                    text: 'Delete', onPress: () => {
                        const filteredList = this.state.notesList.filter(x => x.id != item.id);
                        this.setState({
                            notesList: filteredList,
                        });
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    renderNotesRow = ({item}) => (
        <NotesRow updateNote={this.updateNoteState} note={item} deleteNoteRow={() => this.deleteNoteRow(item)}/>
    );

    renderPageHeader = () => {
        const hoursDisplay = this.state.time.hours < 10 ? '0' + this.state.time.hours : this.state.time.hours;
        const minsDisplay = this.state.time.mins < 10 ? '0' + this.state.time.mins : this.state.time.mins;
        const secsDisplay = this.state.time.secs < 10 ? '0' + this.state.time.secs : this.state.time.secs;

        return (
            <View style={styles.listHeader}>
                <View
                    style={styles.timerContainer}>
                    <View style={styles.sessionTimerDisplay}>
                        <Text style={styles.sessionTimerDisplayText}>{hoursDisplay}</Text>
                        <Text style={styles.sessionTimerDisplayTextSecondary}>:</Text>
                        <Text style={styles.sessionTimerDisplayText}>{minsDisplay}</Text>
                        <Text style={styles.sessionTimerDisplayTextSecondary}>:</Text>
                        <Text style={styles.sessionTimerDisplayText}>{secsDisplay}</Text>
                    </View>
                    <View style={styles.linebreak}>
                    </View>
                    <View style={styles.sessionTimerButtonView}>
                        <TouchableOpacity onPress={this.resetTimer} style={styles.buttonTimer}>
                            <AntDesignIcon name={'closecircleo'} size={60} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.state.time.timerActive ? this.pauseTimer : this.startTimer}>
                            {this.state.time.timerActive ?
                                <AntDesignIcon name={'pausecircleo'} size={60} color={'white'}
                                               style={styles.buttonTimer}/>
                                :
                                <AntDesignIcon name={'playcircleo'} size={60} color={'white'}
                                               style={styles.buttonTimer}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView behavior='padding' style={styles.pageInfo}>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.innerContainerText}>Session Name</Text>
                        {!this.state.sessionNameRequired ?
                            <TextInput
                                style={styles.TextInput}
                                value={this.state.sessionName}
                                onChangeText={val => this.handleSessionName(val)}/>
                            :
                            <TextInput
                                style={styles.requiredTextInput}
                                value={this.state.sessionName}
                                onChangeText={val => this.handleSessionName(val)}
                                placeholderTextColor={'#F08080'}
                                placeholder={'Required Field'}/>
                        }
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.innerContainerText}>Starting Page</Text>
                        {this.state.startingPage ?
                            <TextInput
                                style={styles.TextInput}
                                value={this.state.startingPage}
                                onChangeText={val => this.handleStartingPage(val)}
                                keyboardType='numeric'/>
                            :
                            <TextInput
                                style={styles.requiredTextInput}
                                value={this.state.startingPage}
                                onChangeText={val => this.handleStartingPage(val)}
                                placeholderTextColor={'#F08080'}
                                placeholder={'Required Field'}/>
                        }
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text style={styles.innerContainerText}>Page Left Off</Text>
                        {!this.state.endingPageRequired ?
                            <TextInput
                                style={[styles.TextInput, styles.noBottomBorder]}
                                value={this.state.endingPage}
                                onChangeText={val => this.handleEndingPage(val)}
                                keyboardType='numeric'/>
                            :
                            <TextInput
                                style={styles.requiredTextInput}
                                value={this.state.endingPage}
                                onChangeText={val => this.handleEndingPage(val)}
                                keyboardType='numeric'
                                placeholderTextColor={'#F08080'}
                                placeholder={'Required Field'}/>
                        }
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    };

    renderPageFooter = () => {
        return (
            <View>
                <View style={styles.addNotesView}>
                    <TouchableOpacity style={styles.addNotesButton} activeOpacity={0.7}
                                      onPress={this.addNotesModalToggle}>
                        <Text style={styles.addNotesButtonText}>Add Notes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView>
                    {this.renderPageHeader()}
                    <View style={styles.notesListContainer}>
                        <FlatList
                            data={this.state.notesList}
                            renderItem={this.renderNotesRow}
                            style={styles.notesList}
                            keyExtractor={item => '' + item.id}
                            extraData={this.state}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                        />
                    </View>
                    {this.renderPageFooter()}
                </KeyboardAwareScrollView>

                <Modal
                    isVisible={this.state.isAddNotesModalActive}
                    animationIn='slideInUp'
                    onBackdropPress={this.addNotesModalToggle}
                    style={styles.modal}
                    deviceWidth={this.deviceWidth}>
                    <View>
                        <View style={styles.modalViewContainer}>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={this.addTextBox}>
                                    <Text style={styles.modalText}>Add Text Note</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={this.addImageBox}>
                                    <Text style={styles.modalText}>Add Image Note</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.innerModalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.modalButton, styles.modalButtonBorder]}
                                    onPress={this.addAudioBox}>
                                    <Text style={styles.modalText}>Add Audio Note</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.cancelModalView}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={this.addNotesModalToggle}>
                                <Text style={styles.cancelModalText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstants.cardboard,
    },
    addButton: {
        height: 40,
        width: 50,
        justifyContent: 'center',
    },
    modalTextHeader: {
        fontSize: 18,
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    },
    timerContainer: {
        width: Dimensions.get('window').width,
        height: 200,
        ...ThemeConstants.shadowElevateButton,
        justifyContent: 'center',
        backgroundColor: '#3b3b3b',
    },
    addNotesView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    addNotesButton: {
        width: ThemeConstants.windowWidth,
        backgroundColor: '#23b033',
        height: 50,
        ...ThemeConstants.shadowElevateButtonLow,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    addNotesButtonText: {
        fontSize: 18,
        color: 'white',
    },
    ...ThemeConstants.BottomMenu,
    notesListContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorConstants.cardBoardSecondary,
    },
    notesList: {
        flex: 1,
        backgroundColor: ColorConstants.cardBoardSecondary,
    },
    listHeader: {
        marginBottom: 12,
        alignItems: 'center',
    },
    sessionTimerDisplay: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sessionTimerDisplayText: {
        width: 70,
        height: 70,
        fontSize: 60,
        textAlign: 'center',
        color: 'white',
    },
    sessionTimerDisplayTextSecondary: {
        width: 30,
        height: 70,
        fontSize: 50,
        textAlign: 'center',
        color: 'white'
    },
    sessionTimerButtonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonTimer: {
        marginLeft: 25,
        marginRight: 25,
    },
    linebreak: {
        marginTop: 15,
        borderBottomWidth: 0.25,
        borderBottomColor: ColorConstants.placeholderText,
        marginLeft: 20,
        marginRight: 20,
    },
    textInputContainer: {
        justifyContent: 'center',
        margin: 5,

    },
    innerContainerText: {
        marginTop: 5,
        marginBottom: 5,
        color: 'silver',
        fontSize: 16,
    },
    TextInput: {
        width: Dimensions.get('window').width / 1.1,
        height: 30,
        fontSize: 16,
        borderBottomWidth: 0.25,
        borderBottomColor: 'silver',
    },
    requiredTextInput: {
        width: Dimensions.get('window').width / 1.1,
        height: 30,
        fontSize: 16,
        borderBottomWidth: 0.25,
        borderBottomColor: 'red',
    },
    pageInfo: {
        marginTop: 20,
        marginBottom: 20,
    }
});

const mapDispatchToProps = {
    addSession: addSession,
};
export default connect(null, mapDispatchToProps)(AddSessionScreen);
