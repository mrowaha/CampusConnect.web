const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default BACKEND_URL;

export const API_KEY = process.env.NEXT_PUBLIC_ADMIN_APIKEY;

export const API_KEY_VALIDATION = "/admin";
export const MODERATOR_CREATION = "/admin/moderator/register";
export const ALL_MODERATORS = "/admin/moderators";
export const SUSPEND_MODERATOR = "/admin/moderator/suspend";
export const UNSUSPEND_MODERATOR = "/admin/moderator/unsuspend";