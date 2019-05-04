import { remote } from 'electron'

const { IgApiClient } = remote.require('instagram-private-api')

const localStorageKey = 'IGMCookies'

export const client = new IgApiClient()

client.request.end$.subscribe(async () => {
  const cookies = await client.state.serializeCookieJar()
  localStorage.setItem(localStorageKey, JSON.stringify(cookies))
})

export const loadCookies = async () => {
  const cookies = JSON.parse(localStorage.getItem(localStorageKey))
  if (!cookies) {
    return
  }
  client.state.deserializeCookieJar(cookies)
}

export const login = async (user, password) => {
  client.state.generateDevice(user)
  await client.simulate.preLoginFlow()
  return client.account.login(user, password)
}
