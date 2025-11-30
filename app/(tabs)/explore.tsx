import { Platform, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CategoryType } from '@/types/type';
import axios from 'axios';
import { useRouter, Stack } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { Colors } from '@/constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ExploreScreen = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const headerHeight = useHeaderHeight();
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const getBaseUrl = () => {
     if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
    }
    return 'http://localhost:8000';
  };

  const getCategories = async () => {
    try {
      const URL = `${getBaseUrl()}/categories`;
      const response = await axios.get(URL);
      setCategories(response.data);
    } catch (error) {
      console.error('Categories API error:', error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTransparent: true, title: 'Explore' }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(300 + index * 100).duration(500)}
            >
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/category-products',
                    params: { id: String(item.id), name: item.name },
                  })
                }
                style={styles.itemWrapper}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                </View>

                <Image source={{ uri: item.image }} style={styles.image} />
              </TouchableOpacity>

            </Animated.View>
          )}
        />
      </View>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.extralightGray,
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});
