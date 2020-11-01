import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

// Components
import CategoryIcon from '../components/CategoryIcon'

// Style
import TextStyle from '../styles/TextStyle'

// Constant
import { categories } from '../constant/categories'

const CategoryModal = (props) => {
  const { title, isVisible, onClose, onSelectCategory, ...others } = props

  return (
    <View>
      <Modal
        hideModalContentWhileAnimating
        isVisible={isVisible}
        style={styles.root}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        {...others}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={[styles.headerTitle, TextStyle.subtitleTextBlack]}>{title}</Text>
            <TouchableOpacity style={{ alignSelf: 'center', marginRight: 20 }} onPress={onClose} >
              <Icon name='close' size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {categories.map((val, index) => (
              <TouchableOpacity style={styles.categoryContainer} key={index} onPress={() => onSelectCategory(val.name, val.icon)} >
                <View style={styles.categoryItem}>
                  <CategoryIcon icon={val.icon} />
                  <Text style={{ justifyContent: 'center' }}>{val.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  },
  headerTitle: {
    marginLeft: 28, 
    marginTop: 20, 
    marginBottom: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryContainer: {
    width: '30%',
    marginBottom: 15
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default CategoryModal