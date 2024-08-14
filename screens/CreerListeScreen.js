import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
//import { Pressable, Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';
import LessCheckbox from '../modules/LessCheckbox';

import { frontConfig } from '../modules/config';

const API_KEY = 'a800a7fd-33ef-4eba-9b70-2e846cae67a5'

export default function CreerListeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [categories, setCategories] = useState([]);
  const [nomListe, setNomListe] = useState('');

  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      // Get categories

      try {
        const conReq = await fetch(frontConfig.backendURL + '/produits/categories', {
          method: 'GET',
          headers: { "Content-Type": "application/json", "authorization": API_KEY },
        });
        if (!conReq.ok) {
          throw new Error('Connection returned a non 200 http code');
        }
        const resJson = await conReq.json();
        console.log('connection result : ', resJson);
        if (resJson.result) {
          return 0;
        } else {
          console.log('Failed to get categories list from the backend : ', resJson.error);
        }
      } catch (err) {
        console.log('Connection to the backend failed');
        console.log(err.stack);
      }
    })();
  }, []);

  console.log('Creer liste screen - user details : ', user);
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>

      <View >
        <TextInput style={styles.textInput} onChangeText={(value) => setNomListe(value)} value={nomListe} placeholder='Ma super liste' />
      </View>
      <Text>Reprendre une liste</Text>
      <Button
        title='Commencer'
      />
      <Text>Reprendre une liste enregistrée</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'right',
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 40,
    margin: 10,
    padding: 'auto',
    color: 'red'
  },
});
