import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import './globals.css';
import BackToTop from '@/components/atoms/BackToTop';
import MotionToggle from '@/components/molecules/MotionToggle';
import Footer from '@/components/organisms/Footer';
import KeyNav from '@/components/organisms/KeyNav';
import RouteBackground from '@/components/organisms/BackgroundMotion';
import TransitionCurtain from '@/components/organisms/TransitionCurtain';
import TransitionProvider from '@/components/organisms/TransitionProvider';
import { SITE_URL, siteMeta, siteName } from '@/lib/data/site';
import { ui } from '@/lib/data/ui';
import { MotionProvider, motionInitScript } from '@/lib/motion/prefs';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: siteName,
	icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
	openGraph: { type: 'website', siteName, locale: siteMeta.locale, images: [siteMeta.ogImage] },
	twitter: { card: 'summary_large_image' }
};

export const viewport: Viewport = { themeColor: '#BF2424' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		// data-motion lo fija el script de abajo antes de pintar, de ahí suppressHydrationWarning
		<html lang="es" className={`${anton.variable} ${inter.variable}`} suppressHydrationWarning>
			<head>
				{/* Movimiento: elección guardada del visitante, o la preferencia del sistema. */}
				<script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
			</head>
			<body>
				<MotionProvider>
					<TransitionProvider>
						<a href="#contenido" className="skip-link">
							{ui.skipLink}
						</a>
						<RouteBackground />
						<main id="contenido" className="relative min-h-dvh">
							{children}
							<KeyNav />
						</main>
						<Footer />
						{/* Fuera del pie: nada fijo dentro de él */}
						<BackToTop />
						<TransitionCurtain />
						<MotionToggle />
					</TransitionProvider>
				</MotionProvider>
			</body>
		</html>
	);
}
