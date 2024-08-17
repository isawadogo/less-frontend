import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateWelcome, updateUser } from '../reducers/user';
import { updateUserDetails } from '../modules/userFunctions';
import { frontConfig } from '../modules/config';
import MyCarousel from '../modules/MyCarousel';

export default function WelcomeScreen2({ navigation }) {
  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  const dispacth = useDispatch();

  console.log('Welcome 2 - screen - user details :', user);
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
    dispacth(updateWelcome(false));
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
          console.log('Modifier profil - dispacth to reducer : ', json.user);
          dispatch(updateUser({ ...json.user, id: user.id }));
          navigation.navigate('TabNavigator');
        }
      }
      //return;
      dispacth(updateUser(updateData));
      // Go to the login page
      navigation.navigate('Login');
    }
  }
  const carouseldata = [
    { image: require('../assets/fruit.png') },
    { image: require('../assets/producteurs_locaux.png') },
    { image: require('../assets/vegan.png') },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/back.png')}>
        <View style={styles.onlycarousel}>
          <MyCarousel data={carouseldata} style={styles.carousel} backendURL />
        </View>
        <View style={styles.welcome}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
          <Text style={styles.title}>SYSTEME DE COMPARAISON {'\n'} POUR VOS COURSES QUOTIDIENNES</Text>
          <Text style={styles.lessDesc}>
            Vous rentrez votre liste d'achat.{'\n'} LE$$ compare où vous ferez les meilleures économies.{'\n'} LE$$ vous renverrons le ticket de course avec toutes les références qui respectent vos critères.
          </Text>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText1}>Suivant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Welcome1')}>
            <Text style={styles.buttonText1}>Précédent</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlycarousel: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 90,
  },
  lessDesc: {
    paddingBottom: 50,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 0,
    fontSize: 13,
    paddingBottom: 11,
  },
  welcome: {
    width: '100%',
    paddingBottom: 11,
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    paddingLeft: 20,
    color: 'white',
  },
  button1: {
    width: 160,
    height: 27,
    backgroundColor: '#7CD6C1',
    left: 113,
    marginBottom: 12,
    borderRadius: 15,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },

  logo: {
    width: 130,
    height: 130,
    left: 130,
  }

});
