import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import InputField from '@/components/inputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Colors } from '@/constants/Colors'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../FirebaseConfig'

type Props = {}

const SignUpScreen = (props: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.")
      return
    }
    if (password !== confirmPassword) {
      Alert.alert("Hata", "Parolalar eşleşmiyor.")
      return
    }

    try {
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email.trim(), password)
      Alert.alert("Başarılı", "Hesabınız oluşturuldu!")
      router.dismissAll()
      router.replace("/signin")
    } catch (error: any) {
      console.log("Signup Error:", error)
      Alert.alert("Kayıt Hatası", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign Up" }} />

      <View style={styles.container}>
        <Text style={styles.title}>Create Your Account</Text>

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

        <InputField
          placeholder='Confirm Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.btnTxt}>{loading ? "Creating..." : "Sign Up"}</Text>
        </TouchableOpacity>

        <Text style={styles.loginTxt}>
          Already have an account?{" "}
          <Link href={"/signin"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTxtSpan}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider} />
        <SocialLoginButtons emailHref={"/signup"} />
      </View>
    </>
  )
}

export default SignUpScreen

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
