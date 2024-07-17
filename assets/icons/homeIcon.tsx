import React from 'react';
import { Svg, Path } from 'react-native-svg';

const HomeIcon = (props: any) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Path
      d="M3.56055 10.5199L14.0005 2.3999L24.4405 10.5199V23.2799C24.4405 23.8952 24.1961 24.4853 23.761 24.9204C23.3259 25.3555 22.7358 25.5999 22.1205 25.5999H5.88055C5.26524 25.5999 4.67514 25.3555 4.24006 24.9204C3.80497 24.4853 3.56055 23.8952 3.56055 23.2799V10.5199Z"
      stroke={props.focused ? 'white' : 'gray'}
      strokeWidth={2.32}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5195 25.6V14H17.4795V25.6"
      stroke={props.focused ? 'white' : 'gray'}
      strokeWidth={2.32}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeIcon;
