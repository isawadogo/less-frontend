import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Text } from 'react-native'
import { useFonts } from 'expo-font';

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
import Notifications from './screens/NotificationScreen';
import ModifierPasswordScreen from './screens/ModifierPasswordSreen';

import WelcomeScreen1 from './screens/WelcomeScreen1';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen2 from './screens/WelcomeScreen2';
import InscriptionScreen from './screens/InscriptionScreen';

import user from './reducers/user';
import notifications from './reducers/notifications';
import liste from './reducers/liste';

import HomeScreen from './screens/HomeScreen';

import CreerListeScreen from './screens/CreerListeScreen';
import ChoisirListeProduitsScreen from './screens/ChoisirListeProduitsScreen';
import RecapListeProduitsScreen from './screens/RecapListeProduitsScreen';
import ResultatComparaisonScreen from './screens/ResultatComparaisonScreen';
import ResultasDetailArticlesScreen from './screens/ResultatsDetailArticlesScreen';

import BudgetScreen from './screens/BudgetScreen';
import Header from './composant/Header';

// création de la navigation par Stack et Tab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ProfilStack = createNativeStackNavigator();
const ListStack = createNativeStackNavigator();

// configuration du store
const store = configureStore({
  reducer: { user, liste, notifications },
});


// Stack de Navigation du profile
function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
      <ProfilStack.Screen name="Aide" component={AideScreen} initialParams={{ titre: 'Aide' }} />
      <ProfilStack.Screen name="Reglage des notifications" component={ReglageNotifScreen} initialParams={{ titre: 'Réglages des notifications' }} />
      <ProfilStack.Screen name="Langue" component={LangueScreen} initialParams={{ titre: 'Langues' }} />
      <ProfilStack.Screen name="Conditions Générales" component={CGUScreen} initialParams={{ titre: 'Conditions générales de ventes' }} />
      <ProfilStack.Screen name="ModifierMotDePasse" component={ModifierPasswordScreen} initialParams={{ titre: 'Modifier mon mot de passe' }} />
      <ProfilStack.Screen name="ModifierProfil" component={ModifierProfilScreen} initialParams={{ titre: 'modifier notre Profil' }} />
    </ProfilStack.Navigator>
  )
}

function ListStackScreen() {
  return (
    <ProfilStack.Navigator screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Stack.Screen name="CreerListe" component={CreerListeScreen} initialParams={{ titre: 'Nouvelle liste' }} />
      <Stack.Screen name='ChoisirListeProduits' component={ChoisirListeProduitsScreen} initialParams={{ titre: 'Choix de vos articles' }} />
      <Stack.Screen name='RecapListeProduits' component={RecapListeProduitsScreen} initialParams={{ titre: 'Vos articles' }} />
      <Stack.Screen name='ResultatComparaison' component={ResultatComparaisonScreen} initialParams={{ titre: 'Les meilleurs matchs' }} />
      <Stack.Screen name='ResultasDetailArticlesScreen' component={ResultasDetailArticlesScreen} initialParams={{ titre: 'Les meilleurs matchs' }} />
    </ProfilStack.Navigator>
  )
}

const TabNavigator = () => {

  //import de la police pour le TabNavigator
  const [loaded, error] = useFonts({
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <Tab.Navigator
      // Personnalisation du style  de la barre de menu 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingTop: 13,
          position: 'absolute',
          elevation: 0,
          height: 70,
          backgroundColor: '#2B0D35',

        },
        tabBarIcon: ({ focused }) => {

          let iconeType
          let iconeColor = 'white';
          let iconSize = focused ? 25 : 20;

          if (route.name === 'Acceuil') {
            iconeType = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Compte') {
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
      <Tab.Screen name="Compte" component={ProfilScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  //import de la police pour le TabNavigator
  const [loaded, error] = useFonts({
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
          <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfilStackScreen} />
          <Stack.Screen name="Liste" component={ListStackScreen} />
          <Stack.Screen name='Notifications' component={Notifications} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
})