import React from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import {
	ThemedComponentProps,
	ThemeType,
	withStyles,
} from 'react-native-ui-kitten/theme'
import { Text } from 'react-native-ui-kitten/ui'
import { ArticleActivityBar } from '../../components/articles'
import { ActivityAuthoring, textStyle } from '../../components/common'

// @ts-ignore (override `onPress` prop)
interface ComponentProps extends TouchableOpacityProps {
	article
	onPress: (article) => void
	onLikePress: (article) => void
}

export type ArticleList1ItemProps = ThemedComponentProps & ComponentProps

class ArticleList1ItemComponent extends React.Component<ArticleList1ItemProps> {
	private onPress = () => {
		this.props.onPress(this.props.article)
	}

	public render() {
		const { style, themedStyle, article, ...restProps } = this.props

		const img = require('../../assets/images/source/image-article-background-2.jpg')

		return (
			<TouchableOpacity
				activeOpacity={0.95}
				{...restProps}
				style={[themedStyle.container, style]}
				onPress={this.onPress}>
				<ImageBackground
					style={themedStyle.image}
					source={{ uri: article.lead_image_url }}
				/>
				<View style={themedStyle.infoContainer}>
					<Text style={themedStyle.titleLabel} category="h5">
						{article.title}
					</Text>
					<Text
						style={themedStyle.descriptionLabel}
						appearance="hint"
						category="s1">
						{article.excerpt}
					</Text>
				</View>
				<ArticleActivityBar
					style={themedStyle.activityContainer}
					likes={article.likes || 0}>
					<ActivityAuthoring
						photo={{ uri: article.source.logoLink }}
						name={`${article.source.name}`}
						date={this.getRelativeTime(article.date_published)}
					/>
				</ArticleActivityBar>
			</TouchableOpacity>
		)
	}

	public getRelativeTime(date) {
		return moment(Number(date))
			.startOf('hour')
			.fromNow()
	}
}

export const ArticleList1Item = withStyles(
	ArticleList1ItemComponent,
	(theme: ThemeType) => ({
		container: {
			borderRadius: 12,
			overflow: 'hidden',
		},
		infoContainer: {
			paddingHorizontal: 16,
			paddingVertical: 24,
			borderBottomWidth: 1,
			borderBottomColor: theme['border-basic-color-2'],
		},
		activityContainer: {
			paddingHorizontal: 16,
			paddingVertical: 16,
		},
		image: {
			height: 220,
		},
		titleLabel: textStyle.headline,
		descriptionLabel: {
			marginTop: 16,
			...textStyle.subtitle,
		},
	}),
)
