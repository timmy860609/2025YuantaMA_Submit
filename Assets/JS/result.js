document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        // 顯示表單資料
        document.getElementById('nameResult').textContent = formData.name || '';
        document.getElementById('schoolResult').textContent = formData.school || '';
        document.getElementById('deparmentResult').textContent = formData.department || '';
        document.getElementById('phoneResult').textContent = formData.phone || '';
        document.getElementById('emailResult').textContent = formData.email || '';
        document.getElementById('styleResult').textContent = formData.selectedStyle || '';
        document.getElementById('teamResult').textContent = formData.selectedTeam || '';
        
        // 顯示 textarea 資料
        const textareaResult = document.getElementById('textareaResult');
        const textareaResultText = document.getElementById('textareaResultText');

        if (formData.message) {
            textareaResultText.textContent = formData.message;  // 顯示儲存的 message
            textareaResult.style.visibility = 'visible';  // 顯示 textareaResult 容器
        } else {
            textareaResult.style.visibility = 'hidden';  // 如果沒有資料則隱藏容器
        }
    }
});
