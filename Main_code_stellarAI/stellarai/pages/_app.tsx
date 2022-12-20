import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
	AppShell,
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import Head from 'next/head';
import { HeaderSimple } from '../components/layout/SHeader';
import { useRouter } from 'next/router';
import { AuthProvider } from '../components/context/AuthContext';
import { useState } from 'react';
import { SwitchToggle } from '../components/layout/ThemeToggle';

const DeterHeader = () => {
	const router = useRouter();
	const showHeader = router.pathname === '/enter' ? false : true;

	if (showHeader) {
		return (
			<HeaderSimple
				links={[
					{ link: '/', label: 'Profile' },
					{ link: '/jobs', label: 'Jobs' },
					{ link: '/about', label: 'About' },
				]}
			/>
		);
	} else {
		return <></>;
	}
};

const App = ({ Component, pageProps }: AppProps) => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			<Head>
				<title>StellarAI</title>
				<meta name="description" content="StellarAI" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ colorScheme }}
				>
					<AuthProvider>
						<AppShell header={<DeterHeader />}>
							<Component {...pageProps} />
						</AppShell>
						<SwitchToggle />
					</AuthProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
};

export default App;
