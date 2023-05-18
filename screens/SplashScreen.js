import { useRef } from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Indicator } from '../components/splashScreen/Indicator';
import { DATA } from '../utils/Data';
import { Backdrop } from '../components/splashScreen/Backdrop';
import { Square } from '../components/splashScreen/Square';
const { width } = Dimensions.get('screen');

const SplashScreen = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrollX} />
            <Square scrollX={scrollX} />
            <Animated.FlatList
                data={DATA}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
                pagingEnabled
                renderItem={({ item }) => {
                    return (
                        <View style={styles.innerContainer}>
                            <View style={styles.topContent}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.bottomContent}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Get Started</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
            <Indicator scrollX={scrollX} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        width,
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: width / 1.5,
        height: width / 1.5,
        left: '12%',
        resizeMode: 'contain',
    },
    topContent: {
        flex: 0.7,
        justifyContent: 'center'
    },
    bottomContent: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'play',
        fontSize: 28,
        marginBottom: 20
    },
    button: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12
    },
    buttonText: {
        fontWeight: '500',
        fontFamily: 'play'
    }
});

export default SplashScreen;