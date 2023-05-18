import { Animated, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen');
export const bgs = ['#000', '#0095ff', '#ff6600', '#5c0099'];

export const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg)
    });
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor,
                }
            ]}
        />
    )
}