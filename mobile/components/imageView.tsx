import { Image, ImageSourcePropType } from "react-native";

export function ImageView ({ image }: { image: ImageSourcePropType }) {
    return <><Image source={image} ></Image></>
}