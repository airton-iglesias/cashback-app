import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, BackHandler } from 'react-native';
import Home from '@/components/search/home';
import Results from '@/components/search/results';

export default function Search() {

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
            {showResults ?
                <Results 
                    showResults={(value: boolean) => setShowResults(value)}
                />
                :
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
                />
            }
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 150,
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputLocationWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingLeft: 15,
        paddingRight: 50
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 20,
    },
    buttonRowPlace: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
        gap: 18
    },
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#CED4DA',
        width: 115,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    activeButton: {
        backgroundColor: '#000000',
        fontSize: 15
    },
    activeButtonText: {
        color: '#fff',
        fontSize: 15
    },
    buttonText: {
        color: '#000',
        fontSize: 15
    },
    buttonLocation: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#CED4DA',
        width: 152,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        color: 'black',
        gap: 8
    },
    buttonLocationText: {
        fontSize: 15
    },
    sectionLabel: {
        fontSize: 20
    },
    sliderSection: {
        alignItems: 'center',
        marginVertical: 30,
    },
    distanceTextWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    slider: {
        width: '107%',
        height: 40,
        marginTop: 10
    },
    nextButton: {
        borderRadius: 8,
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 56,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
});
