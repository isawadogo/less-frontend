import { StatusBar, StyleSheet, SafeAreaView, Text, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = (props) => {
  const {message, desc } = props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorIcon}>
          <FontAwesomeIcon icon={faExclamationTriangle} size={120} color='coral' />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.messageText}>{message}</Text>
          <Text></Text>
          <Text style={styles.descText}>{desc}</Text>
        </View>
      </SafeAreaView>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignContent: 'center', 
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  errorIcon: {
    width: '100%', 
    paddingTop: 40, 
    paddingBottom: 40, 
    alignItems: 'center', 
    alignContent: 'center',
  },
  textContainer: { 
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  messageText: { 
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: 22,
  },
  descText: { 
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
  }

});

module.exports = {
  ErrorMessage,
};
