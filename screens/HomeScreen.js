/* IMPORTS */

//import des éléments React et React Native
import { Modal, Button, Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
//import React Navigation
import { useFocusEffect } from '@react-navigation/native';
//import Redux et reducers
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logoutUser, removeListe } from '../reducers/user';
import { reset } from '../reducers/notifications';

import { array } from 'yup';
//import des modules
import { getUserListes, deleteListe } from '../modules/listesFunctions';
import { getUserCoordinates } from '../modules/userFunctions';
import { ExistingListesComponents } from '../modules/components';
//import des icones
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleArrowRight, faBell } from '@fortawesome/free-solid-svg-icons';

/* FONCTION HOMESCREEN */

function ProfilCheckDialog({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Button 
        title='Annuler'
      />
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View >
            <View >
              <Text> Votre profil n'est pas suffisamment complet</Text>
              <Text> Vous devez renseigner vos critères et votre adresse</Text>
              <Button 
                title='Mettre à jour mon profil'
                onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil' })}
              />
              <Button
                title='Annuler'
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
    </View>
  )
}

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const [userListes, setUserListes] = useState([]);
  const [ isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const unreadCount = useSelector(state => state.notifications.unreadCount)
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


  const handleDeconnection = () => {
    dispatch(logoutUser());
    dispatch(removeListe());
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

  const checkUserProfil = (userDetails) => {
     const valuesCriteres = Object.values(userDetails.criteres)
     if (valuesCriteres.some((v) => v === true)) {
      return true;
     }
     if (userDetails.adresses && user.adresses.length  > 0) {
      if (userDetails.adresses.some((a) => 
        (a.commune && a.commune.length > 0) &&
        (a.nomDeRue && a.nomDeRue.length > 0) &&
        (a.numeroDeRue && a.numeroDeRue.length > 0) &&
        (a.codePostal && a.codePostal > 0)
      ) ) {
        return true;
      }
     }
     return false;
  }

  const handleCreerListe = () => {
    if (checkUserProfil(user)) {
      navigation.navigate('Liste', { screen: 'CreerListe' });
    }

    <ProfilCheckDialog navigation={navigation} />
  }

  const handlePress = () => {    
    dispatch(reset())    
    navigation.navigate('Notifications')  
  }

  if (!isReady) {
    return (<View></View>) 
  }

 // console.log('Dashboard screen - user details : ', user);
 /* 
  getUserCoordinates(user.adresses[0]).then(coords => {
    if (coords) {
      console.log('COORDS : ', coords);
    } else {
      console.log('Failed to get user coordinates : ', coords);
    }
  });
  */
  
  return (
    <KeyboardAvoidingView style={styles.containerG} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>

        <View style={styles.topContainer}>
          <View>
            <Text style={styles.userName}>{user.prenom} {user.nom}</Text>
            <Text style={styles.userMail}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={handlePress} style={styles.nbrNotif}>
              {/*<FontAwesomeIcon icon={faBell} /> */}         
              <FontAwesomeIcon style={styles.icon} icon={faBell}/>
          </TouchableOpacity>          
          <View>
            <Text styles={styles.bellText}>{unreadCount}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.salutation}>Bonjour {user.prenom} !</Text>
          <View style={styles.startContainer}>
            <View style={styles.startTextContainer}>
              <Text style={styles.mainText}>prêtes pour une nouvelle course ?</Text>
              <Pressable style={styles.button} onPress={handleCreerListe} >
                <Text style={styles.textButton}>commencer</Text>
              </Pressable>
            </View>
            <Image source={require('../assets/illustration-home.png')}/>
          </View>

          <Text style={styles.subTilte}>Reste 35€ à dépenser</Text>
          <View style={styles.barContainer}>
            <Text style={[styles.progressBar, {width:'75%'}]}>120€</Text>
          </View>
        
          <Text style={styles.subTilte}>Reprendre une liste enregistrée</Text>
          <ScrollView>
          <ExistingListesComponents currentListes={userListes} deleteAction={handleDeleteListe} />

            
          </ScrollView>

        </View>

        <Pressable style={styles.button} onPress={handleDeconnection}>
          <Text style={styles.textButton}>Déconnexion</Text>
        </Pressable>

      </SafeAreaView>

    </KeyboardAvoidingView>
  )
}

/* STYLE CSS */

const styles = StyleSheet.create({
  containerG: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  container: {
    flex: 1,
    margin: 20,
    marginTop: 30,
  },

  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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

  icon:{
    padding: 10,
    color: '#2B0D35'
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
