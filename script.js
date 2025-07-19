const ramos = {
    "Filosofía de las Ciencias y Pensamiento Científico": ["Modelos Contemporáneos de las Ciencias"],
    "Cálculo Diferencial": ["Mecánica de la Partícula", "Cálculo Integral"],
    "Álgebra": ["Álgebra Lineal"],
    "Modelos Fisicomatematicos": [],
    "Programación para Física y Astronomía": ["Álgebra Lineal", "Cálculo Integral", "Modelos Computacionales de la Física"],
    "Habilidades comunicativas": ["Modelos Contemporáneos de las Ciencias"],
    "Epistemología de las Ciencias": [],
    "Cálculo Integral": ["Cálculo en Varias Variables y Vectorial", "Ecuaciones Diferenciales"],
    "Álgebra Lineal": ["Ecuaciones Diferenciales"],
    "Mecánica de la Partícula": ["Mecánica del Sólido Rígido", "Termodinámica"],
    "Inglés 1": ["Inglés 2"],
    "Cálculo en Varias Variables y Vectorial": ["Termodinámica", "Métodos Matemáticos para la Física y la Astronomía", "Electromagnetismo"],
    "Ecuaciones Diferenciales": ["Métodos Matemáticos para la Física y la Astronomía", "Física Moderna"],
    "Mecánica del Sólido Rígido": ["Mecánica Clásica"],
    "Inglés 2": ["Inglés 3"],
    "Modelos Computacionales de la Física": [],
    "Métodos Matemáticos para la Física y la Astronomía": ["Métodos Matemáticos", "Electrodinámica"],
    "Física Moderna": ["Laboratorio de Física Moderna"],
    "Electromagnetismo": ["Electrodinámica"],
    "Inglés 3": ["Inglés 4"],
    "Modelos Contemporáneos de las Ciencias": ["Laboratorio de Física Moderna"],
    "Termodinámica": ["Mecánica Estadística"],
    "Mecánica Clásica": ["Mecánica Cuántica 1", "Taller 1"],
    "Métodos Matemáticos": [],
    "Inglés 4": [],
    "Laboratorio de Física Moderna": ["Responsabilidad Social"],
    "Electrodinámica": ["Electivo de Licenciatura en Física 1", "Electivo de Licenciatura en Física 2"],
    "Mecánica Cuántica 1": ["Mecánica Cuántica 2", "Mecánica Estadística", "Electivo de Licenciatura en Física 1", "Taller 2"],
    "Responsabilidad Social": [],
    "Mecánica Cuántica 2": ["Electivo de Licenciatura en Física 2", "Electivo de Investigación"],
    "Mecánica Estadística": [],
    "Electivo de Licenciatura en Física 1": ["Electivo de Investigación"],
    "Taller 2": ["Taller 3"],
    "Electivo de Licenciatura en Física 2": [],
    "Electivo de Investigación": [],
    "Taller 3": []
};

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};
const malla = document.getElementById("malla");

for (let ramo in ramos) {
    if (estadoRamos[ramo] === undefined) {
        estadoRamos[ramo] = false;
    }

    const btn = document.createElement("div");
    btn.className = "ramo bloqueado";
    btn.textContent = ramo;
    btn.id = ramo;

    if (sinRequisitos(ramo) || estadoRamos[ramo] || todosPrerequisitosAprobados(ramo)) {
        btn.classList.remove("bloqueado");
    }

    if (estadoRamos[ramo]) {
        btn.classList.add("aprobado");
    }

    btn.addEventListener("click", () => aprobarRamo(ramo));
    malla.appendChild(btn);
}

function sinRequisitos(ramo) {
    for (let prereq in ramos) {
        if (ramos[prereq].includes(ramo)) {
            return false;
        }
    }
    return true;
}

function aprobarRamo(ramo) {
    if (estadoRamos[ramo]) return;

    estadoRamos[ramo] = true;
    guardarProgreso();

    const btn = document.getElementById(ramo);
    btn.classList.add("aprobado");

    ramos[ramo].forEach(desbloquear => {
        const dependienteBtn = document.getElementById(desbloquear);
        if (todosPrerequisitosAprobados(desbloquear)) {
            dependienteBtn.classList.remove("bloqueado");
        }
    });
}

function todosPrerequisitosAprobados(ramo) {
    let requisitos = [];
    for (let prereq in ramos) {
        if (ramos[prereq].includes(ramo)) {
            requisitos.push(prereq);
        }
    }
    return requisitos.every(r => estadoRamos[r]);
}

function guardarProgreso() {
    localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
}
