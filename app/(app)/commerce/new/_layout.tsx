import { StepperProvider } from '@/contexts/CommerceStepperContext';
import { Stack } from 'expo-router';

export default function NewCommerceLayout() {
  return (
    <StepperProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name='cashback_items' options={{animation: 'none'}}/>

      </Stack>
    </StepperProvider>
  );
}
