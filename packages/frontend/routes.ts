export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const VALIDATE_TOKEN = "/auth";

export const LOGIN_BILKENTEER = "/auth/bilkenteer/login";
export const REGISTER_BILKENTEER = "/auth/bilkenteer/register";
export const LOGIN_MODERATOR = "/auth/moderator/login";
export const REGISTER_MODERATOR = "/auth/moderator/register";


export const PROFILE_PICTURE = "/s3/profile-picture";



export const GET_MESSAGE_THREADS_BY_USER_ID = "/messageThread/user/?userId=";
export const MARK_MESSAGES_AS_SEEN = "/messageThread/markMessagesSeen/?userId=";
export const SEND_MESSAGE = "/messageThread/sendMessage";