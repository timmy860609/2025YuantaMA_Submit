document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModalBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const modalContent = document.querySelector('.modal-body');
    const submitBtn = document.querySelector(".next");
    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");
    const radios = document.querySelectorAll("input[type='radio'][name='styleToggle']");
    const teamRadios = document.querySelectorAll("input[type='radio'][name='teamToggle']");
    let hasOpenedModal = false;

    // 初始化：submit按鈕保持為可點擊狀態
    submitBtn.disabled = false;

    // 開啟彈窗
    function openModal() {
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        hasOpenedModal = true;
    }

    // 關閉彈窗
    function closeModal() {
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // 點擊確認按鈕後，勾選 checkbox 並關閉彈窗
    confirmBtn.addEventListener('click', () => {
        agreeCheckbox.checked = true;
        closeModal();
        checkFormCompletion(); // 更新提交按钮状态
    });

    // 監聽滾動事件，啟用確認按鈕
    modalContent.addEventListener('scroll', checkScrollPosition);

    function checkScrollPosition() {
        const scrollTop = modalContent.scrollTop;
        const scrollHeight = modalContent.scrollHeight;
        const clientHeight = modalContent.clientHeight;

        if (scrollHeight - scrollTop - clientHeight < 10) {
            confirmBtn.disabled = false;
        }
    }

    // 監聽 openModalBtn 點擊，開啟彈窗
    openModalBtn.addEventListener('click', openModal);

    // 點擊 closeModalBtn 僅關閉彈窗，不影響 checkbox
    closeBtn.addEventListener('click', function(event) {
        closeModal();
    });

    // 確保 modalOverlay 點擊不會關閉彈窗或改變 checkbox 狀態
    modalOverlay.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // 如果使用者第一次勾選 checkbox 時尚未開啟過彈窗，則強制開啟彈窗
    agreeCheckbox.addEventListener('change', function() {
        if (!hasOpenedModal && agreeCheckbox.checked) {
            agreeCheckbox.checked = false;  // 取消勾選
            openModal();  // 強制開啟彈窗
        }
        checkFormCompletion();  // 檢查表單完成情況
    });

    // 監聽所有必填文本框的變化
    inputs.forEach(input => {
        input.addEventListener("input", checkFormCompletion);
    });

    // 監聽單選框的變化
    radios.forEach(radio => {
        radio.addEventListener("change", checkFormCompletion);
    });
    teamRadios.forEach(radio => {
        radio.addEventListener("change", checkFormCompletion);
    });

    // 檢查所有必填項是否已填寫
    function checkFormCompletion() {
        let allFilled = true;

        // 檢查文本框是否為空
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling; // 找到錯誤訊息元素
            let errorText = '';

            // 清除之前的錯誤樣式
            input.style.borderColor = ''; // 清除邊框顏色
            input.classList.remove('error'); // 移除錯誤類

            if (input.value.trim() === "") {
                allFilled = false;
                // 根據欄位名稱或ID顯示不同的錯誤訊息
                switch (input.id) {
                    case 'name':
                        errorText = '請輸入完整的姓名';
                        break;
                    case 'school':
                        errorText = '請輸入學校名稱';
                        break;  
                    case 'deparment':
                        errorText = '請輸入系所名稱';
                        break;   
                    case 'phone':
                        errorText = '請輸入有效的電話號碼';
                        break;   
                    case 'email':
                        errorText = '請輸入有效的電子郵件地址';
                        break;
                    default:
                        errorText = '請輸入完整資訊';
                }

                // 顯示錯誤訊息
                if (!errorMessage) {
                    const errorSpan = document.createElement('span');
                    errorSpan.style.color = 'red';
                    errorSpan.style.fontSize = '16px';
                    errorSpan.style.marginTop = '4px';
                    errorSpan.textContent = errorText;
                    input.parentElement.appendChild(errorSpan); // 在欄位下方顯示錯誤訊息
                }

                // 為欄位邊框加上紅色邊框
                input.style.borderColor = 'red';
                input.classList.add('error'); // 添加錯誤類別以便做進一步樣式調整
            } else {
                // 移除錯誤訊息
                if (errorMessage) {
                    errorMessage.remove();
                }
                input.style.borderColor = ''; // 清除紅色邊框
            }
        });

        // 檢查學歷單選框是否至少選擇一項
        const styleSelected = Array.from(radios).some(radio => radio.checked);
        if (!styleSelected) {
            allFilled = false;
        }

        // 檢查組別單選框是否至少選擇一項
        const teamSelected = Array.from(teamRadios).some(radio => radio.checked);
        if (!teamSelected) {
            allFilled = false;
        }

        // 檢查 checkbox 是否已勾選
        const errorMessageCheckbox = document.getElementById('checkboxErrorMessage');
        if (!agreeCheckbox.checked) {
            allFilled = false;

            // 顯示錯誤訊息在 checkbox 上方
            if (!errorMessageCheckbox) {
                const errorSpan = document.createElement('span');
                errorSpan.id = 'checkboxErrorMessage';
                errorSpan.style.color = 'red';
                errorSpan.style.fontSize = '16px';
                errorSpan.style.marginBottom = '4px'; // 使文字與 checkbox 有間距
                errorSpan.textContent = '請先閱讀並同意事項聲明';
                agreeCheckbox.parentElement.insertBefore(errorSpan, agreeCheckbox); // 顯示在 checkbox 上方
            }
        } else {
            // 移除錯誤訊息
            if (errorMessageCheckbox) {
                errorMessageCheckbox.remove();
            }
        }

        // 根據所有必填項的狀態，啟用或禁用提交按鈕
        submitBtn.disabled = !allFilled;
        return allFilled;
    }

    // 監聽提交按鈕，當按鈕可點擊時，跳轉到 result.html
    submitBtn.addEventListener('click', function(event) {
        // 檢查表單是否完成
        const allFilled = checkFormCompletion();

        if (allFilled) {
            window.location.href = "result.html"; // 跳轉到結果頁
        } else {
            // 如果有欄位未填寫，顯示錯誤提示並停止跳轉
            event.preventDefault();  // 防止跳轉
            inputs.forEach(input => {
                // 如果某個欄位未填寫，顯示紅色錯誤訊息
                if (input.value.trim() === "") {
                    let errorMessage = input.nextElementSibling;
                    if (!errorMessage) {
                        errorMessage = document.createElement('span');
                        errorMessage.style.color = 'red';
                        errorMessage.style.fontSize = '16px';
                        errorMessage.style.marginTop = '4px';
                        errorMessage.textContent = '請輸入完整資訊';
                        input.parentElement.appendChild(errorMessage);
                    }

                    // 為欄位邊框加上紅色邊框
                    input.style.borderColor = 'red';
                }
            });
        }
    });
});
