import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'

const siderStyle = {
	padding: '1rem',
}

export default function AppSider() {
	const { assets } = useContext(CryptoContext)

	const mergedAssets = assets.reduce((acc, asset) => {
		const existingAsset = acc.find((item) => item.id === asset.id)
		if (existingAsset) {
			existingAsset.amount += asset.amount
			existingAsset.totalAmount += asset.totalAmount
			existingAsset.totalProfit += asset.totalProfit
		} else {
			acc.push({ ...asset })
		}
		return acc
	}, [])

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{mergedAssets.map((asset) => (
				<Card key={asset.id} style={{ marginBottom: '1rem' }}>
					<Statistic
						title={capitalize(asset.id)}
						value={asset.totalAmount}
						precision={2}
						valueStyle={{
							color: asset.grow ? '#3f8600' : '#cf1322',
						}}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='$'
					/>
					<List
						size='small'
						dataSource={[
							{
								title: 'Total Profit',
								value: asset.totalProfit,
								withTag: true,
							},
							{ title: 'Asset Amount', value: asset.amount, isPlain: true },
						]}
						renderItem={(item) => (
							<List.Item>
								<span>{item.title}</span>
								<span>
									{item.withTag && (
										<Tag color={asset.grow ? 'green' : 'red'}>
											{asset.growPercent}%
										</Tag>
									)}
									{item.isPlain && item.value}
									{!item.isPlain && (
										<Typography.Text
											type={asset.grow ? 'success' : 'danger'}
										>
											{item.value.toFixed(2)}$
										</Typography.Text>
									)}
								</span>
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	)
}
