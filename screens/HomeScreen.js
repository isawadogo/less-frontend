import { SafeAreaView, Modal, Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';

import React, { useState, useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, removeListe } from '../reducers/user';

import { getUserListes, deleteListe } from '../modules/listesFunctions';
import { ExistingListesComponents } from '../modules/components';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);
  const dispacth = useDispatch();
  //const useFocus = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      if (!user.id) {
        navigation.navigate('Login');
      }

      const getListes = async () => {
        let ignore = false;
        getUserListes(user.token, user.id).then(listes => {
          if (!ignore) {
            setUserListes(listes);
            setIsReady(true);
          }
        });
      }

      getListes();

      return () => {
        ignore = true;
      }
    }, [])
  );
/*
  useEffect(() => {
    (async () => {
      if (!user.id) {
        navigation.navigate('Login');
      }
      let ignore = false;
      getUserListes(user.token, user.id).then(listes => {
        console.log('Listes : ', userListes)
        if (!ignore) {
          setUserListes(listes);
          setIsReady(true);
        }
      });
      return () => {
        ignore = true;
      }

    })();
  }, []);
  */
  //console.log('FOCUS STATE : ', useFocus);

  const handleDeconnection = () => {
    dispacth(logoutUser());
    dispacth(removeListe());
    navigation.navigate('Login');
  }

  const handleDeleteListe = (id) => {
    deleteListe(user.token, id)
    .then(res => {
      if (res) {
        setIsReady(false);
        getUserListes(user.token, user.id).then(listes => {
            setUserListes(listes);
            setIsReady(true);
        });
      }
    })
  }

  if (!isReady) {
    return (<View></View>)
  }
  //console.log('Dashboard screen - user details : ', user);
  //console.log('Dashboard screen - existing lists: ', userListes);
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text>{user.nom}</Text>
      <Text>{user.email}</Text>
      <Text>Bonjour {user.prenom}</Text>

      <Button
        title='Commencer'
        onPress={() => navigation.navigate('CreerListe')}
      />
      <Text></Text> 
      <Text>Mes anciennes listes</Text>
      <Text></Text> 
      <ExistingListesComponents currentListes={userListes} deleteAction={handleDeleteListe} />
      <Text></Text> 
      <Button
        title='Deconnexion'
        onPress={handleDeconnection}
      />
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
