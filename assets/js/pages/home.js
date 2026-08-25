// 彈窗控制邏輯
        function openRolesModal() {
            const modal = document.getElementById('roles-modal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        }

        function closeRolesModal() {
            const modal = document.getElementById('roles-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        }

        // 實驗室介紹彈窗控制邏輯
        function openAboutModal() {
            const modal = document.getElementById('about-modal');
            if (modal) {
                modal.classList.remove('hidden');
            }
        }

        function closeAboutModal() {
            const modal = document.getElementById('about-modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        }
