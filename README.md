# 🏄‍♂️ Analizador de Oleaje para Surf - Proyecto Duoc UC

Este proyecto es una aplicación web local diseñada para analizar datos de oleaje y proporcionar información relevante para el surf en diversas ubicaciones de Chile. La herramienta procesa datos históricos de boyas marinas para ayudar a los surfistas a comprender las condiciones del mar.

La aplicación está optimizada para ser alojada en **GitHub Pages**, lo que permite acceder y utilizar la herramienta directamente desde una URL.

## 🚀 Características

* **Análisis de Datos de Oleaje**: Procesa archivos de texto (`.txt`) con datos de boyas para extraer la altura de la ola (`%Hm0`), el período pico (`%Tp`) y la dirección (`%Dm`).
* **Calificación de Surf**: Asigna una calificación (Ideal, Precaución, o Condiciones Variables) basada en una lógica simple de altura y período de la ola.
* **Paginación Eficiente**: Muestra los datos paginados de 50 en 50, ordenados de la fecha más reciente a la más antigua. Incluye un sistema de paginación inteligente para manejar grandes cantidades de datos.
* **Interfaz Intuitiva**: Diseñada con Bootstrap para una experiencia de usuario limpia y responsiva.
* **Uso 100% Local**: La aplicación funciona completamente en el navegador del usuario. Los datos no se suben a ningún servidor, garantizando la privacidad.

## 📦 Estructura del Proyecto

El proyecto consta de los siguientes archivos principales:

* `index.html`: La página de inicio que permite al usuario descargar los archivos de datos de oleaje.
* `analisis.html`: La página principal de la aplicación, donde el usuario carga los datos, se realiza el análisis y se muestran los resultados.
* `script.js`: El corazón de la aplicación, que contiene toda la lógica para leer, procesar, ordenar y paginar los datos.
* `style.css`: La hoja de estilos CSS para dar formato y diseño a la aplicación.
* `Logo_DuocUC.png`: El logo oficial de Duoc UC.
* Archivos de Datos (`*.txt`): Conjunto de archivos de texto con datos de boyas marinas de diferentes nodos en Chile.

## ⚙️ ¿Cómo Usar?

Para utilizar esta aplicación, simplemente sigue estos dos sencillos pasos:

1.  **Descargar los datos:** Desde la página de inicio (`index.html`), haz clic en el botón del archivo de datos que desees analizar. El archivo se descargará automáticamente en tu computadora.

2.  **Cargar y analizar:** Navega a la página de análisis (`analisis.html`). Haz clic en el botón "Selecciona el archivo de datos" y elige el archivo que acabas de descargar. Luego, haz clic en "Cargar y Analizar Datos" para ver la información en la tabla.

## 🤝 Contribuciones

Si deseas contribuir, mejorar el código o reportar un problema, no dudes en abrir un *issue* o enviar un *pull request*.

## 📄 Licencia

Este proyecto está bajo la licencia MIT License

---

**Desarrollado para Duoc UC.**
