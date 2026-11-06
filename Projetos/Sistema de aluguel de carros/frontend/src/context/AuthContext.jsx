import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setBasicAuth } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const raw = localStorage.getItem('auth')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (auth) {
      setBasicAuth(auth.login, auth.senha)
      localStorage.setItem('auth', JSON.stringify(auth))
    } else {
      setBasicAuth(null, null)
      localStorage.removeItem('auth')
    }
  }, [auth])

  const login = (login, senha, role) => setAuth({ login, senha, role })
  const logout = () => setAuth(null)

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      isAuthenticated: !!auth,
      role: auth?.role,
    }),
    [auth]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
