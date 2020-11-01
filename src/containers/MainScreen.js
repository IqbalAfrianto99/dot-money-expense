import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import NumberFormat from 'react-number-format'

// Components
import CategoryExpenseCard from '../components/CategoryExpenseCard';
import TodayExpenseCard from '../components/TodayExpenseCard';
import FAB from '../components/FAB';

// Services
import { getTodaysExpense, getExpenseCategory } from '../services/Expense'

const MainScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)
  const [expenseCategory, setExpenseCategory] = useState({})
  

  useEffect(() => {
    getExpense()
    getExpenseByCategory()
  }, [])

  useEffect(() => {
    navigation.addListener(
      'focus',() => { 
        getExpense()
        getExpenseByCategory()
      }
    );
  }, [navigation])

  const getExpense = async () => {
    try {
      let expenses = await getTodaysExpense();
      
      if (expenses.length > 0) {
        let total = sumTotalExpense(expenses)
      
        setTotal(total)
        setExpenses(expenses)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const getExpenseByCategory = async () => {
    try {
      let expenses = await getExpenseCategory();
      if (expenses) {
        setExpenseCategory(expenses)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const sumTotalExpense = (expenses) => {
    if (expenses) {
      return expenses.reduce((prev, current) => prev + (parseInt(current.amount) || 0), 0)
    } else return 0
  }

  const renderCard = ({item}, index) => {
    return (
      <CategoryExpenseCard
        key={index}
        category={item}
        amount={expenseCategory[item]} />
    )
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatarImage} source={require('../assets/Vector.png')} />
            </View>
            <Text style={styles.subtitleText}>Pengeluaran Anda Hari Ini</Text>
            <NumberFormat
              value={total}
              thousandSeparator prefix={'Rp.'}
              displayType={'text'}
              renderText={(val) => (
                <Text style={styles.titleText}>
                  {val}
                </Text>
              )}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={{ marginHorizontal: 16, marginTop: 22 }}>
            <Text style={styles.subtitleTextBlack}>Pengeluaran Berdasarkan Kategori</Text>
            
            {/* {expenseCategory !== {} && (
              )} */}
              <FlatList
                contentContainerStyle={{ paddingLeft: 16, paddingVertical: 16 }}
                style={{ marginHorizontal: -16 }}
                horizontal
                data={Object.keys(expenseCategory)}
                renderItem={(item) => renderCard(item)}
                showsHorizontalScrollIndicator={false}
              />
          </View>
          <View style={{ marginHorizontal: 20, marginBottom: 30, paddingRight: 10 }}>
            <Text style={styles.subtitleTextBlack}>Semua Pengeluaran</Text>

            <TodayExpenseCard data={expenses} />
          </View>
        </View>

      </ScrollView>
      <FAB onPress={() => navigation.navigate('Add')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  avatarContainer: {
    backgroundColor: '#333333',
    width: 64,
    height: 64,
    borderRadius: 32,
    opacity: 0.5
  },
  avatarImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center'
  },
  content: {
    flex: 2,
    marginBottom: 30
  },
  root: {
    flex: 1
  },
  header: {
    backgroundColor: '#46B5A7',
    height: 202,
    flex: 1
  },
  headerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginLeft: 20
  },
  titleText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    lineHeight: 33
  },
  subtitleText: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    lineHeight: 33
  },
  subtitleTextBlack: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
    lineHeight: 33
  }
});

export default MainScreen