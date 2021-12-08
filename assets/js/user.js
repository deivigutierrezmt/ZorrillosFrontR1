const urlApi = 'http://localhost:8080/api/User';

let email;
let password;
let msg = '';

$("#userForm").on("click", function (event) {
    event.preventDefault();
});

// Validate form
function validate() {
    if (!dataValidation()) {
        showAlert();//Show Alert
    } else {
        hideAlert(); //Hide Alert      
        loginUser();// login user
    }
}

// ------------------------------ Show and Hide Alert ------------------ 
function showAlert() {
    $('#msgAlert').removeClass("msgAlert-hide");
    $('#msgAlert').addClass("msgAlert-show");

    $('#msg').html('<strong>' + msg + '</strong>');
}

function hideAlert() {
    $('#msgAlert').removeClass("msgAlert-show");
    $('#msgAlert').addClass("msgAlert-hide");
}

// ------------------------------  validate form data -----------------
function dataValidation() {
    email = $('#email').val();
    password = $('#password').val();

    // validate empty data
    if (email == '') {
        msg = 'Email field is required';
        return false;
    }
    if (password == '') {
        msg = 'Password field is required';
        return false;
    }

    // validate expressions 
    let emailV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailV.test(email)) {
        msg = 'Invalid email';
        return false;
    }
    return true;
}

// login new user
function loginUser() {

    $.ajax({
        url: urlApi + '/' + email + '/' + password,
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            validateUser(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error login');
        }
    });
}

function validateUser(response) {
    const idUser = response.id;

    if (idUser != null) {
        window.location.href = "../../register/user.html";
    } else {
        msg = 'Incorrect username or password.';
        showAlert();
    }
}
// ------------------------------------------------------------------------------------------

function loadDataTable() {
    $.ajax({
        url: urlApi + '/all',
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var valor = '';
            for (i = 0; i < response.length; i++) {
                valor += '<tr>' +
                    '<td>' + response[i].id + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].email + '</td>' +
                    '<td>' + response[i].password + '</td>' +
                    '<td><button onclick="delete(' + response[i].id + ')" class="btn btn-danger">Delete</button>' +
                    '&nbsp;&nbsp;<button onclick="details(' + response[i].id + ')" class="btn btn-warning">Details</button></td>' +
                    '</tr>';
            }
            $('#tbodyUser').html(valor);
        }
    });
}