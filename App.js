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
import ModifierProfilScreen from './screens/ModifierProfil';

const store = configureStore({
  reducer: { user },
});

const TabNavigator = () => {
 return (
   <Tab.Navigator screenOptions={{ headerShown: false }}>
     <Tab.Screen name="Profile" component={ProfileScreen} />
     <Tab.Screen name="Courses" component={CoursesScreen} />
     <Tab.Screen name="Livraisons" component={LivraisonsScreen} />
     <Tab.Screen name="Budget" component={BudgetScreen} />
   </Tab.Navigator>
 );
}

export default function App() {
  
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  
     //<Stack.Navigator screenOptions={{ headerShown: false }}></Stack.Navigator>
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
          <Stack.Screen name="Welcome2" component={WelcomeScreen2} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="ModiferProfil" component={ModifierProfilScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
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
