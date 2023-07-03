import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../theme/colors'

const { width } = Dimensions.get('screen')

const image = {
  uri: 'https://www.themealdb.com//images//media//meals//uyqrrv1511553350.jpg',
}
const Recommended = () => {
  return (
    <View>
      <Text style={styles.labelR}>Recommended</Text>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <ImageBackground style={styles.cardImage} source={image}>
            <Ionicons name="heart" size={30} color={COLORS.red} />
          </ImageBackground>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  labelR: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.subTitle,
    marginTop: 10,
    marginBottom: 10,
    marginStart: 10,
  },
  container: {
    alignItems: 'center',
  },
  containerImage: {
    height: 300,
    width: width - 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  cardImage: {
    height: 260,
    width: width - 40,
    margin: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
})

export default Recommended
