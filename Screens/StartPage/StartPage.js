import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function StartPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../assets/start/Hero.png')}
            />
            <Text style={styles.text}>Cook like a chef</Text>
            <Button style={styles.button} uppercase={false} mode="contained" onPress={() => { navigation.navigate('Home') }}> Get Started </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f4fa',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'roboto-regular'
    },
    button: {
        backgroundColor: '#f96163',
        borderRadius: 25,
        width: 200,
        padding: 8,
        marginVertical: 12
    },
    text: {
        fontSize: 42,
        fontWeight: 'bold',
        paddingHorizontal: 24,
        marginTop: 16
    },
    image: {
        height: 420,

    }
});