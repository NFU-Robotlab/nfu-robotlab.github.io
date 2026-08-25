// 動態進度條計算與 LocalStorage 存取
        const listCheckboxes = [
            'cb-onshape',
            'cb-equipment-laser',
            'cb-equipment-3d',
            'cb-robotis',
            'cb-csharp'
        ];

        function updateProgress() {
            let checkedCount = 0;
            listCheckboxes.forEach(id => {
                const cb = document.getElementById(id);
                if (cb && cb.checked) {
                    checkedCount++;
                }
                // 保存狀態
                if (cb) {
                    localStorage.setItem(`training_${id}`, cb.checked);
                }
            });

            const pct = Math.round((checkedCount / listCheckboxes.length) * 100);
            document.getElementById('progress-text').innerText = `${pct}%`;
            document.getElementById('progress-bar').style.width = `${pct}%`;
        }

        // 頁面載入時回復狀態
        document.addEventListener('DOMContentLoaded', () => {
            listCheckboxes.forEach(id => {
                const cb = document.getElementById(id);
                if (cb) {
                    const saved = localStorage.getItem(`training_${id}`);
                    if (saved === 'true') {
                        cb.checked = true;
                    }
                }
            });
            updateProgress();
        });
