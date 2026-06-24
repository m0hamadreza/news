// NativeWind styles must register inside the EXPOSED module graph so they load
// both standalone (index.js) and when federated into the host (which only loads
// this exposed module, not index.js).
import '../../global.css';
import React from 'react';
import {View} from 'react-native';
import {vars} from 'nativewind';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';

// news's brand color — scoped to news's subtree via the --color-brand* CSS
// variables so it never leaks into the host or other mini-apps.
// Every shade is set so the whole `brand-50`..`brand-900` ramp resolves here.
const newsTheme = vars({
  '--color-brand-50': '#fde7ee',
  '--color-brand-100': '#fbcedd',
  '--color-brand-200': '#f89ebc',
  '--color-brand-300': '#f46d9a',
  '--color-brand-400': '#f13d79',
  '--color-brand-500': '#ed0c57',
  '--color-brand-600': '#be0a46',
  '--color-brand-700': '#8e0734',
  '--color-brand-800': '#5f0523',
  '--color-brand-900': '#2f0211',
});

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <View style={[{flex: 1}, newsTheme]}>
      <Main.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Main.Screen name="Tabs" component={TabsNavigator} />
      </Main.Navigator>
    </View>
  );
};

export default MainNavigator;
