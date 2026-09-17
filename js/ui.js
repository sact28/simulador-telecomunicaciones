import {state, recalcular} from "./state.js";

export function initUI(){
  
    const distanciaEl = document.getElementById("distancia");
    const distanciaValorEl = document.getElementById("distancia-valor");
    const distanciaNumEl = document.getElementById("distancia-num");

   
    distanciaValorEl.textContent = `${distanciaEl.value} m`;
    distanciaNumEl.value = distanciaEl.value;
    state.distancia = parseFloat(distanciaEl.value);

    
    distanciaEl.addEventListener("input", e => {
        const v = parseFloat(e.target.value);
        state.distancia = v;
        distanciaValorEl.textContent = `${v} m`;
        distanciaNumEl.value = v;
        recalcular();
    });

   
    distanciaNumEl.addEventListener("change", e => {
        let v = parseFloat(e.target.value);
        if (isNaN(v)) v = parseFloat(distanciaEl.min);
        v = Math.max(parseFloat(distanciaEl.min), Math.min(parseFloat(distanciaEl.max), v));
        state.distancia = v;
        distanciaEl.value = v;
        distanciaValorEl.textContent = `${v} m`;
        recalcular();
    });

  
    document.getElementById("tecnologia").addEventListener("change", e => {
        state.tecnologia = e.target.value;
        recalcular();
    });

    document.getElementById("material").addEventListener("change", e => {
        state.material = e.target.value;
        recalcular();
    });

    document.getElementById("espesor").addEventListener("input", e => {
        state.espesor = parseFloat(e.target.value);
        recalcular();
    });

    
    recalcular();
}
