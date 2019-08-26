import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import Player from './Player';
import playlistData from './playlist.json';

export default function TrackComponent() {
  const [isStopped, setStopped] = useState(true);
  const playbackState = usePlaybackState();

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
    async function setPlaylist() {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack == null) {
        TrackPlayer.add(playlistData);
      }
    }
    setPlaylist();
  }, []);

  const [isReadyToPlay, setReadyToPlay] = useState(false);

  useEffect(() => {
    if (!isReadyToPlay && playbackState === TrackPlayer.STATE_READY) {
      setReadyToPlay(true);
    }
  }, [playbackState]);

  const togglePlayback = useCallback(async () => {
    try {
      if (playbackState === TrackPlayer.STATE_PAUSED
      || playbackState === TrackPlayer.STATE_READY
      || playbackState === TrackPlayer.STATE_NONE) {
        await TrackPlayer.play();
        setStopped(false);
      } else {
        await TrackPlayer.pause();
      }
    } catch (_) {}
  }, [playbackState]);

  const onStopPlayback = useCallback(async () => {
    try {
      await TrackPlayer.pause();
      await TrackPlayer.seekTo(0);
      setStopped(true);
    } catch (_) {}
  }, []);

  return (
    <View style={styles.container}>
      <Player
        style={styles.player}
        onTogglePlayback={togglePlayback}
        onStopPlayback={onStopPlayback}
        isStopped={isStopped}
        isReadyToPlay={isReadyToPlay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  player: {
    marginTop: 40,
  },
});
