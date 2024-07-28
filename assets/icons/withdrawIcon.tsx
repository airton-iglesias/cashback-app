import React from 'react';
import { Svg, Path } from 'react-native-svg';

const WithdrawIcon = (props: any) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Path
      d="M29.3327 2.6665L19.9993 29.3332L14.666 17.3332L2.66602 11.9998L29.3327 2.6665Z"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29.3327 2.6665L14.666 17.3332"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WithdrawIcon;
