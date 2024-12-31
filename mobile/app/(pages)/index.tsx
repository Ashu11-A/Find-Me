import { Button } from "@/components/Button";
import { ImageView } from "@/components/imageView";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ImageSourcePropType, Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker'

export default function ImageTest() {
  const [image, setImage] = useState<ImageSourcePropType | null>(null)

  const pickImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    }).then((result) => {
      if (result.canceled) {
        alert('You did not select any image.')
      }
      setImage(result.assets?.[0] ?? null)
    })
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-3/4 h-1/2 rounded-2xl border border-zinc-300 shadow-md shadow-slate-600 overflow-hidden flex justify-center items-center m-0">
        {image && <ImageView image={image} ></ImageView>}
      </View>

      <Button type="normal" onPress={() => pickImage()} label="Choose a photo"></Button>

      <StatusBar style="auto" />
    </View>
  );
}
