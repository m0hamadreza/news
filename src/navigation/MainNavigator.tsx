// NativeWind styles must register inside the EXPOSED module graph so they load
// both standalone (index.js) and when federated into the host (which only loads
// this exposed module, not index.js).
import '../../global.css';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
    </Main.Navigator>
  );
};

export default MainNavigator;
