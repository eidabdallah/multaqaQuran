function register() {
    try {
        const NameInput = document.querySelector("#floatingName");
        const passwordInput = document.querySelector("#floatingPassword");
        const emailInput = document.querySelector("#floatingInput");
        const PhoneInput = document.querySelector("#floatingPhone");
        const floatingGender = document.querySelector("#floatingGender");
        const floatingCollege = document.querySelector("#floatingCollege");
        const floatingSpecialization = document.querySelector("#floatingSpecialization");
        const floatingPlan = document.querySelector("#floatingPlan");
        const submitButton = document.querySelector(".RegisterForm .btn");



        submitButton.onclick = function (e) {
            e.preventDefault();
            const validationResult = validateForm(NameInput, emailInput, passwordInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan);
            if (!validationResult.valid) {
                showAlert(validationResult.message);
                return;
            }
            handleSubmit(passwordInput);
        };
    } catch (error) {
        handleError(error);
    }
}

function validateForm(NameInput, emailInput, passwordInput, PhoneInput, floatingGender, floatingCollege, floatingSpecialization, floatingPlan) {
    if (!NameInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال الاسم الكامل." };
    }
    if (!emailInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال البريد الإلكتروني." };
    }
    if (!passwordInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال كلمة المرور." };
    }
    if (!PhoneInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال رقم الهاتف." };
    }
    if (!floatingGender.value.trim()) {
        return { valid: false, message: "يرجى اختيار الجنس." };
    }
    if (!floatingCollege.value.trim()) {
        return { valid: false, message: "يرجى اختيار الكلية." };
    }
    if (!floatingSpecialization.value.trim()) {
        return { valid: false, message: "يرجى اختيار التخصص." };
    }
    if (!floatingPlan.value.trim()) {
        return { valid: false, message: "يرجى اختيار الخطة الدراسية." };
    }
    return { valid: true };
}

function showAlert(message) {
    Swal.fire({
        icon: "warning",
        title: "تنبيه",
        text: message,
        confirmButtonText: "حسنًا",
        confirmButtonColor: "#3085d6",
        timer: 5000,
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
        icon: "error",
        title: "خطأ في التسجيل",
        text: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
        confirmButtonText: "حاول مرة أخرى",
        confirmButtonColor: "#3085d6",
    });
}

register();
