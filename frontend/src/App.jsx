import AppLayout from './components/Layout/AppLayout'
import { CryptoProvider } from './context/crypto-context'

export default function App() {
	return (
		<CryptoProvider>
			<AppLayout />
		</CryptoProvider>
	)
}
