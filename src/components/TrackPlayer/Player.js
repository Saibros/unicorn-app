import React from 'react';
import PropTypes from 'prop-types';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import {
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import Button from 'src/components/Button';
import UnicornsBar from './UnicornsBar';


const Player = (props) => {
  const playbackState = usePlaybackState();

  const { style, onTogglePlayback, onStopPlayback, isStopped, isReadyToPlay } = props;

  var mainButtonText = 'Play';

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    mainButtonText = 'Pause';
  }

  const isConnecting = playbackState === TrackPlayer.STATE_CONNECTING || !isReadyToPlay;

  return (
    <View style={[s.card, style]}>
      <UnicornsBar isAnimating={playbackState === TrackPlayer.STATE_PLAYING} />
      <View style={s.controls}>
        <Button
          text={mainButtonText}
          disabled={isConnecting}
          onPress={onTogglePlayback}
          style={s.button}
          isLight
          isLoading={isConnecting}
        />
        <Button
          text={'Stop'}
          disabled={isStopped}
          onPress={onStopPlayback}
          style={s.button}
          isLight
        />
      </View>
    </View>
  );
};

Player.propTypes = {
  style: ViewPropTypes.style,
  onStopPlayback: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const s = StyleSheet.create({
  card: {
    width: '100%',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
  },
  controls: {
    marginVertical: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    flex: 1,
  },
});

export default Player;
