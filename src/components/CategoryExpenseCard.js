import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import NumberFormat from 'react-number-format'

const CategoryExpenseCard = (props) => {
  const { category, amount } = props

  return (
    <View style={[styles.cardContainer]}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.categoryImageContainer}>
          <Image style={styles.categoryImage} source={require('../assets/makanan.png')} />
        </View>
        <Text style={styles.categoryNameText}>{category}</Text>
        <NumberFormat
          value={amount}
          thousandSeparator prefix={'Rp.'}
          displayType={'text'}
          renderText={(val) => (
            <Text style={styles.expenseAmountText}>
              {val}
            </Text>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    flexDirection: 'column',
    marginRight: 16,
    elevation: 3
  },
  categoryImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center'
  },
  categoryImageContainer: {
    backgroundColor: '#46B5A7',
    width: 36,
    height: 36,
    borderRadius: 32,
    marginTop: 16,
    marginBottom: 10
  },
  categoryNameText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#828282',
    marginBottom: 7
  },
  expenseAmountText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#4F4F4F'
  }
})

export default CategoryExpenseCard;