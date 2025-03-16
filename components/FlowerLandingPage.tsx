import React from "react"
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface FlowerCardProps {
    imageUrl: string
    title: string
}

const FlowerCard: React.FC<FlowerCardProps> = ({ imageUrl, title }) => (
    <View style={styles.flowerCard}>
        <Image source={{ uri: imageUrl }} style={styles.flowerImage} />
        <Text style={styles.flowerTitle}>{title}</Text>
    </View>
)

const FlowerLandingPage: React.FC = () => {
    const handleShopNow = () => {
        Alert.alert("Shop Now")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Blooming Flowers</Text>
                <Text style={styles.subtitle}>Fresh and Beautiful Flowers </Text>
                <Text style={styles.subtitle}>Delivered to Your Doorstep </Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    style={styles.image}
                />
            </View>

            <View style={styles.searchContainer}>
                <TextInput style={styles.textInput} placeholder="Search for flowers..." />
            </View>

            <View>
                <View style={styles.featuredSection}>
                    <Text style={styles.sectionTitle}>Featured Flowers</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1686125616977-34f6d5979eb1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="White Base"
                        />
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1581264692636-3cf6f29655c2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Red Rose"
                        />
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1579847621515-b40fcc20831e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Lily"
                        />
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1487435636644-3ad040f0195b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Tulip"
                        />
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1556216750-2108e1e54e9a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Orchid"
                        />
                        <FlowerCard
                            imageUrl="https://images.unsplash.com/photo-1695112691738-5227cabb206f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            title="Chrysanthemums"
                        />
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleShopNow}>
                        <Text style={styles.buttonText}>Shop Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#df659e",
        marginTop: 5,
    },
    imageContainer: {
        width: "100%",
        height: 200,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    searchContainer: {
        padding: 10,
        backgroundColor: "#f8f8f8",
    },
    textInput: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    featuredSection: {
        padding: 20,
        backgroundColor: "#f8f8f8",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    flowerCard: {
        width: 150,
        marginRight: 15,
    },
    flowerImage: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    flowerTitle: {
        marginTop: 5,
        fontSize: 14,
        textAlign: "center",
    },
    buttonContainer: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    button: {
        backgroundColor: "#ee82c1",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default FlowerLandingPage

