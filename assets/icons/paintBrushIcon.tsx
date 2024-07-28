import Svg, { Path } from 'react-native-svg';

export default function PaintBrushIcon(props: any) {
    return (
        <Svg width={30} height={30} viewBox="0 0 25 24" fill="none" {...props}>
            <Path
                d="M14.5 19.9V16H17.5C18.0304 16 18.5391 15.7893 18.9142 15.4142C19.2893 15.0391 19.5 14.5304 19.5 14V12H5.5V14C5.5 15.1 6.4 16 7.5 16H10.5V19.9C10.5 20.4304 10.7107 20.9391 11.0858 21.3142C11.4609 21.6893 11.9696 21.9 12.5 21.9C13.0304 21.9 13.5391 21.6893 13.9142 21.3142C14.2893 20.9391 14.5 20.4304 14.5 19.9Z"
                stroke="#221919"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path d="M6.5 12V2H18.5V12" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M14.5 2V6" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10.5 2V4" stroke="#221919" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}