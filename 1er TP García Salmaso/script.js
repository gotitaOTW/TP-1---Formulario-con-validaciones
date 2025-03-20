const minCaracteresNombre=3;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexContrasena = /^(?=.*[A-Za-z])(?=.*\d).+$/;


document.getElementById("signInForm").addEventListener("input", validarIngresos);
document.getElementById("signInForm").addEventListener("submit",validarEnvio);

function validarEnvio(event){
    let error = document.getElementById("errorSubmit");
    let bien = document.getElementById("bienSubmit");
    error.textContent="";
    bien.textContent="";
    if(!(allTrue(ingresosValidos))){
     event.preventDefault();
     error.textContent="Todos los ingresos deben ser válidos";
    }
    else{
        alert("Cuenta creada con éxito");
    }
}

function validarIngresos(event)
{
    validarInput(event.target.id);
}

function validarInput(id){
    let input = document.getElementById(id);
    let value=input.value;
    let campo=input.closest(".campo");
    let error=campo.querySelector(".error");
    let bien=campo.querySelector(".bien");
    let extra=null;
    let msjError="";

    if(id==="confirmarContrasena"){
        extra=document.getElementById("contrasena").value;
    }
    console.log("esta validando. "+id);

    
    msjError=validadores[id](value,extra);
    error.textContent="";
    bien.textContent="";
    if(msjError!=""){
        ingresosValidos[id]=false;
        error.textContent=msjError;
    }
    else{
        ingresosValidos[id]=true;
        bien.textContent="Ingresado correctamente";
    }
    console.log(ingresosValidos[id]);
}

const validadores={
    nombre: function(value){
        if(value.length>=minCaracteresNombre){//ta bien
            retorno="";
        }
        else{
            retorno=`Mínimo ${minCaracteresNombre} caracteres`;
        }
        return retorno;
    },
    email: function(value){
        if(regexEmail.test(value)){//ta bien
            retorno="";
        }
        else{
            retorno="Email inválido"
        }
        return retorno;
    },
    contrasena:function(value){
        if(value.length>=8&&regexContrasena.test(value)){//ta bien
            retorno="";
        }
        else{
            retorno="Debe incluir al menos una letra y un número, mínimo 8 caracteres"
        }
        return retorno;
    },
    confirmarContrasena:function(value, original){
        if(value===original)
        {//ta bien
            retorno="";
        }
        else{
            retorno="Las contraseñas son distintas";
        }
        return retorno;
    }
    };

    const ingresosValidos={
        nombre:false,
        email:false,
        contrasena:false,
        confirmarContrasena:false
    }

    function allTrue(obj) {
        return Object.values(obj).every(function(value) {
          return value === true;
        });}