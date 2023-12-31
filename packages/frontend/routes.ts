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
export const SEARCH_PRODUCT = "/products/search";
export const NOTIFICATION_COUNT = "/notifications/count/?";
export const NOTIFICATION_LIST = "/notifications/user/?userId=";



export const LOST_FORUM_SEARCH = "/forumPosts/lostForum/?search=";
export const FOUND_FORUM_SEARCH = "/forumPosts/foundForum/?search=";
export const GET_PRODUCT_BY_ID = "/products/?productId=";
export const GET_FORUM_POST_BY_ID = "/forumPosts/?forumPostId=";
export const CREATE_COMMENT = "/forumPosts/comment/?userId=";