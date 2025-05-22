import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useServices() {
  const { data, error, isLoading } = useSWR('/api/services', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 60000, // Refresh every minute
    dedupingInterval: 30000, // Dedupe requests within 30 seconds
  });

  return {
    services: data,
    isLoading,
    error,
  };
}