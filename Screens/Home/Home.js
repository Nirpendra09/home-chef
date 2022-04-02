import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import axios from 'axios';
import { Text, Searchbar, Chip, Card, IconButton, Colors } from 'react-native-paper'


const categories = ['All', 'Chicken', 'Dessert', 'Pasta', 'Pizza', 'Salad', 'Soup', 'Steak']
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dishes, setDishes] = useState([]);

    const [categories, setCategories] = useState(['All'])


    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian')
            .then(function (response) {
                // console.log(response.data.meals);
                setDishes(response.data.meals);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php').then(function (response) {
            // console.log(response.data.categories);
            setCategories([{ strCategory: 'All' }, ...response.data.categories]);
        })
    }, [])


    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`).then(function (response) {
            if (response.data.meals !== null) {
                setDishes(response.data.meals);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }, [selectedCategory])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <Text style={styles.text}>Delicious</Text>
            <Text style={styles.heading}>Easy to cook menu</Text>

            <Searchbar
                style={styles.search}
                placeholder="Search your perfect dish"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <Text style={styles.subheading}>Category</Text>

            <View style={styles.chipContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.chipScroll}
                >
                    {categories.map((category, index) => (
                        <Chip
                            key={index}
                            style={[styles.chip, selectedCategory === category.strCategory && styles.selectedChip]}
                            onPress={() => setSelectedCategory(category.strCategory)}
                        >
                            <Text style={selectedCategory === category.strCategory ? { color: '#fff' } : { color: '#000' }}>

                                {category.strCategory}
                            </Text>
                        </Chip>
                    ))}
                </ScrollView>
            </View>



            <Text style={styles.subheading}>Popular</Text>
            <View style={{ marginTop: 16, flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    dishes.map((dish, index) => (
                        <Card onPress={() => navigation.navigate('FoodDetails', { mealId: dish.idMeal })} key={dish + index} style={styles.foodContainer}>
                            <IconButton
                                icon="heart"
                                color={Colors.red500}
                                size={28}
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => console.log('Pressed')}
                            />
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: dish.strMealThumb }} />

                            <Text style={styles.foodName} >{dish.strMeal}</Text>
                        </Card>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f4fa',
        // fontFamily: 'roboto-regular',
    },
    button: {
        backgroundColor: '#f96163',
        borderRadius: 25,
        width: 200,
        padding: 8,
        marginVertical: 12
    },
    text: {
        paddingHorizontal: 16,
        color: '#3c444c'
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3c444c',
        paddingHorizontal: 18,
    },
    search: {
        marginTop: 24,
        marginHorizontal: 20,
        paddingVertical: 2,
        borderRadius: 12,
        alignSelf: 'center',
        color: '#3c444c',
    },
    subheading: {
        marginTop: 16,
        paddingHorizontal: 18,
        fontSize: 18,
        fontWeight: '700',
        color: '#3c444c',
    },
    chip: {
        padding: 5,
        marginHorizontal: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    chipContainer: {
        flexDirection: 'row',
        width: windowWidth,
    },
    chipScroll: {
        marginTop: 16,
        paddingBottom: 12
    },
    selectedChip: {
        backgroundColor: '#f96163',
        color: '#fff',
    },

    image: {
        borderRadius: 12,
        marginHorizontal: 10,
        height: 120,
    },
    foodContainer: {
        marginLeft: 10,
        width: windowWidth / 2 - 20,
        height: 260,
        borderRadius: 16,
        marginVertical: 12
    },
    foodName: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center', color: '#3c444c',
        paddingHorizontal: 5
    }
});