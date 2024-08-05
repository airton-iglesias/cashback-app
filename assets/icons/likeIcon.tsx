import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LikeIcon = (props:any) => (
  <Svg
    width={29}
    height={30}
    viewBox="0 0 29 30"
    fill="none"
    {...props}
  >
    <Path
      d="M2.69633 14.2678V24.6454H7.08983L7.31168 24.6715C11.3905 25.6227 14.0933 26.3086 15.4404 26.7334C17.2297 27.2975 17.8967 27.4352 19.1103 27.5164C20.018 27.5788 21.049 27.2293 21.5188 26.7508C21.7783 26.4869 21.9726 25.9446 22.0495 25.1036C22.0654 24.9273 22.1284 24.7584 22.232 24.6148C22.3356 24.4712 22.4759 24.3581 22.6382 24.2873C22.9992 24.1307 23.2994 23.8755 23.5502 23.5043C23.7822 23.165 23.933 22.5328 23.9606 21.6178C23.9654 21.4496 24.0131 21.2854 24.0991 21.1408C24.1851 20.9962 24.3066 20.8759 24.4521 20.7913C25.296 20.3027 25.7136 19.7517 25.8006 19.105C25.8963 18.3901 25.6643 17.5854 25.0568 16.669C24.9142 16.4541 24.8611 16.192 24.9088 15.9386C24.9565 15.6851 25.1011 15.4602 25.312 15.3118C25.8934 14.9029 26.2124 14.3345 26.2922 13.5283C26.4198 12.2436 25.6005 11.2938 23.746 11.1039C22.0942 10.9405 20.4266 11.0796 18.8247 11.5142C18.643 11.5617 18.4515 11.5563 18.2727 11.4987C18.094 11.441 17.9354 11.3335 17.8157 11.1888C17.696 11.0441 17.6201 10.8682 17.5969 10.6818C17.5737 10.4954 17.6043 10.3063 17.685 10.1367C18.41 8.60263 18.8131 7.33678 18.9073 6.35658C19.0306 5.05593 18.7304 4.11343 18.0286 3.33623C17.4965 2.74753 16.6453 2.41113 16.3263 2.48073C15.9058 2.57063 15.6318 2.81423 15.2751 3.66683C15.0648 4.17143 14.9633 4.60063 14.7893 5.60258C14.6226 6.55378 14.5312 6.98298 14.3413 7.54558C13.7685 9.25078 12.3635 11.0183 10.477 12.2378C9.15491 13.0914 7.72203 13.7598 6.21838 14.2243C6.12444 14.2532 6.02668 14.2679 5.92838 14.2678H2.69633ZM2.63543 26.6218C2.16708 26.6348 1.74658 26.5304 1.39423 26.2839C0.94473 25.9693 0.733029 25.4734 0.728679 24.9021L0.733029 14.2837C0.683729 13.7182 0.850479 13.1991 1.24488 12.8134C1.61463 12.4509 2.09748 12.2798 2.60788 12.2914H5.77613C7.05772 11.8831 8.27958 11.3068 9.40983 10.5775C10.9294 9.59443 12.0488 8.18503 12.4766 6.91483C12.623 6.47693 12.7013 6.11443 12.8492 5.26183C13.0493 4.11778 13.174 3.58563 13.4611 2.90123C14.0556 1.47733 14.8357 0.781327 15.9116 0.547877C16.9701 0.318777 18.5115 0.929227 19.4859 2.00803C20.5661 3.20283 21.0432 4.69778 20.8663 6.54508C20.7909 7.33968 20.5705 8.22853 20.208 9.21888C21.446 9.03846 22.7014 9.01119 23.9461 9.13768C26.8562 9.43493 28.4904 11.3301 28.2526 13.7255C28.1482 14.7579 27.7741 15.6351 27.1375 16.3239C27.6726 17.3548 27.8857 18.3742 27.7523 19.3689C27.5986 20.5144 26.9606 21.4685 25.8992 22.2094C25.8166 23.2143 25.586 24.0161 25.1771 24.6164C24.8549 25.1014 24.4346 25.5134 23.9432 25.8257C23.7866 26.8175 23.4574 27.5933 22.9195 28.1385C22.0277 29.0462 20.4342 29.587 18.9784 29.4884C17.5965 29.3956 16.7787 29.2274 14.8502 28.6184C13.5786 28.2168 10.9454 27.5498 6.97673 26.6218H2.63543ZM5.10188 13.8168C5.1015 13.6871 5.12672 13.5586 5.1761 13.4386C5.22548 13.3186 5.29805 13.2096 5.38965 13.1177C5.48124 13.0259 5.59007 12.953 5.70988 12.9033C5.8297 12.8535 5.95815 12.8279 6.08788 12.8279C6.21736 12.8283 6.3455 12.8542 6.46499 12.9041C6.58447 12.954 6.69295 13.0269 6.78424 13.1188C6.87553 13.2106 6.94784 13.3195 6.99704 13.4393C7.04623 13.5591 7.07136 13.6873 7.07098 13.8168V24.9499C7.07117 25.0794 7.04586 25.2077 6.99648 25.3274C6.9471 25.4471 6.87464 25.5559 6.78321 25.6476C6.69179 25.7393 6.5832 25.812 6.46364 25.8618C6.34409 25.9115 6.21591 25.9372 6.08643 25.9374C5.95695 25.9372 5.82877 25.9115 5.70921 25.8618C5.58966 25.812 5.48107 25.7393 5.38965 25.6476C5.29822 25.5559 5.22575 25.4471 5.17638 25.3274C5.127 25.2077 5.10169 25.0794 5.10188 24.9499V13.8168Z"
      fill="white"
    />
  </Svg>
);

export default LikeIcon;