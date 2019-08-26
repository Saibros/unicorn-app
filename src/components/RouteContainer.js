import React from 'react';
import { SafeAreaView } from 'react-navigation';

const RouteContainer = ({ style, children }) => (
  <SafeAreaView style={style}>{children}</SafeAreaView>
);

export default RouteContainer;
