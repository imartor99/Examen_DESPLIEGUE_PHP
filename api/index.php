<?php

/**
 * Endpoint API de prueba.
 * * Este script devuelve una respuesta JSON simple para verificar
 * que el servidor PHP-FPM está funcionando correctamente y es accesible
 * desde Nginx.
 * * @package API
 * @author Alumno DAW
 * @version 1.0
 */

// Configurar cabeceras para respuesta JSON y evitar CORS en desarrollo local si fuera necesario
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); // ¡OJO! En producción esto debe ser restrictivo

// Simulación de procesamiento
$serverTime = date('Y-m-d H:i:s');

/**
 * Array asociativo que contiene la respuesta.
 * @var array
 */
$response = [
    "status" => "success",
    "message" => "Conexión exitosa con el backend PHP-FPM.",
    "server_time" => $serverTime,
    "php_version" => phpversion()
];

// Devolver la respuesta codificada en JSON
echo json_encode($response);
