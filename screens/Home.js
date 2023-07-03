import React, { useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../theme/colors'

import { getRecipiesByName } from '../services/api'

import Categories from '../components/Categories'
import Recommended from '../components/Recommended'
import ListByCategory from '../components/ListByCategory'

const HomeScreen = ({ navigation }) => {
  const [inputValue, setInputValue] = useState('')
  // const [recipieName, setRecipieName] = useState('')
  const [filterCategory, setFilterCategory] = useState([])
  const [categoryName, setCategoryName] = useState('')

  const getRecipies = async (recipieValue) => {
    const newRecipie = await getRecipiesByName(recipieValue)
    navigation.navigate('Details', newRecipie?.meals[0])
  }

  const handleInputValue = (value) => {
    setInputValue(value)
  }

  const handleSearch = () => {
    if (inputValue !== '') {
      getRecipies(inputValue)
    }
    setInputValue('')
  }

  const handleRecipieByName = (recipieName) => {
    getRecipies(recipieName)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
      <StatusBar translucent={false} backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Text style={styles.headerTitle}>Let's cook?</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Procure sua receita..."
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputValue}
        />
        <TouchableOpacity>
          <Ionicons
            name="search"
            size={28}
            color={COLORS.primaryDark}
            onPress={handleSearch}
          />
        </TouchableOpacity>
      </View>
      <Categories
        onFilterCategory={setFilterCategory}
        onCategoryName={setCategoryName}
      />
      {filterCategory.length ? (
        <ListByCategory
          filterCategory={filterCategory}
          categoryName={categoryName}
          onRecipieByName={handleRecipieByName}
        />
      ) : (
        <Recommended />
      )}
    </SafeAreaView>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    height: 160,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 40,
  },
  form: {
    height: 60,
    width: '96%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 130,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 12,
  },
  input: {
    fontSize: 18,
    width: '90%',
    height: 60,
  },
})
