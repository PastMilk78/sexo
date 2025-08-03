# Facultad de Biología UAQ - Sitio Web

Este es el sitio web estático de la Facultad de Biología de la Universidad Autónoma de Querétaro, optimizado para despliegue en Vercel.

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Automático desde GitHub

1. **Sube el código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Facultad de Biología UAQ website"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com) y crea una cuenta
   - Haz clic en "New Project"
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

### Opción 2: Despliegue Directo con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión y despliega:**
   ```bash
   vercel login
   vercel --prod
   ```

## 📁 Estructura del Proyecto

```
├── index.html                     # Página de inicio con redirección
├── vercel.json                   # Configuración de Vercel
├── .gitignore                    # Archivos ignorados por Git
├── README.md                     # Este archivo
├── umdesignermx.wixstudio.com/   # Sitio principal
│   ├── facultadbiologiauaq.html  # Página principal del sitio
│   └── ...                       # Otras páginas
├── static.wixstatic.com/         # Recursos estáticos (imágenes, CSS, JS)
├── static.parastorage.com/       # Librerías y dependencias
└── browser.sentry-cdn.com/       # Herramientas de monitoreo
```

## ⚙️ Configuración

### vercel.json
El archivo `vercel.json` está configurado para:
- Servir todos los archivos como contenido estático
- Redirigir la raíz (`/`) al sitio principal
- Optimizar el cacheo de recursos
- Configurar headers apropiados

### Características

- ✅ **Redirección automática**: El index.html redirige automáticamente al sitio principal
- ✅ **Diseño responsivo**: Página de carga optimizada para móviles
- ✅ **Cacheo optimizado**: Configuración de cache para mejor rendimiento
- ✅ **Fallback JavaScript**: Redirección por JavaScript como respaldo
- ✅ **SEO optimizado**: Meta tags apropiados para motores de búsqueda

## 🛠️ Desarrollo Local

Para probar el sitio localmente:

1. **Opción 1: Servidor HTTP simple (Python):**
   ```bash
   python -m http.server 8000
   ```

2. **Opción 2: Live Server (VS Code):**
   - Instala la extensión "Live Server"
   - Haz clic derecho en `index.html` → "Open with Live Server"

3. **Opción 3: Vercel CLI:**
   ```bash
   vercel dev
   ```

## 🔧 Personalización

### Cambiar la página de redirección:
Edita la línea 12 en `index.html` y la línea 80 en el script JavaScript:
```html
<meta http-equiv="refresh" content="0; url=./TU_NUEVA_PAGINA.html">
```

### Modificar estilos:
Los estilos de la página de carga están en `index.html` entre las etiquetas `<style>`.

## 📝 Notas Importantes

- **Origen del sitio**: Este sitio fue extraído usando HTTrack Website Copier
- **Archivos originales**: Se mantuvieron todos los recursos originales para preservar la funcionalidad
- **Optimización**: Se optimizó la estructura para mejor rendimiento en Vercel
- **Compatibilidad**: Funciona en todos los navegadores modernos

## 🐛 Solución de Problemas

### Error 404 en recursos:
Si algunos recursos no cargan, verifica que las rutas en `vercel.json` sean correctas.

### Problemas de redirección:
Si la redirección no funciona, verifica que el archivo de destino exista en la ruta especificada.

### Problemas de rendimiento:
Revisa la configuración de cache en `vercel.json` y considera optimizar imágenes grandes.

## 📞 Contacto

Para más información sobre la Facultad de Biología UAQ, visita el sitio web desplegado.

---

**Desarrollado y optimizado para Vercel** 🚀