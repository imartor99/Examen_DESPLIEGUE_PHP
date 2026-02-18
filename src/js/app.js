/**
 * Módulo principal de la aplicación de frontend.
 * Se encarga de manejar la interacción del usuario en la página de inicio
 * y comunicarse con el backend PHP.
 * * @module FrontendApp
 * @author Sergio (Alumno 2º DAW)
 * @version 1.0.0
 */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCheckBackend");
  if (btn) {
    btn.addEventListener("click", fetchBackendData);
  }
});

/**
 * Realiza una petición asíncrona al backend PHP para verificar su estado.
 * * Esta función utiliza la API Fetch para conectar con el endpoint `/api/data.php`.
 * Muestra el resultado en el elemento con ID `backendResult`.
 * * @async
 * @function fetchBackendData
 * @returns {Promise<void>} No retorna ningún valor, pero actualiza el DOM.
 * @example
 * // Se invoca automáticamente al hacer clic en el botón #btnCheckBackend
 * fetchBackendData();
 */
async function fetchBackendData() {
  const resultBox = document.getElementById("backendResult");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = "Cargando...";

  try {
    /**
     * La respuesta cruda del servidor.
     * @type {Response}
     */
    const response = await fetch("/api/data.php");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    /**
     * Los datos obtenidos del backend parseados a JSON.
     * Se espera un objeto con propiedades 'status' y 'message'.
     * @type {Object}
     * @property {string} status - El estado de la respuesta (ej. 'success').
     * @property {string} message - El mensaje descriptivo del backend.
     * @property {string} server_time - La hora del servidor.
     */
    const data = await response.json();

    resultBox.innerHTML = `
            <p class="success"><strong>Éxito:</strong> ${data.message}</p>
            <small>Hora del servidor: ${data.server_time}</small>
        `;
    console.log("Datos recibidos del backend:", data);
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    resultBox.innerHTML = `<p class="error"><strong>Error:</strong> No se pudo conectar con el backend.</p>`;
  }
}
