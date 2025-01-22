const examPatternRadios = document.querySelectorAll(".partExam");
const selectElement = document.querySelector("#examRange");
const examForm = document.querySelector('.examForm');
const emailInput = document.querySelector('#floatingInput');
const examTypeRadios = document.querySelectorAll('examType');
const examDate = document.querySelector('#examDate');
const examTime = document.querySelector('#examTime');

function updateSelectOptions(stepValue) {
    selectElement.innerHTML = '<option value="" disabled selected>اختر النطاق</option>';
    const step = parseInt(stepValue);
    let start = 1;

    if (step === 1) {
        while (start <= 30) {
            selectElement.innerHTML += `<option value="${start}">${start}</option>`;
            start++;
        }
    } else {
        while (start <= 30) {
            let end = Math.min(start + step - 1, 30);
            selectElement.innerHTML += `<option value="${start}-${end}">${start} - ${end}</option>`;
            start += step;
        }
    }
}
examPatternRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        updateSelectOptions(e.target.value);
    });
});


function validateForm() {
    if (!emailInput.value.trim()) {
        return { valid: false, message: "يرجى إدخال البريد الإلكتروني." };
    }
    if (![...examTypeRadios].some(radio => radio.checked)) {
        return { valid: false, message: "يرجى اختيار نوع الامتحان." };
    }
    if (![...examPatternRadios].some(radio => radio.checked)) {
        return { valid: false, message: "يرجى اختيار نمط الامتحان." };
    }
    if (!selectElement.value) {
        return { valid: false, message: "يرجى اختيار الجزء/الأجزاء." };
    }
    if (!examDate.value) {
        return { valid: false, message: "يرجى اختيار التاريخ." };
    }
    if (!examTime.value) {
        return { valid: false, message: "يرجى اختيار الوقت." };
    }
    return { valid: true };
}

examForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.valid) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: validation.message,
            confirmButtonText: 'حسنًا',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'تم تقديم الطلب بنجاح',
            text: 'شكراً لتقديم طلبك!',
            confirmButtonText: 'حسنًا',
        }).then(() => {
            examForm.reset();
        });
    }
});
