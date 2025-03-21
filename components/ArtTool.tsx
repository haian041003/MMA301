import {
    addFavorite,
    isFavorite,
    removeFavorite,
} from '@/config/helpers/asyncstorage';
import { ArtTool } from '@/types/artTool';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const ArtToolCard = ({ item }: { item: ArtTool }) => {
    const [isFav, setIsFav] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        const status = await isFavorite(item.id);
        setIsFav(status);
    };

    const toggleFavorite = async () => {
        if (isFav) {
            await removeFavorite(item.id);
            setIsFav(false);
        } else {
            await addFavorite(item);
            setIsFav(true);
        }
    };

    // const handlePress = () => {
    //   navigation.navigate('Detail', item.id);
    // };

    // Calculate discount percentage
    return (
        <Pressable style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.contentContainer}>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.name} numberOfLines={2}>
                    {item.artName}
                </Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${item.price}</Text>
                    {item.limitedTimeDeal && (
                        <View style={styles.dealBadge}>
                            <Text style={styles.dealText}>Sale</Text>
                        </View>
                    )}
                </View>

                {/* Favorite button */}
                <Pressable
                    style={styles.favoriteButton}
                    onPress={toggleFavorite}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isFav ? '#FF3B30' : '#8E8E93'}
                    />
                </Pressable>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        padding: 12,
        position: 'relative',
    },
    brand: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        lineHeight: 22,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dealBadge: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 10,
    },
    dealText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
    },
});

export default ArtToolCard;