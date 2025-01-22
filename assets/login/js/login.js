function login() {
    try {
        const loginForm = document.querySelector('.loginForm');
        const passwordInput = document.querySelector('#floatingPassword');
        const emailInput = document.querySelector('#floatingInput');

        const usersData = UserData();
        loginForm.onsubmit = function (e) {
            e.preventDefault();

            const validationResult = validateForm(emailInput, passwordInput);
            if (!validationResult.valid) {
                showAlert(validationResult.message);
                return;
            }

            const user = validateUser(emailInput.value, passwordInput.value, usersData);
            if (user) {
                redirectToPage(user);
            } else {
                showErrorMessage();
            }
        };
    } catch (error) {
        handleError(error);
    }
}
function UserData() {
    const user = [
        {
            email: "admin@gmail.com",
            role: "admin",
            password: "admin"
        },
        {
            email: "student@gmail.com",
            role: "student",
            password: "student"
        },
        {
            email: "supervisor@gmail.com",
            role: "supervisor",
            password: "supervisor"
        },
        {
            email: "collegeAdmin@gmail.com",
            role: "collegeAdmin",
            password: "collegeAdmin"
        },
        {
            email: "doctor@gmail.com",
            role: "doctor",
            password: "doctor"
        }
    ];
    return user;
}
function validateForm(emailInput, passwordInput) {
    if (!emailInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال البريد الإلكتروني." };
    }
    if (!passwordInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال كلمة المرور." };
    }
    return { valid: true };
}

function validateUser(email, password, usersData) {
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i].email === email && usersData[i].password === password) {
            return usersData[i];
        }
    }
    return null;
}

function redirectToPage(user) {
    const basePath = "/multaqaQuran";

    switch (user.role) {
        case "student":
            window.location.href = `${basePath}/student/student.html`;
            break;
    }
}


function showAlert(message) {
    Swal.fire({
        icon: 'warning',
        title: 'تنبيه',
        text: message,
        confirmButtonText: 'حسنًا',
        confirmButtonColor: '#3085d6',
        timer: 5000
    });
}

function showErrorMessage() {
    Swal.fire({
        icon: 'error',
        title: 'خطأ في تسجيل الدخول',
        text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        confirmButtonText: 'حاول مرة أخرى',
        confirmButtonColor: '#3085d6',
        timer: 5000
    });
}

function handleError(error) {
    console.error(error);
    Swal.fire({
        icon: 'error',
        title: 'خطأ في التسجيل',
        text: 'حدث خطأ ما. الرجاء المحاولة مرة أخرى.',
        confirmButtonText: 'حاول مرة أخرى',
        confirmButtonColor: '#3085d6',
    });
}

login();
