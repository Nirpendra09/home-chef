import { ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Recipe({ navigation, extraData }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={{ color: "#3c444c", textAlign: 'justify' }}>1.{extraData}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f4fa",
        // fontFamily: 'roboto-regular',
    },
})