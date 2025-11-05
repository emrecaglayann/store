import { Platform, StyleSheet, Text, View , Image ,FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CartItemType, CategoryType } from '@/types/type';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


type Props = {}

const CartScreen = (props: Props) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const headerHeight = useHeaderHeight();

    useEffect(() => {
        getCartData();
      }, []);

    const getBaseUrl = () => {
        if (Platform.OS === "android") {
          return "http://10.0.2.2:8000"; // Android 
        }
        return "http://localhost:8000";  // iOS 
    
      };

    const getCartData = async () => {
    try {
      const URL = `${getBaseUrl()}/cart`;
      const response = await axios.get(URL);

      console.log("Cart API Response:", response.data);
      setCartItems(response.data); 
    } catch (error) {
      console.error("Cart API error:", error);
    }
  }


  return (
    <>
    <Stack.Screen options={{headerShown: true, headerTransparent:true }} />
      <View style={[styles.container , {marginTop: headerHeight}]}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item , index }) => ( 
            <CartItem item = {item} />
          )}
        />
      </View>
      <View style={styles.footer}>
          <View style={styles.priceInfoWrapper}>
            <Text style = {styles.totalText}>Total: 100</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style= {styles.checkoutBtnText}>Checkout</Text>
          </TouchableOpacity>
      </View>
      
    </>
    
  )
}

const CartItem = ({item} : {item: CartItemType}) => {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: item.image}} style={styles.itemImg} />
      <View style={styles.itemInfoWrapper}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.price} USD</Text>
        <View style ={styles.itemControlWrapper}>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size ={20} color={"red"} />
          </TouchableOpacity>
          <View style={styles.quantityControlWrapper}>
            <TouchableOpacity style={styles.quantityControl}>
              <Ionicons name="remove-outline" size={20} color={Colors.black}/>
            </TouchableOpacity>
            <Text>1</Text>
            <TouchableOpacity>
              <Ionicons name="add-outline" size={20} color={Colors.black}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={20} color={Colors.black}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
   paddingHorizontal:20,
  },
  
  itemWrapper:{
    alignItems:"center",
    flexDirection:"row",
    padding: 10,
    marginBottom:10,
    borderColor: Colors.lightGray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius:10,
  },
  itemInfoWrapper:{
    flex:1,
    alignItems: "flex-start",
    gap:10,

  },
  itemImg:{
    width: 100,
    height: 100,
    borderRadius:10,
    marginRight: 10,
  },

  itemText:{
    fontSize:14,
    fontWeight:"500",
    color: Colors.black,
    
  },
  itemControlWrapper:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"80%",

  },
  quantityControlWrapper:{
  flexDirection:"row",
  alignItems:"center",
  gap:15,
  },
  quantityControl:{
    padding:5,
    borderWidth:1,
    borderColor: Colors.lightGray,
    borderRadius:5,
  },
  footer:{
    flexDirection:"row",
    padding:20,
    backgroundColor: Colors.white,
  },
  priceInfoWrapper:{
    flex:1,
  },
  totalText:{
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    bottom:-10,

  },
  checkoutBtn:{
    flex:1,
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 5,
  },
  checkoutBtnText:{
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  }
})