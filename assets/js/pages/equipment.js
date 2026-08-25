// ==================== 1. 禁切材質查詢系統 ====================
        const materialsDb = [
            {
                names: ['壓克力', 'acrylic', 'pmma'],
                safe: true,
                msg: '<strong>✅ 安全材質！</strong> 非常適合雷射切割與雕刻。切口透明且完美平滑。注意：若厚度過大（>8mm）或速度調得太慢仍有悶燒風險。'
            },
            {
                names: ['木板', '密集板', '合板', 'mdf', 'wood', 'plywood'],
                safe: true,
                msg: '<strong>✅ 安全材質！</strong> 切割時會產生些許焦碳焦黑感，屬於正常現象。請務必開啟空壓機強效吹氣，防止木材悶燒起火。'
            },
            {
                names: ['皮革', '真皮', 'leather'],
                safe: true,
                msg: '<strong>✅ 安全材質（限天然真皮）！</strong> 可以切割與雕刻。但會散發極度難聞的燒焦臭味，請務必確認室外強力排風系統已全載運轉。<strong>注意：人造皮（通常含PVC）禁切！</strong>'
            },
            {
                names: ['紙板', '紙張', 'cardboard', 'paper'],
                safe: true,
                msg: '<strong>✅ 安全材質！</strong> 切割速度極快。但燃點極低，請採用極低功率並全程看守，防止紙張瞬間竄火。'
            },
            {
                names: ['pvc', '聚氯乙烯', '膠卷', '黑膠'],
                safe: false,
                msg: '<strong>❌ 劇毒！嚴禁切割！</strong> 燃燒分解會產生極毒的<strong>氯氣 (Chlorine Gas)</strong>，極易吸入人體引發中毒。同時釋放強酸鹽酸霧，會使切割機的反光鏡片、精密導軌及結構在兩天內<strong>徹底腐蝕生鏽</strong>，造成十萬元級設備損毀。'
            },
            {
                names: ['abs'],
                safe: false,
                msg: '<strong>❌ 嚴禁切割！</strong> ABS 高溫熔融會產生黏稠流狀，並且會釋放出高度致癌的<strong>氰化氫劇毒氣體</strong>與焦油，容易黏附並汙染雷射對焦透鏡。'
            },
            {
                names: ['teflon', '聚四氟乙烯', 'ptfe', '鐵氟龍'],
                safe: false,
                msg: '<strong>❌ 劇毒！嚴禁切割！</strong> 高熱會釋放強腐蝕性與劇毒的<strong>氟化氫與氟氣 (Fluorine Gas)</strong>，會造成人員致命化學灼傷與肺部積水。'
            },
            {
                names: ['碳纖維', 'carbon fiber'],
                safe: false,
                msg: '<strong>❌ 嚴禁切割！</strong> 碳纖維內含環氧樹脂，受雷射灼燒時會噴發大量的濃烈黑煙與微米碳纖維絲，極易被操作人員吸入肺部造成永久性損傷，且易導致機台反光鏡鍍膜報銷。'
            },
            {
                names: ['聚碳酸酯', 'polycarbonate', 'pc', 'lexan', '壓克力板(防彈)'],
                safe: false,
                msg: '<strong>❌ 嚴禁切割！</strong> 燃燒極快且不易切斷，高熱切口會迅速炭化熔黑，釋放大量有害焦油油煙，並嚴重毀壞光學反光系統。'
            }
        ];

        const materialInput = document.getElementById('materialInput');
        const searchResult = document.getElementById('searchResult');

        materialInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResult.classList.add('hidden');
                return;
            }

            // 尋找匹配項目
            const match = materialsDb.find(item =>
                item.names.some(name => name.includes(query) || query.includes(name))
            );

            searchResult.classList.remove('hidden');
            if (match) {
                if (match.safe) {
                    searchResult.className = "p-3.5 rounded-lg border text-xs leading-relaxed transition-all bg-emerald-50 border-emerald-200 text-emerald-800";
                    searchResult.innerHTML = match.msg;
                } else {
                    searchResult.className = "p-3.5 rounded-lg border text-xs leading-relaxed transition-all bg-red-50 border-red-200 text-red-800";
                    searchResult.innerHTML = match.msg;
                }
            } else {
                searchResult.className = "p-3.5 rounded-lg border text-xs leading-relaxed transition-all bg-amber-50 border-amber-200 text-amber-800";
                searchResult.innerHTML = "<strong>⚠️ 查無此材質資料：</strong> 若為不知名塑膠或複合板材，在未經實驗室學長或指導教授確認簽收前，<strong>一律視為禁切材質</strong>，切勿私自測試冒險！";
            }
        });


        // ==================== 2. 雷切安全線上互動測驗 ====================
        const quizQuestions = [
            {
                q: "Q1. 當雷射切割機進行切割中，因為程序需要切很久（如一小時），你應該怎麼做？",
                options: [
                    "A. 離開實驗室去上廁所、買飲料或回宿舍躺著，等時間到了再回來拿成品。",
                    "B. 全程守在切割機台旁邊專注監控，視線絕不離開雷射頭與工件，防止突然起火。",
                    "C. 坐在隔壁桌滑手機打排位賽，等有聞到刺鼻的煙味再起身過來看。"
                ],
                correct: 1
            },
            {
                q: "Q2. 實驗室強烈禁止切割哪種含有「氯元素」的塑膠材質，因為它分解會釋放致命劇毒氣體並鏽蝕整台精密設備？",
                options: [
                    "A. 壓克力板 (Acrylic)",
                    "B. 聚氯乙烯 (PVC) 或是含有 PVC 成分的人工皮革",
                    "C. 原木板材或密集板 (Wood)"
                ],
                correct: 1
            },
            {
                q: "Q3. 如果在切割過程中，突然發現板材起火燃燒，第一個最正確的應變步驟是什麼？",
                options: [
                    "A. 立刻打開機箱蓋子，用力吹氣把火吹熄。",
                    "B. 不管它繼續切，反正雷切溫度本來就很高，切完火自己就會熄滅了。",
                    "C. 立刻按下實機的「紅色緊急停止鈕 (Emergency Stop)」，切斷雷射供電，並通知旁人協助防火。"
                ],
                correct: 2
            },
            {
                q: "Q4. 關於雷切輔助設備的檢查，以下哪一項敘述是正確的操作守則？",
                options: [
                    "A. 可以不開吹氣空壓機，因為雷射光束本身就能直接把材質蒸發乾淨。",
                    "B. 開機切削前，必須檢查確認「強效排煙系統」與「吹氣空壓機」皆在正常運作中，缺一不可。",
                    "C. 抽風排煙機很吵，為了不打擾實驗室學長姐討論報告，最好偷偷把它關小或不開。"
                ],
                correct: 1
            },
            {
                q: "Q5. 當螢幕顯示雷射切割完全結束後，應該怎麼做？",
                options: [
                    "A. 立刻將安全掀蓋打開，第一時間拿取成品以免耽誤下一位組員的時間。",
                    "B. 不要去碰它，直接離開實驗室，等半天過後讓它慢慢放涼。",
                    "C. 稍微靜待 1~2 分鐘，讓有毒煙霧被抽風機完全抽淨至室外後，再開蓋拿取，保障自身呼吸道安全。"
                ],
                correct: 2
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
                quizActionBtn.className = "w-full sm:w-auto px-6 py-2 bg-slate-700 text-slate-400 font-bold rounded-lg text-sm cursor-not-allowed transition-all shadow-md";
                quizActionBtn.disabled = true;
            } else {
                showQuizResults();
            }
        }

        function selectOption(button, optionIndex) {
            // 清除同組按鈕的高亮
            const siblings = button.parentNode.querySelectorAll('.option-btn');
            siblings.forEach(sib => {
                sib.className = "option-btn text-left p-3 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition-all text-xs text-slate-300";
            });

            // 高亮選中按鈕
            button.className = "option-btn text-left p-3 bg-blue-600 rounded-lg border border-blue-400 text-white font-medium transition-all text-xs shadow-inner";
            selectedOptionIndex = optionIndex;

            // 啟用下一步按鈕
            const quizActionBtn = document.getElementById('quizActionBtn');
            quizActionBtn.className = "w-full sm:w-auto px-6 py-2 bg-sky-500 hover:bg-sky-600 text-slate-900 font-bold rounded-lg text-sm transition-all shadow-md cursor-pointer";
            quizActionBtn.disabled = false;
        }

        function submitQuizAnswer() {
            if (selectedOptionIndex === null) return;

            // 驗證答案
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
                // 100% 答對，頒發數位證書
                localStorage.setItem('laser_safety_passed', 'true');
                quizStatus.innerHTML = `<span class="text-emerald-400 font-bold">🎉 恭喜！您已 100% 答對全部安全問題。</span>`;

                quizContainer.innerHTML = `
                    <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-xl border-2 border-emerald-500 shadow-xl text-center space-y-4 max-w-lg mx-auto">
                        <div class="text-4xl">🏆</div>
                        <h4 class="text-lg font-extrabold text-emerald-400 tracking-tight uppercase">NFU IRS Lab 設備安全認證</h4>
                        <p class="text-slate-100 font-semibold text-xl border-b border-dashed border-slate-700 pb-3">雷射切割安全學科合格證書</p>

                        <div class="text-left space-y-1.5 text-xs text-slate-300 px-4 py-3 bg-black/40 rounded-lg font-mono">
                            <p>• 認證項目：CO2 雷射切割安全學科檢定</p>
                            <p>• 通過分數：100% (5/5 題答對)</p>
                            <p>• 實作權限：符合實機考核操作申請資格</p>
                            <p class="text-slate-400">• 核發流水號：IRS-${Math.floor(Math.random() * 900000 + 100000)}</p>
                        </div>

                        <p class="text-slate-400 text-[10px] leading-relaxed">
                            請將此合格證書頁面截圖，並在向學長姐申請機台實作時主動展示，以證明您已詳閱所有安全防範指南。
                        </p>

                        <button onclick="restartQuiz()" class="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded transition-colors">
                            🔄 重新測驗
                        </button>
                    </div>
                `;
            } else {
                // 有答錯，請重來
                quizStatus.innerHTML = `<span class="text-red-400 font-bold">⚠️ 很遺憾，您有題目答錯了 (得分: ${userScore}/${quizQuestions.length})。</span>`;
                quizContainer.innerHTML = `
                    <div class="p-6 text-center space-y-4 max-w-md mx-auto">
                        <div class="text-3xl">❌</div>
                        <h4 class="text-base font-bold text-slate-100">未達安全上機門檻 (必須 100% 答對)</h4>
                        <p class="text-xs text-slate-400 leading-relaxed">
                            實驗室高功率雷射不容許任何操作疏忽。建議重新研讀上方<strong>「人在機在、人在機在、人在機在」</strong>等核心守則，點擊下方按鈕重新發起挑戰。
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

        // 頁面加載時自動啟動測驗
        document.addEventListener('DOMContentLoaded', () => {
            loadQuestion(0);
        });
