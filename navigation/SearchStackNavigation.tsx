import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchParamList } from '../types/navigationTypes';
import FiltersSearch from '@/components/dashboardComponents/search/FiltersSearch';
import SearchResult from '@/components/dashboardComponents/search/SearchResult';


const SearchStack = createNativeStackNavigator<SearchParamList>();

export  const SearchStackNavigation = () => {
    return (
        <SearchStack.Navigator initialRouteName="searchhome">
            <SearchStack.Screen name="searchhome" component={FiltersSearch} options={{ headerShown: false }} />
            <SearchStack.Screen name="searchresult" component={SearchResult} options={{ headerShown: false }} />
        </SearchStack.Navigator>
    );
}
