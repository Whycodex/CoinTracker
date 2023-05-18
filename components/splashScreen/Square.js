import { Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen');

export const Square = ({ scrollX }) => {
    const YOLO = Animated.modulo(Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)), 1
    );
    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['35deg', '0deg', '35deg']
    });
    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0]
    });
    return (
        <Animated.View
            style={[styles.container,{
                transform: [
                    {
                        rotate
                    },
                    {
                        translateX
                    }
                ]
            }]}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
    }
})