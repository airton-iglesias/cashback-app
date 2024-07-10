import React from 'react';
import { Svg, Path } from 'react-native-svg';

const WallatIcon = (props: any) => (
    <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
        <Path
            d="M23.166 18.6665H23.1793"
            stroke={props.focused ? 'white' : 'gray'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9.83333 9.33333H25.8333C26.5406 9.33333 27.2189 9.61428 27.719 10.1144C28.219 10.6145 28.5 11.2928 28.5 12V25.3333C28.5 26.0406 28.219 26.7189 27.719 27.219C27.2189 27.719 26.5406 28 25.8333 28H7.16667C6.45942 28 5.78115 27.719 5.28105 27.219C4.78095 26.7189 4.5 26.0406 4.5 25.3333V6.66667C4.5 5.95942 4.78095 5.28115 5.28105 4.78105C5.78115 4.28095 6.45942 4 7.16667 4H25.8333"
            stroke={props.focused ? 'white' : 'gray'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default WallatIcon;
