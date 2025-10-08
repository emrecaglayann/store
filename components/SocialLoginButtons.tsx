import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Href, Link } from "expo-router"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Google from "../assets/images/google-logo.svg";

type Props = {
    emailHref: Href;
    googleHref?: Href;
}

const SocialLoginButtons = (props: Props) => {
    const { emailHref, googleHref } = props;

  return (
    <View style={styles.socialLoginWrapper}>
                <Animated.View entering={FadeIn.delay(300).duration(300)} >
                  <Link href={emailHref} asChild>
                    <TouchableOpacity style={styles.button}>
                      <Ionicons name="mail-outline" size={20} color={Colors.black} />
                      <Text style={styles.btnTxt}>Continue with Email</Text>
                    </TouchableOpacity>
                  </Link>
                </Animated.View>
                <Animated.View entering={FadeIn.delay(700).duration(500)} >
                  <Link href={"/signin"} asChild>
                    <TouchableOpacity style={styles.button}>
                      <Ionicons name="logo-google" size={20} color={Colors.black} />
                      <Text style={styles.btnTxt}>Continue with Google</Text>
                    </TouchableOpacity>
                  </Link>
                </Animated.View>
              </View>
  )
}

export default SocialLoginButtons

const styles = StyleSheet.create({

socialLoginWrapper: {
        alignSelf: "stretch",
},
      button: {
        flexDirection: "row",
        padding: 10,
        borderBlockColor: Colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: 15,
        gap: 10,
    },
      btnTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
},             



})