import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { DATA } from "../../utils/Data";

const { width } = Dimensions.get('screen');

export const Indicator = ({ scrollX }) => {
    return <View style={styles.container}>
        {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.4, 0.8],
                extrapolate: 'clamp'
            });
            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 0.9, 0.6],
                extrapolate: 'clamp'
            })
            return (
                <Animated.View
                    key={`indicator-${i}`}
                    style={[styles.drop, {
                        opacity,
                        transform: [
                            {
                                scale
                            }
                        ]
                    }]}
                />
            )
        })}
    </View>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row'
    },
    drop: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 10
    }
})