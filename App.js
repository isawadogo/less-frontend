import React from 'react';
import { StyleSheet } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ModifierProfilScreen from './screens/ModifierProfilScreen';
import ProfilScreen from './screens/ProfilScreen';
import AideScreen from './screens/AideScreen';
import ReglageNotifScreen from './screens/ReglageNotifScreen'
import LangueScreen from './screens/LangueScreen';
import CGUScreen from './screens/CGUScreen';
import { configureStore } from '@reduxjs/toolkit';

import WelcomeScreen1 from './screens/WelcomeScreen1';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen2 from './screens/WelcomeScreen2';
import InscriptionScreen from './screens/InscriptionScreen';

import { Provider } from 'react-redux';
import user from './reducers/user';
import HomeScreen from './screens/HomeScreen';

import CreerListeScreen from './screens/CreerListeScreen';

const store = configureStore({
  reducer: { user },
});


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfilStack = createNativeStackNavigator();

function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen name="Profil" component={ProfilScreen} />
      <ProfilStack.Screen name="Aide" component={AideScreen} />
      <ProfilStack.Screen name="Reglage des notifications" component={ReglageNotifScreen} />
      <ProfilStack.Screen name="Langue" component={LangueScreen} />
      <ProfilStack.Screen name="Conditions Générales" component={CGUScreen} />
      <ProfilStack.Screen name="ModifierProfil" component={ModifierProfilScreen} />
    </ProfilStack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="ProfilHome" component={ProfilStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
          <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="CreerListe" component={CreerListeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}