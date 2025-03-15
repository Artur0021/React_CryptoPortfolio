import { Table } from 'antd'
import { useContext } from 'react'
import CryptoContext from '../context/crypto-context'
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		showSorterTooltip: {
			target: 'full-header',
		},
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Price $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	},
]

export default function AssetsTable() {
	const { assets } = useContext(CryptoContext)

	const data = assets.map((c) => ({
		key: c.id,
		name: c.name,
		price: c.price,
		amount: c.amount,
	}))

	return <Table pagination={false} columns={columns} dataSource={data} />
}
