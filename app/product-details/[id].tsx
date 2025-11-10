import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { ProductType } from '@/types/type';
import ImageSlider from '@/components/imageSlider';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const ProductDetails = () => {
  const { id, productType } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductType>();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const URL =
      productType === "sale"
        ? `http://10.0.2.2:8000/saleProducts/${id}`
        : `http://10.0.2.2:8000/products/${id}`;
    const response = await axios.get<ProductType>(URL);
    setProduct(response.data);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const URL =
        Platform.OS === "android"
          ? "http://10.0.2.2:8000/cart"
          : "http://localhost:8000/cart";

      const cartItem = {
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity: 1,
        color: selectedColor || "default",
        size: selectedSize || "default",
      };

      await axios.post(URL, cartItem);

      Alert.alert("Başarılı", "🛒 Ürün sepete eklendi!");
      router.push("/cart");
    } catch (error) {
      console.log("Add to cart error:", error);
      Alert.alert("Hata", "Sepete eklenirken bir sorun oluştu.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Product Details" }} />
      <ScrollView style={{ marginBottom: 90 }}>
        <View>
          {product && <ImageSlider imageList={product.images} />}
          {product && (
            <View style={styles.container}>
              <View style={styles.ratingWrapper}>
                <View style={styles.ratingWrapper}>
                  <Ionicons name="star" size={20} color={"#D4AF37"} />
                  <Text style={styles.rating}>
                    4.8 <Text>(240)</Text>
                  </Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={20} color={Colors.black} />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>{product.title}</Text>

              <View style={styles.priceWrapper}>
                <Text style={styles.price}>${product.price}</Text>
                <View style={styles.priceDiscount}>
                  <Text style={styles.priceDiscountText}>%6 Off</Text>
                </View>
                <Text style={styles.oldPrice}>${product.price + 2}</Text>
              </View>

              <Text style={styles.description}>{product.description}</Text>

              {/* Color selection */}
              <View style={styles.productVariationWrapper}>
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Color</Text>
                  <View style={styles.productVariationValueWrapper}>
                    {["#D4AF37", "#333", "#8bc", "#2de", "#f44336", "#9c27b0"].map(
                      (color) => (
                        <TouchableOpacity
                          key={color}
                          onPress={() => setSelectedColor(color)}
                          style={[
                            styles.productVariationColorValue,
                            {
                              backgroundColor: color,
                              borderWidth: selectedColor === color ? 2 : 0,
                              borderColor: Colors.primary,
                            },
                          ]}
                        />
                      )
                    )}
                  </View>
                </View>

                {/* Size selection */}
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Size</Text>
                  <View style={styles.productVariationValueWrapper}>
                    {["S", "M", "L", "XL"].map((size) => (
                      <TouchableOpacity
                        key={size}
                        onPress={() => setSelectedSize(size)}
                        style={[
                          styles.productVariationSizeValue,
                          {
                            borderColor:
                              selectedSize === size
                                ? Colors.primary
                                : Colors.lightGray,
                            borderWidth: selectedSize === size ? 2 : 1,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.productVariationSizeValueText,
                            {
                              color:
                                selectedSize === size
                                  ? Colors.primary
                                  : Colors.black,
                            },
                          ]}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.primary,
              borderWidth: 1,
            },
          ]}
          onPress={handleAddToCart}
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            Add To Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "400",
    color: Colors.gray,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 30,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  priceDiscountText: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: "400",
    textDecorationLine: "line-through",
    color: Colors.gray,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.black,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  productVariationWrapper: {
    flexDirection: "row",
    marginTop: 20,
    flexWrap: "wrap",
  },
  productVariationType: {
    width: "50%",
    gap: 5,
    marginBottom: 10,
  },
  productVariationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
  },
  productVariationValueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },
  productVariationColorValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  productVariationSizeValue: {
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.extralightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  productVariationSizeValueText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
  buttonWrapper: {
    position: "absolute",
    height: 90,
    padding: 20,
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.white,
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: 5,
    elevation: 5,
    shadowColor: Colors.black,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.white,
  },
});
