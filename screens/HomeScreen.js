import { SafeAreaView, Modal, Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Pressable } from 'react-native';

import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowRight, faBell } from '@fortawesome/free-solid-svg-icons';

import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logoutUser } from '../reducers/user';
import { array } from 'yup';
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
    return (<View></View>)  }

  //import de la police
  const [loaded, error] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
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
    margin: 20,
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userName:{
    fontFamily: 'Raleway-Bold',
    color: '#2B0D35',
    fontSize: 16,
  },

  userMail:{
    fontFamily: 'Raleway-Regular',
    color: '#7E7E7E',
    fontSize: 13,
  },

  salutation: {
    fontFamily: 'Raleway-Bold',
    color: '#25000D',
    fontSize: 26,
    marginTop: 30,
    marginBottom: 15,
  },

  startContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDFD',
    borderRadius: 40,
    padding: 15,
  },

  startTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 140,
  },

  mainText: {
    fontFamily: 'Raleway-Regular',
    color: '#2B0D35',
    fontSize: 24,
    marginBottom: 10,
  },

  subTilte: {
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Raleway-Bold',
    color: '#2B0D35',
    fontSize: 16,
  },

  barContainer: {
    height: 20,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
  },

  progressBar: {
    height: 20,
    borderRadius: 20,
    fontFamily: 'Raleway-Regular',
    backgroundColor: '#2B0D35',
    color: '#fff',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#2B0D35',
  },

  textButton: {
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
    color: 'white',
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 20,
    paddingEnd: 10,
    marginBottom: 15,
    borderRadius: 40,
  },

  listText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#25000D',
  },
  
  listDate: {
    fontSize: 10,
    fontFamily: 'Raleway-Regular',
    color: '#7F7F7F',
  },

  arrow: {
    color: '#7CD6C1',
  },

});
