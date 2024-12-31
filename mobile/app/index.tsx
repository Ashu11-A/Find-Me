import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function LocationPage () {
    const [locale, setLocale] = useState<Location.LocationObject | null>(null)
    const [status, setStatus] = useState<Location.LocationProviderStatus | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        (async () => {
            const { granted } = await Location.getForegroundPermissionsAsync();
            
            if (!granted) {
                setError('Permission to acess location was denied')
                return
            }
            
            const status = await Location.getProviderStatusAsync()
            setStatus(status)
    
            const location = await Location.getCurrentPositionAsync({ timeInterval: 1000, accuracy: 6, distanceInterval: 1 })
            setLocale(location)
        })()
    }, [])
    return (
        <View className='flex-1 justify-center items-center p-20'>
            <Text>{JSON.stringify({ ...status, ...locale }, null, 2)}</Text>
        </View>
    )
}