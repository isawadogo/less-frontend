import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

const LessFormikInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    customStyle,
    errorTextStyle,
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          customStyle,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={[styles.errorText, errorTextStyle]}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 40,
    width: '75%',
    height: 35,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Raleway-Medium',
    color: '#A3A3A3',
    fontSize: 13,
    paddingLeft: 20,
    start: 50,
  },
  errorText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    color: 'red',
    marginLeft: 20,

  },
  errorInput: {
    borderColor: 'red',

  }
})

export default LessFormikInput;