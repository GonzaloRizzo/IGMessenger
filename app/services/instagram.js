import { remote } from 'electron'

const { IgApiClient } = remote.require('instagram-private-api')

export const client = new IgApiClient()

export const login = async (user, password) => {
  client.state.generateDevice(user)
  await client.simulate.preLoginFlow()
  return client.account.login(user, password)
}
