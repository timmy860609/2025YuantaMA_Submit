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

    // 初始化：禁用提交按钮
    submitBtn.disabled = true;

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
            if (input.value.trim() === "") {
                allFilled = false;
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
        if (!agreeCheckbox.checked) {
            allFilled = false;
        }

        // 根據所有必填項的狀態，啟用或禁用提交按鈕
        submitBtn.disabled = !allFilled;
    }
});