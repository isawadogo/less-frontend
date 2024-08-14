import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);

  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [email, setEmail] = useState(user.email)

  useEffect(() => {
    (() => {
      if (!user.id) {
        navigation.navigate('Login');
      } else {
        setEmail(user.email)
        setPrenom(user.prenom);
        setNom(user.nom);
      }
    })();
  }, [user]);

  console.log('Dashboard screen - user details : ', user);
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>{nom}</Text>
      <Text>{email}</Text>
      <Text>Bonjour {user.prenom}</Text>


      <Button
        title='Commencer'
        onPress={() => navigation.navigate('CreerListe')}
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
  menu: {
    backgroundColor: '#655074',
    height: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    border: 'none',
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
    marginBottom: 25,
  },
  imageWrapper: {
    height: '80%',
    backgroundColor: '#655074',
    border: 'none',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 160,
    backgroundColor: '#ffffff',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    color: '#ffffff',
    position: 'relative',
    bottom: 2,
  },
});
