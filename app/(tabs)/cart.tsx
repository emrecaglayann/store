import { Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { CartItemType } from '@/types/type';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const headerHeight = useHeaderHeight();

  const getBaseUrl = () => {
    if (Platform.OS === "android") return "http://10.0.2.2:8000";
    return "http://localhost:8000";
  };

  // 🔹 Sepet verilerini çek
  const getCartData = async () => {
    try {
      const URL = `${getBaseUrl()}/cart`;
      const response = await axios.get(URL);
      setCartItems(response.data);
    } catch (error) {
      console.error("Cart API error:", error);
    }
  };

  // 🔹 Ürünü sil
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${getBaseUrl()}/cart/${id}`);
      setCartItems(prev => prev.filter(item => item.id !== id));
      Alert.alert("🗑️", "Ürün sepetten kaldırıldı");
    } catch (error) {
      console.error("Delete Error:", error);
      Alert.alert("Hata", "Ürün silinemedi");
    }
  };

  // 🔹 Miktarı artır / azalt
  const handleQuantityChange = async (id: number, type: "inc" | "dec") => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const newQuantity = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return; // 0'ın altına düşmesin

    try {
      await axios.patch(`${getBaseUrl()}/cart/${id}`, { quantity: newQuantity });
      setCartItems(prev =>
        prev.map(i => (i.id === id ? { ...i, quantity: newQuantity } : i))
      );
    } catch (error) {
      console.error("Quantity update error:", error);
      Alert.alert("Hata", "Miktar güncellenemedi");
    }
  };

  // Sayfa odaklandığında sepeti yenile
  useFocusEffect(
    useCallback(() => {
      getCartData();
    }, [])
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onDelete={handleDelete}
              onQuantityChange={handleQuantityChange}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 50, color: Colors.gray }}>
              Sepetiniz boş 🛒
            </Text>
          }
        />
      </View>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.priceInfoWrapper}>
            <Text style={styles.totalText}>
              Total: ${cartItems
                .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
                .toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutBtnText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

// 🧱 Tek ürün bileşeni
const CartItem = ({
  item,
  onDelete,
  onQuantityChange,
}: {
  item: CartItemType;
  onDelete: (id: number) => void;
  onQuantityChange: (id: number, type: "inc" | "dec") => void;
}) => (
  <View style={styles.itemWrapper}>
    <Image source={{ uri: item.image }} style={styles.itemImg} />
    <View style={styles.itemInfoWrapper}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemText}>{item.price} USD</Text>
      <View style={styles.itemControlWrapper}>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Ionicons name="trash-outline" size={20} color={"red"} />
        </TouchableOpacity>

        <View style={styles.quantityControlWrapper}>
          <TouchableOpacity
            style={styles.quantityControl}
            onPress={() => onQuantityChange(item.id, "dec")}
          >
            <Ionicons name="remove-outline" size={20} color={Colors.black} />
          </TouchableOpacity>

          <Text>{item.quantity || 1}</Text>

          <TouchableOpacity
            style={styles.quantityControl}
            onPress={() => onQuantityChange(item.id, "inc")}
          >
            <Ionicons name="add-outline" size={20} color={Colors.black} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="heart-outline" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  itemWrapper: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    borderColor: Colors.lightGray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  itemInfoWrapper: { flex: 1, alignItems: "flex-start", gap: 10 },
  itemImg: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  itemText: { fontSize: 14, fontWeight: "500", color: Colors.black },
  itemControlWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  quantityControlWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  quantityControl: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: Colors.white,
  },
  priceInfoWrapper: { flex: 1 },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    bottom: -10,
  },
  checkoutBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  checkoutBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
