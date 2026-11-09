import HomeHeader from '@/components/organisms/HomeHeader';
import MainMenu from '@/components/organisms/MainMenu';
import PhotoFrame from '@/components/molecules/PhotoFrame';
import { buildMetadata } from '@/lib/seo';
import { profile } from '@/lib/data/profile';
import { ui } from '@/lib/data/ui';

export const metadata = buildMetadata({ title: ui.home.title, description: ui.home.description, path: '/' });

export default function HomePage() {
	return (
		/* La silueta (Shiori) vive en el fondo, abajo a la derecha, y "mira" hacia arriba, al marco de la foto. */
		<div className="relative">
			<div className="mx-auto flex min-h-dvh max-w-[90rem] flex-col gap-4 px-4 py-4 sm:px-8 lg:px-[4.5rem] lg:py-8">
				<div className="flex flex-1 flex-col justify-start gap-4 lg:gap-[2.2vh] lg:w-[52%]">
					<HomeHeader />
					<div className="mt-2 lg:mt-[1.5vh] lg:pb-20">
						<MainMenu />
					</div>
					{/* en móvil, sobre el panel oscuro de abajo; desde lg, arriba a la derecha (relativo a toda la pantalla) */}
					<PhotoFrame
						src={profile.photo}
						alt={ui.photo.alt(profile.name)}
						className="mt-auto mb-[11vh] ml-[8vw] aspect-[176/208] h-36 self-start lg:absolute lg:top-[13vh] lg:right-[20vw] lg:m-0 lg:h-[min(34vh,22vw)]"
						position="50% 30%"
						sizes="(min-width: 1024px) 26vh, 130px"
					/>
				</div>
			</div>
		</div>
	);
}
