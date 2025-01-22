async function changePassword() {
    try {
        const changePasswordForm = document.querySelector('.changePasswordForm');
        const oldPassword = document.querySelector('#oldPassword');
        const newPassword = document.querySelector('#newPassword');
        const confirmPassword = document.querySelector('#confirmPassword');

        changePasswordForm.onsubmit = async function (e) {
            e.preventDefault();

            const validationResult = validateForm(oldPassword , newPassword ,confirmPassword);
            if (!validationResult.valid) {
                showAlert(validationResult.message);
                return;
            }
            handleSubmit(newPassword);
        };
    } catch (error) {
        handleError(error);
    }
}

function validateForm(oldPassword , newPassword ,confirmPassword) {
    if (!oldPassword.value.trim()) {
        return { valid: false, message: "يرجى إدخال كلمة المرور الحالية." };
    }
    if (!newPassword.value.trim()) {
        return { valid: false, message: "يرجى إدخال كلمة المرور الجديدة." };
    }
    if (!confirmPassword.value.trim()) {
        return { valid: false, message: "يرجى إدخال كلمة المرور الجديدة مرة ثانية." };
    }
    if (newPassword.value !== confirmPassword.value) {
        return { valid: false, message: "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين." };
    }
    return { valid: true };
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

function handleSubmit(passwordInput) {
    if (passwordInput.value.length <= 9) {
        Swal.fire({
            icon: "warning",
            title: "تحذير",
            text: "كلمة المرور يجب أن تكون على الأقل 10 حروف.",
        });
        return;
    }
    Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح!",
        text: "تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.",
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

changePassword();
