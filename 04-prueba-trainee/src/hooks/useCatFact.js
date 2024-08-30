import { useState, useEffect } from "react";
import { getRandomFact } from "../service/facts.js";

export function useCatFact() {
    const [fact, setFact] = useState()

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    // RECUPERAR LA CITA AL CARGAR LA PAGINA
    useEffect(refreshFact, [])

    return { fact, refreshFact}

}