import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import InputField from '@/components/inputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Colors } from '@/constants/Colors'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../FirebaseConfig'

type Props = {}

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Eksik Bilgi", "Lütfen e-posta ve şifre girin.")
      return
    }

    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email.trim(), password)
      Alert.alert("Başarılı", "Giriş yapıldı!")
      router.dismissAll()
      router.replace("/(tabs)")
    } catch (error: any) {
      console.log("Login Error:", error)
      Alert.alert("Giriş Hatası", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign In" }} />

      <View style={styles.container}>
        <Text style={styles.title}>Login to Your Account</Text>

        <InputField
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.btnTxt}>{loading ? "Loading..." : "Login"}</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Don't have an account?{" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtSpan}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider} />
        <SocialLoginButtons emailHref={"/signin"} />
      </View>
    </>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 50,
    color: '#333',
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
    fontWeight: '600',
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 30,
    alignSelf: "center",
  },
})
