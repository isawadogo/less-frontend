//import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, StatusBar } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../reducers/user';

import { frontConfig } from '../modules/config';
import { checkBody } from '../modules/checkBody';

export default function ProfilScreen({ navigation }) {

  const user = useSelector((state) => state.user.value.userDetails);

  useEffect(() => {
    (() => {
      if (!user.email) {
        navigation.navigate('Login');
      }
      //setUserParams({...userParams, userId: user.id })
    })();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text>Page profil</Text>
          <Text>{user.prenom} {user.nom}</Text>
          <Text>{user.email}</Text>
          <Text>Mes crtières</Text>

          <Button
            title="Modifier mon profil"
            onPress={() => navigation.navigate('Profile', { screen: 'ModifierProfil'})}
          />
          <Button
            title='Aide'
            onPress={() => navigation.navigate('Aide')}
          />
          <Button
            title='CGU'
            onPress={() => navigation.navigate('CGU')}
          />
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  infosCon: {
    width: '75%'
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 40,
    margin: 10,
    padding: 'auto',
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
// import { useDispatch, useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



// const parametre = [
//   { title: "Aide", screen: "AideScreen", icone: "faCircleQuestion" },
//   { title: "Paramètres des notifications", screen: "ReglageNotifScreen", icone: "faBell" },
//   { title: "Sécurité", screen: "SecuriteScreen", icone: "faLock" },
//   { title: "Langues", screen: "LanguesScreen", icone: "faLanguage" },
//   { title: "Condition Générales", screen: "CGUScreen", icone: "faScaleBalanced" }
// ]


// export default function ProfilScreen({ navigation }) {
//   // Pas réussi à rajouter les prenom nom, email et critères de l'utilisateur
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value.userDetails);


//   return (
//     <View>
//       <FontAwesomeIcon onPress={navigation.goBack()} icon="arrow-left" />
//       <FontAwesomeIcon onPress={navigation.navigate("ProfilScreen")} />
//       <View>
//         <Text>{user.prenom}{user.nom}</Text>
//         <Text>{user.email}</Text>
//         <Text>{user.criteres}</Text>
//         <Text></Text>
//         <View>
//           {parametre.map((item, index) => (
//             <View key={index}>
//               <FontAwesomeIcon icon={item.icone} />
//               <TouchableOpacity onPress={navigation.navigate(item.screen)}>
//                 <Text>{item.title}</Text>
//               </TouchableOpacity>
//             </View>))}
//         </View>
//       </View>
//     </View>
//   )
// }


// const styles = StyleSheet.create({})

