import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Text } from 'react-native'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

/* NAVIGATION */

// importation des modules react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// importation des screens
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
import BudgetScreen from './screens/BudgetScreen';
import Header from './composant/Header';

// création de la navigation par Stack et Tab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfilStack = createNativeStackNavigator();


const store = configureStore({
  reducer: { user },
});



function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>

      <ProfilStack.Screen name="Aide" component={AideScreen} />
      <ProfilStack.Screen name="Reglage des notifications" component={ReglageNotifScreen} />
      <ProfilStack.Screen name="Langue" component={LangueScreen} />
      <ProfilStack.Screen name="Conditions Générales" component={CGUScreen} />
      <ProfilStack.Screen name="ModifierProfil" component={ModifierProfilScreen} option={{ title: 'modifier notre Profil' }} />
    </ProfilStack.Navigator>
  )
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // Personnalisation du style  de la barre de menu 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 13,
          position: 'absolute',
          elevation: 0,
          height: 90,
          backgroundColor: '#2B0D35',

        },
        tabBarIcon: ({ focused }) => {

          let iconeType
          let iconeColor = focused ? 'white' : 'white';
          let iconSize = focused ? 30 : 25;

          if (route.name === 'Acceuil') {
            iconeType = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profil') {
            iconeType = focused ? 'person' : 'person-outline'
          } else if (route.name === 'Budget') {
            iconeType = focused ? 'wallet' : 'wallet-outline'
          }
          return <Ionicons name={iconeType} size={iconSize} color={iconeColor} />
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 14,
        }
      })}

    >
      <Tab.Screen name="Acceuil" component={HomeScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   RalewayRegular: require('./assets/fonts/RalewayRegular.ttf'),
  // });

  // if (!fontsLoaded) {
  //   return <ActivityIndicator style={styles.loading} />;
  // }
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