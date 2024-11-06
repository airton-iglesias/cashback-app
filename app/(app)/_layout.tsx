import React from 'react';
import { Stack } from 'expo-router';
import { AppStateProvider } from '@/contexts/AppStateContext';

export default function DashboardLayout() {
  return (
    <AppStateProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppStateProvider>
  );
}
