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
video/              Vídeos de recorrido de Tubesan y Omaïlab, cada uno con su portada
netlify.toml        Configuración de publicación
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

## Pendiente

Busca `PENDIENTE` en el código:

- `cookies.html`: comprobar en la web publicada que no se instala ninguna cookie.
- `privacidad.html`: actualizar los datos que se recogen si cambia el formulario y confirmar la garantía de transferencia de Netlify y Google.
- Las etiquetas Open Graph usan `https://alx-estudioweb.netlify.app/`: cambiarlas si se pasa a un dominio propio.
