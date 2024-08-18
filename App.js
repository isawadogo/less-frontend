import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text } from 'react-native'



// import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ModifierProfilScreen from './screens/ModifierProfilScreen';
import ProfilScreen from './screens/ProfilScreen';
import AideScreen from './screens/AideScreen';
import ReglageNotifScreen from './screens/ReglageNotifScreen'
import LangueScreen from './screens/LangueScreen';
import CGUScreen from './screens/CGUScreen';

import WelcomeScreen1 from './screens/WelcomeScreen1';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen2 from './screens/WelcomeScreen2';
import InscriptionScreen from './screens/InscriptionScreen';

import user from './reducers/user';
import HomeScreen from './screens/HomeScreen';

import CreerListeScreen from './screens/CreerListeScreen';
import ChoisirListeProduitsScreen from './screens/ChoisirListeProduitsScreen';
import RecapListeProduitsScreen from './screens/RecapListeProduitsScreen';
import ResultatComparaisonScreen from './screens/ResultatComparaisonScreen';

const store = configureStore({
  reducer: { user },
});


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfilStack = createNativeStackNavigator();

function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator>
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
      <Tab.Screen name="ProfilHome" component={ProfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayRegular: require('./assets/fonts/RalewayRegular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.loading} />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
          <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="CreerListe" component={CreerListeScreen} />
          <Stack.Screen name='ChoisirListeProduits' component={ChoisirListeProduitsScreen} />
          <Stack.Screen name='RecapListeProduits' component={RecapListeProduitsScreen} />
          <Stack.Screen name='ResultatComparaison' component={ResultatComparaisonScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfilStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RalewayRegular',
    fontSize: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})