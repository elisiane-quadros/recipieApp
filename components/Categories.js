import React, { useState, useEffect } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { getCategories, getRecipiesByCatgory } from '../services/api'
import COLORS from '../theme/colors'

const { width } = Dimensions.get('window')

const Categories = ({ onFilterCategory, onCategoryName }) => {
  const [categories, setCategories] = useState([])

  const getCategoriesRequest = async () => {
    try {
      const response = await getCategories()
      setCategories(response.data.categories)
    } catch (error) {
      console.error(error)
    }
  }

  const getRecipiesByCatgoryRequest = async (name) => {
    try {
      const response = await getRecipiesByCatgory(name)
      onFilterCategory(response.data.meals)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilterCategory = (value) => {
    onCategoryName(value)
    getRecipiesByCatgoryRequest(value)
  }

  useEffect(() => {
    getCategoriesRequest()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.labelC}>Categories</Text>
      <FlatList
        data={categories}
        horizontal
        snapToAlignment={'start'}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => {
          return (
            <View style={styles.listCategory}>
              <TouchableOpacity
                onPress={() => handleFilterCategory(item.strCategory)}
              >
                <Image
                  style={styles.imgCategory}
                  alt={item.strCategory}
                  source={{ uri: item.strCategoryThumb }}
                />
                <Text style={styles.textCard}>{item.strCategory}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    height: 234,
    width,
  },
  labelC: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.subTitle,
    marginTop: 45,
    marginStart: 10,
  },
  listCategory: {
    backgroundColor: COLORS.secondary,
    height: width / 3.6,
    width: 120,
    marginHorizontal: 8,
    marginTop: 16,
    paddingTop: 4,
    borderRadius: 10,
    elevation: 8,
  },
  imgCategory: {
    height: width / 4.3,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textCard: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
})
