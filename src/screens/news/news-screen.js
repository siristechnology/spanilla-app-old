import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Text } from 'react-native-ui-kitten/ui'
import ArticleList1Container from '../../layouts/article-list1/articleList1.container'
import { CircularSpinner } from '../../components/common'
import AppLayout from '../app-layout'

export const FETCH_ARTICLES_QUERY = gql`
	query fetchArticles {
		fetchArticles {
			_id
			title
			url
			lead_image_url
			excerpt
			original_content
			translated_content
			source {
				name
				logoLink
				category
			}
			author
			date_published
			date_modified
			likes
		}
	}
`

export default function NewsScreen(props) {
	const [refreshing, setRefreshing] = useState(false)
	const { loading, error, refetch, data } = useQuery(FETCH_ARTICLES_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	if (loading) {
		return <CircularSpinner />
	} else if (error) {
		return <Text>Error!</Text>
	}

	const { navigation } = props

	const articles = data.fetchArticles.filter(
		article => article.source && article.source.category === 'news',
	)

	return (
		<AppLayout>
			<ArticleList1Container
				articles={articles}
				navigation={navigation}
				refreshing={refreshing}
				handleRefresh={handleRefresh}
			/>
		</AppLayout>
	)
}
