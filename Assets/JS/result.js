document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    console.log(formData);
    if (formData) {
        // 顯示表單資料
        document.getElementById('nameResult').textContent = formData.name || '';
        document.getElementById('schoolResult').textContent = formData.school || '';
        document.getElementById('deparmentResult').textContent = formData.department || '';
        document.getElementById('phoneResult').textContent = formData.phone || '';
        document.getElementById('emailResult').textContent = formData.email || '';
        document.getElementById('styleResult').textContent = formData.selectedStyle || '';
        document.getElementById('teamResult').textContent = formData.selectedTeam || '';
        document.getElementById('textareaResult').style.visibility = 'visible';
        document.querySelector('#textareaResult h5').textContent = formData.textarea;
        }
        const textareaContent = formData.textarea || '';  // 取得textarea的內容
        if (textareaContent.trim() !== "") {
            // 如果textarea有內容，顯示並填入內容
            document.getElementById('textareaResult').style.visibility = 'visible';
            document.querySelector('#textareaResult h5').textContent = textareaContent;
        } else {
            // 如果textarea沒有內容，隱藏
            document.getElementById('textareaResult').style.visibility = 'hidden';
        }
});
