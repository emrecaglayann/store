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
    
    try {
      const response = await axios.get<ProductType>(URL);
      const data = response.data;
      setProduct(data);

      // Ürün yüklendiğinde ilk seçenekleri otomatik seçelim
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }

    } catch (error) {
      console.log("Error fetching product:", error);
    }
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
        color: selectedColor || "N/A", // Renk seçilmediyse veya yoksa
        size: selectedSize || "N/A",   // Beden seçilmediyse veya yoksa
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

              <View style={styles.productVariationWrapper}>
                
                {/* --- DİNAMİK RENK SEÇİMİ --- */}
                {/* Sadece colors dizisi varsa gösterir */}
                {product.colors && product.colors.length > 0 && (
                  <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Color</Text>
                    <View style={styles.productVariationValueWrapper}>
                      {product.colors.map((color) => (
                        <TouchableOpacity
                          key={color}
                          onPress={() => setSelectedColor(color)}
                          style={[
                            styles.productVariationColorValue,
                            {
                              backgroundColor: color,
                              borderWidth: selectedColor === color ? 2 : 0,
                              borderColor: Colors.primary,
                              // Seçili değilse hafif bir kenarlık ekleyelim ki beyaz renkler görünsün
                              shadowColor: "#000",
                              elevation: selectedColor === color ? 5 : 2
                            },
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {/* --- DİNAMİK BEDEN SEÇİMİ --- */}
                {/* Sadece sizes dizisi varsa gösterir (Electronics'te gizlenir) */}
                {product.sizes && product.sizes.length > 0 && (
                  <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Size</Text>
                    <View style={styles.productVariationValueWrapper}>
                      {product.sizes.map((size) => (
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
                              backgroundColor: selectedSize === size ? Colors.primary : Colors.extralightGray
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.productVariationSizeValueText,
                              {
                                color:
                                  selectedSize === size
                                    ? Colors.white // Seçiliyse yazı beyaz olsun
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
                )}

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
  priceDiscount: {
    // Stil eksikse buraya ekleme yapabilirsin, örnek:
    backgroundColor: Colors.extralightGray,
    padding: 5,
    borderRadius: 5,
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
    flexDirection: "column", // Yan yana değil alt alta dizilmesi daha sağlıklı
    marginTop: 20,
  },
  productVariationType: {
    width: "100%", // Tüm genişliği kaplasın
    gap: 5,
    marginBottom: 15,
  },
  productVariationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 5,
  },
  productVariationValueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  productVariationColorValue: {
    width: 35, // Biraz büyüttüm
    height: 35,
    borderRadius: 17.5,
  },
  productVariationSizeValue: {
    width: 50,
    height: 35, // Yüksekliği biraz artırdım
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  productVariationSizeValueText: {
    fontSize: 14,
    fontWeight: "500",
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