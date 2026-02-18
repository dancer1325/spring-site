* [index](layout.md)
* [docsMirror](docsMirror)

# how has [docsMirror](docsMirror) been generated?
* TODO: 
Scripts para descargar y convertir páginas de spring.io a formato Markdown.

## Opciones Disponibles

### Opción 1: Script Python (Recomendado)

El script Python usa librerías especializadas para mejor calidad de conversión.

**Instalación de dependencias:**
```bash
pip install requests beautifulsoup4 html2text
```

**Uso:**
```bash
python3 scrape-spring-io.py
```

### Opción 2: Script Node.js

El script JavaScript no requiere dependencias externas, solo Node.js.

**Uso:**
```bash
node scrape-spring-io.js
```

## Configuración

Ambos scripts tienen variables de configuración al inicio:

- `BASE_URL`: URL base del sitio (default: `https://spring.io`)
- `OUTPUT_DIR`: Directorio de salida (default: `sagan-site/src/main/resources/templates/docsMirror`)
- `MAX_DEPTH`: Profundidad máxima de enlaces a seguir (default: `2`)
- `DELAY`: Tiempo de espera entre peticiones (default: 1 segundo)

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

- ✅ Conversión HTML a Markdown
- ✅ Rate limiting para ser respetuoso con el servidor
- ✅ Estructura de directorios que refleja la URL
- ✅ Metadata en cada archivo (URL origen, fecha)
- ✅ Extracción de contenido principal (sin headers/footers)
- ✅ Manejo de enlaces relativos y absolutos
- ✅ Deduplicación de URLs visitadas

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

Cada archivo Markdown incluye metadata al inicio:

```markdown
---
title: Spring | Home
source: https://spring.io/
scraped: 2026-02-18T23:00:00.000000
---

# Contenido de la página...
```

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

## Troubleshooting

**Error de dependencias (Python):**
```bash
pip3 install --user requests beautifulsoup4 html2text
```

**Timeout en peticiones:**
Aumenta el valor de `TIMEOUT` en el script.

**URLs no encontradas (404):**
El script las ignora automáticamente y continúa con las demás.

## Licencia

Uso interno del proyecto spring-site.

  