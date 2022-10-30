const form = document.getElementById('formulario');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const campos = {
    firstname: false,
    lastname: false,
    tel: false,
    email: false
};

form.addEventListener('submit', handleSubmit);

async function handleSubmit(e){
    e.preventDefault();

    checkInputs();

    if(campos.firstname && campos.lastname && campos.tel && campos.email) {
        const formulario = new FormData(this);
        const response = await fetch(this.action, {
            method: this.method,
            body: formulario,
            headers:{
                'Accept': 'application/json'
            }
        });
        if (response.ok){
            form.reset();

            setInitFor(firstname);
            setInitFor(lastname);
            setInitFor(tel);
            setInitFor(email);

            alert('Formulario enviado correctamente');

            campos.firstname=false;
            campos.lastname=false;
            campos.tel=false;
            campos.email=false;
        }else {
            alert('Error en el envío del mensaje');
        }

        
    } 
};

function checkInputs() {
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const telValue = tel.value.trim();
    const emailValue = email.value.trim();

    if (firstnameValue === '') {
        setErrorFor(firstname);
        campos.firstname = false;
    } else if(!isFirstname(firstnameValue)) {
        setErrorFor(firstname);
        campos.firstname = false;
    } else {
        setSuccessFor(firstname);
        campos.firstname = true;
    }

    if (lastnameValue === '') {
        setErrorFor(lastname);
        campos.lastname = false;
    } else if(!isLastname(lastnameValue)) {
        setErrorFor(lastname);
        campos.lastname = false;
    } else {
        setSuccessFor(lastname);
        campos.lastname = true;
    }

    if (telValue === '') {
        setErrorFor(tel);
        campos.tel = false;
    } else if(!isTel(telValue)) {
        setErrorFor(tel);
        campos.tel = false;
    } else {
        setSuccessFor(tel);
        campos.tel = true;
    }

    if (emailValue === '') {
        setErrorFor(email);
        campos.email = false;
    } else if(!isEmail(emailValue)) {
        setErrorFor(email);
        campos.email = false;
    } else {
        setSuccessFor(email);
        campos.email = true;
    }
}

function setErrorFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control success';
}

function setInitFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control';
}

function isFirstname(firstname) {
    return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(firstname);
}

function isLastname(lastname) {
    return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(lastname);
}

function isTel(tel) {
    return /^\d{7,14}$/.test(tel);
}

function isEmail(email) {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
}

form.addEventListener('reset', () => {
    setInitFor(firstname);
    setInitFor(lastname);
    setInitFor(tel);
    setInitFor(email);
})