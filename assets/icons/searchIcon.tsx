import React from 'react';
import { Svg, Path } from 'react-native-svg';

const SearchIcon = ({focused}: any) => (
  <Svg width={33} height={32} viewBox="0 0 33 32" fill="none">
    <Path
      d="M14.9167 25.3333C20.8077 25.3333 25.5833 20.5577 25.5833 14.6667C25.5833 8.77563 20.8077 4 14.9167 4C9.02563 4 4.25 8.77563 4.25 14.6667C4.25 20.5577 9.02563 25.3333 14.9167 25.3333Z"
      stroke={focused ? 'white' : 'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28.2509 27.9999L22.5176 22.2666"
      stroke={focused ? 'white' : 'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
