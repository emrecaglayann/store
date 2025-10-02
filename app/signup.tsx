import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Stack from 'expo-router/build/layouts/Stack'
import { Colors } from '@/constants/Colors'
import InputField from '@/components/inputField'
import { Link } from "expo-router";
import SocialLoginButtons from '@/components/SocialLoginButtons'


type Props = {}

const SignUpScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign Up"}} />

      <View style={styles.container}>
        <Text style={styles.title}> Create an Account</Text>
        <InputField 
        placeholder='Email Address' 
        placeholderTextColor={Colors.gray} 
        autoCapitalize='none'
        keyboardType='email-address'
        />
        <InputField 
        placeholder='Password' 
        placeholderTextColor={Colors.gray} 
        secureTextEntry={true}
        />
        <InputField 
        placeholder='Confirm Password' 
        placeholderTextColor={Colors.gray} 
        secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Create an Account</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>Already have an account?{" "}
          <Link href={"/signin"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtSpan}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider} />
        <SocialLoginButtons emailHref={"/signin"} />
      </View>
    </>
  )
}


export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 30,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 1.2,
    marginBottom: 50,
    color: '#333',
    alignItems: 'center',
    textAlign: 'center',
  },

  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    marginBottom: 10,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },  
  loginTxt: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
    marginTop: 30,
    alignSelf: 'center',
  },
  loginTxtSpan: {
    color: Colors.primary,

    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 30,
    alignSelf: "center",
  },
})