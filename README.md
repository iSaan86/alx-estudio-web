# ALX Estudio Web

Web de ALX Estudio Web, el estudio de diseño y desarrollo web de Alexandra Ferrera (Jerez de la Frontera).

Web estática hecha a mano con HTML5, CSS3 y JavaScript, sin dependencias ni proceso de compilación. Se publica en Netlify automáticamente con cada cambio en la rama `main`.

## Estructura

```
index.html          Inicio
sobre-mi.html       Sobre mí
servicios.html      Servicios para agencias y para negocios
contacto.html       Contacto (formulario con Netlify Forms)
gracias.html        Confirmación tras enviar el formulario
css/styles.css      Estilos de toda la web, ordenados por secciones
js/main.js          Deslizadores de proyectos
img/marca/          Logotipos ALX en SVG
img/proyectos/      Capturas de proyectos en WebP
video/              Vídeos de Tubesan y Omaïlab con su portada
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

- Foto profesional en `sobre-mi.html`.
- Páginas legales (aviso legal, privacidad y cookies) y sus enlaces.
- Confirmar si los precios de `servicios.html` incluyen IVA.
