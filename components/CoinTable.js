import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DATA } from '../utils/Data';

const CoinTable = ({ data, onCoinPress }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const formatValue = (value) => {
        return parseFloat(value).toFixed(5);  // Rounding decimal to 5 places
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            // Reverse the sort order if the same column is clicked again
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Sort by the selected column in ascending order by default
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    // Just the icons for displaying sorting order
    const renderSortIcon = (column) => {
        if (column === sortColumn) {
            return sortOrder === 'asc' ? (
                <Feather name="chevron-up" size={16} color="#ffffff" />
            ) : (
                <Feather name="chevron-down" size={16} color="#ffffff" />
            );
        }
        return null;
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.row} onPress={() => onCoinPress(item)}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.text}>{formatValue(item.price)}</Text>
                <Text style={styles.text}>{formatValue(item.volume)}</Text>
            </TouchableOpacity>
        );
    }

    const sortedData = [...data]; // Create a copy of the data array

    // Sort the data based on the selected column and sort order
    if (sortColumn === 'price') {
        sortedData.sort((a, b) => {
            const aValue = parseFloat(a.price);
            const bValue = parseFloat(b.price);
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
    } else if (sortColumn === 'volume') {
        sortedData.sort((a, b) => {
            const aValue = parseFloat(a.volume);
            const bValue = parseFloat(b.volume);
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: DATA[0].image }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={10}
            />

            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('symbol')}
                >
                    <Image
                        source={{ uri: DATA[2].image }}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Text style={styles.headerText}>Symbol</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('price')}
                >
                    <Image
                        source={{ uri: DATA[1].image }}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Text style={styles.headerText}>Price</Text>
                    {renderSortIcon('price')}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('volume')}
                >
                    <Image
                        source={{ uri: DATA[3].image }}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Text style={styles.headerText}>Volume</Text>
                    {renderSortIcon('volume')}
                </TouchableOpacity>

            </View>

            <FlatList
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.symbol}
                contentContainerStyle={styles.contentContainer}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
    },
    headerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderRadius: 90,
        borderColor: 'white',
        margin: 8,
        borderWidth: 3
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        borderRadius: 6,
        paddingHorizontal: 12,
        marginRight: 4,
        fontFamily: 'play'
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 10,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderColor: '#ffffff',
        // backgroundColor: 'black',  // Give this a try it was looking cool
        borderWidth: 3,
        height: 50,
        margin: 10,
        borderRadius: 32,
        alignItems: 'center',
        opacity: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 4
    },
    symbolText: {
        backgroundColor: 'black',
        height: 40,
        padding: 12,
        color: 'white',
        fontWeight: 'bold',
        width: '35%',
        borderWidth: 1,
        borderRightWidth: 3,
        borderColor: 'white',
        borderRadius: 8,
        borderTopLeftRadius: 32,
        borderBottomLeftRadius: 32,
        right: '40%',
        textAlign: 'center'
    },
    text: {
        flex: 1,
        fontSize: 12,
        color: 'white',
        borderRadius: 12,
        margin: 2,
        textAlign: 'center',
        fontFamily: 'play'
    },
});

export default CoinTable;
