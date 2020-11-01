import React from 'react'
import { View, Text, Image } from 'react-native'

// Style
import IconStyle from '../styles/IconStyle'

const CategoryIcon = (props) => {
  const { icon } = props

  return (
    <View style={IconStyle.greyCategoryImageContainer}>
      <Image style={IconStyle.categoryImage} source={icon} />
    </View>
  )
}

export default CategoryIcon