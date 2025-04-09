import { Card, Statistic, List, Typography, Tag, Button, Layout } from 'antd'
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	MenuOutlined,
} from '@ant-design/icons'
import { capitalize } from '../../utils'
import { useContext, useState, useEffect } from 'react'
import CryptoContext from '../../context/crypto-context'
import './AppSider.css'

export default function AppSider() {
	const { assets } = useContext(CryptoContext)
	const [isMobile, setIsMobile] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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

	const content = (
		<div className='sider-content'>
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
		</div>
	)

	if (isMobile) {
		return (
			<>
				<Button
					icon={<MenuOutlined />}
					type='primary'
					className='mobile-drawer-btn'
					onClick={() => setIsDrawerOpen(true)}
				>
					Открыть портфель
				</Button>
				<div className={`custom-drawer ${isDrawerOpen ? 'open' : ''}`}>
					<div className='drawer-header'>
						<h3>Мой портфель</h3>
						<Button danger onClick={() => setIsDrawerOpen(false)}>
							Закрыть
						</Button>
					</div>
					{content}
				</div>
				{isDrawerOpen && (
					<div className='overlay' onClick={() => setIsDrawerOpen(false)} />
				)}
			</>
		)
	}

	return (
		<Layout.Sider width='25%' className='app-sider'>
			{content}
		</Layout.Sider>
	)
}
