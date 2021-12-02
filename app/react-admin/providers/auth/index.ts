// import login from "app/auth/mutations/login"
// import signup from "app/auth/mutations/signup"
import { AuthProvider, LegacyAuthProvider } from "react-admin"
import { useMutation } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

type Provider = AuthProvider | LegacyAuthProvider

// const antiCSRFToken = getAntiCSRFToken()

const provider = (loginMutation: any, signupMutation: any): Provider => ({
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    console.log("laksdjfklajsdf")
    try {
      return loginMutation({ email: username, password })
    } catch (error) {
      console.log({ error })
      return signupMutation({ email: username, password })
    }
    // localStorage.setItem("username", username)
    // // accept all username/password combinations
    // return Promise.resolve()
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username")
    return Promise.resolve()
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    console.log({ status })

    if (status === 401 || status === 403) {
      localStorage.removeItem("username")
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async () => {
    getCurrentUser(null, {} as any)
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
})

export default provider
