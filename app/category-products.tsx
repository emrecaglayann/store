import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { Platform } from 'react-native';

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { id: number | string };
  // diğer alanlar varsa ekleyebilirsin
};


const CategoryProductsScreen = () => {
  const { id, name } = useLocalSearchParams();
const [products, setProducts] = useState<(Product & { sourceType: string })[]>([]);

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

  const getBaseUrl = () => {
    if (Platform.OS === "android") 
    return "http://192.168.1.6:8000";
    return "http://localhost:8000";
  };

  const getProductsByCategory = async () => {
    try {
      const [prodRes, saleRes] = await Promise.all([
        axios.get(`${getBaseUrl()}/products`),
        axios.get(`${getBaseUrl()}/saleProducts`),
      ]);
      
      // Normal ürünlere 'normal' etiketi yapıştırıyoruz (veya boş bırakabilirsin)
      const normalProducts = prodRes.data.map((item: Product) => ({
        ...item,
        sourceType: 'normal'
      }));

      const saleProducts = saleRes.data.map((item: Product) => ({
        ...item,
        sourceType: 'sale'
      }));


      const allProducts = [...normalProducts, ...saleProducts];

      const filtered = allProducts.filter(
        (item) => item?.category?.id?.toString() === id?.toString()
      );

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      {products.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
          Bu kategoriye ait ürün bulunamadı.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/product-details/[id]',
                  params: { 
                    id: String(item.id), 
                    name: item.title,
                    productType: item.sourceType 
                  },
                })
              }
            >
              <View style={styles.productCard}>
                <Image
                  source={{ uri: item?.images?.[0] || 'https://via.placeholder.com/150' }}
                  style={styles.image}
                />
                <Text style={styles.productTitle}>{item?.title || 'Ürün adı yok'}</Text>
                <Text style={styles.price}>
                  {item?.price ? `$${item.price}` : 'Fiyat belirtilmemiş'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 10 },
  productCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productTitle: { fontSize: 16, fontWeight: '600', marginTop: 8 },
  price: { fontSize: 14, color: 'gray', marginTop: 4 },
});

export default CategoryProductsScreen;