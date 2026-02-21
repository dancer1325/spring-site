* [index](layout.md)
* [docsMirror](docsMirror)

# how has [docsMirror](docsMirror) been generated?

Scripts para descargar y convertir páginas de spring.io a formato Markdown.

## Opciones Disponibles

### Opción 1: Script Node.js con Puppeteer (Recomendado) ⭐

El script con Puppeteer renderiza JavaScript completo para obtener todo el contenido de páginas dinámicas. **Esta es la mejor opción** para spring.io ya que captura el contenido completo incluyendo elementos que se cargan dinámicamente.

**Instalación de dependencias:**
```bash
npm install puppeteer turndown
```

**Uso:**
```bash
node scrape-spring-io-puppeteer.js
```

**Ventajas:**
- ✅ Renderiza JavaScript completo
- ✅ Captura contenido dinámico
- ✅ Scroll automático para lazy-loading
- ✅ Espera a que se cargue el DOM completamente
- ✅ Conversión HTML → Markdown optimizada
- ✅ Metadata completa (title, description, keywords)
- ✅ Contenido 10-100x más completo

### Opción 2: Script Python con Selenium

El script con Selenium también renderiza JavaScript para obtener contenido completo de páginas dinámicas.

**Instalación de dependencias:**
```bash
pip install selenium webdriver-manager html2text beautifulsoup4
```

**Uso:**
```bash
python3 scrape-spring-io-selenium.py
```

### Opción 3: Scripts básicos

Scripts más simples pero solo capturan HTML estático (sin JavaScript).

**Python:**
```bash
pip install requests beautifulsoup4 html2text
python3 scrape-spring-io.py
```

**Node.js:**
```bash
node scrape-spring-io.js
```

## Configuración

Todos los scripts tienen variables de configuración al inicio. Para el script de Puppeteer (recomendado):

- `BASE_URL`: URL base del sitio (default: `https://spring.io`)
- `OUTPUT_DIR`: Directorio de salida (default: `sagan-site/src/main/resources/templates/docsMirror`)
- `MAX_DEPTH`: Profundidad máxima de enlaces a seguir (default: `2`)
- `DELAY_MS`: Tiempo de espera entre peticiones en milisegundos (default: `2000` = 2 segundos)
- `TIMEOUT`: Timeout para cargar cada página en milisegundos (default: `60000` = 60 segundos)

### URLs Iniciales

Edita la lista `INITIAL_URLS` para customizar qué páginas descargar:

```python
INITIAL_URLS = [
    "/",
    "/projects",
    "/guides",
    "/blog",
    "/quickstart",
    "/why-spring",
    "/learn",
    "/community",
]
```

## Características

- ✅ Conversión HTML a Markdown con formato optimizado
- ✅ Renderizado completo de JavaScript (Puppeteer/Selenium)
- ✅ Scroll automático para capturar contenido lazy-loaded
- ✅ Rate limiting para ser respetuoso con el servidor (2s entre peticiones)
- ✅ Estructura de directorios que refleja la URL
- ✅ Metadata completa en cada archivo (title, source, date, description, keywords)
- ✅ Extracción inteligente de contenido principal (sin headers/footers/navs)
- ✅ Manejo de enlaces relativos y absolutos
- ✅ Deduplicación de URLs visitadas
- ✅ Estadísticas detalladas (caracteres, líneas, palabras por archivo)
- ✅ Múltiples estrategias de espera para contenido dinámico

## Estructura de Salida

Los archivos se guardan en `sagan-site/src/main/resources/templates/docsMirror/` con la siguiente estructura:

```
sagan-site/src/main/resources/templates/docsMirror/
├── index.md                    # https://spring.io/
├── projects.md                 # https://spring.io/projects
├── guides.md                   # https://spring.io/guides
├── projects/
│   └── spring-boot.md         # https://spring.io/projects/spring-boot
└── guides/
    └── getting-started.md     # https://spring.io/guides/getting-started
```

## Formato de Archivos

Cada archivo Markdown incluye metadata completa al inicio:

```markdown
---
title: Spring Boot
source: https://spring.io/projects/spring-boot
scraped: 2026-02-19T07:48:13.919Z
description: Level up your Java code and explore what Spring can do for you.
keywords: spring, java, framework
---

# Contenido completo de la página...
```

### Resultados Esperados

Con el script de Puppeteer, cada archivo contiene:

- **Páginas principales**: 2,000-20,000 caracteres, 100-800 líneas
- **Proyectos**: 3,000-15,000 caracteres con descripciones completas
- **Guías completas**: 10,000-30,000+ caracteres con código completo y explicaciones
  - Ejemplo: `guides/gs/uploading-files.md` → 31,685 chars, 976 líneas, 2,813 palabras

**Total estimado**: 80-150+ archivos .md dependiendo de MAX_DEPTH

## Notas Importantes

- El script es **respetuoso** con el servidor (delay entre peticiones)
- Solo descarga páginas del dominio spring.io
- No descarga recursos externos (CSS, JS, imágenes grandes)
- Profundidad limitada para evitar descargas masivas

## Personalización Avanzada

### Descargar páginas específicas

Para descargar solo páginas específicas sin seguir enlaces, establece `MAX_DEPTH = 0`:

```python
MAX_DEPTH = 0
INITIAL_URLS = [
    "/projects/spring-boot",
    "/projects/spring-framework",
]
```

### Aumentar velocidad (con precaución)

Reduce el delay, pero ten cuidado de no sobrecargar el servidor:

```python
DELAY_SECONDS = 0.5  # Mínimo recomendado
```

### Filtrar secciones específicas

Edita la función `extract_main_content()` en el script Python para ajustar qué elementos del HTML se incluyen o excluyen.

## Quickstart 🚀

Para generar todos los archivos .md rápidamente:

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install puppeteer turndown

# 2. Ejecutar el script
node scrape-spring-io-puppeteer.js

# 3. Los archivos se guardarán en:
# sagan-site/src/main/resources/templates/docsMirror/
```

El script mostrará el progreso en tiempo real:
```
[1] Scraping: https://spring.io/ (depth: 0)
  ✓ Saved: .../index.md
    Content: 2900 chars, 118 lines, 338 words
```

## Troubleshooting

**Error: Could not find Chrome**
```bash
# Puppeteer instalará Chrome automáticamente con:
npm install puppeteer
# (no puppeteer-core)
```

**Error de dependencias (Python):**
```bash
pip3 install --user selenium webdriver-manager html2text beautifulsoup4
```

**Error: page.waitForTimeout is not a function**
Ya está corregido en la versión actual del script (usa `setTimeout` en su lugar).

**Timeout en peticiones:**
Aumenta el valor de `TIMEOUT` en el script (línea 22):
```javascript
const TIMEOUT = 120000; // 2 minutos
```

**Contenido incompleto:**
Asegúrate de usar el script de Puppeteer (`scrape-spring-io-puppeteer.js`) en lugar de los scripts básicos.

**URLs no encontradas (404):**
El script las ignora automáticamente y continúa con las demás.

**El script tarda mucho:**
Es normal. Con MAX_DEPTH=2, puede procesar 100+ páginas. Cada página toma ~5-10 segundos (carga + scroll + extracción).
Tiempo estimado: 10-30 minutos para completar todo.
  