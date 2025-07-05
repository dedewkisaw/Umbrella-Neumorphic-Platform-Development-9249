import { useEffect } from 'react';
import useDataStore from '../stores/DataStore';

// Custom hook for real-time data updates
export const useRealtimeData = (interval = 15000) => {
  const simulateActivity = useDataStore(state => state.simulateActivity);
  
  useEffect(() => {
    // Start real-time simulation
    const timer = setInterval(() => {
      simulateActivity();
    }, interval);

    return () => clearInterval(timer);
  }, [simulateActivity, interval]);
};

// Hook for subscribing to specific data changes
export const useDataSubscription = (selector, callback) => {
  useEffect(() => {
    const unsubscribe = useDataStore.subscribe(
      selector,
      callback
    );
    
    return unsubscribe;
  }, [selector, callback]);
};