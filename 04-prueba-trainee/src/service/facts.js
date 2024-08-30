const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';

export const getRandomFact = async () => {

    // RECUPERAR LA CITA AL CARGAR LA PAGINA
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    const data = await res.json();
    const { fact } = data;
    return fact;
}