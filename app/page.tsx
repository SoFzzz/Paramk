import HomeHeader from '@/components/organisms/HomeHeader';
import MainMenu from '@/components/organisms/MainMenu';
import { buildMetadata } from '@/lib/seo';
import { ui } from '@/lib/data/ui';

export const metadata = buildMetadata({ title: ui.home.title, description: ui.home.description, path: '/' });

export default function HomePage() {
	return (
		/* La silueta (Shiori) vive en el fondo, a la derecha, y "mira" hacia el menú. */
		<div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col gap-4 px-4 py-4 sm:px-8 lg:px-[4.5rem] lg:py-8">
			<div className="flex flex-1 flex-col justify-start gap-4 lg:gap-[2.2vh] lg:w-[52%]">
				<HomeHeader />
				<div className="mt-2 lg:mt-[1.5vh] lg:pb-20">
					<MainMenu />
				</div>
			</div>
		</div>
	);
}
