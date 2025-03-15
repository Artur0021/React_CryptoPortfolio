import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useContext, useState, useEffect } from 'react'
import CryptoInfoModal from '../CryptoInfoModal'
import CryptoContext from '../../context/crypto-context'
import AssetForm from '../AddAssetForm'

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center	',
}

export default function AppHeader() {
	const [modal, setModal] = useState(false)
	const [coin, setCoin] = useState(null)
	const [drawer, setDrawer] = useState(false)
	const [select, setSelect] = useState(false)
	const { crypto } = useContext(CryptoContext)

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === '/') {
				setSelect((prev) => !prev)
			} else if (event.key === ',') {
				setSelect((prev) => !prev)
			}
		}
		document.addEventListener('keypress', keypress)
		return () => {
			document.removeEventListener('keypress', keypress)
		}
	}, [])

	function handleSelect(value) {
		setCoin(crypto.find((c) => c.id === value))
		setModal(true)
	}
	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{ width: 250 }}
				open={select}
				onSelect={handleSelect}
				onClick={() => setSelect((prev) => !prev)}
				defaultValue={['Press / to open']}
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
			<Button type='primary' onClick={() => setDrawer(true)}>
				Add Asset{' '}
			</Button>

			<Modal open={modal} onCancel={() => setModal(false)} footer={null}>
				<CryptoInfoModal coin={coin} />
			</Modal>

			<Drawer
				width={600}
				title='Add Asset'
				onClose={() => setDrawer(false)}
				open={drawer}
				destroyOnClose
			>
				<AssetForm onClose={() => setDrawer(false)} />
			</Drawer>
		</Layout.Header>
	)
}
