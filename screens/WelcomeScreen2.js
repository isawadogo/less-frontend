import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, ImageBackground, StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateWelcome, updateUser } from '../reducers/user';
import { updateUserDetails } from '../modules/userFunctions';
import { frontConfig } from '../modules/config';
import MyCarousel from '../composant/MyCarousel';
import TouchableButton from '../composant/TouchableButton';

export default function WelcomeScreen2({ navigation }) {

  const buttonPosition = {
    bottom: 8,
    borderRadius: 15,

  }
  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  const dispatch = useDispatch();

  //console.log('Welcome 2 - screen - user details :', user);
  useEffect(() => {
    (() => {
      if (user.id && !user.preferences.afficherEcranAccueil) {
        navigation.navigate('TabNavigator');
      } else if (!displayWelcome) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const handleIgnoreWelcome = async () => {
    if (user.id && !user.preferences.afficherEcranAccueil) {
      navigation.navigate('TabNavigator');
    }
    // first dispatch and update the reducer
    dispatch(updateWelcome(false));
    // If the user is already connected
    if (user.id) {
      const updateData = {
        ...user,
        preferences: {
          ...user.preferences,
          afficherAccueil: false
        }
      }

      const updateRes = await updateUserDetails(user, dataUpdate);
      if (updateRes === 0) {
        const response = await fetch(frontConfig.backendURL + '/utilisateur/details/' + user.id);
        const json = await response.json();
        if (json.result) {
          //console.log('Modifier profil - dispacth to reducer : ', json.user);
          dispatch(updateUser({ ...json.user, id: user.id }));
          navigation.navigate('TabNavigator');
        }
      }
      //return;
      dispatch(updateUser(updateData));
      // Go to the login page
      navigation.navigate('Login');
    }
  }
  const carouseldata = [
    { image: require('../assets/carrousel-1.png') },
    { image: require('../assets/carrousel-2.png') },
    { image: require('../assets/carrousel-3.png') },
  ];

  return (

    <SafeAreaView style={styles.container}>
        
    <View style={styles.carouselContainer}>
      <MyCarousel data={carouseldata}/>
    </View>
      
    <View style={styles.textContainer}>
      <Image source={require('../assets/Logo-petit.png')}/>
      <View>
        <Text style={styles.title}> Un comparateur {'\n'} pour vos courses quotidiennes </Text>
        <Text style={styles.description}>Vous rentrez votre liste d'achat.{'\n'}LE$$ compare où vous ferez les meilleures économies.{'\n'}LE$$ vous renverrons le ticket de course avec toutes les références qui respectent vos critères.</Text>
      </View>

      <View>
        <Pressable style={styles.buttonWhite} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textButtonWhite}>suivant</Text>
        </Pressable>
        <Pressable style={styles.buttonTransparent} onPress={() => navigation.navigate('Welcome1')}>
          <Text style={styles.textButtonTransparent}>précédent</Text>
        </Pressable>
      </View>
    </View>

  </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B0D35",
  },

  carouselContainer:{
    flex: 2,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 17,
    color: 'white',
  },

  description: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
    marginBottom: 17,
  },

  buttonWhite: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  buttonTransparent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  textButtonWhite: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    color: '#2B0D35',
  },

  textButtonTransparent: {
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
    color: 'white',
  },

});
