import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Href, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { auth } from '../FirebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  emailHref: Href;
  googleHref?: Href;
};

const SocialLoginButtons = ({ emailHref }: Props) => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '475995084407-0qkn22j2cf5gns5o466vtmsqu9kpjnsv.apps.googleusercontent.com',
    webClientId: '475995084407-0qkn22j2cf5gns5o466vtmsqu9kpjnsv.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Başarılı 🎉', 'Google ile giriş yapıldı!');
        })
        .catch((error) => {
          console.log('Google login error:', error);
          Alert.alert('Giriş Hatası', error.message);
        });
    }
  }, [response]);

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => promptAsync()} // 🔹 Google girişini başlat
          disabled={!request}
        >
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
