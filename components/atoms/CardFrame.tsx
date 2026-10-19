/*
 * Fondo y sombra de una tarjeta (estilos en globals.css: .cf-paper, .cf-shade, .nav-card). La sombra es un bloque
 * oscuro con la forma de la tarjeta: en reposo asoma 6/8 px y, al seleccionarla, se desliza en diagonal mientras la
 * tarjeta se eleva. Solo depende de [data-selected] (lo pone KeyNav, también para el puntero).
 * La tarjeta que lo contiene debe tener las clases `nav-card relative isolate`.
 */
export default function CardFrame() {
	return (
		<>
			<span aria-hidden="true" className="cf-paper"></span>
			<span aria-hidden="true" className="cf-shade"></span>
		</>
	);
}
