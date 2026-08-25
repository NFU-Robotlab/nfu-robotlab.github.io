// 馬達模擬器狀態變數
        let simMode = 'joint'; // 'joint' or 'wheel'
        let wheelDirection = 'CW'; // 'CW' or 'CCW'
        let wheelSpeed = 0;

        // 頁面初始化
        document.addEventListener('DOMContentLoaded', () => {
            updateJointSimulator(512); // 預設 512
        });

        // 1. 模式切換邏輯
        function toggleSimMode(mode) {
            simMode = mode;
            const btnJoint = document.getElementById('sim-btn-joint');
            const btnWheel = document.getElementById('sim-btn-wheel');
            const panelJoint = document.getElementById('panel-joint');
            const panelWheel = document.getElementById('panel-wheel');
            const motorHorn = document.getElementById('motor-horn');

            if (mode === 'joint') {
                btnJoint.className = "px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg text-xs transition-all shadow-md";
                btnWheel.className = "px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs transition-all";
                panelJoint.classList.remove('hidden');
                panelWheel.classList.add('hidden');

                // 停止連續旋轉
                motorHorn.style.animation = 'none';
                updateJointSimulator(document.getElementById('joint-slider').value);
            } else {
                btnJoint.className = "px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs transition-all";
                btnWheel.className = "px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg text-xs transition-all shadow-md";
                panelJoint.classList.add('hidden');
                panelWheel.classList.remove('hidden');

                updateWheelSimulator(document.getElementById('wheel-slider').value);
            }
        }

        // 2. 關節模式拉桿控制
        function updateJointSimulator(val) {
            document.getElementById('joint-val-display').innerText = val;

            // 0 - 1023 對應 0° - 300°
            const angle = (val * 300 / 1023).toFixed(1);
            document.getElementById('joint-deg-display').innerText = `${angle}°`;

            // SVG 轉向 (CSS 旋轉屬性)
            const motorHorn = document.getElementById('motor-horn');
            // 我們將 0 點對應旋轉 -150deg 到 150deg 範圍，視覺會比較對稱，中心點剛好朝上
            const rotDegrees = (val * 300 / 1023) - 150;
            motorHorn.style.transform = `rotate(${rotDegrees}deg)`;
        }

        // 3. 輪子模式方向與速度拉桿控制
        function changeWheelDir(dir) {
            wheelDirection = dir;
            const btnCw = document.getElementById('dir-cw');
            const btnCcw = document.getElementById('dir-ccw');

            if (dir === 'CW') {
                btnCw.className = "flex-1 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold transition-colors";
                btnCcw.className = "flex-1 py-1.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold transition-colors";
            } else {
                btnCw.className = "flex-1 py-1.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold transition-colors";
                btnCcw.className = "flex-1 py-1.5 bg-emerald-600 text-white rounded text-[10px] font-bold transition-colors";
            }
            updateWheelSimulator(document.getElementById('wheel-slider').value);
        }

        function updateWheelSimulator(val) {
            wheelSpeed = parseInt(val);
            document.getElementById('wheel-val-display').innerText = val;

            const speedPct = Math.round((wheelSpeed / 1023) * 100);
            document.getElementById('wheel-speed-pct').innerText = `${speedPct}%`;

            const motorHorn = document.getElementById('motor-horn');

            if (wheelSpeed === 0) {
                document.getElementById('wheel-dir-display').innerText = "停止 (Stop)";
                motorHorn.style.animation = 'none';
            } else {
                const dirText = wheelDirection === 'CW' ? '順時針 (Clockwise)' : '逆時針 (Counterclockwise)';
                document.getElementById('wheel-dir-display').innerText = dirText;

                // 速度越高，動畫週期秒數越短
                // 1023 ➔ 0.3s (超快), 1 ➔ 10s (極慢)
                const duration = 10 - (wheelSpeed / 1023) * 9.7;
                motorHorn.style.setProperty('--spin-duration', `${duration}s`);

                if (wheelDirection === 'CW') {
                    motorHorn.className = "absolute inset-0 flex items-center justify-center animate-spin-cw";
                } else {
                    motorHorn.className = "absolute inset-0 flex items-center justify-center animate-spin-ccw";
                }
            }
        }
