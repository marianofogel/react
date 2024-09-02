import { useState, useEffect } from "react";

export function Botonardo() {
    const [mensaje, setMensaje] = useState('Hola');

    // useEffect ejecuta el código dentro de él cuando el componente se carga por primera vez o cuando cambia el valor de mensaje.
    useEffect(() => {
        console.log('El componente se ha mostrado o el mensaje cambió:', mensaje);

        // Esto se ejecuta cuando el componente se desmonta o antes de actualizarlo:
        return () => {
            console.log('El componente se va a desmontar o actualizar');
        };
    }, [mensaje]); // Este arreglo indica que useEffect debe ejecutarse si cambia "mensaje".

    return (
        <div>
            <p>{mensaje}</p>
            <button onClick={() => setMensaje('Hola, de nuevo!')}>Cambiar mensaje</button>
        </div>
    );
}

