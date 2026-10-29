# ALX Estudio Web

Web de ALX Estudio Web, el estudio de diseño y desarrollo web de Alexandra Ferrera (Jerez de la Frontera).

Web estática hecha a mano con HTML5, CSS3 y un poco de JavaScript (solo para las galerías de proyectos y el botón de volver arriba), sin dependencias ni proceso de compilación. Se publica en Netlify automáticamente con cada cambio en la rama `main`.

## Estructura

```
index.html          Inicio
sobre-mi.html       Sobre mí
servicios.html      Servicios y precios para negocios
agencias.html       Colaboración con agencias, estudios y consultoras
contacto.html       Contacto (formulario con Netlify Forms)
gracias.html        Confirmación tras enviar el formulario
aviso-legal.html    Aviso legal
privacidad.html     Política de privacidad
cookies.html        Política de cookies
css/styles.css      Estilos de toda la web, ordenados por secciones
js/main.js          Galerías de proyectos (botones, contador y vista ampliada) y botón de volver arriba
fonts/              IBM Plex Mono (500 y 600) alojada en la web, con su licencia OFL
img/marca/          Logotipos ALX en SVG, foto de Alexandra e imagen para redes (Open Graph)
img/proyectos/      Capturas de proyectos en WebP
video/              Vídeos de recorrido de Tubesan y Omaïlab, cada uno con su portada en WebP
netlify.toml        Configuración de publicación, cabeceras de seguridad y caché
```

## Trabajar en local

Abre la carpeta en VS Code y usa la extensión Live Server, o abre `index.html` en el navegador.

## Publicar cambios

1. Guarda los cambios.
2. En VS Code, panel Control de código fuente: escribe un mensaje y haz Commit.
3. Pulsa Sync / Push. Netlify publica la nueva versión en un minuto.

## Convenciones

- Colores, tipografías y espaciados se definen como variables en `:root` (`css/styles.css`).
- Clases con nomenclatura tipo BEM: `bloque__elemento--variante`.
- El cuadrado coral solo marca las etiquetas de sección (`.eyebrow`). Las listas usan el guion malva (`.list`).
- Imágenes nuevas en WebP, con `width`, `height` y `alt` descriptivo.
- Enlaces internos con `.html` (así funcionan en local). Netlify los publica sin la extensión, y por eso canonical, og:url y sitemap usan la versión sin `.html`.
- La política de seguridad de `netlify.toml` solo permite recursos de la propia web. Si se añade un servicio externo (analítica, reservas...), hay que añadir su dominio allí.
- Imágenes y vídeos se guardan un día en el navegador: si sustituyes un archivo con el mismo nombre, quien ya lo vio puede tardar hasta un día en ver el nuevo.

## Al pasar al dominio propio

1. En Netlify, añadir el dominio y activar HTTPS. El subdominio `netlify.app` redirige solo al dominio principal.
2. Sustituir `https://alx-estudioweb.netlify.app` por el dominio nuevo en canonical, og:url, og:image, datos estructurados (`index.html`), `sitemap.xml` y `robots.txt`.
3. Cambiar `alx.estudioweb@gmail.com` por el correo profesional en todas las páginas (pie, contacto, inicio, servicios, agencias y textos legales) y en los datos estructurados.
4. Dar de alta el dominio nuevo en Search Console y enviar el sitemap.

## Pendiente

Busca `PENDIENTE` en el código:

- `privacidad.html`: actualizar los datos que se recogen si cambia el formulario y confirmar la garantía de transferencia de Netlify y Google.
- Las etiquetas Open Graph usan `https://alx-estudioweb.netlify.app/`: cambiarlas si se pasa a un dominio propio (ver «Al pasar al dominio propio»).

Comprobado el 29/10/2026: ninguna página publicada instala cookies (ni cabeceras `Set-Cookie` ni `document.cookie`).
