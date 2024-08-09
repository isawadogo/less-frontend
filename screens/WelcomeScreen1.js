import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function WelcomeScreen1({ navigation }) {
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
        title='Ignorer'
        onPress={() => navigation.navigate('Login')}
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
