import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

const LessFormikInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    errorTextStyle,
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
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
    backgroundColor: 'white',
    width: '83%',
    margin: 10,
    padding: 15,
    bottom: 54,
    left: 24,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    bottom: 63,
    left: 37,
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default LessFormikInput;