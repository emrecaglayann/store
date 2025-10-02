import { View, Platform, TouchableOpacity, StyleSheet, Animated, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/(tabs)';
import ProfileScreen from '@/app/(tabs)/profile';
import TabBarButton from './TabBarButton';
import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimension, setDimension] = useState({width: 100, height: 20});
  const buttonWidth = dimension.width / state.routes.length;

  useEffect(() => {
    // Update the position of the indicator when the tab changes
    tabPositionX.value = withTiming(buttonWidth * state.index, { duration: 200});
  }, [state.index]);


  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimension({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabBarLayout} style={styles.tabbar}>
      <Animated.View
        style={[animatedStyle, {
          position: "absolute", 
          backgroundColor: Colors.primary, 
          top: 0, 
          left: 15,   
          height: 2,
          width: buttonWidth / 1.7,
        }]} 
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          }); 

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: Colors.white,
  
  },

});
