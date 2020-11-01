import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'

import IconStyle from '../styles/IconStyle'

const FAB = (props) => {
    const { onPress } = props

    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Image style={IconStyle.categoryImage} source={require('../assets/plus.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 21,
        width: 44,
        height: 44,
        borderRadius: 32,
        backgroundColor: '#F54291'
    }
});

export default FAB;