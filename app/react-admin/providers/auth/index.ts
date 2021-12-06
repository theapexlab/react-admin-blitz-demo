import { invoke } from "blitz"
import { AuthProvider, LegacyAuthProvider } from "react-admin"
import login from "app/auth/mutations/login"
import logout from "app/auth/mutations/logout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import signup from "app/auth/mutations/signup"

type Provider = AuthProvider | LegacyAuthProvider

const provider: Provider = {
  login: async ({ username, password }) => {
    try {
      await invoke(login, { email: username, password })
    } catch (error) {
      console.log("Login failed, lets try to sign up: ", error)
      await invoke(signup, { email: username, password })
    }
  },

  logout: async () => {
    await invoke(logout, {})
  },

  checkError: (error) => {
    const { statusCode } = error

    if (statusCode === 401 || statusCode === 403) {
      return Promise.reject()
    }

    return Promise.resolve()
  },

  checkAuth: async () => {
    await invoke(getCurrentUser, null)
  },

  getPermissions: () => Promise.resolve(),

  getIdentity: async () => {
    const user = await invoke(getCurrentUser, null)

    return {
      id: user!.id as number,
      fullName: user!.name as string,
    }
  },
}

export default provider
