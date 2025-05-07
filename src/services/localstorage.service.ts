const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600,
}: {
  refreshToken: string
  idToken: string
  localId: string
  expiresIn?: number
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000

  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, `${expiresDate}`)
  localStorage.setItem(USERID_KEY, localId)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USERID_KEY)
}

export const localStorageService = {
  setTokens,
  getAccessToken,

  getUserId,
  removeAuthData,
}
