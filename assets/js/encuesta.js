var form = document.getElementById('form');
var cancel = document.getElementById("cancelButtom");
var closeButtom = document.getElementById("closeButtom");
var cancelConfirm = document.getElementById("cancelConfirm");
var reset = document.getElementById("resetButtom");
var send = document.getElementById("send");


reset.addEventListener("click", e => {
  e.preventDefault();
  form.reset();
});

cancel.addEventListener("click", e => {
  e.preventDefault();
  document.location.href = "#popup";
})

cancelConfirm.addEventListener("click", e => {
  e.preventDefault();
  window.location.href = "../../index.html";
})

closeButtom.addEventListener("click", e => {
  e.preventDefault();
  document.location.href = "#";
})

const emptyField = (field) => field.trim().length === 0;

send.addEventListener("click", e => {
  e.preventDefault();
  sexoID = document.getElementById("sexo"); 
  valoracionID = document.getElementById("gvaloracion");
  fields = {
    "nombre": document.getElementById('nombre').value,
    "apellido": document.getElementById('apellido').value,
    "fnacimiento": document.getElementById('fnacimiento').value,
    "sexo": sexoID.value == "none" ? "" : sexoID.options[sexoID.selectedIndex].text,
    "gvaloracion": valoracionID.value == "none" ? "" : valoracionID.options[valoracionID.selectedIndex].text,
    "email": document.getElementById('email').value,
    "comentario": document.getElementById('comentario').value,
  };

  try {
    Object.keys(fields).forEach(function (key) {
      if (emptyField(fields[key])) {
        throw "break";
      }
    });
    alert(" Nombre : " + fields.nombre +
      "\n Apellido : " + fields.apellido +
      "\n F. Nacimiento : " + fields.fnacimiento +
      "\n Sexo : " + fields.sexo +
      "\n Valoración : " + fields.gvaloracion +
      "\n Email : " + fields.email +
      "\n Comentario : " + fields.comentario);

  } catch (e) {
    alert("Debe completar todos los campos");
  }
});

const nombre = document.querySelector("[name=nombre]");
const apellido = document.querySelector("[name=apellido]");
const fnacimiento = document.querySelector("[name=fnacimiento]");
const sexo = document.querySelector("[name=sexo]");
const gvaloracion = document.querySelector("[name=gvaloracion]");
const email = document.querySelector("[name=email]");

const activeError = (field) => {
  return field.nextElementSibling.innerText == "";
}

const removeInvalid = (field) => {
  if (field.nextElementSibling instanceof HTMLSpanElement) {
    return;
  }
  field.classList.remove("invalid");
}
const setErrors = (message, field, isError, id) => {
  if (!isError) {
    document.getElementById(id)?.remove();
  } else if (document.getElementById(id) == null) {
    field.classList.add("invalid");
    var span = document.createElement("span");
    span.id = id;
    span.classList.add("error");
    span.innerText = message;
    field.after(span)
  } else {
    document.getElementById(id).innerText = message;
  }
  removeInvalid(field);
}

const EmptyError = (show, field, fieldName) => {
  show ? setErrors(fieldName + " es requerido.", field, true, "emptyError" + fieldName) : setErrors("", field, false, "emptyError" + fieldName);
}

const formatError = (show, field, fieldName) => {
  show ? setErrors("Formato invalido", field, true, "formatError" + fieldName) : setErrors("", field, false, "formatError" + fieldName);
}

const validateEmptyField = (fieldName, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  if (emptyField(fieldValue)) {
    EmptyError(true, field, fieldName)
  } else {
    EmptyError(false, field, fieldName);
  }
  return emptyField;
}

const validateEmailFormat = (fieldName, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
    formatError(true, field, fieldName);
  } else {
    formatError(false, field, fieldName);
  }
}

const validateStringFormat = (fieldName, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^[a-zA-Z]+$/);
  if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
    formatError(true, field, fieldName);
  } else {
    formatError(false, field, fieldName);
  }
}


nombre.addEventListener("blur", (e) => validateEmptyField("Nombre", e));
apellido.addEventListener("blur", (e) => validateEmptyField("Apellido", e));
fnacimiento.addEventListener("blur", (e) => validateEmptyField("Fechadenacimiento", e));
sexo.addEventListener("blur", (e) => validateEmptyField("Sexo", e));
email.addEventListener("blur", (e) => validateEmptyField("Email", e));
nombre.addEventListener("input", (e) => validateStringFormat("Nombre", e));
apellido.addEventListener("input", (e) => validateStringFormat("Apellido", e));
email.addEventListener("input", (e) => validateEmailFormat("Email", e));

