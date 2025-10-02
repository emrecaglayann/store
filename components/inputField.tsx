import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = React.ComponentProps<typeof TextInput>

const InputField = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <View>
      <TextInput 
        style={styles.inputField}
        {...props}
        
        />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    color: Colors.black,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
})
