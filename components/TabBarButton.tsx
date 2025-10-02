import { View, Text,StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { icon } from '@/constants/icon';
import { Colors } from '@/constants/Colors';

type Props = {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  label: string;
  routeName: keyof typeof icon;
}

const TabBarButton = (props: Props) => {
    const { onPress, onLongPress, isFocused, label, routeName } = props;
  
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={ styles.tabBarBtn }
    >
      {icon[routeName] ({
        color: isFocused ? Colors.primary : Colors.black
      })}

    <Text style={{ color: isFocused ? Colors.primary : Colors.black }}>{label}</Text>
    </Pressable>
    
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabBarBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },  
    tabBarBtnText: {
        fontSize: 12,
        marginTop: 4,
    }
});
