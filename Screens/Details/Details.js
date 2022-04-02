import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MealDetails, Recipe } from "../../components";

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

export default function Details({ route, navigation }) {
    const [dish, setDish] = useState({});

    var count = Array.from(Array(10).keys());

    useEffect(() => {
        axios
            .get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.mealId}`
            )
            .then(function (response) {
                console.log(response.data.meals);
                setDish(response.data.meals[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: dish.strMealThumb }} style={styles.image} />
            <Text style={styles.heading}>{dish.strMeal}</Text>
            <Text style={styles.subheading}>Ingredients</Text>
            <View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ingredientContainer}>
                    {count.map((n) => (
                        <View key={n} style={{ flexDirection: "column" }}>
                            {dish[`strIngredient${n}`] !== undefined && (
                                <>
                                    <View style={{ padding: 6, borderRadius: 100 }}>
                                        <Avatar.Image size={48} style={{ backgroundColor: '#f96163' }} source={{
                                            uri: `https://www.themealdb.com/images/ingredients/${dish[`strIngredient${n}`]
                                                }.png`,
                                        }} />
                                    </View>
                                    <Text style={{ textAlign: "center", width: 60, fontSize: 8 }}>
                                        {dish[`strIngredient${n}`]}{'\n'}
                                        {dish[`strMeasure${n}`]}
                                    </Text>
                                    {/* <Text style={styles.text} >{dish[`strMeasure${n}`]}</Text> */}
                                </>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
            {/* <Text style={styles.subheading}>Instructions</Text> */}
            <Tab.Navigator
                style={{ marginHorizontal: 12, }}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarItemStyle: { width: 80 },
                    tabBarStyle: { backgroundColor: '#f6f4fa' },
                    tabBarIndicatorStyle: { backgroundColor: '#f96163', },
                }}
            >
                <Tab.Screen name="Details">
                    {props => <MealDetails {...props}
                        extraData={{ category: dish.strCategory, area: dish.strArea, tags: dish.strTags, source: dish.strSource, youtube: dish.strYoutube }}
                    />}
                </Tab.Screen>
                <Tab.Screen name="Recipe">
                    {props => <Recipe {...props} extraData={dish.strInstructions} />}
                </Tab.Screen>
            </Tab.Navigator>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f4fa",
        // fontFamily: 'roboto-regular',
    },
    image: {
        height: windowHeight * 0.25,
        marginHorizontal: 20,
        marginVertical: 16,
        resizeMode: "cover",
        borderRadius: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3c444c",
        paddingHorizontal: 18,
    },

    subheading: {
        marginTop: 8,
        paddingHorizontal: 18,
        fontSize: 18,
        fontWeight: "700",
        color: "#3c444c",
    },
    text: {
        paddingHorizontal: 16,
        color: "#3c444c",
        width: windowWidth / 2 - 20,
        // borderWidth: 1
    },
    ingredientContainer: {
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingRight: 12,
        marginTop: 5,
    },
});
