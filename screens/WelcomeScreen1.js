import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateWelcome, updateUser } from '../reducers/user';
import { updateUserDetails } from '../modules/userFunctions';
import { frontConfig } from '../modules/config';

export default function WelcomeScreen1({ navigation }) {
  //const [afficherAccueil, setAfficherAccueil] = useState(true);

  const user = useSelector((state) => state.user.value.userDetails);
  const displayWelcome = useSelector((state) => state.user.value.displayWelcome);

  const dispacth = useDispatch();

  console.log('Welcome 1 - screen - user details :', user);
  useEffect(() => {
    (() => {
      console.log('Welcome 1 - screen - useEffect - user details :', user);
      if (user.id && !user.preferences.afficherEcranAccueil) {
        navigation.navigate('TabNavigator');
      } else if (!displayWelcome) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  const handleIgnoreWelcome = async () => {
    // first dispatch and update the reducer
    if (user.id && !user.preferences.afficherEcranAccueil) {
      navigation.navigate('TabNavigator');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LESS gère vos courses au quotidien</Text>
      <Text style={styles.lessDesc}>
        Less c'est moins cher sur vos achats. Less C'est moins de temps devant l'écran. Less c'est moins de pollution et de gaspillage
      </Text>

      <Button
        title='Suivant'
        onPress={() => navigation.navigate('Welcome2')}
      />
      <Button
        title='Ignorer au prochain lancement'
        onPress={handleIgnoreWelcome}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessDesc: {
    width: "70%",
    padding: 'auto',
    paddingBottom: 40,
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
    height: '50%',
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
