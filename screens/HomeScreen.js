import { Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowRight, faBell } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logoutUser } from '../reducers/user';
import { array } from 'yup';

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);

  const dispacth = useDispatch();
  useEffect(() => {
    (() => {
      if (!user.id) {
        navigation.navigate('Login');
      }
    })();
  }, [user]);

  const handleDeconnection = () => {
    dispacth(logoutUser());
    navigation.navigate('Login');
  }

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
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.userName}>{user.nom}Prénom Nom</Text>
          <Text style={styles.userMail}>{user.email}</Text>
        </View>
        <FontAwesomeIcon icon={faBell}/>
      </View>
      
      <View>
        <Text style={styles.salutation}>Bonjour {user.prenom}Prénom !</Text>

        <View style={styles.startContainer}>
          <View style={styles.startTextContainer}>
            <Text style={styles.mainText}>prêtes pour une nouvelle course ?</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('CreerListe')}>
              <Text style={styles.textButton}>commencer</Text>
            </Pressable>
          </View>
          <Image source={require('../assets/illustration-home.png')}
      />
        </View>

        <Text style={styles.subTilte}>Reste 35€ à dépenser</Text>
        <View style={styles.barContainer}>
                    <Text style={[styles.progressBar, {width:'75%'}]}>120€</Text>
        </View>

        <Text style={styles.subTilte}>Reprendre une liste enregistrée</Text>
        <View style={styles.listContainer}>
          <View>
            <Text style={styles.listText}>Petit déj'</Text>
            <Text style={styles.listDate}>Créer le 13/03/2021</Text>
          </View>
          <FontAwesomeIcon icon={faCircleArrowRight} style={styles.arrow}/>
        </View>
        <View style={styles.listContainer}>
          <View>
            <Text style={styles.listText}>Petit déj'</Text>
            <Text style={styles.listDate}>Créer le 13/03/2021</Text>
          </View>
          <FontAwesomeIcon icon={faCircleArrowRight} style={styles.arrow}/>
        </View>
        <View style={styles.listContainer}>
          <View>
            <Text style={styles.listText}>Petit déj'</Text>
            <Text style={styles.listDate}>Créer le 13/03/2021</Text>
          </View>
          <FontAwesomeIcon icon={faCircleArrowRight} style={styles.arrow} rotation={90}/>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleDeconnection}>
        <Text style={styles.textButton}>Déconnexion</Text>
      </Pressable>

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
