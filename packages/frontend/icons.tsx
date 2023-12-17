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

// CommentIcon component
export const CommentIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 25; // Adjust the size as needed

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1765_106187)">
      <path d="M7.78426 2.98463H32.9973V18.3964H9.62796L7.78426 19.899V2.98463ZM7.78426 0.416C6.05086 0.416 4.64839 1.57188 4.64839 2.98463L4.63263 26.1023L10.9359 20.965H32.9973C34.7307 20.965 36.1489 19.8091 36.1489 18.3964V2.98463C36.1489 1.57188 34.7307 0.416 32.9973 0.416H7.78426ZM10.9359 13.2591H23.5424V15.8278H10.9359V13.2591ZM10.9359 9.4062H29.8457V11.9748H10.9359V9.4062ZM10.9359 5.55326H29.8457V8.12188H10.9359V5.55326Z" fill="#7C35E3"/>
      </g>
      <defs>
      <filter id="filter0_d_1765_106187" x="0.632629" y="0.416" width="39.5163" height="33.6863" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1765_106187"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1765_106187" result="shape"/>
      </filter>
      </defs>
    </svg>
  );
}

//  component .... now gonna be send icon
export const EnterCommentIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 25; // Adjust the size as needed

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 -10 41 41" xmlns="http://www.w3.org/2000/svg">
       <g filter="url(#filter0_i_1450_13499)">
      <path d="M28.5103 0.546504L28.5117 0.54599C28.6461 0.496718 28.7918 0.486792 28.9317 0.517396C29.0695 0.547547 29.1959 0.615783 29.2966 0.714175C29.3925 0.816256 29.458 0.943092 29.4854 1.08032L29.9722 0.982839L29.4854 1.08032C29.5133 1.21962 29.501 1.36398 29.4499 1.49659L29.4498 1.49655L29.4466 1.5054L19.435 29.004L19.4346 29.005C19.3831 29.1474 19.2895 29.2711 19.166 29.3595C19.044 29.447 18.8984 29.4959 18.7481 29.5C18.5992 29.4992 18.4538 29.4542 18.3306 29.3708C18.2059 29.2865 18.1096 29.1668 18.054 29.0273L18.0537 29.0265L15.4152 22.4459C14.479 20.1109 15.0264 17.4426 16.8063 15.6648L20.727 11.7488C21.4099 11.0668 21.4099 9.96018 20.727 9.27816C20.0446 8.59654 18.9388 8.59742 18.2574 9.2801L14.3557 13.1893C12.5848 14.9637 9.92686 15.512 7.5983 14.5834L0.992849 11.949L0.992877 11.9489L0.984763 11.9458C0.84211 11.8918 0.719396 11.7957 0.632848 11.6705C0.546307 11.5452 0.5 11.3968 0.5 11.2447C0.5 11.0927 0.546307 10.9442 0.632848 10.8189C0.718828 10.6945 0.840504 10.5989 0.981963 10.5447L28.5103 0.546504Z" 
      fill="#7C35E3" stroke="#7C35E3"/>
      </g>
      <defs>
      <filter id="filter0_i_1450_13499" x="0" y="0" width="30" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1450_13499"/>
      </filter>
      </defs>
    </svg>
  );
}
export const ShareIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 25; // Adjust the size as needed

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 -10 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.8873 24.375V24.3749C17.8871 23.5967 17.5709 22.7521 16.8214 22.3537L13.906 20.804C12.013 19.7978 9.74122 20.0623 7.70629 20.2993C7.63197 20.308 7.55797 20.3166 7.48432 20.3251C7.19987 20.358 6.90935 20.375 6.614 20.375C3.05978 20.375 0.25 17.9321 0.25 15C0.25 12.0679 3.05978 9.625 6.614 9.625C6.9094 9.625 7.19998 9.64201 7.48447 9.67492C7.55804 9.68343 7.63195 9.69204 7.70618 9.70068C9.74109 9.93769 12.0129 10.2023 13.9059 9.19606L16.8214 7.64634C17.5708 7.24797 17.8873 6.40338 17.8873 5.625C17.8873 2.69293 20.6971 0.25 24.2513 0.25C27.8055 0.25 30.6153 2.69293 30.6153 5.625C30.6153 8.55707 27.8055 11 24.2513 11C23.9562 11 23.6659 10.983 23.3817 10.9502C23.3076 10.9416 23.2332 10.933 23.1584 10.9243C21.1234 10.6874 18.8517 10.4231 16.9587 11.4293L14.0439 12.9786C13.2944 13.377 12.978 14.2215 12.978 15C12.978 15.7784 13.2944 16.6229 14.0439 17.0213L16.9587 18.5707C18.8518 19.5769 21.1236 19.3126 23.1586 19.0757C23.2333 19.067 23.3076 19.0584 23.3816 19.0498C23.6659 19.017 23.9562 19 24.2513 19C27.8055 19 30.6153 21.4429 30.6153 24.375C30.6153 27.3071 27.8055 29.75 24.2513 29.75C20.6971 29.75 17.8873 27.3071 17.8873 24.375Z" 
    fill="#7C35E3" stroke="#7C35E3" />
    </svg>

  );
}

// ReportIcon component
export const ReportIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 40; // Adjust the size as needed

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 -10 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34375 1.5625H22.6562L23.4375 2.34375V17.9688L22.6562 18.75H12.0422L7.58438 23.2094L6.25 22.6562V18.75H2.34375L1.5625 17.9688V2.34375L2.34375 1.5625ZM11.7188 17.1875H21.875V3.125H3.125V17.1875H7.03125L7.8125 17.9688V20.7703L11.1656 17.4156L11.7188 17.1875ZM11.7188 4.6875H13.2812V12.5H11.7188V4.6875ZM11.7188 15.625H13.2812V14.0625H11.7188V15.625Z" 
       fill="#7C35E3" />
    </svg>
  );
}

export const RightIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 35; // Adjust the size as needed

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.946 11.4096L7.38038 3.15721C7.35277 3.13548 7.31959 3.12197 7.28465 3.11824C7.24971 3.11451 7.21443 3.12072 7.18286 3.13613C7.15128 3.15155 7.1247 3.17557 7.10616 3.20541C7.08762 3.23526 7.07787 3.26973 7.07804 3.30487V5.11659C7.07804 5.23143 7.13194 5.34159 7.221 5.4119L15.6585 12.0002L7.221 18.5885C7.1296 18.6588 7.07804 18.7689 7.07804 18.8838V20.6955C7.07804 20.8525 7.2585 20.9392 7.38038 20.8432L17.946 12.5908C18.0358 12.5208 18.1084 12.4312 18.1584 12.3288C18.2084 12.2265 18.2343 12.1141 18.2343 12.0002C18.2343 11.8863 18.2084 11.7739 18.1584 11.6716C18.1084 11.5692 18.0358 11.4796 17.946 11.4096Z"
     fill="#7C35E3"/>
    </svg>
  );
}

export const LeftIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 35; // Adjust the size as needed

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.9692 5.11605V3.30433C16.9692 3.1473 16.7888 3.06058 16.6669 3.15668L6.10127 11.409C6.0115 11.4788 5.93886 11.5682 5.8889 11.6704C5.83893 11.7725 5.81296 11.8848 5.81296 11.9985C5.81296 12.1122 5.83893 12.2244 5.8889 12.3266C5.93886 12.4287 6.0115 12.5181 6.10127 12.5879L16.6669 20.8403C16.7911 20.9364 16.9692 20.8496 16.9692 20.6926V18.8809C16.9692 18.7661 16.9153 18.6559 16.8263 18.5856L8.38877 11.9996L16.8263 5.41137C16.9153 5.34105 16.9692 5.2309 16.9692 5.11605Z" 
    fill="#7C35E3"/>
    </svg>
  );
}

export const DeleteIcon = ({ filled }: { filled: boolean }) => {
  const theme = useTheme();
  const iconSize = 40; // Adjust the size as needed

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4C10 2.93913 10.4214 1.92172 11.1716 1.17157C11.9217 0.421427 12.9391 0 14 0H26C27.0609 0 28.0783 0.421427 28.8284 1.17157C29.5786 1.92172 30 2.93913 30 4V8H38C38.5304 8 39.0391 8.21071 39.4142 8.58579C39.7893 8.96086 40 9.46957 40 10C40 10.5304 39.7893 11.0391 39.4142 11.4142C39.0391 11.7893 38.5304 12 38 12H35.862L34.128 36.284C34.0562 37.2932 33.6046 38.2376 32.8642 38.9271C32.1239 39.6167 31.1497 40 30.138 40H9.86C8.84828 40 7.87413 39.6167 7.13377 38.9271C6.39341 38.2376 5.94183 37.2932 5.87 36.284L4.14 12H2C1.46957 12 0.960859 11.7893 0.585786 11.4142C0.210714 11.0391 0 10.5304 0 10C0 9.46957 0.210714 8.96086 0.585786 8.58579C0.960859 8.21071 1.46957 8 2 8H10V4ZM14 8H26V4H14V8ZM8.148 12L9.862 36H30.14L31.854 12H8.148ZM16 16C16.5304 16 17.0391 16.2107 17.4142 16.5858C17.7893 16.9609 18 17.4696 18 18V30C18 30.5304 17.7893 31.0391 17.4142 31.4142C17.0391 31.7893 16.5304 32 16 32C15.4696 32 14.9609 31.7893 14.5858 31.4142C14.2107 31.0391 14 30.5304 14 30V18C14 17.4696 14.2107 16.9609 14.5858 16.5858C14.9609 16.2107 15.4696 16 16 16ZM24 16C24.5304 16 25.0391 16.2107 25.4142 16.5858C25.7893 16.9609 26 17.4696 26 18V30C26 30.5304 25.7893 31.0391 25.4142 31.4142C25.0391 31.7893 24.5304 32 24 32C23.4696 32 22.9609 31.7893 22.5858 31.4142C22.2107 31.0391 22 30.5304 22 30V18C22 17.4696 22.2107 16.9609 22.5858 16.5858C22.9609 16.2107 23.4696 16 24 16Z" fill="#7C35E3"/>
    </svg>

  );
}














