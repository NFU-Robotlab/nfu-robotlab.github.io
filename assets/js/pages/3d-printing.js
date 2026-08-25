// ==================== 1. 耗材材質查詢引擎 ====================
        const filamentDb = {
            'PLA': {
                nozzle: '190°C - 215°C',
                bed: '50°C - 60°C',
                fan: '100% (全程開啟)',
                speed: '60 - 250 mm/s (易於高速列印)',
                msg: '<strong>✅ 適合初學者與無應力件！</strong> PLA 收縮率極低，幾乎不需要封閉式機箱。層間結合度良好，列印尺寸精確，適合列印外殼防護、模型本體等結構。',
                style: 'bg-blue-50/50 border-blue-200 text-blue-900'
            },
            'PETG': {
                nozzle: '230°C - 245°C',
                bed: '70°C - 80°C',
                fan: '30% - 50% (不可開過大，否則會影響層間黏合)',
                speed: '50 - 150 mm/s (略具黏性)',
                msg: '<strong>✅ 推薦結構件、夾爪與連桿件！</strong> 具備極佳的韌性與抗衝擊性，耐溫性比 PLA 高。注意：PETG 容易有拉絲（Stringing）與表面滴膠問題，回抽距離需稍微增加。',
                style: 'bg-slate-50 border-slate-300 text-slate-900'
            },
            'ABS': {
                nozzle: '240°C - 260°C',
                bed: '90°C - 110°C',
                fan: '0% - 20% (強烈禁止開風扇，極易因冷卻收縮而翹邊翹角)',
                speed: '40 - 100 mm/s',
                msg: '<strong>❌ 高收縮率、具刺鼻氣味！</strong> 必須在 <strong>Bambu X1-C 或 CR-5 Pro 等封閉箱體機台</strong>中列印，否則極易因室溫溫差翹曲開裂。列印時排氣扇必須全開，並保持室內通風。',
                style: 'bg-amber-50 border-amber-300 text-amber-900'
            },
            'TPU': {
                nozzle: '220°C - 235°C',
                bed: '45°C - 60°C',
                fan: '80% - 100%',
                speed: '20 - 40 mm/s (必須慢速列印，防止軟質線材在擠出機內纏繞)',
                msg: '<strong>✅ 適合緩衝墊、防滑腳墊與吸震零件！</strong> TPU 屬於高彈性軟料。建議使用 <strong>近端擠出機 (Direct Drive)</strong> 列印，切勿在遠端進料機型上列印。回抽必須關閉或限制，列印速度須保持極慢。',
                style: 'bg-purple-50 border-purple-200 text-purple-900'
            }
        };

        function selectFilament(type) {
            // 清除按鈕高亮
            const buttons = document.querySelectorAll('.filament-btn');
            buttons.forEach(btn => {
                btn.className = "filament-btn py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-all";
            });

            // 高亮選中的按鈕
            const selectedBtn = document.getElementById(`btn-${type}`);
            selectedBtn.className = "filament-btn py-2 px-3 bg-blue-600 text-white font-semibold rounded-lg text-xs transition-all shadow-sm";

            // 輸出結果
            const resultBox = document.getElementById('filamentResult');
            const data = filamentDb[type];
            resultBox.className = `p-4 rounded-xl border transition-all ${data.style}`;
            resultBox.innerHTML = `
                <div class="space-y-2 text-xs">
                    <p class="text-sm font-bold">${type} 耗材最佳建議參數：</p>
                    <div class="grid grid-cols-2 gap-4 my-2 border-b border-slate-200/60 pb-2">
                        <div>🔥 噴嘴溫度: <strong>${data.nozzle}</strong></div>
                        <div>🌡️ 熱床溫度: <strong>${data.bed}</strong></div>
                        <div>🌪️ 切片風扇: <strong>${data.fan}</strong></div>
                        <div>🏃 建議速度: <strong>${data.speed}</strong></div>
                    </div>
                    <p class="leading-relaxed mt-2">${data.msg}</p>
                </div>
            `;
        }

        // 初始化加載 PLA
        selectFilament('PLA');

        // ==================== 2. 切片軟體 Tab 切換 ====================
        function switchSlicerTab(tab) {
            const tabs = document.querySelectorAll('.slicer-tab');
            const contents = document.querySelectorAll('.slicer-content');

            tabs.forEach(t => {
                t.className = "slicer-tab px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold rounded";
            });
            contents.forEach(c => {
                c.classList.add('hidden');
            });

            const activeTab = document.getElementById(`tab-${tab}`);
            const activeContent = document.getElementById(`content-${tab}`);

            if (tab === 'cura') {
                activeTab.className = "slicer-tab px-3 py-1 bg-white text-slate-800 border border-slate-300 text-[11px] font-bold rounded shadow-sm";
            } else {
                activeTab.className = "slicer-tab px-3 py-1 bg-slate-800 text-white border border-slate-700 text-[11px] font-bold rounded shadow-sm";
            }
            activeContent.classList.remove('hidden');
        }

        // ==================== 3. 疑難排解伸縮卡片 ====================
        function toggleTrouble(id) {
            const content = document.getElementById(`trouble-content-${id}`);
            const arrow = document.getElementById(`arrow-${id}`);
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            }
        }

        // ==================== 4. 3D 列印線上測驗系統 ====================
        const quizQuestions = [
            {
                q: "Q1. 在 Onshape 中導出 STL 檔時，關於「單位」的設定，哪一項最正確？",
                options: [
                    "A. 應該選擇英吋 (Inch)，這是列印機的國際通用單位。",
                    "B. 必須點選公釐 (Millimeter)，否則匯入切片軟體時尺寸會發生巨大縮放偏差。",
                    "C. 隨便選都沒關係，切片軟體會完全自動修復與對齊比例。"
                ],
                correct: 1
            },
            {
                q: "Q2. 列印開始後最關鍵的「黃金前五分鐘」，您應該進行什麼動作？",
                options: [
                    "A. 立刻離開實驗室去吃飯，列印很費時不用在旁邊等。",
                    "B. 專注監控第一層列印情況，確認塑料有完美附著於平台，防止中途起翹、炒米粉。",
                    "C. 拿出砂紙與尖嘴鉗去清理平台另一側，防止殘料擋住噴嘴。"
                ],
                correct: 1
            },
            {
                q: "Q3. 當使用傳統 Creality 手動調平機台時，如果白紙夾在噴嘴與熱床間，拉動時「完全沒有阻力，非常順暢」，這代表？",
                options: [
                    "A. 間距太近（熱床過高），必須將底盤螺母向下擰（逆時針）使平台上升。",
                    "B. 這是最完美的對焦聚焦狀態，可以立刻輸出 G-code 開始列印。",
                    "C. 間距太遠（熱床過低），第一層塑料將無法附著而起翹，需將螺母向擰調整使平台上升。"
                ],
                correct: 2
            },
            {
                q: "Q4. 關於 PEI 彈性鋼板取件與保養，以下哪一項動作是「嚴重禁止」的？",
                options: [
                    "A. 列印完成且平台降溫後，把鋼板取下，用雙手向內、外輕折讓作品自動彈開。",
                    "B. 當鋼板沾到指紋或微塵時，使用 95% 酒精擦拭清潔。",
                    "C. 當模型還黏在機台熱床上的鋼板上時，直接使用鋒利鐵鏟大力刮拔成品。"
                ],
                correct: 2
            },
            {
                q: "Q5. 當列印 ABS 等高收縮率線材時，以下哪一項切片設定與操作是正確的？",
                options: [
                    "A. 必須在 Bambu X1-C 等「全封閉式機箱」中列印，且強烈建議切片時將風扇關閉以防收縮起翹。",
                    "B. 必須使用 Ender-5 Pro 開放式機台，並把周圍風扇開滿 100% 以利快速冷卻結晶。",
                    "C. 熱床溫度越低越好（如設定為室溫），可以省電並防止高溫軟化變形。"
                ],
                correct: 0
            }
        ];

        let currentQuestionIndex = 0;
        let selectedOptionIndex = null;
        let userScore = 0;

        function loadQuestion(index) {
            const quizContainer = document.getElementById('quizContainer');
            const quizStatus = document.getElementById('quizStatus');
            const quizActionBtn = document.getElementById('quizActionBtn');
            selectedOptionIndex = null;

            if (index < quizQuestions.length) {
                const qData = quizQuestions[index];
                let optionsHtml = '';
                qData.options.forEach((opt, idx) => {
                    optionsHtml += `
                        <button onclick="selectOption(this, ${idx})" class="option-btn text-left p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition-all text-xs text-slate-300">
                            ${opt}
                        </button>
                    `;
                });

                quizContainer.innerHTML = `
                    <div class="space-y-3">
                        <p class="text-sm font-semibold text-slate-100">${qData.q}</p>
                        <div class="grid grid-cols-1 gap-2">
                            ${optionsHtml}
                        </div>
                    </div>
                `;
                quizStatus.innerHTML = `<span class="text-slate-400">目前進度：${index + 1} / ${quizQuestions.length}</span>`;
                quizActionBtn.innerText = index === quizQuestions.length - 1 ? "送出評量並確認結果" : "下一題 ➔";
                quizActionBtn.className = "w-full sm:w-auto px-6 py-2 bg-indigo-900 text-indigo-400 font-bold rounded-lg text-sm cursor-not-allowed transition-all shadow-md";
                quizActionBtn.disabled = true;
            } else {
                showQuizResults();
            }
        }

        function selectOption(button, optionIndex) {
            const siblings = button.parentNode.querySelectorAll('.option-btn');
            siblings.forEach(sib => {
                sib.className = "option-btn text-left p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition-all text-xs text-slate-300";
            });

            button.className = "option-btn text-left p-3 bg-blue-600 rounded-lg border border-blue-400 text-white font-medium transition-all text-xs shadow-inner";
            selectedOptionIndex = optionIndex;

            const quizActionBtn = document.getElementById('quizActionBtn');
            quizActionBtn.className = "w-full sm:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-sm transition-all shadow-md cursor-pointer";
            quizActionBtn.disabled = false;
        }

        function submitQuizAnswer() {
            if (selectedOptionIndex === null) return;

            const currentQ = quizQuestions[currentQuestionIndex];
            if (selectedOptionIndex === currentQ.correct) {
                userScore++;
            }

            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }

        function showQuizResults() {
            const quizContainer = document.getElementById('quizContainer');
            const quizStatus = document.getElementById('quizStatus');
            const quizActionBtn = document.getElementById('quizActionBtn');

            quizActionBtn.classList.add('hidden');

            if (userScore === quizQuestions.length) {
                // 100% 答對，頒發證書
                localStorage.setItem('3d_printing_safety_passed', 'true');
                quizStatus.innerHTML = `<span class="text-emerald-400 font-bold">🎉 恭喜！您已 100% 答對所有 3D 列印考核問題。</span>`;

                quizContainer.innerHTML = `
                    <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 rounded-xl border-2 border-emerald-500 shadow-xl text-center space-y-4 max-w-lg mx-auto">
                        <div class="text-4xl">🏆</div>
                        <h4 class="text-lg font-extrabold text-emerald-400 tracking-tight uppercase">NFU IRS Lab 3D 列印證照</h4>
                        <p class="text-slate-100 font-semibold text-xl border-b border-dashed border-slate-700 pb-3">FDM 3D 列印學科檢定合格證書</p>

                        <div class="text-left space-y-1.5 text-xs text-slate-300 px-4 py-3 bg-black/40 rounded-lg font-mono">
                            <p>• 認證項目：3D 列印與切片設定安全學科</p>
                            <p>• 通過分數：100% (5/5 答對)</p>
                            <p>• 實作權限：符合實機調平與雲端列印考核資格</p>
                            <p class="text-slate-400">• 核發流水號：3DPR-${Math.floor(Math.random() * 900000 + 100000)}</p>
                        </div>

                        <p class="text-slate-400 text-[10px] leading-relaxed">
                            請將此合格證書頁面截圖，並在向學長姐申請 3D 列印實機（包含 Bambu X1-C 進退料）實作時出示。
                        </p>

                        <button onclick="restartQuiz()" class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded transition-colors">
                            🔄 重新測驗
                        </button>
                    </div>
                `;
            } else {
                quizStatus.innerHTML = `<span class="text-red-400 font-bold">⚠️ 很遺憾，您有題目答錯了 (得分: ${userScore}/${quizQuestions.length})。</span>`;
                quizContainer.innerHTML = `
                    <div class="p-6 text-center space-y-4 max-w-md mx-auto">
                        <div class="text-3xl">❌</div>
                        <h4 class="text-base font-bold text-slate-100">未達安全上機門檻 (必須 100% 答對)</h4>
                        <p class="text-xs text-slate-400 leading-relaxed">
                            3D 列印噴嘴高達 260°C，且調平間距稍有不慎即會造成鋼板不可逆的刮傷。請仔細研讀上方 A4 紙張調平、Brim 附著、與 TPU 慢速列印原則，再試一次！
                        </p>
                        <button onclick="restartQuiz()" class="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition-colors shadow">
                            🔄 重新開始挑戰安全測驗
                        </button>
                    </div>
                `;
            }
        }

        function restartQuiz() {
            currentQuestionIndex = 0;
            selectedOptionIndex = null;
            userScore = 0;
            const quizActionBtn = document.getElementById('quizActionBtn');
            quizActionBtn.classList.remove('hidden');
            loadQuestion(0);
        }

        // 頁面加載時自動啟動
        document.addEventListener('DOMContentLoaded', () => {
            loadQuestion(0);
        });
