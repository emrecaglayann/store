import { Platform, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState , useEffect } from 'react'
import { CategoryType } from '@/types/type'
import axios from 'axios'
import { Stack } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { Colors } from '@/constants/Colors'
import Animated, { FadeInDown } from 'react-native-reanimated'

type Props = {}

const ExploreScreen = (props: Props) => {

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const headerHeight = useHeaderHeight();

    useEffect(() => {
        getCategories();
      }, []);

    const getBaseUrl = () => {
        if (Platform.OS === "android") {
          return "http://10.0.2.2:8000"; // Android 
        }
        return "http://localhost:8000";  // iOS 
    
      };

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


  return (
    <>
    <Stack.Screen options={{headerShown: true , headerTransparent: true }} />
      <View style={[styles.container, { marginTop:headerHeight }]}>
        <FlatList 
          data={categories} 
          keyExtractor={(item) => item.id.toString()}  
          renderItem={({item ,index}) => (
          <Animated.View style={styles.itemWrapper} entering={FadeInDown.delay(300 + index *100).duration(500)}>
              <Text style={styles.itemTitle}>{item.name} </Text>
              <Image
                source={{uri:item.image}}
                style ={{width:100 , height:100, borderRadius:10}}
              />
          </Animated.View>
        )}/>
      </View>
    </>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemWrapper:{
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.extralightGray,
    padding:15,
    borderRadius:20,
    marginBottom:20,

  },
  itemTitle:{
    fontSize:18,
    fontWeight:"400",
    color: Colors.black,
  }

})