import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateWelcome, updateUser } from '../reducers/user';
import { updateUserDetails } from '../modules/userFunctions';
import { frontConfig } from '../modules/config';
import MyCarousel from '../composant/MyCarousel';
import TouchableButton from '../composant/TouchableButton';

export default function WelcomeScreen1({ navigation }) {
  const buttonPosition = {
    bottom: 58,

  }
  //const [afficherAccueil, setAfficherAccueil] = useState(true);

  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  const dispacth = useDispatch();

  console.log('Welcome 1 - screen - user details :', user);
  useEffect(() => {
    (() => {
      console.log('Welcome 1 - screen - useEffect - user details :', user);
      if (user.id && !user.preferences.afficherEcranAccueil) {
        navigation.navigate('Dashboard');
      } else if (!displayWelcome) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const handleIgnoreWelcome = async () => {
    // first dispatch and update the reducer
    if (user.id && !user.preferences.afficherEcranAccueil) {
      navigation.navigate('Dashboard');
      //} else if (!displayWelcome) {
      //  navigation.navigate('Login');
    }
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
    } else {
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
          <MyCarousel data={carouseldata} style={styles.carousel} />
        </View>
        <View style={styles.welcome}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
          <Text style={styles.title}> SYSTEME DE COMPARAISON {'\n'} POUR VOS COURSES QUOTIDIENNES </Text>
          <Text style={styles.lessDesc}>
            Vos courses reviennent moins cher.{'\n'} Votre temps devant l'écran sera réduit.{'\n'}Votre impact environnemental baissera.
          </Text>
          <TouchableButton style={styles.touchable} color="#7CD6C1" page="Welcome2" onPress={() => navigation.navigate('Welcome2')} title="SUIVANT" position={buttonPosition}></TouchableButton>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Ignorer au prochain lancement</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View >
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
    paddingLeft: 45,
    marginBottom: 20,
    fontSize: 15,
  },

  welcome: {
    width: '100%',
    marginTop: 76,
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 17,
    paddingLeft: 45,
    color: 'white',
  },

  button: {
    color: 'white',
    fontSize: 11,
    marginLeft: 108,
    bottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 11,
    bottom: 25,
  },
  logo: {
    width: 135,
    height: 135,
    left: 130,
    bottom: 9,
  },
});