const urlApi = 'http://localhost:8080/api/User';

let userName;
let email;
let password;
let password2;
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
        registerUser();// register new user
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
// ---------------------------------------------------------------------

// ------------------------------  Upload the form data ----------------
function upload() {
    userName = $('#name').val();
    email = $('#email').val();
    password = $('#password').val();
    password2 = $('#password2').val();
}
// ---------------------------------------------------------------------

// ------------------------------  validate form data -----------------
function dataValidation() {

    upload(); // upload the form data

    // validate empty data
    if (userName == '') {
        msg = 'Name field is required ';
        return false;
    }
    if (email == '') {
        msg = 'Email field is required';
        return false;
    }
    if (password == '') {
        msg = 'Password field is required';
        return false;
    }
    if (password2 == '') {
        msg = 'Confirm password field is required';
        return false;
    }

    // Expressions
    let nameV = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // 
    let emailV = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let passwordV = /^.{4,25}$/;
    // validate expressions 
    if (!nameV.test(userName)) {
        msg = 'Confirm password field is required';
        return false;
    }
    if (!emailV.test(email)) {
        msg = 'Invalid email';
        return false;
    }
    if (!passwordV.test(password)) {
        msg = 'Password between 4 and 25 digits';
        return false;
    }
    // Validate password
    if (password != password2) {
        msg = 'Passwords do not match';
        return false;
    }

    return true;
}

// register new user
function registerUser() {
    var dataForm = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    var dataJson = JSON.stringify(dataForm);

    $.ajax({
        url: urlApi + '/new',
        type: 'POST',
        data: dataJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {           
            window.location.href = "../../register/user.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            msg = 'Email is invalid or already taken';
            showAlert();    
        }
    });

}
