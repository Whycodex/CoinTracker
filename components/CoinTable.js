import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CoinTable = ({ data, onCoinPress }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const formatValue = (value, limit) => {
        return (value).slice(0, limit);  // Rounding decimal to 5 places
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
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{formatValue(item.symbol, 3)}<Text style={styles.bottomText}> / BTC</Text></Text>
                    <Text style={styles.bottomText}>Vol {formatValue(item.volume, 4)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{formatValue(item.price, 9)}</Text>
                    <Text style={styles.bottomText}>$ {formatValue(item.price, 4)}</Text>
                </View>
                <View style={{ width: '75%' }}>
                    <Text style={styles.volumeText}>{formatValue(item.percent, 4)}%</Text>
                </View>
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
    } else if (sortColumn === 'percent') {
        sortedData.sort((a, b) => {
            const aValue = parseFloat(a.percent);
            const bValue = parseFloat(b.percent);
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={[styles.headerText, { fontSize: 20 }]}>Markets</Text>
                <View style={styles.primaryHeaderConainer}>
                    <Text style={styles.primaryHeaderText}>Favourites</Text>
                    <Text style={styles.primaryHeaderText}>BNB</Text>
                    <Text style={[styles.primaryHeaderText, { color: '#f7c611' }]}>BTC</Text>
                    <Text style={styles.primaryHeaderText}>ETH</Text>
                    <Text style={styles.primaryHeaderText}>USDT</Text>
                </View>
            </View>

            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('volume')}
                >
                    <Text style={styles.headerText}>Name/vol</Text>
                    {renderSortIcon('volume')}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('price')}
                >
                    <Text style={styles.headerText}>Last Price</Text>
                    {renderSortIcon('price')}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.headerItem}
                    onPress={() => handleSort('percent')}
                >
                    <Text style={styles.headerText}>24h change %</Text>
                    {renderSortIcon('percent')}
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
    primaryHeaderConainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    primaryHeaderText: {
        color: 'white',
        marginHorizontal: 6,
        fontFamily: 'play'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        marginTop: 10,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderColor: '#ffffff'
    },
    headerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        margin: 8
    },
    headerText: {
        // fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
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
        borderColor: 'grey',
        borderBottomWidth: 1,
        height: 50,
        margin: 10,
        borderRadius: 3,
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
    volumeText: {
        backgroundColor: '#f00c50',
        height: 30,
        padding: 6,
        color: 'white',
        fontWeight: 'bold',
        width: '32%',
        borderWidth: 1,
        borderColor: '#c1c1c1',
        borderRadius: 2,
        textAlign: 'center'
    },
    textContainer: {
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    bottomText: {
        color: '#c1c1c1',
        fontSize: 10,
        fontFamily: 'play'
    },
    text: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 12,
        // textAlign: 'center',
        fontFamily: 'play'
    },
});

export default CoinTable;
