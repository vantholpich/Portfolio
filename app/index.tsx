import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '../components/AppCard';
import { useApps } from '../hooks/useApps';
import { App } from '../types';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const { apps, loading, refetch } = useApps();

    const successfulApps = apps.filter(app => app.status === 'successful');
    const inProgressApps = apps.filter(app => app.status === 'in-progress');
    const failedApps = apps.filter(app => app.status === 'failed');

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#0f172a', '#020617']}
                style={styles.background}
            />

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
                ]}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refetch} tintColor="#fff" />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Portfolio</Text>
                    <Text style={styles.headerSubtitle}>Showcasing my journey in app development</Text>
                </View>

                <Section title="Successful Apps" apps={successfulApps} />
                <Section title="In Progress" apps={inProgressApps} />
                <Section title="Failed Experiments" apps={failedApps} />
            </ScrollView>
        </View>
    );
}

function Section({ title, apps }: { title: string; apps: App[] }) {
    if (apps.length === 0) return null;

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>
                {apps.map((app, index) => (
                    <AppCard key={app.id} app={app} index={index} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    sectionContent: {
        gap: 16,
    },
});
