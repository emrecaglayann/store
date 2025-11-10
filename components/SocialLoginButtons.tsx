// import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
// import React, { useEffect } from "react";
// import Animated, { FadeIn } from "react-native-reanimated";
// import { Href, Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "@/constants/Colors";
// import { auth } from "../FirebaseConfig";
// import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

// type Props = {
//   emailHref: Href;
// };

// const SocialLoginButtons = ({ emailHref }: Props) => {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
//     webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
//     iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     const signInWithGoogle = async () => {
//       if (response?.type === "success") {
//         const { authentication } = response;
//         if (!authentication?.idToken) {
//           Alert.alert("Hata", "Google kimlik belirteci alınamadı.");
//           return;
//         }

//         const credential = GoogleAuthProvider.credential(authentication.idToken);
//         await signInWithCredential(auth, credential);
//         Alert.alert("Başarılı 🎉", "Google ile giriş yapıldı!");
//       }
//     };

//     signInWithGoogle();
//   }, [response]);

//   return (
//     <View style={styles.socialLoginWrapper}>
//       {/* E-posta ile giriş */}
//       <Animated.View entering={FadeIn.delay(300).duration(300)}>
//         <Link href={emailHref} asChild>
//           <TouchableOpacity style={styles.button}>
//             <Ionicons name="mail-outline" size={20} color={Colors.black} />
//             <Text style={styles.btnTxt}>Continue with Email</Text>
//           </TouchableOpacity>
//         </Link>
//       </Animated.View>

//       {/* Google ile giriş */}
//       <Animated.View entering={FadeIn.delay(700).duration(500)}>
//         <TouchableOpacity
//           style={styles.button}
//           disabled={!request}
//           onPress={() => promptAsync()}
//         >
//           <Ionicons name="logo-google" size={20} color={Colors.black} />
//           <Text style={styles.btnTxt}>Continue with Google</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// export default SocialLoginButtons;

// const styles = StyleSheet.create({
//   socialLoginWrapper: {
//     alignSelf: "stretch",
//   },
//   button: {
//     flexDirection: "row",
//     padding: 10,
//     borderColor: Colors.gray,
//     borderWidth: StyleSheet.hairlineWidth,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 25,
//     marginBottom: 15,
//     gap: 10,
//   },
//   btnTxt: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.black,
//   },
// })-----------------------------------------------------------------------------------------------------------------------

import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Href, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { auth } from "../FirebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

type Props = {
  emailHref: Href;
};

const SocialLoginButtons = ({ emailHref }: Props) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "11033509319-vfiucmaukn3t7dvjegn2r8in64frpb4b.apps.googleusercontent.com",
    webClientId: "11033509319-e9fsgi6kda9h7jjasq8pcosraunhd22k.apps.googleusercontent.com",
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        const { authentication } = response;
        if (!authentication?.idToken) {
          Alert.alert("Hata", "Google kimlik belirteci alınamadı.");
          return;
        }

        const credential = GoogleAuthProvider.credential(authentication.idToken);
        await signInWithCredential(auth, credential);
        Alert.alert("Başarılı 🎉", "Google ile giriş yapıldı!");
      }
    };

    signInWithGoogle();
  }, [response]);

  return (
    <View style={styles.socialLoginWrapper}>
      {/* E-posta ile giriş */}
      <Animated.View entering={FadeIn.delay(300).duration(300)}>
        <Link href={emailHref} asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="mail-outline" size={20} color={Colors.black} />
            <Text style={styles.btnTxt}>Continue with Email</Text>
          </TouchableOpacity>
        </Link>
      </Animated.View>

      {/* Google ile giriş */}
      <Animated.View entering={FadeIn.delay(700).duration(500)}>
        <TouchableOpacity
          style={styles.button}
          disabled={!request}
          onPress={() => promptAsync()}
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
    alignSelf: "stretch",
  },
  button: {
    flexDirection: "row",
    padding: 10,
    borderColor: Colors.gray,
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
});
