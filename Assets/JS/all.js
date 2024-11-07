
// -------------------------------toggletoken------------------------------

// 學歷
const radios1 = document.querySelectorAll('input[name="styleToggle"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        alert(`選擇了 ${radio.nextElementSibling.innerText}`);
    });
});

// 志向
const radios2 = document.querySelectorAll('input[name="teamToggle"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        alert(`選擇了 ${radio.nextElementSibling.innerText}`);
    });
});


// -------------------------------textarea------------------------------
const textarea = document.getElementById('textarea');

textarea.addEventListener('input', () => {
    if (textarea.value.length > 500) {
        textarea.value = textarea.value.slice(0, 500);
    }
});

document.getElementById('submitBtn').addEventListener('click', function() {
    window.location.href = './result.html'; // 跳轉到結果頁面
});

