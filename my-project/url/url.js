export const API = import.meta.env.VITE_API_URL
export function saveToken(token){
    localStorage.setItem("token", token)
}


export const getToken = () => localStorage.getItem("token");