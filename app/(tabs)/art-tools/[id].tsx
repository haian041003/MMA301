import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoadingScreen from '@/components/LoadingScreen';
import artToolApi from '@/config/api/artToolApi';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/Colors';
import { useFavorites } from '@/hooks/useFavorites';
import { ArtTool } from '@/types/artTool';

const DetailPage = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<ArtTool | null>(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const [isFav, setIsFav] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const fetchData = async (id: string) => {
        try {
            const artTool = await artToolApi.getArtToolById(id);
            setData(artTool);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching artTools:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const detailId = id as string;
        fetchData(detailId);

        return () => {
            setData(null);
        };
    }, [id]);

    useEffect(() => {
        if (data) {
            setIsFav(isFavorite(data.id));
        }
    }, [data, isFavorite]);

    const toggleFavorite = async () => {
        if (!data) return;

        try {
            if (isFav) {
                await removeFavorite(data.id);
                setIsFav(false);
            } else {
                await addFavorite(data);
                setIsFav(true);
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
        }
    };

    const averageRating = useMemo(() => {
        if (!data || !data.feedbacks || data.feedbacks.length === 0) {
            return 0;
        }
        const totalRating = data.feedbacks.reduce(
            (acc, feedback) => acc + feedback.rating,
            0
        );
        return totalRating / data.feedbacks.length;
    }, [data]);

    const discountedPrice = useMemo(() => {
        if (!data || !data.limitedTimeDeal) return data?.price;
        return (data.price * (1 - data.limitedTimeDeal)).toFixed(2);
    }, [data]);

    const originalPrice = useMemo(() => {
        if (!data || !data.limitedTimeDeal) return null;
        return data.price.toFixed(2);
    }, [data]);

    const discountPercent = useMemo(() => {
        if (!data || !data.limitedTimeDeal) return null;
        return Math.round(data.limitedTimeDeal * 100);
    }, [data]);

    // Hàm định dạng ngày tháng
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (e) {
            return dateString;
        }
    };

    if (loading && !data) {
        return <LoadingScreen />;
    }

    if (!data) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No item found</Text>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </Pressable>
            </View>
        );
    }

    // Render header chứa phần thông tin tĩnh của sản phẩm
    const renderHeader = () => {
        return (
            <>
                <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.brand}>{data.brand}</Text>
                    <Text style={styles.title}>{data.artName}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${discountedPrice}</Text>
                        {originalPrice && (
                            <Text style={styles.originalPrice}>${originalPrice}</Text>
                        )}
                    </View>


                    {data.limitedTimeDeal > 0 && (
                        <View style={styles.dealBadge}>
                            <Text style={styles.dealText}>
                                {discountPercent}% OFF - Limited Time Deal
                            </Text>
                        </View>
                    )}

                    <View style={styles.specContainer}>
                        <View style={styles.specItem}>
                            <Ionicons
                                name="checkmark-circle"
                                size={18}
                                color={PRIMARY_COLOR}
                            />
                            <Text style={styles.specText}>Brand: {data.brand}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Ionicons
                                name={data.glassSurface ? 'checkmark-circle' : 'close-circle'}
                                size={18}
                                color={data.glassSurface ? PRIMARY_COLOR : '#FF3B30'}
                            />
                            <Text style={styles.specText}>
                                {data.glassSurface ? 'Suitable' : 'Not suitable'} for glass
                                surfaces
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{data.description}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.sectionTitle}>Customer Reviews</Text>
                        {averageRating > 0 && (
                            <View style={styles.ratingContainer}>
                                <View style={styles.stars}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Ionicons
                                            key={star}
                                            name={
                                                star <= Math.round(averageRating)
                                                    ? 'star'
                                                    : 'star-outline'
                                            }
                                            size={16}
                                            color="#FFD700"
                                        />
                                    ))}
                                </View>
                                <Text style={styles.ratingText}>
                                    {averageRating.toFixed(1)}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </>
        );
    };

    // Render từng đánh giá
    const renderReview = ({ item, index }: { item: any; index: number }) => (
        <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewerName}>{item.author}</Text>
            <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= item.rating ? 'star' : 'star-outline'}
                        size={14}
                        color="#FFD700"
                    />
                ))}
            </View>
            <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
            <Text style={styles.reviewText}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Header tuyệt đối */}
            <View style={[styles.header, { marginTop: insets.top }]}>
                <Pressable
                    style={styles.backIconButton}
                    onPress={() => router.back()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <View style={styles.backButton}>
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </View>
                </Pressable>
                <Pressable
                    style={styles.favoriteButton}
                    onPress={toggleFavorite}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons
                        name={isFav ? 'heart' : 'heart-outline'}
                        size={28}
                        color={isFav ? '#FF3B30' : '#8E8E93'}
                    />
                </Pressable>
            </View>

            <FlatList
                data={data.feedbacks || []}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderReview}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    <View style={styles.emptyReviewsContainer}>
                        <Text style={styles.noReviewsText}>No reviews yet</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backIconButton: {
        padding: 8,
    },
    favoriteButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#f0f0f0',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    brand: {
        fontSize: 16,
        color: '#777',
        marginBottom: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 16,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
    },
    originalPrice: {
        fontSize: 18,
        color: '#888',
        marginLeft: 12,
        textDecorationLine: 'line-through',
    },
    dealBadge: {
        backgroundColor: SECONDARY_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    dealText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    specContainer: {
        marginTop: 12,
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    specText: {
        marginLeft: 8,
        fontSize: 15,
    },
    section: {
        padding: 16,
        backgroundColor: 'white',
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: '500',
    },
    stars: {
        flexDirection: 'row',
    },
    reviewItem: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginHorizontal: 16,
    },
    reviewerName: {
        fontWeight: '600',
        marginBottom: 4,
    },
    reviewDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
        marginBottom: 4,
    },
    reviewText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
    emptyReviewsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 100,
    },
    noReviewsText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default DetailPage;
