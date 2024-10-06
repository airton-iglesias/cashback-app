import AmountCashback from "@/components/send_cashback/amount_cashback";
import Send_Discount_Home from "@/components/send_cashback/home";
import { useEffect, useState } from "react";
import { BackHandler, SafeAreaView } from "react-native";

export default function Send_cashback() {
    const [currentScreen, setCurrentScreen] = useState<string>('home');


    useEffect(() => {
        const backAction = () => {
          if (currentScreen === 'amountValue') {
                setCurrentScreen('home')
            return true;
          }
          return false;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, [currentScreen]);

      
    return (
        <SafeAreaView style={{flex: 1}}>
            {currentScreen == 'home' ?
                <Send_Discount_Home
                    changeScreen={(text: string) => setCurrentScreen(text)}
                />
                :
                <AmountCashback
                    changeScreen={(text: string) => setCurrentScreen(text)}
                />
            }
        </SafeAreaView>

    );
}