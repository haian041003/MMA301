import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { PRIMARY_COLOR } from '@/constants/Colors';

export default function TabLayout() {
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: PRIMARY_COLOR,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {
                        height: 56,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={24} name="house.fill" color={color} />
                    ),
                    headerShown: true,
                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Favorite',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={24} name="heart.fill" color={color} />
                    ),
                    headerShown: true,
                }}
            />

            <Tabs.Screen
                name="art-tools/[id]"
                options={{
                    title: 'ArtTool Detail',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={24} name="gearshape.fill" color={color} />
                    ),
                    headerShown: false,
                    href: null,
                }}
            />
        </Tabs>
    );
}