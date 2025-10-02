import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Google from "../assets/images/google-logo.svg";
import { Colors } from "@/constants/Colors";
import Animated, { FadeIn } from "react-native-reanimated";
import SocialLoginButtons from "@/components/SocialLoginButtons";

type Props = {};


const WelcomeScreen = (props: Props) => {
  return (
  <>
    <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={require("../assets/images/ecommerce-splash.jpg")} 
        style={{ flex: 1 }} 
        resizeMode="cover">

        <View style={styles.container}>
          <LinearGradient colors={["transparent", "rgba(255,255,255,0.9)","rgba(255,255,255,1)"]} style={styles.background}>
            
            <View style={styles.wrapper}>
              <Animated.Text style={styles.title} entering={FadeIn.delay(300).duration(300)}>ShopX</Animated.Text>
              <Animated.Text style={styles.description} entering={FadeIn.delay(500).duration(300)}>One Stop Shop for Everything</Animated.Text>
              <SocialLoginButtons emailHref={"/signup"}/>

              <Text style={styles.loginTxt}>Already have an account?{" "} 
                <Link href={"/signin"} asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginTxtSpan}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </Text>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
  </>
        
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  }, 
  wrapper: {
    paddingBottom : 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "700",
    letterSpacing: 2.4,
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
    marginBottom: 20,
  },
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
  loginTxt: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
    marginTop: 30,
  },
  loginTxtSpan: {
    color: Colors.primary,

    fontWeight: "600",
  },
});
