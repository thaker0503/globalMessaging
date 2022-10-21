let form = document.getElementById('loginForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('staticEmail');
    const password = document.getElementById('staticPassword');
    form = {
        email: email.value,
        password: password.value
    }
    if (email.value.split('@')[1] === 'technostacks.com') {
        if (validateEmail(form.email) && validatePassword(form.password)) {
            email.classList.remove('error');
            password.classList.remove('error')
            console.log(form)
            sendUserDetails(form)
            email.value = "";
            password.value = "";
            email.focus();
        } else {
            if (!validateEmail(form.email)) {
                email.classList.add('error');
                alert('Not an valid email')
            }
            else {
                email.classList.remove('error');
            }
            if (!validatePassword(form.password)) {
                password.classList.add('error')
                alert("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
            } else {
                password.classList.remove('error');
            }
        }
    } else {
        alert('Only for Technostacks employees...')
        email.value = "";
        password.value = "";
        email.focus();
    }

    

})


function sendUserDetails(user) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    }).then(d => d.json()).then(r => {
        console.log(r.msg);
    
    })
}


function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(re)
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.match(re)
}
