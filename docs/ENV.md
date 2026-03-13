# Variables de Entorno

## Archivo `.env`

Ubicacion: raiz del proyecto (`/.env`). **NO commitear** — esta en `.gitignore`.

## Variables

| Variable | Requerida | Descripcion | Ejemplo |
|----------|-----------|-------------|---------|
| `DATABASE_URL` | Si | Ruta al archivo SQLite | `file:./dev.db` |
| `NEXTAUTH_SECRET` | Si | Secret para firmar tokens JWT de NextAuth | `p@ywL-S3cur3-K3y-...` |
| `NEXTAUTH_URL` | Si | URL base de la aplicacion | `http://localhost:3001` |
| `NEXT_PUBLIC_GA_ID` | No | ID de Google Analytics 4 | `G-XXXXXXXXXX` |
| `HUBSPOT_API_KEY` | No | API key de HubSpot para enviar leads | `pat-na1-xxxx` |
| `RESEND_API_KEY` | No | API key de Resend para emails transaccionales | `re_xxxx` |
| `NEXT_PUBLIC_CALENDLY_URL` | No | URL de Calendly para agendar demos | `https://calendly.com/nivelics` |

## Detalle por Variable

### DATABASE_URL
Ruta relativa al archivo SQLite. Prisma 7 usa esta variable en `prisma.config.ts` para migraciones, y el adapter `better-sqlite3` la usa en `src/lib/prisma.ts` para runtime.

```
DATABASE_URL="file:./dev.db"
```

### NEXTAUTH_SECRET
Clave secreta para firmar y encriptar los JWT de sesion. Debe ser una cadena larga y aleatoria. Se puede generar con:

```bash
openssl rand -base64 32
```

### NEXTAUTH_URL
URL base donde corre la aplicacion. En desarrollo es `http://localhost:3001`. En produccion debe apuntar al dominio real (ej: `https://paywl.io`).

**Importante:** El puerto 3001 se usa porque el puerto 3000 esta reservado para el proyecto Niveleads.

### NEXT_PUBLIC_GA_ID
ID de medicion de Google Analytics 4. Si esta vacio, el tracking no se activa. El prefijo `NEXT_PUBLIC_` lo hace disponible en el cliente.

### HUBSPOT_API_KEY
Token de acceso privado de HubSpot. Se usa en el endpoint `/api/piloto` para crear contactos en el CRM cuando se recibe un lead del formulario de piloto.

### RESEND_API_KEY
API key del servicio Resend (resend.com). Se usa para enviar emails de confirmacion al recibir un lead o mensaje de contacto.

### NEXT_PUBLIC_CALENDLY_URL
URL publica de Calendly. Se usa en el CTA de "Agendar Demo" en varias secciones del sitio. El prefijo `NEXT_PUBLIC_` lo hace disponible en el cliente.

## Template

Copiar este template como `.env` en la raiz del proyecto:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="cambiar-por-un-secret-seguro"
NEXTAUTH_URL="http://localhost:3001"
NEXT_PUBLIC_GA_ID=""
HUBSPOT_API_KEY=""
RESEND_API_KEY=""
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/nivelics"
```

## Notas

- Las variables con prefijo `NEXT_PUBLIC_` se exponen al navegador. **Nunca** poner secrets en variables con este prefijo.
- En produccion, configurar las variables en el hosting (Vercel, AWS, etc.) y nunca subir el archivo `.env`.
- Si se cambia `NEXTAUTH_SECRET` en produccion, todas las sesiones activas se invalidan.
