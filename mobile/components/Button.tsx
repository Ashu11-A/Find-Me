import React from 'react';
import { View, Pressable, Text, PressableProps } from 'react-native';

interface ButtonProps extends PressableProps {
  label: string;
  type: 'normal'
}

export function Button({ label, type, ...buttonProps }: ButtonProps) {
  return (
    <View className='flex justify-center items-center p-5'>
      <Pressable
        {...buttonProps}
        className='bg-black flex-row justify-center items-center border'
      >
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}
