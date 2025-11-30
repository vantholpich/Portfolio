import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { App } from '../types';

export function useApps() {
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchApps();
    }, []);

    async function fetchApps() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('apps')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            if (data) {
                setApps(data as App[]);
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    return { apps, loading, error, refetch: fetchApps };
}
