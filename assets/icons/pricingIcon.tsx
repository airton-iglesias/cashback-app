import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PricingIcon = (props:any) => (
  <Svg width={40} height={40} viewBox="0 0 33 38" fill="none" {...props}>
    <Path
      d="M8.95768 17.4587H8.96977M25.3789 25.2041L16.7152 33.8678C16.4907 34.0925 16.2242 34.2708 15.9308 34.3924C15.6375 34.514 15.323 34.5766 15.0054 34.5766C14.6878 34.5766 14.3733 34.514 14.08 34.3924C13.7866 34.2708 13.52 34.0925 13.2956 33.8678L2.91602 23.5003V11.417H14.9993L25.3789 21.7966C25.829 22.2494 26.0817 22.8619 26.0817 23.5003C26.0817 24.1388 25.829 24.7513 25.3789 25.2041Z"
      stroke="#1E1E1E"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M26.5 0.5V11.5M29 2.5H25.25C24.7859 2.5 24.3408 2.68437 24.0126 3.01256C23.6844 3.34075 23.5 3.78587 23.5 4.25C23.5 4.71413 23.6844 5.15925 24.0126 5.48744C24.3408 5.81563 24.7859 6 25.25 6H27.75C28.2141 6 28.6592 6.18437 28.9874 6.51256C29.3156 6.84075 29.5 7.28587 29.5 7.75C29.5 8.21413 29.3156 8.65925 28.9874 8.98744C28.6592 9.31563 28.2141 9.5 27.75 9.5H23.5"
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PricingIcon;