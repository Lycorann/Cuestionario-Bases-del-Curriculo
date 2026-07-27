/* ==========================================
   BASES DEL CURRICULO
   JUEGO DIDACTICO
   ARCHIVO: script.js
========================================== */


/* ==========================
   VARIABLES GENERALES
========================== */


let puntaje = {

    quiz:0,

    emparejar:0,

    ruleta:0,

    vf:0

};



let juegoActual = "";



const pantallas = document.querySelectorAll(".pantalla");



function mostrarPantalla(id){

    pantallas.forEach(p => {

        p.classList.remove("activa");

    });


    document.getElementById(id)
    .classList.add("activa");

}






/* ==========================
   INICIO
========================== */


document
.getElementById("btnIniciar")
.addEventListener("click",()=>{


    mostrarPantalla("menu");


});







/* ==========================
   MENU
========================== */


document
.querySelectorAll(".actividad-btn")
.forEach(btn=>{


    btn.addEventListener("click",()=>{


        juegoActual = btn.dataset.juego;


        mostrarPantalla(juegoActual);



        if(juegoActual==="quiz")
            iniciarQuiz();


        if(juegoActual==="emparejar")
            iniciarEmparejar();


        if(juegoActual==="vf")
            iniciarVF();


    });


});







/* ==========================
   QUIZ
========================== */


const preguntasQuiz=[


{

pregunta:"¿Qué es el currículo educativo?",

opciones:[

"Un conjunto de elementos que orientan el proceso educativo",

"Solo los libros escolares",

"Un examen final",

"Una actividad recreativa"

],

respuesta:0

},


{

pregunta:"¿Cuál es una base del currículo?",

opciones:[

"Improvisación",

"Comunidad",

"Competencia individual",

"Memorización"

],

respuesta:1

},


{

pregunta:"El currículo busca responder a:",

opciones:[

"Necesidades sociales y educativas",

"Solo intereses económicos",

"Solamente evaluaciones",

"Únicamente tecnología"

],

respuesta:0

},


{

pregunta:"La educación boliviana tiene un enfoque:",

opciones:[

"Individualista",

"Descontextualizado",

"Comunitario",

"Competitivo"

],

respuesta:2

},


{

pregunta:"El currículo organiza:",

opciones:[

"Procesos de enseñanza aprendizaje",

"Solamente recreos",

"Únicamente tareas",

"Castigos escolares"

],

respuesta:0

},


{

pregunta:"El docente dentro del currículo es:",

opciones:[

"Un facilitador del aprendizaje",

"Un observador pasivo",

"Un juez",

"Un supervisor externo"

],

respuesta:0

},


{

pregunta:"La comunidad participa en:",

opciones:[

"La construcción educativa",

"Ningún proceso",

"Solo eventos",

"Solo evaluaciones"

],

respuesta:0

},


{

pregunta:"El currículo debe considerar:",

opciones:[

"Cultura y contexto",

"Solamente contenidos",

"Solo tecnología",

"Solo exámenes"

],

respuesta:0

},


{

pregunta:"La planificación educativa forma parte de:",

opciones:[

"La práctica curricular",

"El descanso",

"La disciplina",

"El recreo"

],

respuesta:0

},


{

pregunta:"El currículo busca una educación:",

opciones:[

"Integral",

"Limitada",

"Aislada",

"Mecánica"

],

respuesta:0

}

];



let preguntaQuizActual=0;



function iniciarQuiz(){


    preguntaQuizActual=0;

    cargarPreguntaQuiz();


}



function cargarPreguntaQuiz(){


    let pregunta=
    preguntasQuiz[preguntaQuizActual];


    document
    .getElementById("preguntaQuiz")
    .innerHTML=
    pregunta.pregunta;



    let contenedor=
    document.getElementById("opcionesQuiz");


    contenedor.innerHTML="";



    pregunta.opciones.forEach((opcion,index)=>{


        let boton=document.createElement("div");


        boton.className="opcion";


        boton.innerHTML=opcion;



        boton.onclick=()=>{


            if(index===pregunta.respuesta){

                boton.classList.add("correcta");

                puntaje.quiz++;

            }

            else{

                boton.classList.add("incorrecta");

            }



            document
            .querySelectorAll(".opcion")
            .forEach(o=>o.onclick=null);


        };


        contenedor.appendChild(boton);



    });



}



document
.getElementById("siguienteQuiz")
.addEventListener("click",()=>{


    preguntaQuizActual++;


    if(preguntaQuizActual<10){

        cargarPreguntaQuiz();

    }

    else{

        actualizarPuntaje();

        mostrarPantalla("menu");

    }


});









/* ==========================
   EMPAREJAR
   VERSION COMPLETA
========================== */


const paresEmparejar = [

    {
        concepto:"Currículo",
        definicion:"Organiza y orienta los procesos educativos"
    },

    {
        concepto:"Comunidad",
        definicion:"Participación social en la educación"
    },

    {
        concepto:"Docente",
        definicion:"Guía y orientador del aprendizaje"
    },

    {
        concepto:"Cultura",
        definicion:"Identidad y características del contexto"
    },

    {
        concepto:"Planificación",
        definicion:"Organización de actividades educativas"
    },

    {
        concepto:"Evaluación",
        definicion:"Valoración del proceso de aprendizaje"
    },

    {
        concepto:"Estudiante",
        definicion:"Sujeto activo que construye conocimientos"
    },

    {
        concepto:"Metodología",
        definicion:"Forma y estrategias para enseñar"
    },

    {
        concepto:"Contenido",
        definicion:"Saberes y conocimientos educativos"
    },

    {
        concepto:"Objetivo",
        definicion:"Meta que se pretende alcanzar"
    }

];



let conceptoSeleccionado = null;

let parejasRespondidas = 0;





function iniciarEmparejar(){


    conceptoSeleccionado = null;

    parejasRespondidas = 0;


    let conceptos =
    document.getElementById("conceptos");


    let definiciones =
    document.getElementById("definiciones");



    conceptos.innerHTML="";

    definiciones.innerHTML="";



    let definicionesMezcladas =
    [...paresEmparejar]
    .sort(()=>Math.random()-0.5);




    // CREAR CONCEPTOS

    paresEmparejar.forEach((item,index)=>{


        let div=document.createElement("div");


        div.className="elemento";

        div.textContent=item.concepto;


        div.dataset.id=index;



        div.onclick=function(){


            if(div.classList.contains("bloqueado"))
                return;



            document
            .querySelectorAll("#conceptos .elemento")
            .forEach(e=>{

                e.classList.remove("seleccionado");

            });



            div.classList.add("seleccionado");


            conceptoSeleccionado=div;



        };



        conceptos.appendChild(div);



    });





    // CREAR DEFINICIONES


    definicionesMezcladas.forEach((item)=>{


        let indice=
        paresEmparejar.indexOf(item);



        let div=document.createElement("div");


        div.className="elemento";


        div.textContent=item.definicion;


        div.dataset.id=indice;



        div.onclick=function(){


            if(!conceptoSeleccionado)
                return;



            if(div.classList.contains("bloqueado"))
                return;




            // RESPUESTA CORRECTA

            if(
            conceptoSeleccionado.dataset.id
            ==
            div.dataset.id
            ){



                conceptoSeleccionado.style.background="#b7efc5";

                div.style.background="#b7efc5";



                conceptoSeleccionado.classList.add("bloqueado");

                div.classList.add("bloqueado");



                puntaje.emparejar++;


                parejasRespondidas++;



            }


            // RESPUESTA INCORRECTA

            else{


                conceptoSeleccionado.style.background="#ffadad";

                div.style.background="#ffadad";



                setTimeout(()=>{


                    conceptoSeleccionado.style.background="";

                    div.style.background="";



                },800);



            }




            conceptoSeleccionado.classList.remove("seleccionado");


            conceptoSeleccionado=null;



        };



        definiciones.appendChild(div);



    });


}







// BOTON TERMINAR EMPAREJAMIENTO


document
.getElementById("finalizarEmparejar")
.addEventListener("click",()=>{


    actualizarPuntaje();


    mostrarPantalla("menu");


});








/* ==========================
   RULETA
========================== */


const preguntasRuleta=[

"¿Qué importancia tiene la cultura en el currículo?",

"¿Qué papel cumple la comunidad educativa?",

"¿Por qué el currículo debe adaptarse al contexto?",

"¿Qué busca la educación integral?",

"¿Qué relación existe entre currículo y planificación?",

"¿Qué importancia tiene la evaluación?",

"¿Cuál es el rol del estudiante?",

"¿Qué representa la interculturalidad?",

"¿Qué es una base curricular?",

"¿Por qué es importante el currículo?"

];



let preguntaRuleta;



document
.getElementById("girarRuleta")
.onclick=()=>{


let circulo=
document.getElementById("ruletaCirculo");


circulo.classList.add("girando");



setTimeout(()=>{


preguntaRuleta=
preguntasRuleta[
Math.floor(Math.random()*10)
];



document
.getElementById("preguntaRuleta")
.textContent=
preguntaRuleta;



circulo.classList.remove("girando");


},1500);



};




document
.getElementById("correctaRuleta")
.onclick=()=>{


puntaje.ruleta++;

actualizarPuntaje();


};



document
.getElementById("incorrectaRuleta")
.onclick=()=>{


actualizarPuntaje();


};


document
.getElementById("salirRuleta")
.onclick=()=>{


document
.getElementById("preguntaRuleta")
.textContent="";


document
.getElementById("ruletaCirculo")
.classList.remove("girando");


mostrarPantalla("menu");


};







/* ==========================
   VERDADERO / FALSO
========================== */



const preguntasVF=[


["El currículo considera el contexto social.",true],

["El currículo solo contiene contenidos.",false],

["La comunidad participa en educación.",true],

["El estudiante es sujeto activo.",true],

["El currículo no cambia nunca.",false],

["La cultura influye en la educación.",true],

["La planificación es parte del currículo.",true],

["La evaluación no es necesaria.",false],

["El currículo orienta la práctica docente.",true],

["La educación comunitaria busca integración.",true]


];



let vfActual=0;



function iniciarVF(){


vfActual=0;

mostrarVF();


}



function mostrarVF(){


document
.getElementById("preguntaVF")
.textContent=
preguntasVF[vfActual][0];


}




function responderVF(valor){


if(valor===preguntasVF[vfActual][1]){

puntaje.vf++;

}



vfActual++;



if(vfActual<10){

mostrarVF();

}

else{

actualizarPuntaje();

mostrarPantalla("menu");

}



}




document
.getElementById("btnVerdadero")
.onclick=()=>responderVF(true);



document
.getElementById("btnFalso")
.onclick=()=>responderVF(false);








/* ==========================
   PUNTAJE Y RESULTADOS
========================== */



function actualizarPuntaje(){


let total=

puntaje.quiz+
puntaje.emparejar+
puntaje.ruleta+
puntaje.vf;



document
.getElementById("puntajeActual")
.textContent=
total+" / 40";


}



document
.getElementById("reiniciarJuego")
.onclick=()=>{


puntaje={

quiz:0,

emparejar:0,

ruleta:0,

vf:0

};


actualizarPuntaje();

mostrarPantalla("inicio");


};





function mostrarResultados(){


document
.getElementById("resultadoQuiz")
.textContent=puntaje.quiz;


document
.getElementById("resultadoEmparejar")
.textContent=puntaje.emparejar;


document
.getElementById("resultadoRuleta")
.textContent=puntaje.ruleta;


document
.getElementById("resultadoVF")
.textContent=puntaje.vf;



let total=

puntaje.quiz+
puntaje.emparejar+
puntaje.ruleta+
puntaje.vf;



document
.getElementById("resultadoTotal")
.textContent=
total+" / 40";



mostrarPantalla("resultado");


}