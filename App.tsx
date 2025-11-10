// import { useEffect } from 'react';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { Slot } from 'expo-router';

// export default function App() {
// useEffect(() => {
//   GoogleSignin.configure({
//     webClientId: "11033509319-e9fsgi6kda9h7jjasq8pcosraunhd22k.apps.googleusercontent.com",
//     profileImageSize: 150,
//     offlineAccess: true,
//   });
// }, []);
//   return <Slot />;
// }

import { Slot } from "expo-router";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return <Slot />;
}
