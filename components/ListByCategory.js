import React from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'
import COLORS from '../theme/colors'

const { width } = Dimensions.get('window')

const ListByCategory = ({ filterCategory, categoryName, onRecipieByName }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.categoryName}>{categoryName}</Text>
      <FlatList
        data={filterCategory}
        snapToAlignment={'start'}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => {
          return (
            <View style={styles.listCategory}>
              <TouchableOpacity onPress={() => onRecipieByName(item.strMeal)}>
                <Image
                  style={styles.imgCategory}
                  alt={item.strMeal}
                  source={{ uri: item.strMealThumb }}
                />
                <Text style={styles.textCard}>{item.strMeal}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
  },
  listCategory: {
    height: width / 3.6,
    width,
    marginHorizontal: 8,
  },
  imgCategory: {
    height: width / 4.3,
    width: '95%',
    marginBottom: 6,
    borderRadius: 10,
  },
  textCard: {
    top: -50,
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.subTitle,
    marginTop: 10,
    marginStart: 10,
  },
})
export default ListByCategory
