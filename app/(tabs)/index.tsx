import { StyleSheet, Text, View, Platform, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CategoryType, ProductType } from '@/types/type'
import { FlatList } from "react-native"
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import ProductItem from '@/components/ProductItem'
import { Colors } from '@/constants/Colors'
import ProductList from '@/components/ProductList'
import Categories from '@/components/Categories'
import FlashSale from '@/components/FlashSale'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'





type Props = {};

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setsaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading , setIsLoading] = useState<boolean>(true);

  // ✅ Base URL'i platforma göre ayarla
  const getBaseUrl = () => {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:8000"; // Android 
    }
    return "http://localhost:8000";  // iOS 

  };

  useEffect(() => {
    
    getProducts();
    getCategories();
    getSaleProducts();
    
    
    
  }, []);

  const getCategories = async () => {
    try {
      const URL = `${getBaseUrl()}/categories`;
      const response = await axios.get(URL);

      console.log("Categories API Response:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Categories API error:", error);
    }
  }

  const getProducts = async () => {
    try {
      const URL = `${getBaseUrl()}/products`;
      const response = await axios.get(URL);

      console.log("API Response:", response.data);
      setProducts(response.data);
      // setCategories(response.data)
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsLoading(false);
    }
  }


   const getSaleProducts = async () => {
    try {
      const URL = `${getBaseUrl()}/saleProducts`;
      const response = await axios.get(URL);

      console.log("API Response:", response.data);
      setsaleProducts(response.data);
    } catch (error) {
      console.error("Sale API error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  

  if(isLoading) {
    return(
    <View>
      <ActivityIndicator size={"large"}/>
    </View> 
    );
  }

  return (
    <>
      <Stack.Screen options = {{
        headerShown:true,
        header: () => <Header/>
      }} />
      <ScrollView>
        <Categories categories={categories}/>
        <FlashSale products={saleProducts }/>
        <View style ={{marginHorizontal:20, marginBottom: 10}}>
          <Image 
            source={require("@/assets/images/sale-banner.jpg")} 
            style={{width: "100%" , height: 150, borderRadius: 15}}  
          />
        </View>  
        <ProductList products={products} flatlist={false} productType={'regular'} />
      </ScrollView>
    </> 
  )
} 

const styles = StyleSheet.create({
  
})

export default HomeScreen
