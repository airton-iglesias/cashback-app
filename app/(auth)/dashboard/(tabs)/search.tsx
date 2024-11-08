import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, BackHandler } from 'react-native';
import Home from '@/components/search/home';
import Results from '@/components/search/results';
import { useSidebar } from '@/contexts/sidebarsContext';

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

  const showResultsRef = useRef<boolean>(false); 


  const handleSearch = async () => {
    /* make the request to the API here
    //Example: 
    const dataResponse = await
        fetch('domain of application here', {
            method: 'GET',
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .catch((error) => {
            console.log(error)
        });
    setFilterData(dataResponse)
    setLoading(false);
    setShowResults(true);
    */

    setTimeout(() => {
      setLoading(false);
      showResultsRef.current = true;
      setRefresh(prev => !prev); 
    }, 2000);
  }

  useEffect(() => {
    const backAction = () => {
      if (showResultsRef.current) {
        showResultsRef.current = false;
        setRefresh(prev => !prev);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showResultsRef.current ? (
        <Results
          datas={filterData}
          showResults={(value: boolean) => {
            showResultsRef.current = value;
            setRefresh(prev => !prev);
          }}
          showResultsValue={showResultsRef.current}
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
          showResults={(value: boolean) => {
            showResultsRef.current = value;
            setRefresh(prev => !prev);
          }}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          openNotifications={openNotifications}
          closeNotifications={closeNotifications}
          loading={loading}
          setLoading={(value: boolean) => setLoading(value)}
          handleSearch={handleSearch}
        />
      )}
    </SafeAreaView>
  );
}
