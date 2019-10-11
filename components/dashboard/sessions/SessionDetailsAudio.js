import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeConstants} from '../../../Constants';
import {material} from 'react-native-typography';
import Slider from '@react-native-community/slider';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const SessionDetailsAudio = props => {

    const [progress, setProgress] = useState(0);
    const [playerActive, setPlayerActive] = useState(false);

    const title = props.note.state.audioTitle;
    const player = props.note.state.player;

    const seek = percentage => {
        if (!player) {
            return;
        }

        let position = percentage * player.duration;

        player.seek(position);
    };

    const pausePlayback = () => {
        player.pause();
    };

    const playPlayback = () => {
        if (player.isPaused) {
            player.play();
        } else {
            player.prepare(() => {
                player.play();
            });
        }
    };

    useEffect(() => {
        const progressInterval = setInterval(() => {
            if (player) {
                let currentProgress = Math.max(0, player.currentTime) / player.duration;
                if (isNaN(currentProgress)) {
                    currentProgress = 0;
                }
                setProgress(currentProgress);
                if (player.isPlaying) {
                    setPlayerActive(true);
                } else {
                    setPlayerActive(false);
                }
            }

        }, 100);


        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <View style={styles.mainContainer}>
            <Text style={[material.headline, styles.title]}>{title}</Text>
            <Slider
                onValueChange={(percentage) => seek(percentage)}
                style={styles.slider}
                step={0.00001}
                value={progress}
                minimumTrackTintColor="black"
                maximumTrackTintColor="silver"
                thumbTintColor={'white'}
            />
            <View style={styles.playerButtons}>
                <View style={[styles.playbackButton, !playerActive ? {opacity: 0.5} : {opacity: 1}]}>
                    <TouchableOpacity onPress={pausePlayback} disabled={!playerActive} activeOpacity={0.5}>
                        <View style={styles.pauseButton}>
                            <FeatherIcon
                                name={'pause'}
                                size={40}
                                color={'black'}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.playbackButton, playerActive ? {opacity: 0.5} : {opacity: 1}]}>
                    <TouchableOpacity onPress={playPlayback} activeOpacity={0.5}
                                      disabled={playerActive}>
                        <AntDesignIcon name={'playcircleo'} size={50} color={'black'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        ...ThemeConstants.shadowElevateButton
    },
    title: {
        marginBottom: 10,
    },
    playerButtons: {
        width: Dimensions.get('window').width / 1.1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    playbackButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    pauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        height: 50,
        width: 50,
        borderWidth: 3,
    }
});

export default SessionDetailsAudio;
