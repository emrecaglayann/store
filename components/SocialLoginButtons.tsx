import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Href, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { auth } from '../FirebaseConfig';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

type Props = {
  emailHref: Href;
};

const SocialLoginButtons = ({ emailHref }: Props) => {

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      const credential = GoogleAuthProvider.credential(tokens.idToken);
      await signInWithCredential(auth, credential);

      Alert.alert('Başarılı 🎉', 'Google ile giriş yapıldı!');
    } catch (error: any) {
      console.log('Google Sign-In Hatası:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('İptal Edildi', 'Giriş işlemi iptal edildi.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Bekleyin', 'Giriş işlemi devam ediyor...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Hata', 'Google Play hizmetleri mevcut değil.');
      } else {
        Alert.alert('Giriş Hatası', error.message || 'Bilinmeyen hata');
      }
    }
  };

  return (
    <View style={styles.socialLoginWrapper}>
      <Animated.View entering={FadeIn.delay(300).duration(300)}>
        <Link href={emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(700).duration(500)}>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={20} color={Colors.black} />
          <Text style={styles.btnTxt}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SocialLoginButtons;

const styles = StyleSheet.create({
  socialLoginWrapper: {
    alignSelf: 'stretch',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 15,
    gap: 10,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
});
