/**
 * This file contains svg icon formats
 */
import {
  SvgIcon
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
