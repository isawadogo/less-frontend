import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen1 from './screens/WelcomeScreen1';

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
  
  return (
   <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Suivant" component={WelcomeScreen1} />
       <Stack.Screen name="TabNavigator" component={TabNavigator} />
     </Stack.Navigator>
   </NavigationContainer>
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
