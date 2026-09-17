import { calcularFSPL, calcularAtenuacionMaterial, calcularPotenciaRecibida, evaluarEnlace } from "./physics.js";
import { technologies } from "./technologies.js";
import { materials } from "./materials.js";
import { render } from "./render.js";


export const state = {
    tecnologia: "2G",
    material: "concreto",
    espesor: 0.1,
    distancia: 10,
    potenciaTx: 0,
    resultados: {}
};

export function recalcular(){
    const frecuenciaMHz = technologies[state.tecnologia];
    const coefMaterial = materials[state.material];
    const distanciaKm = state.distancia / 1000; 

    const fspl = calcularFSPL(distanciaKm, frecuenciaMHz);
    const atMaterial = calcularAtenuacionMaterial(coefMaterial, state.espesor);
    const potenciaRx = calcularPotenciaRecibida(state.potenciaTx, fspl, atMaterial);
    const enlace = evaluarEnlace(potenciaRx, -95);

    state.resultados = { fspl, atMaterial, potenciaRx, enlace };

    render(state);
}