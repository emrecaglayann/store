import { StyleSheet, Platform ,Text, View, FlatList } from 'react-native'
import React , { useState , useEffect }from 'react'
import { Stack } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { CategoryType, NotificationType } from '@/types/type'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

type Props = {}

const NotificationsScreen = (props: Props) => {


  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const headerHeight = useHeaderHeight();

    useEffect(() => {
        getNotifications();
      }, []);

    const getBaseUrl = () => {
        if (Platform.OS === "android") {
          return "http://10.0.2.2:8000"; // Android 
        }
        return "http://localhost:8000";  // iOS 
    
      };

    const getNotifications = async () => {
    try {
      const URL = `${getBaseUrl()}/notifications`;
      const response = await axios.get(URL);

      console.log("Notifications API Response:", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error("Notifications API error:", error);
    }
  }


  return (
    <>
      
      <Stack.Screen options={{headerShown: true , headerTransparent: true }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
       <FlatList
         data={notifications}
         renderItem={({ item, index }) => (
           <Animated.View style={styles.notificationWrapper} entering={FadeInDown.delay(300 + index *100).duration(500)}>
             <View style={styles.iconWrapper}>
                <Ionicons 
                  name="notifications-outline" 
                  size={20} 
                  color="black" 
                />
             </View>
             <View style={styles.notificationInfo}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.timestamp}</Text>
                </View>
                <Text style={styles.notificationMessage}>{item.message}</Text>
             </View>
           </Animated.View>
         )}
         keyExtractor={(item) => item.id.toString()}
       />
      </View>
    </>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

  },
  notificationWrapper:{
    flexDirection:'row',
    alignItems:"center",
    padding:10,
    marginBottom:10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.extralightGray,
    borderRadius:5,
  },
  iconWrapper:{

  },
  notificationIcon:{
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationInfo:{
    flex:1,
  },
  notificationTitle:{
    fontSize:16,
    color: Colors.black,
 
  },
  notificationMessage:{
    fontSize:14,
    color: Colors.gray, 
    marginTop:5,
    lineHeight:20,
  },
})