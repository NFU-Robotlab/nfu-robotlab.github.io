const docDatabase = {
            'stm32-f4': `
                <h3 class="text-2xl sm:text-3xl font-black text-slate-900 mb-1 flex items-center gap-1.5">🧠 STM32 F4 嵌入式開發</h3>
                <p class="text-xs sm:text-sm text-slate-400 font-mono">[ STM32F4_MICROCONTROLLER // CORTEX_M4 ]</p>
                <div class="border-t border-slate-200/60 my-4"></div>

                <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                    <strong>💡 鐵人賽優秀技術導引：</strong><br>
                    本教學完整收錄並改編自實驗室 <strong>ziteh 學長</strong> 於第 14 屆 iT 邦幫忙鐵人賽發表的經典系列專題：<br><br>
                    <a href="https://ithelp.ithome.com.tw/users/20151756/ironman/5382" target="_blank" rel="noopener noreferrer" class="text-orange-700 font-bold hover:underline inline-flex items-center gap-1">
                        🔗 簡單入門LibOpenCM3 STM32 嵌入式系統開發系列 (鐵人賽 5382) ➔
                    </a><br><br>
                    本篇專為實驗室成員提供 STM32F4 (ARM Cortex-M4) 微控制器的核心學習指南與重要經驗傳承。
                </div>
            `,
            'yolo-learning': `
                <h3 class="text-2xl sm:text-3xl font-black text-slate-900 mb-1 flex items-center gap-1.5">👁️ 實驗室YOLO學習參考影片文檔</h3>
                <p class="text-xs sm:text-sm text-slate-400 font-mono">[ YOLO_OBJECT_DETECTION // COMPUTER_VISION ]</p>
                <div class="border-t border-slate-200/60 my-4"></div>

                <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                    <strong>💡 實驗室必備 YOLO 核心學習影片播放清單：</strong><br>
                    為了讓新進組員與專案成員迅速掌握深度學習物件偵測與影像處理，請點選以下連結觀看學長姐精選並推薦的實戰教學影片：<br><br>
                    <a href="https://www.youtube.com/watch?v=SU_XvZKrClA&list=PLEP2u1-Xck9DZcjBKx4_HLt8-p9_GLkkG&index=27" target="_blank" rel="noopener noreferrer" class="text-orange-700 font-bold hover:underline inline-flex items-center gap-1">
                        🔗 前往觀看 YOLO 學習參考影片播放清單 ➔
                    </a><br><br>
                    配合本實驗室 Intel RealSense 深度相機對接，可廣泛實現高精度 3D 影像空間定位與客製化物體抓取應用。
                </div>
            `,
            'git-learning': `
                <h3 class="text-2xl sm:text-3xl font-black text-slate-900 mb-1 flex items-center gap-1.5">🔀 Git 版本控制學習</h3>
                <p class="text-xs sm:text-sm text-slate-400 font-mono">[ GIT_VERSION_CONTROL // GITHUB_COLLABORATION ]</p>
                <div class="border-t border-slate-200/60 my-4"></div>

                <div class="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                    <strong>💡 Git / GitHub 基礎學習影片播放清單：</strong><br>
                    建議新進成員先建立版本控制的基本觀念，熟悉 Git 的提交、分支與遠端儲存庫操作，再進行實驗室專案協作。<br><br>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5 font-mono text-[10px] sm:text-xs">
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git init</span>
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git add</span>
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git commit</span>
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git branch</span>
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git merge</span>
                        <span class="bg-white/70 border border-orange-100 rounded-lg px-3 py-2">git push / pull</span>
                    </div>

                    <a href="https://www.youtube.com/watch?v=PNEM7CH3ZAg&list=PLYrA-SsMvTPOZeB6DHvB0ewl3miMf-2tj" target="_blank" rel="noopener noreferrer" class="text-orange-700 font-bold hover:underline inline-flex items-center gap-1">
                        🔗 前往觀看 Git 學習影片播放清單 ➔
                    </a><br><br>

                    完成基礎學習後，建議實際建立測試 Repository，練習 Clone、Commit、Branch、Merge、Pull 與 Push，再開始參與實驗室 GitHub 專案。
                </div>
            `
        };

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("doc-modal");
  const content = document.getElementById("doc-content-body");
  if (!modal || !content) return;

  let returnFocus = null;

  const closeDoc = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    returnFocus?.focus();
  };

  document.querySelectorAll("[data-doc-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = button.dataset.docTopic;
      if (!docDatabase[topic]) return;
      returnFocus = button;
      content.innerHTML = docDatabase[topic];
      content.scrollTop = 0;
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      modal.querySelector("[data-doc-close]")?.focus();
      window.playSynth?.("click");
    });
  });

  modal.querySelectorAll("[data-doc-close]").forEach((button) => {
    button.addEventListener("click", closeDoc);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeDoc();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) closeDoc();
  });
});
