# Guía de despliegue — Portafolio

Sigue estos pasos para publicar el sitio en Vercel.

## 1. Antes de desplegar

Edita **`lib/site.ts`** y reemplaza los valores marcados con `TODO`:

```ts
export const SITE = {
  name: "Hernán Cáceres",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hernancaceres.vercel.app",
  email: "tucorreo@ejemplo.com", // 👈 tu email real
  linkedin: "https://www.linkedin.com/in/...", // 👈 tu LinkedIn
  github: "https://github.com/...", // 👈 tu GitHub
};
```

Sin esto, los botones de contacto y el footer apuntan a lugares inexistentes.

## 2. Subir a GitHub

```bash
git init
git add .
git commit -m "Portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

## 3. Importar en Vercel

1. Entra a https://vercel.com y crea una cuenta (puedes usar tu GitHub).
2. **Add New → Project** e importa el repositorio `portfolio`.
3. Vercel detecta Next.js automáticamente. No cambies el build command ni el output.
4. Antes de dar **Deploy**, abre **Environment Variables** y agrega (ver punto 4).
5. **Deploy**.

## 4. Variables de entorno

En Vercel → tu proyecto → **Settings → Environment Variables**:

| Variable               | Valor                                                                             | ¿Cuándo?                 |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_SITE_URL` | La URL final del sitio (ej. `https://hernancaceres.vercel.app` o tu dominio)      | Ahora                    |
| `CONTACT_ENDPOINT`     | La URL de tu backend NestJS en Render (ej. `https://tu-api.onrender.com/contact`) | Cuando exista el backend |

Tras la primera publicación, actualiza `NEXT_PUBLIC_SITE_URL` con la URL real que te dé Vercel y **vuelve a desplegar** (así el sitemap y la imagen de compartir usan el dominio correcto).

## 5. Conectar el formulario a tu backend (más adelante)

El formulario ya hace `POST` a `/api/contact`, que reenvía el mensaje a `CONTACT_ENDPOINT`. En tu backend NestJS necesitas:

1. Un endpoint `POST /contact` que reciba `{ name, email, message }`.
2. Habilitar **CORS** para el dominio de Vercel.
3. Definir `CONTACT_ENDPOINT` en Vercel apuntando a ese endpoint.

Mientras `CONTACT_ENDPOINT` no esté definida, el formulario acepta el mensaje pero **no lo entrega**. Por eso la sección muestra también tus canales directos (email / LinkedIn) como respaldo.

## Desarrollo local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Qué se genera automáticamente

- `/opengraph-image` — imagen para compartir en redes (generada por código).
- `/icon.svg` — favicon de marca.
- `/robots.txt` y `/sitemap.xml` — para buscadores.
