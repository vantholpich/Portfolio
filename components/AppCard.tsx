import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ExternalLink, Smartphone } from 'lucide-react-native';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { App } from '../types';

interface AppCardProps {
    app: App;
    index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AppCard({ app, index }: AppCardProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (app.url) {
            const url = app.url.startsWith('http') ? app.url : `https://${app.url}`;
            Linking.openURL(url);
        }
    };

    return (
        <AnimatedPressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.container, animatedStyle]}
            entering={FadeInDown.delay(index * 100).springify()}
        >
            <BlurView intensity={20} tint="dark" style={styles.blur}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.iconContainer}>
                                {app.image_url ? (
                                    <Image source={{ uri: app.image_url }} style={styles.icon} />
                                ) : (
                                    <View style={styles.placeholderIcon}>
                                        <Smartphone size={24} color="#fff" />
                                    </View>
                                )}
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{app.name}</Text>
                                <Text style={styles.type}>{app.type === 'ios' ? 'iOS App' : 'Web App'}</Text>
                            </View>
                            {app.url && <ExternalLink size={20} color="rgba(255,255,255,0.5)" />}
                        </View>

                        <Text style={styles.description} numberOfLines={2}>
                            {app.description}
                        </Text>

                        <View style={styles.statusContainer}>
                            <View style={[styles.statusDot, { backgroundColor: getStatusColor(app.status) }]} />
                            <Text style={styles.statusText}>{formatStatus(app.status)}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </BlurView>
        </AnimatedPressable>
    );
}

function getStatusColor(status: App['status']) {
    switch (status) {
        case 'successful':
            return '#4ade80'; // green-400
        case 'in-progress':
            return '#facc15'; // yellow-400
        case 'failed':
            return '#f87171'; // red-400
        default:
            return '#9ca3af'; // gray-400
    }
}

function formatStatus(status: string) {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    blur: {
        width: '100%',
    },
    gradient: {
        padding: 20,
    },
    content: {
        gap: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginRight: 12,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 12,
    },
    placeholderIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    type: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    description: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    statusText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
    },
});
