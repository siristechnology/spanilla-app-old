import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import fetch from 'node-fetch'
// import AsyncStorage from '@react-native-community/async-storage'

const cache = new InMemoryCache()

const request = async operation => {
	// const token = await AsyncStorage.getItem('token')
	const token = 'dummy-token'
	operation.setContext({
		headers: {
			authorization: token,
		},
	})
}

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable(observer => {
			let handle
			Promise.resolve(operation)
				.then(oper => request(oper))
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					})
				})
				.catch(observer.error.bind(observer))

			return () => {
				if (handle) handle.unsubscribe()
			}
		}),
)

const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				// sendToLoggingService(graphQLErrors)
			}
			if (networkError) {
				// logoutUser()
			}
		}),
		requestLink,
		withClientState({
			defaults: {
				isConnected: true,
			},
			resolvers: {
				Mutation: {
					updateNetworkStatus: (_, { isConnected }, { cache }) => {
						cache.writeData({ data: { isConnected } })
						return null
					},
				},
			},
			cache,
		}),
		new HttpLink({
			uri:
				'https://inline-spanish-service-qa.azurewebsites.net/api/inline-spanish-api?code=MoCZuLpAaTzpX7zyAWU2jzyYYIEzsNQJaIvI/QTjs8I4HKE8jwAN1g==',
			credentials: 'include',
			fetch,
		}),
	]),
	cache,
})

export default client