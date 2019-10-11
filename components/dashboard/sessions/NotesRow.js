import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ColorConstants, ThemeConstants} from '../../../Constants';
import NotesRowAudio from './NotesRowAudio';
import NotesRowImage from './NotesRowImage';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';

const NotesRow = props => {

    const [textTitle, setTextTitle] = useState('');
    const [textNote, setTextNote] = useState('');
    const [textMoreMenuVisible, setTextMoreMenuVisible] = useState(false);

    const toggleTextNoteMoreMenu = () => {
        setTextMoreMenuVisible(!textMoreMenuVisible);
    };

    useEffect(() => {
        const note = {
          ...props.note,
        };

        note.state = {
          textTitle,
          textNote,
        };

        props.updateNote(note)
    }, [textNote, textTitle]);

    const clearTextFields = () => {
        Alert.alert(
            'Clear Both Text Fields?',
            'Clearing the text field will remove your written note. You cannot undo this action.',
            [
                {
                    text: 'Clear Fields', onPress: () => {
                        setTextTitle('');
                        setTextNote('');
                        toggleTextNoteMoreMenu();
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {
                        toggleTextNoteMoreMenu();
                    },
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    };

    let noteComponent;
    switch (props.note.noteType) {
        //Case if Note is Text
        case (0):
            noteComponent = (
                <View style={styles.textContainer}>
                    <View style={styles.textNoteHeader}>
                        <TextInput
                            style={styles.textInputTitle}
                            value={textTitle}
                            onChangeText={val => setTextTitle(val)}
                            placeholder='Title'
                            placeholderTextColor={ColorConstants.placeholderText}/>
                        <TouchableOpacity onPress={toggleTextNoteMoreMenu} style={styles.textMoreMenu}>
                            <Icon
                                name='more-vert'
                                size={30}
                                color='silver'/>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        value={textNote}
                        onChangeText={val => setTextNote(val)}
                        multiline
                        placeholder='Note'
                        minHeight={160}
                        placeholderTextColor={ColorConstants.placeholderText}
                    />
                    <Modal
                        isVisible={textMoreMenuVisible}
                        animationIn='slideInUp'
                        onBackdropPress={toggleTextNoteMoreMenu}
                        style={styles.modal}
                        deviceWidth={this.deviceWidth}>
                        <View>
                            <View style={styles.modalViewContainer}>
                                <View style={styles.innerModalButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, styles.modalButtonBorder]}
                                        onPress={clearTextFields}>
                                        <Text style={styles.modalText}>Clear Text Fields</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.innerModalButtonContainer}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={props.deleteNoteRow}>
                                        <Text style={styles.modalDangerText}>Delete Text Component</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.cancelModalView}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={toggleTextNoteMoreMenu}>
                                    <Text style={styles.cancelModalText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
            break;
        //Case if Note is Image
        case (1):
            noteComponent = (
                <NotesRowImage note={props.note} updateNote={props.updateNote} deleteNoteRow={props.deleteNoteRow}/>
            );
            break;
        //Case if Note is Audio
        case (2):
            noteComponent = (
                <NotesRowAudio note={props.note} updateNote={props.updateNote} id={props.id} deleteNoteRow={props.deleteNoteRow}/>
            );
            break;
    }

    return (
        <View style={styles.mainContainer}>
            {noteComponent}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: ColorConstants.cardboard,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#3b3b3b',
        width: Dimensions.get('window').width,
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
        borderColor: ColorConstants.placeholderText,
        ...ThemeConstants.shadowElevateButtonLow,
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
        color: 'white',
        paddingStart: 6,
    },
    textInput: {
        width: Dimensions.get('window').width / 1.1,
        fontSize: 20,
        lineHeight: 22,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'justify',
        color: 'white',
        paddingStart: 0,
        paddingEnd: 5,
    },
    textNoteHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMoreMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12.5,
    },
    ...ThemeConstants.BottomMenu,
});

export default NotesRow;
