import React from 'react'
import { View, StyleSheet, Text, Image, FlatList } from 'react-native'
import NumberFormat from 'react-number-format'

// Styles
import IconStyle from '../styles/IconStyle'
import TextStyle from '../styles/TextStyle'

const TodatExpenseCard = (props) => {
  const { data } = props

  const renderListItem = (item) => {
    return (
      <View style={styles.listItemContainer}>

        <View style={IconStyle.greyCategoryImageContainer}>
          <Image style={IconStyle.categoryImage} source={item.icon} />
        </View>
        <View style={styles.expenseName}>
          <Text style={styles.expenseText}>{item.name}</Text>
        </View>
        <NumberFormat
          value={item.amount}
          thousandSeparator prefix={'Rp.'}
          displayType={'text'}
          renderText={(val) => (
            <Text style={styles.amountText}>
              {val}
            </Text>
          )}
        />
      </View>
    )
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={[ { margin: 10 } ,TextStyle.subtitleTextBlack]}>Hari Ini</Text>

      {data && data.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={data}
          scrollEnabled
          showsVerticalScrollIndicator
          renderItem={({ item }) => renderListItem(item)}
          numColumns={1}

        />
      ) : (
        <View style={{ margin: 20, justifyContent: 'center', alignSelf: 'center' }}>
          <Text style={TextStyle.subtitleTextBlack}>Tidak Ada Data</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    flex: 1
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 5
  },
  expenseName: {
    marginLeft: 16
  },
  expenseText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    paddingTop: 10
  },
  amountText: {
    paddingTop: 10,
    marginLeft: 'auto',
    marginRight: 15,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'bold'
  }
});

export default TodatExpenseCard;