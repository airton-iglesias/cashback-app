import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import Home from '@/components/search/home';
import Results from '@/components/search/results';
import { useSidebar } from '@/contexts/sidebarsContext';
import { useAppState } from '@/contexts/AppStateContext';

export default function Search() {
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [place, setPlace] = useState<string>('Local');
  const [filterType, setFilterType] = useState<string>('Comercio');
  const [filterData, setFilterData] = useState([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { openSidebar, closeSidebar, openNotifications, closeNotifications } = useSidebar();
  const { showSearchResults, switchSearchResults } = useAppState();

  const handleSearch = async () => {
    setLoading(true);
    // Simula uma requisição
    setTimeout(() => {
      setLoading(false);
      setFilterData([]); // Adicione a lógica real aqui
      switchSearchResults();
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showSearchResults ? (
        <Results
          datas={filterData}
          showResults={() => switchSearchResults()}
          showResultsValue={showSearchResults}
        />
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
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          openNotifications={openNotifications}
          closeNotifications={closeNotifications}
          loading={loading}
          setLoading={setLoading}
          handleSearch={handleSearch}
        />
      )}
    </SafeAreaView>
  );
}
