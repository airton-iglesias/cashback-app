import React from 'react';
import { Svg, Path } from 'react-native-svg';

const QRCodeIcon = (props: any) => (
  <Svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
    <Path
      d="M10.0833 4H6.08333C5.34695 4 4.75 4.59695 4.75 5.33333V9.33333C4.75 10.0697 5.34695 10.6667 6.08333 10.6667H10.0833C10.8197 10.6667 11.4167 10.0697 11.4167 9.33333V5.33333C11.4167 4.59695 10.8197 4 10.0833 4Z"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27.4173 4H23.4173C22.6809 4 22.084 4.59695 22.084 5.33333V9.33333C22.084 10.0697 22.6809 10.6667 23.4173 10.6667H27.4173C28.1537 10.6667 28.7507 10.0697 28.7507 9.33333V5.33333C28.7507 4.59695 28.1537 4 27.4173 4Z"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.0833 21.3335H6.08333C5.34695 21.3335 4.75 21.9304 4.75 22.6668V26.6668C4.75 27.4032 5.34695 28.0002 6.08333 28.0002H10.0833C10.8197 28.0002 11.4167 27.4032 11.4167 26.6668V22.6668C11.4167 21.9304 10.8197 21.3335 10.0833 21.3335Z"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28.7507 21.3335H24.7507C24.0434 21.3335 23.3651 21.6144 22.865 22.1145C22.3649 22.6146 22.084 23.2929 22.084 24.0002V28.0002"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28.75 28V28.0133"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.7507 9.3335V13.3335C16.7507 14.0407 16.4697 14.719 15.9696 15.2191C15.4695 15.7192 14.7912 16.0002 14.084 16.0002H10.084"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.75 16H4.76333"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.75 4H16.7633"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.75 21.3335V21.3468"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.084 16H23.4173"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M28.75 16V16.0133"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.75 27.9998V26.6665"
      stroke={props.focused ? 'white' : props.color ?  props.color :'gray'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default QRCodeIcon;
