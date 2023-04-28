export const TOKEN_KEY = "%imob_token"
export const USER_KEY = "%imob_user"

export const isAuthenticated = () => { 
    return localStorage.getItem(TOKEN_KEY) !== null
}

export const getToken = () => {
    localStorage.getItem(TOKEN_KEY)
}

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY,token)
}

export const setUser = (user) => {
    localStorage.setItem(USER_KEY,JSON.stringify(user))
}

export const logout = () => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
}