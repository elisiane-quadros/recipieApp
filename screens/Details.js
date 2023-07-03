import { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../theme/colors'

export default function Details({ navigation, route }) {
  const recipie = route.params
  const [ingredients, setIngredients] = useState([])
  const [measure, setMeasure] = useState([])
  let ingredientId = 0

  useEffect(() => {
    const newIngredients = Object.keys(recipie)
      .filter((key) => key.startsWith('strIngredient'))
      .map((key) => recipie[key])
      .filter((ingredient) => ingredient !== null && ingredient !== '')
    setIngredients(newIngredients)

    const newMeasure = Object.keys(recipie)
      .filter((key) => key.startsWith('strMeasure'))
      .map((key) => recipie[key])
      .filter((measure) => measure !== null && measure !== '')
    setMeasure(newMeasure)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: recipie.strMealThumb,
          }}
          style={{ width: '100%', height: 400 }}
        >
          <View style={styles.header}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={42}
              color={COLORS.subTitle}
              onPress={navigation.goBack}
            />
          </View>
        </ImageBackground>

        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.recipieTitle}>{recipie.strMeal}</Text>
            </View>
            <View style={styles.location}>
              <Ionicons name="location" size={26} color={COLORS.subTitle} />
              <Text style={styles.recipieArea}>{recipie.strArea}</Text>
            </View>
          </View>
          <Text style={styles.instructionContainer}>Ingredients</Text>
          <FlatList
            data={ingredients}
            scrollEnabled={false}
            keyExtractor={(item) => `${item}${ingredientId++}`}
            renderItem={({ index, item }) => {
              return (
                <View style={styles.ingrentsArea}>
                  <Text style={styles.measureText}>{measure[index]}</Text>
                  <Text style={styles.ingredientText}>{item}</Text>
                </View>
              )
            }}
          />
          <View style={styles.instructionContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
              Instructions
            </Text>
            <Text>{recipie.strInstructions}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  detailsContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    elevation: 12,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipieTitle: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: 900,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipieArea: {
    color: COLORS.primaryDark,
    fontSize: 28,
    fontWeight: 'bold',
  },
  ingrentsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
  },
  ingredientText: {
    width: '70%',
    fontSize: 16,
  },
  measureText: {
    fontSize: 16,
  },
  instructionContainer: {
    width: '100%',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
})
