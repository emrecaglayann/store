import { StyleSheet, Platform, Text, View, FlatList, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { NotificationType } from '@/types/type';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Notifications from 'expo-notifications';
import { usePushNotifications } from '../../usePushNotification';

type Props = {};

const NotificationsScreen = (props: Props) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  const { expoPushToken, notification, sendLocalNotification } = usePushNotifications();

  useEffect(() => {
    getNotifications();
  }, []);

  const getBaseUrl = () => {
    if (Platform.OS === 'android') 
    return 'http://192.168.1.6:8000';
    return 'http://localhost:8000';
  };

  const getNotifications = async () => {
    try {
      const URL = `${getBaseUrl()}/notifications`;
      const response = await axios.get(URL);
      setNotifications(response.data);
    } catch (error) {
      console.error('Notifications API error:', error);
    }
  };

  const handleAddToCartScenario = async () => {
    const productName = "Nike Air Max"; 
    
    await sendLocalNotification(
        "Sepet Güncellendi 🛒", 
        `${productName} başarıyla sepete eklendi! Tükenmeden al.`,
        { screen: '/cart' } 
    );
  };

  const handleFlashSaleScenario = async () => {
    Alert.alert("Flash Sale", "Bildirim 5 saniye sonra gelecek şekilde ayarlandı! (Normalde 2 saat)");
    
    await sendLocalNotification(
        "⏳ İndirim Bitiyor!",
        "Flash Sale ürünlerinde indirimlerin bitmesine son 2 saat kaldı! Acele et.",
        { screen: '/sale' },
        5 
    );
  };

  const handleLowStockScenario = async () => {
    const productName = "PlayStation 5";
    const currentStock = 3;

    if (currentStock < 5) {
        await sendLocalNotification(
            "⚠️ Stok Tükeniyor!",
            `${productName} ürününü sepete ekledin ama son ${currentStock} adet kaldı! Başkası almadan sen al.`,
            { screen: '/cart' }
        );
    } else {
        await sendLocalNotification("Sepete Eklendi", `${productName} sepete eklendi.`);
    }
  };


  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true, title: "Notifications" }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        
        <View style={styles.scenarioContainer}>
            <Text style={styles.sectionTitle}>Senaryo Testleri</Text>
            
            <TouchableOpacity style={[styles.testBtn, {backgroundColor: '#4CAF50'}]} onPress={handleAddToCartScenario}>
                <Text style={styles.btnText}>1. Sepete Ekleme Bildirimi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.testBtn, {backgroundColor: '#FF9800'}]} onPress={handleFlashSaleScenario}>
                <Text style={styles.btnText}>2. Flash Sale (Zamanlı)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.testBtn, {backgroundColor: '#F44336'}]} onPress={handleLowStockScenario}>
                <Text style={styles.btnText}>3. Kritik Stok Uyarısı</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, {marginTop: 20}]}>Gelen Kutusu</Text>

        <FlatList
          data={notifications}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item, index }) => (
            <Animated.View
              style={styles.notificationWrapper}
              entering={FadeInDown.delay(300 + index * 100).duration(500)}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name="notifications-outline" size={20} color="black" />
              </View>
              <View style={styles.notificationInfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.timestamp}</Text>
                </View>
                <Text style={styles.notificationMessage}>{item.message}</Text>
              </View>
            </Animated.View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={{ marginTop: 20, textAlign:'center' }}>Henüz bildirim yok</Text>}
        />
      </View>
    </>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  scenarioContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.black
  },
  testBtn: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  notificationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.extralightGray,
    borderRadius: 5,
  },
  iconWrapper: {},
  notificationIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: Colors.black,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 5,
    lineHeight: 20,
  },
});
