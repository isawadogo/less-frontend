import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

import WelcomeScreen1 from './screens/WelcomeScreen1';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen2 from './screens/WelcomeScreen2';
import InscriptionScreen from './screens/InscriptionScreen';
import ModifierProfilScreen from './screens/ModifierProfilScreen';
import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import AideScreen from './screens/AideScreen';
import CGUScreen from './screens/CGUScreen';

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const StackProfile = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
 return (
   <Tab.Navigator screenOptions={{ headerShown: true }}>
     <Tab.Screen name="Accueil" component={HomeScreen} />
     <Tab.Screen name="Profil" component={ProfilScreen} />
   </Tab.Navigator>
 );
}

export default function App() {
  
  
     //<Stack.Navigator screenOptions={{ headerShown: false }}></Stack.Navigator>
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true}}>
          <Stack.Group>
            <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
            <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Dashboard" component={HomeScreen} />
            <Stack.Screen name="ModifierProfil" component={ModifierProfilScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Aide" component={AideScreen} />
            <Stack.Screen name="CGU" component={CGUScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
