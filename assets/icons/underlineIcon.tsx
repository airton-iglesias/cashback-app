import Svg, { Path } from 'react-native-svg';

export default function UnderlineIcon(props: any) {
    return (
        <Svg width={34} height={34} viewBox="0 0 25 24" fill="none" {...props}>
            <Path d="M4.5 20H20.5" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M6.5 16L12.5 4L18.5 16" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M8.5 12H16.5" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}