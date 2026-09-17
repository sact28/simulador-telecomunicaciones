//calculo de longitud
export function calcularLongitudOnda(frcuenciaHz){
    const c = 3e8; 
    return c / frecuenciaHz;

}

//Funcion calculo FSPL

export function calcularFSPL(distanciaKm, frecuenciaHz){
    return 20 * Math.log10(distanciaKm) +
           20 * Math.log10(frecuenciaHz) +
           32.44;

}

//Funcion para calculo de atenuacion por material
export function calcularAtenuacionMaterial(coeficienteDbPorMetro, espesorMetros){
    return coeficienteDbPorMetro * espesorMetros;
}


//Funcion para calcular la potencia recibida 
export function calcularPotenciaRecibida(potenciaTxDbm, fspl, atMaterial){
    return potenciaTxDbm - fspl - atMaterial;
}

//Funcion para evaluar el enlace
export function evaluarEnlace(potenciaRxDbm, umbralDbm){
    return potenciaRxDbm >= umbralDbm;
}