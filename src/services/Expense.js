import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'

const addExpense = async (value) => {
  try {
    let checkItem = await AsyncStorage.getItem('expense')

    if (checkItem) {
      let existData = JSON.parse(checkItem)
      
      existData.push(value)

      await AsyncStorage.setItem('expense', JSON.stringify(existData))

      let categoryData = await AsyncStorage.getItem('expenseCategory');
      let parsed = JSON.parse(categoryData)

      if (parsed[value.category]) {
        parsed[value.category] = parseInt(parsed[value.category]) + parseInt(value.amount)
      } else {
        parsed[value.category] = parseInt(value.amount)
      }

      await AsyncStorage.setItem('expenseCategory', JSON.stringify(parsed))
    } else {
      let data = [value]
      let expenseCategory = {}
      expenseCategory[value.category] = parseInt(value.amount)

      await AsyncStorage.setItem('expense', JSON.stringify(data))
      await AsyncStorage.setItem('expenseCategory', JSON.stringify(expenseCategory))
    }
    
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

const getTodaysExpense = async () => {
  try {

    let expenses = await AsyncStorage.getItem('expense')

    if (expenses) {
      let data = JSON.parse(expenses)
      let start = moment().startOf('day').toISOString()
      let end = moment().endOf('day').toISOString()
      let filtered = data.filter((val) => {

        return ((val.date >= start) && (val.date <= end))
      })
      
      return filtered
    } else {
      return []
    }
  } catch(e) {
    console.log(e)
    return false
  }
}

const getExpenseCategory = async () => {
  try {

    let expenses = await AsyncStorage.getItem('expenseCategory')

    if (expenses) {
      let data = JSON.parse(expenses)
      return data
    } else {
      return {}
    }
  } catch(e) {
    console.log(e)
    return false
  }
}

export { addExpense, getTodaysExpense, getExpenseCategory }