import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { useHeaderHeight } from "@react-navigation/elements"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { signOut } from 'firebase/auth'
import { auth } from '@/FirebaseConfig'

type Props = {}

const ProfileScreen = (props: Props) => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  // 🔹 Çıkış Fonksiyonu
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Bilgilendirme Alert'i
      Alert.alert(
        "Çıkış yapıldı",
        "Hesabınızdan başarıyla çıkış yaptınız.",
        [
          {
            text: "Tamam",
            onPress: () => router.replace("/signin"), // ✅ index sayfasına yönlendir
          },
        ]
      );
    } catch (error) {
      console.log("Logout Error:", error);
      Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/8d/ff/49/8dff49985d0d8afa53751d9ba8907aed.jpg",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.userName}>John Paper</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="person-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Your Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="heart-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Your Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="card-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Payment History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="gift-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Rewards Points</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="person-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Customer Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="pencil-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="settings-outline" size={20} color={Colors.black} />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          {/* 🔻 Çıkış Butonu */}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.primary} />
            <Text style={[styles.buttonText, { color: Colors.primary }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userName: {
    color: Colors.black,
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  buttonWrapper: {
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
})
