import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// Components
import CategoryModal from '../components/CategoryModal'

// Styles
import TextStyle from '../styles/TextStyle';
import IconStyle from '../styles/IconStyle';

// Service
import { addExpense } from '../services/Expense'

function AddScreen() {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setCategory] = useState('Makanan')
  const [categoryImage, setCategoryImage] = useState(require('../assets/makanan-teal.png'))
  const [date, setDate] = useState({
    show: false,
    value: new Date()
  })

  const handleShowDate = (event, selectedDate) => {


    if (event.type === 'dismissed') {
      setDate({
        value: date.value || new Date(),
        show: false
      })
    } else {
      setDate({
        show: false,
        value: selectedDate
      })
    }
  }

  const handleSelectCategory = (category, icon) => {
    setCategoryImage(icon)
    setCategory(category)
    setShowModal(false)
  }

  const save = async () => {
    let data = {
      category: selectedCategory.toLowerCase().replace(' ', '-'),
      name: name,
      amount,
      date: date.value,
      icon: categoryImage
    }

    let save = await addExpense(data)

    if (save) {
      setName('')
      setAmount('')

      alert('Success', 'Data berhasil ditambahkan')
    } else {
      alert('Error', 'Data gagal ditambahkan')
    }
  }

  const alert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK'
        }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
        <Text style={TextStyle.titleTextBlack}>Tambah pengeluaran</Text>
        <Text style={TextStyle.titleTextBlack}>baru</Text>

        {/* Form */}
        <Form style={{ marginTop: 25, marginLeft: -10 }}>
          <Item
            stackedLabel
            style={name.length > 0 ? styles.inputFilled : styles.inputEmpty}
          >
            <Label style={TextStyle.label}>Nama Pengeluaran</Label>
            <Input
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <View style={{ marginLeft: 15 }}>
            <Text style={TextStyle.label}>Kategori</Text>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: 5 }} onPress={() => setShowModal(true)} >
                <View style={IconStyle.greyCategoryImageContainer}>
                  <Image style={IconStyle.categoryImage} source={categoryImage} />
                </View>
                <View style={{ marginLeft: 16, alignSelf: 'center' }}>
                  <Text>{selectedCategory}</Text>
                </View>
                <View style={[ { marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' } ,IconStyle.greyCategoryImageContainer]}>
                  <Icon name='chevron-forward-outline' size={16} color={'#828282'} />
                </View>
            </TouchableOpacity>
          </View>
          <Item
            stackedLabel
            style={name.length > 0 ? styles.inputFilled : styles.inputEmpty}
          >
            <Label style={TextStyle.label}>Tanggal</Label>
            
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setDate({ ...date, show: true })}>
              <Input
                value={moment(date.value).format('dddd, D MMMM yyyy')}
                editable={false}
              />
              <View style={{ marginTop: 6 }}>
                <Icon name='calendar' size={24} color={'#828282'} />
              </View>
            </TouchableOpacity>
            {date.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date.value || new Date() }
                mode={'date'}
                is24Hour={false}
                display="default"
                onChange={(e, date) => handleShowDate(e, date)}
              />
            )}
          </Item>
        </Form>
        <View style={styles.formContainer}>
          <Text style={TextStyle.label}>Nominal</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={amount.length > 0 ? styles.amountLabelFilled : styles.amountLabelEmpty}>Rp.</Text>
            <TextInput
              keyboardType='numeric'
              value={amount}
              placeholder={'Nasi Goreng'}
              onChangeText={(text) => setAmount(text)}
              style={{
                borderBottomColor: amount.length > 0 ? '#46B5A7' : '#BDBDBD',
                borderBottomWidth: 2,
                flex: 1
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button block style={styles.button} onPress={save}>
            <Text style={TextStyle.subtitleText}>Simpan</Text>
          </Button>
        </View>
      </ScrollView>
      <CategoryModal title='Pilih Kategori' isVisible={showModal} onClose={() => setShowModal(false)} onSelectCategory={handleSelectCategory} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 28
  },
  formContainer: {
    marginBottom: 20,
    marginLeft: 9
  },
  inputFilled: {
    borderBottomWidth: 2,
    borderBottomColor: '#46B5A7',
    marginBottom: 5
  },
  inputEmpty: {
    borderBottomWidth: 2,
    marginBottom: 5,
    borderBottomColor: '#BDBDBD',
  },
  amountLabelFilled: {
    marginTop: 'auto',
    paddingBottom: 15,
    borderBottomColor: '#46B5A7',
    borderBottomWidth: 2
  },
  amountLabelEmpty: {
    marginTop: 'auto',
    paddingBottom: 15,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 2
  },
  button: {
    backgroundColor: '#46B5A7',
    flex: 1,
    borderRadius: 8
  }
});

export default AddScreen;