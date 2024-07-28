import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MapPinnedIcon = (props: any) => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18 8C18 12.5 12 17 12 17C12 17 6 12.5 6 8C6 6.4087 6.63214 4.88258 7.75736 3.75736C8.88258 2.63214 10.4087 2 12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8Z"
      stroke="#0D6EFD"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
      stroke="#0D6EFD"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.835 14H5C4.79653 14.0111 4.60131 14.0841 4.44046 14.2092C4.27962 14.3343 4.16083 14.5055 4.1 14.7L2.1 20.7C2 20.8 2 20.9 2 21C2 21.6 2.4 22 3 22H21C21.6 22 22 21.6 22 21C22 20.9 22 20.8 21.9 20.7L19.9 14.7C19.8392 14.5055 19.7204 14.3343 19.5595 14.2092C19.3987 14.0841 19.2035 14.0111 19 14H15.165"
      stroke="#0D6EFD"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MapPinnedIcon;
