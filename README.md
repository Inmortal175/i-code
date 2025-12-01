# I CODE - Propuestas Estudiantiles 🎓✨

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://inmortal175.github.io/i-code/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Innovación, Creatividad, Orden y Desarrollo Estudiantil**

Sitio web oficial de propuestas de I CODE para las elecciones estudiantiles de EPIS - UNSCH.

## 🌟 Características

- ✅ **Diseño Moderno y Elegante** - Colores dorado y negro con animaciones suaves
- ✅ **Carrusel Interactivo** - Presentación dinámica de todos los candidatos
- ✅ **Perfiles Detallados** - Página individual para cada miembro del equipo
- ✅ **Propuestas Expandibles** - Sistema de "Ver más/Ver menos" para cada propuesta
- ✅ **Totalmente Responsive** - Optimizado para móviles, tablets y desktop
- ✅ **Lazy Loading** - Carga diferida de imágenes para mejor rendimiento
- ✅ **SEO Optimizado** - Meta tags, Open Graph y JSON-LD
- ✅ **Código Modularizado** - CSS y JavaScript separados en módulos

## 📁 Estructura del Proyecto

```
propuestasICODE/
├── index.html                 # Página principal
├── candidatos/                # Páginas de perfiles
│   ├── franklin-figueroa.html
│   ├── orlando-nilupu.html
│   └── ...
├── css/                       # Estilos modularizados
│   ├── main.css              # Estilos globales y variables
│   ├── carousel.css          # Estilos del carrusel
│   └── candidato.css         # Estilos de páginas de candidatos
├── js/                        # JavaScript modularizado
│   ├── carousel.js           # Lógica del carrusel
│   ├── proposals.js          # Manejo de propuestas expandibles
│   ├── lazy-loading.js       # Carga diferida de imágenes
│   └── candidatos-data.js    # Base de datos de candidatos
├── resource/                  # Recursos multimedia
│   └── img/
│       ├── candidatos/
│       └── favicon.webp
└── README.md                  # Este archivo
```

## 🚀 Despliegue en GitHub Pages

### Paso 1: Preparar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/Inmortal175/i-code.git
cd i-code

# O inicializar un nuevo repositorio
git init
git remote add origin https://github.com/tu-usuario/i-code.git
```

### Paso 2: Subir los Archivos

```bash
# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "feat: website refactorizado y modularizado"

# Subir a GitHub
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona la rama `main` y carpeta `/ (root)`
5. Click en **Save**
6. ¡Tu sitio estará disponible en pocos minutos!

## 🛠️ Desarrollo Local

### Opción 1: Servidor Simple con Python

```bash
# Python 3
python -m http.server 8000

# Accede a http://localhost:8000
```

### Opción 2: Live Server (VS Code)

1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Node.js http-server

```bash
npx http-server -p 8000
```

## 📝 Personalización

### Agregar un Nuevo Candidato

1. **Actualizar datos en `js/candidatos-data.js`:**

```javascript
{
    id: 'nuevo-candidato',
    nombre: 'Nombre Completo',
    cargo: 'Cargo',
    imagen: './resource/img/candidatos/foto.webp',
    descripcionCorta: 'Breve descripción',
    biografia: 'Biografía completa...',
    experiencia: [...],
    habilidades: [...],
    propuestas: [...],
    redes: {...}
}
```

2. **Agregar al carrusel en `index.html`:**

```html
<div class="carousel-item">
    <div class="progress-bar"></div>
    <img data-src="./resource/img/candidatos/foto.webp" alt="Nombre" loading="lazy">
    <h3>Nombre Completo</h3>
    <p class="cargo">Cargo</p>
    <a href="./candidatos/nuevo-candidato.html" class="btn-perfil">Ver Perfil Completo</a>
</div>
```

3. **Crear página de perfil:** Duplica `candidatos/franklin-figueroa.html` y personaliza el contenido.

4. **Agregar indicador:** Añade un `<span class="indicator">` en la sección de indicadores.

### Modificar Colores

Edita las variables CSS en `css/main.css`:

```css
:root {
    --color-primary: #ffd700;      /* Dorado principal */
    --color-secondary: #ebd768;    /* Dorado secundario */
    --bg-dark: #1a1a1a;            /* Fondo oscuro */
    /* ... más variables */
}
```

### Agregar Nueva Propuesta

En `index.html`, dentro de `#list-proposal`:

```html
<section class="proposal">
    <h3>Título de la Propuesta</h3>
    <button class="toggle-btn">Ver más</button>
    <div class="proposal-content hide">
        <p><strong>Objetivo:</strong> ...</p>
        <p><strong>Descripción:</strong> ...</p>
        <ul>
            <li>Punto 1</li>
            <li>Punto 2</li>
        </ul>
    </div>
</section>
```

## 🎨 Guía de Estilo

### Paleta de Colores

- **Dorado Principal:** `#ffd700`
- **Dorado Oscuro:** `#b19f3e`
- **Dorado Claro:** `#eee093`
- **Fondo Oscuro:** `#1a1a1a`
- **Fondo Medio:** `#2c2c2c`
- **Texto Claro:** `#f0f0f0`

### Tipografía

- **Títulos decorativos:** Bonheur Royale (cursiva)
- **Títulos formales:** Charm
- **Texto general:** Arial, sans-serif

## ⚡ Optimizaciones Implementadas

- ✅ Lazy loading de imágenes
- ✅ CSS y JS minificables
- ✅ Uso de variables CSS para fácil mantenimiento
- ✅ Imágenes en formato WebP (menor peso)
- ✅ Animaciones con CSS nativo (mejor rendimiento)
- ✅ Scroll-driven animations
- ✅ Preconnect a Google Fonts
- ✅ SEO optimizado

## 🐛 Solución de Problemas

### El carrusel no funciona

- Verifica que todos los scripts JS estén cargando correctamente
- Revisa la consola del navegador (F12) para errores
- Asegúrate de que los archivos JS estén en la ruta correcta

### Las imágenes no cargan

- Verifica las rutas en los atributos `src` o `data-src`
- Asegúrate de que las imágenes existan en `resource/img/`
- Comprueba que los nombres de archivo coincidan (sensible a mayúsculas)

### Problemas en GitHub Pages

- Asegúrate de que el repositorio sea público
- Verifica que GitHub Pages esté activado en Settings
- Espera 5-10 minutos después de hacer push
- Verifica que no haya errores en las rutas (usa rutas relativas)

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móviles (iOS y Android)

## 🤝 Contribuciones

¿Quieres mejorar el sitio? ¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👥 Equipo I CODE

- **Franklin Figueroa Pérez** - Presidente
- [Ver equipo completo en el sitio web](https://inmortal175.github.io/i-code/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email:** [contacto@icode.com](mailto:contacto@icode.com)
- **Facebook:** [I CODE EPIS](https://facebook.com)
- **Instagram:** [@icode_epis](https://instagram.com)

---

Hecho con ❤️ por el equipo de I CODE - EPIS UNSCH

**¡Vota por I CODE para un futuro mejor!** ✨
