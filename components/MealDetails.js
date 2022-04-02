import { View, Text } from 'react-native'
import React from 'react'

export default function Details({ extraData }) {
  return (
    <View>
      <Text>{JSON.stringify(extraData)}</Text>
    </View>
  )
}