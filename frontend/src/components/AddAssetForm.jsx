import {
	Select,
	Space,
	Typography,
	Flex,
	Divider,
	Form,
	InputNumber,
	Button,
	DatePicker,
	Result,
} from 'antd'
import { useContext, useState, useRef } from 'react'
import CryptoContext from '../context/crypto-context'
export default function AssetForm({ onClose }) {
	const [submitted, setSubmitted] = useState(false)
	const [form] = Form.useForm()
	const { crypto, addAsset } = useContext(CryptoContext)
	const [coin, setCoin] = useState(null)
	const assetRef = useRef()
	if (submitted) {
		return (
			<Result
				status='success'
				title='New asset successfully Added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Close
					</Button>,
				]}
			/>
		)
	}

	if (!coin) {
		return (
			<Select
				style={{ width: '100%' }}
				onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
				placeholder='Select coin'
				options={crypto.map((coin) => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={(option) => (
					<Space>
						<img
							style={{ width: '20px' }}
							src={option.data.icon}
							alt={option.data.label}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>
		)
	}

	function onFinish(values) {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		setSubmitted(true)
		addAsset(newAsset)
	}

	function handleAmountChange(value) {
		const price = form.getFieldValue('price')
		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		})
	}

	function handlePriceChange(value) {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(amount * value).toFixed(2),
		})
	}

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 10 }}
			style={{ maxWidth: 600 }}
			initialValues={{
				price: coin.price.toFixed(2),
			}}
			onFinish={onFinish}
			autoComplete='off'
		>
			<Flex align='center'>
				<img src={coin.icon} style={{ width: 40, marginRight: 10 }} />

				<Typography.Title level={2} style={{ margin: 0 }}>
					{coin.name}
				</Typography.Title>
			</Flex>
			<Divider />

			<Form.Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}
			>
				<InputNumber
					placeholder='Enter coin amount'
					style={{ width: '100%' }}
					onChange={handleAmountChange}
				/>
			</Form.Item>

			<Form.Item label='Price USDT' name='price'>
				<InputNumber
					onChange={handlePriceChange}
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item label='Date & Time' name='date'>
				<DatePicker showTime style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item label='Total USDT' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	)
}
