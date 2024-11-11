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
    const agreeBlock = document.querySelector('.agree-block');
    let hasOpenedModal = false;

    // 初始化：submit 按鈕設為可點擊
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
        input.addEventListener("input", function() {
            removeErrorMessage(input); // 移除錯誤訊息
        });
    });

    // 監聽單選框的變化
    radios.forEach(radio => {
        radio.addEventListener("change", function() {
            // 不進行即時檢查
        });
    });

    teamRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            // 不進行即時檢查
        });
    });

    function removeErrorMessage(input) {
        const errorMessage = input.nextElementSibling;
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = ''; 
        input.classList.remove('error');
        
        checkFormCompletion(); // 移除錯誤訊息後，重新檢查表單狀態
    }
    


    // 檢查所有必填項是否已填寫
    function checkFormCompletion() {
        let allFilled = true;
        let firstErrorField = null; // 儲存第一個錯誤欄位

        // 檢查文本框是否為空
        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            let errorText = '';

            input.style.borderColor = ''; 
            input.classList.remove('error'); 

            if (input.value.trim() === "") {
                allFilled = false;
                if (!firstErrorField) {
                    firstErrorField = input; // 記錄第一個錯誤欄位
                }
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

                showErrorMessage(input, errorText); // 顯示錯誤訊息
            }
        });

        // 檢查其他欄位 (如中文姓名、電話、電子郵件格式)
        checkSpecificFields();

        // 檢查 radio 是否選擇
        const styleSelected = Array.from(radios).some(radio => radio.checked);
        if (!styleSelected) {
            allFilled = false;
        }

        const teamSelected = Array.from(teamRadios).some(radio => radio.checked);
        if (!teamSelected) {
            allFilled = false;
        }

        // 檢查 checkbox 是否勾選
        const errorMessageCheckbox = document.getElementById('checkboxErrorMessage');
        if (!agreeCheckbox.checked) {
            allFilled = false;

            if (!errorMessageCheckbox) {
                const errorSpan = document.createElement('span');
                errorSpan.id = 'checkboxErrorMessage';
                errorSpan.style.color = 'red';
                errorSpan.style.fontSize = '16px';
                errorSpan.style.textAlign = 'center';
                errorSpan.style.display = 'block';
                errorSpan.style.marginBottom = '4px';
                errorSpan.textContent = '請先閱讀並同意聲明事項';
                agreeBlock.parentElement.insertBefore(errorSpan, agreeBlock);
            }
        } else {
            if (errorMessageCheckbox) {
                errorMessageCheckbox.remove();
            }
        }

        submitBtn.disabled = !allFilled;

        if (!allFilled && firstErrorField) {
            // 如果有錯誤，將畫面捲動到第一個錯誤欄位
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return allFilled;
    }

    // 顯示錯誤訊息
    function showErrorMessage(input, message) {
        const errorMessage = input.nextElementSibling;
        if (!errorMessage) {
            const errorSpan = document.createElement('span');
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '16px';
            errorSpan.style.marginTop = '4px';
            errorSpan.textContent = message;
            input.parentElement.appendChild(errorSpan);
        }
        input.style.borderColor = 'red';
    }

    // 移除錯誤訊息
    function removeErrorMessage(input) {
        const errorMessage = input.nextElementSibling;
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = ''; 
        input.classList.remove('error');
    }

    // 檢查特殊欄位（如姓名、電話、電子郵件等）
    function checkSpecificFields() {
        // 檢查 name 欄位是否為中文
        const name = document.getElementById('name').value.trim();
        const namePattern = /^[\u4e00-\u9fa5]{2,20}$/; // 中文名 (2到20個字)
        if (name && !namePattern.test(name)) {
            allFilled = false;
            showErrorMessage(document.getElementById('name'), '請輸入有效的中文姓名');
        }

        // 檢查 phone 欄位是否以 09 開頭且為 10 位數字
        const phone = document.getElementById('phone').value.trim();
        const phonePattern = /^09\d{8}$/; // 09 開頭 10 位數字
        if (phone && !phonePattern.test(phone)) {
            allFilled = false;
            showErrorMessage(document.getElementById('phone'), '請輸入有效的手機號碼');
        }

        // 檢查 email 欄位是否符合正確格式
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email && !emailPattern.test(email)) {
            allFilled = false;
            showErrorMessage(document.getElementById('email'), '請輸入有效的電子郵件地址');
        }
    }

    // 註冊提交按鈕的事件處理
    submitBtn.addEventListener('click', function(event) {
        if (checkFormCompletion()) {
            event.preventDefault();
            const selectedTeam = document.querySelector('input[name="teamToggle"]:checked');
            const selectedStyle = document.querySelector('input[name="styleToggle"]:checked');
            
            const selectedTeamText = selectedTeam ? selectedTeam.value : '';
            const selectedStyleText = selectedStyle ? selectedStyle.nextElementSibling.textContent : '';  

            // 儲存表單資料
            localStorage.setItem('formData', JSON.stringify({
                name: document.getElementById('name').value,
                school: document.getElementById('school').value,
                department: document.getElementById('deparment').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                selectedTeam: selectedTeamText, // 儲存選中的 team 文字
                selectedStyle: selectedStyleText // 儲存選中的 style 文字
            }));
            window.location.href = "result.html";
        }
    });
});


