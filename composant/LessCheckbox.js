import { StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LessCheckbox = ({ onChange, checked }) => {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}>
      {checked && <Ionicons name="checkmark" size={20} color={'black'} />}
    </Pressable>
  );
}


const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
    top: 5,
  },
  checkBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

});

module.exports = {
  LessCheckbox,
};
