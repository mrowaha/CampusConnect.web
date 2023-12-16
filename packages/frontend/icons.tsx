/**
 * This file contains svg icon formats
 */
import {
  SvgIcon,
  useTheme
} from "@mui/material";

export const LostAndFoundIcon = () => {
  return (
    <SvgIcon>
      <svg  viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.25 3.875V3.125C9.25 3.05625 9.19375 3 9.125 3H3.125C3.05625 3 3 3.05625 3 3.125V3.875C3 3.94375 3.05625 4 3.125 4H9.125C9.19375 4 9.25 3.94375 9.25 3.875ZM3.125 5.25C3.05625 5.25 3 5.30625 3 5.375V6.125C3 6.19375 3.05625 6.25 3.125 6.25H6C6.06875 6.25 6.125 6.19375 6.125 6.125V5.375C6.125 5.30625 6.06875 5.25 6 5.25H3.125ZM5.375 12.3125H1.75V1.3125H10.5V6.6875C10.5 6.75625 10.5562 6.8125 10.625 6.8125H11.5C11.5688 6.8125 11.625 6.75625 11.625 6.6875V0.6875C11.625 0.410937 11.4016 0.1875 11.125 0.1875H1.125C0.848437 0.1875 0.625 0.410937 0.625 0.6875V12.9375C0.625 13.2141 0.848437 13.4375 1.125 13.4375H5.375C5.44375 13.4375 5.5 13.3813 5.5 13.3125V12.4375C5.5 12.3687 5.44375 12.3125 5.375 12.3125ZM12.3391 13.1172L10.8813 11.6594C11.2297 11.1984 11.4375 10.6234 11.4375 10C11.4375 8.48125 10.2062 7.25 8.6875 7.25C7.16875 7.25 5.9375 8.48125 5.9375 10C5.9375 11.5187 7.16875 12.75 8.6875 12.75C9.24687 12.75 9.76562 12.5828 10.2 12.2969L11.6797 13.7766C11.7047 13.8016 11.7359 13.8125 11.7672 13.8125C11.7984 13.8125 11.8313 13.8 11.8547 13.7766L12.3391 13.2922C12.3506 13.2807 12.3597 13.2671 12.366 13.2521C12.3722 13.2371 12.3754 13.2209 12.3754 13.2047C12.3754 13.1884 12.3722 13.1723 12.366 13.1573C12.3597 13.1423 12.3506 13.1287 12.3391 13.1172V13.1172ZM8.6875 11.75C7.72031 11.75 6.9375 10.9672 6.9375 10C6.9375 9.03281 7.72031 8.25 8.6875 8.25C9.65469 8.25 10.4375 9.03281 10.4375 10C10.4375 10.9672 9.65469 11.75 8.6875 11.75Z" fill="#7C35E3"/>
      </svg>
    </SvgIcon>
  )
}

export interface SignupIconProps {
  stroke : string
}

export const SignupIcon = (props : SignupIconProps) => {
  return (
    <SvgIcon>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
        <g id="Complete">
          <g id="user-add">
            <g>
              <path d="M17,21V19a4,4,0,0,0-4-4H5a4,4,0,0,0-4,4v2" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <circle cx="9" cy="7" r="4" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <line x1="17" y1="11" x2="23" y2="11" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <line x1="20" y1="8" x2="20" y2="14" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </g>
          </g>
        </g>
      </svg>
    </SvgIcon>
  )
}

export const StarIcon = (
  {filled} :
  {filled : boolean}
) => {

  const theme = useTheme();

  return (
    <SvgIcon>
      <svg viewBox="0 0 24 24" fill={filled ? theme.palette.secondary.main : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke={theme.palette.secondary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </SvgIcon>
  )
}

export const AddIcon = (
  {filled} :
  {filled : boolean}
) => {

  const theme = useTheme();

  return (
    <SvgIcon>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM12 20.7188C7.18594 20.7188 3.28125 16.8141 3.28125 12C3.28125 7.18594 7.18594 3.28125 12 3.28125C16.8141 3.28125 20.7188 7.18594 20.7188 12C20.7188 16.8141 16.8141 20.7188 12 20.7188Z" fill="#1890FF"/>
      <path opacity="0.1" d="M12 3.28125C7.18594 3.28125 3.28125 7.18594 3.28125 12C3.28125 16.8141 7.18594 20.7188 12 20.7188C16.8141 20.7188 20.7188 16.8141 20.7188 12C20.7188 7.18594 16.8141 3.28125 12 3.28125ZM16.5 12.5625C16.5 12.6656 16.4156 12.75 16.3125 12.75H12.75V16.3125C12.75 16.4156 12.6656 16.5 12.5625 16.5H11.4375C11.3344 16.5 11.25 16.4156 11.25 16.3125V12.75H7.6875C7.58437 12.75 7.5 12.6656 7.5 12.5625V11.4375C7.5 11.3344 7.58437 11.25 7.6875 11.25H11.25V7.6875C11.25 7.58437 11.3344 7.5 11.4375 7.5H12.5625C12.6656 7.5 12.75 7.58437 12.75 7.6875V11.25H16.3125C16.4156 11.25 16.5 11.3344 16.5 11.4375V12.5625Z" fill="#1890FF"/>
      <path d="M16.3125 11.25H12.75V7.6875C12.75 7.58437 12.6656 7.5 12.5625 7.5H11.4375C11.3344 7.5 11.25 7.58437 11.25 7.6875V11.25H7.6875C7.58437 11.25 7.5 11.3344 7.5 11.4375V12.5625C7.5 12.6656 7.58437 12.75 7.6875 12.75H11.25V16.3125C11.25 16.4156 11.3344 16.5 11.4375 16.5H12.5625C12.6656 16.5 12.75 16.4156 12.75 16.3125V12.75H16.3125C16.4156 12.75 16.5 12.6656 16.5 12.5625V11.4375C16.5 11.3344 16.4156 11.25 16.3125 11.25Z" fill="#1890FF"/>
      </svg>

    </SvgIcon>
  )
}


export const ChecksIcon = (
  {filled} :
  {filled : boolean}
) => {

  const theme = useTheme();

  return (
    <SvgIcon>
      <svg viewBox="0 0 24 24" fill={filled ? theme.palette.secondary.main : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke={theme.palette.secondary.main} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </SvgIcon>
  )
}