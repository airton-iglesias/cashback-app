import React, { useEffect, useState } from 'react';
import { SafeAreaView, BackHandler } from 'react-native';
import Home from '@/components/search/home';
import Results from '@/components/search/results';
import { useSidebar } from '@/contexts/sidebarsContext';

export default function Search() {
  const { openSidebar, closeSidebar, openNotifications, closeNotifications } = useSidebar(); // Utilizando o contexto

  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [place, setPlace] = useState<string>('Local');
  const [filterType, setFilterType] = useState<string>('Comercio');

  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const backAction = () => {
      if (showResults) {
        setShowResults(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [showResults]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showResults ? (
        <Results showResults={(value: boolean) => setShowResults(value)} />
      ) : (
        <Home
          filterType={filterType}
          place={place}
          maxDistance={maxDistance}
          handleMaxDistance={(value: number) => setMaxDistance(value)}
          handleSearchValue={(value: string) => setSearchValue(value)}
          handleLocation={(value: string) => setLocation(value)}
          handlePlace={(value: string) => setPlace(value)}
          handleFilterType={(value: string) => setFilterType(value)}
          showResults={(value: boolean) => setShowResults(value)}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          openNotifications={openNotifications} 
          closeNotifications={closeNotifications}
        />
      )}
    </SafeAreaView>
  );
}
