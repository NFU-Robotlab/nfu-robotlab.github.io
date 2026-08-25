const administrativeDocuments = {
  intro: {
    code: "ADMIN / 01",
    category: "General Administration",
    title: "行政簡介",
    summary: "先理解經費、處室與財產管理的基本關係，再進入各項核銷或採購流程。",
    sections: [
      {
        title: "開始前先確認",
        items: [
          "確認使用哪一項計畫或經費來源，以及該經費可支用的用途。",
          "確認承辦處室、送件期限與需要使用的最新表單。",
          "先判斷支出屬於業務費、設備費、人事費或差旅費，再選擇流程。"
        ]
      },
      {
        title: "常見處室分工",
        items: [
          "系辦：協助確認系級流程、文件順序與送件窗口。",
          "主計單位：確認會計科目、核銷憑證與預算規範。",
          "保管單位：處理財產編號、增加、移轉及報廢。",
          "採購單位：處理達採購門檻之請購、招標與驗收程序。"
        ]
      },
      {
        title: "財產與報廢",
        items: [
          "設備或非消耗品應依規定建立財產或物品資料並妥善保管。",
          "有財產編號的物品不可自行丟棄、拆除或轉移位置。",
          "報廢前先確認財產編號、保管人、設備狀態及保管單位要求。"
        ]
      },
      {
        title: "公開頁面的使用範圍",
        text: "本頁只整理一般規則。帳號權限、個人資料、實際計畫餘額與教師專用程序，請改查受權限保護的內部文件。",
        tone: "alert"
      }
    ]
  },
  "general-reimburse": {
    code: "ADMIN / 02",
    category: "Reimbursement",
    title: "一般核銷須知",
    summary: "核銷的核心是金額門檻正確、文件齊全，而且報價、請購、購買與發票日期的先後順序合理。",
    sections: [
      {
        title: "基本檢查",
        items: [
          "收據或發票應依規定填寫國立虎尾科技大學抬頭與統一編號 64967512。",
          "品名使用中文並清楚列出數量、單價、金額、日期與總計。",
          "紙本收據應有店章、負責人章或發票專用章；電子發票證明聯依現行規定辦理。",
          "發票字樣應清晰，正本不得任意塗改。"
        ]
      },
      {
        title: "舊版文件的金額分級",
        items: [
          "單品項未達 3,000 元：舊版規則通常以業務費憑收據核銷。",
          "單品項 3,000 元以上、未達 10,000 元：需確認非消耗品或財產登錄要求。",
          "10,000 元以上、未達 100,000 元：通常需先請購並準備報價資料。",
          "達 100,000 元以上或其他法定門檻：應先向採購及承辦單位確認科研採購或招標程序。"
        ]
      },
      {
        title: "報價單與發票一致性",
        items: [
          "報價單與發票的品名、型號、數量及金額應可清楚對應。",
          "報價單品名應包含中文，不宜只寫英文型號。",
          "發票日期應晚於必要的事前請購核准日期。",
          "購買前先確認價格是否含稅與運費如何列示。"
        ]
      },
      {
        title: "金額規則可能更新",
        text: "以上門檻整理自舊版公開文件，不應取代校方最新規定。購買前請向系辦、主計或計畫承辦人再次確認。",
        tone: "alert"
      }
    ]
  },
  "under-10k": {
    code: "ADMIN / 03",
    category: "Small Purchase",
    title: "一萬以下直接核銷",
    summary: "適用於常見材料、雜支與小額維修；重點是先確認經費用途、單品金額與財產屬性。",
    sections: [
      {
        title: "購買前",
        items: [
          "確認該品項可由指定計畫與會計科目支應。",
          "確認單品金額、整張發票總額及同一廠商累計金額是否觸及更高門檻。",
          "價格較高或可長期使用的品項，先確認是否需列為非消耗品。",
          "維修費應先確認維修對象屬於實驗室或學校列管設備。"
        ]
      },
      {
        title: "取得單據",
        items: [
          "要求正確抬頭、統編、日期與中文品名。",
          "發票中的品項不得只寫零件代號、型號或籠統名稱。",
          "保存報價、訂單、付款及收貨證明，以備承辦人查核。"
        ]
      },
      {
        title: "送件前",
        items: [
          "核對發票總額與明細加總一致。",
          "確認用途說明足以對應研究、課程或計畫工作。",
          "需要驗收、財產增加或保管人簽章時，先完成再送核銷。"
        ]
      }
    ]
  },
  "equipment-costs": {
    code: "ADMIN / 04",
    category: "Research Procurement",
    title: "科研採購（設備費）",
    summary: "設備費強調事前核准、規格明確、報價合理，以及採購完成後的驗收與財產管理。",
    sections: [
      {
        title: "請購階段",
        ordered: true,
        items: [
          "確認計畫預算中有對應設備項目及足夠餘額。",
          "整理中文品名、用途、數量、規格與預估金額。",
          "依金額及計畫性質準備報價、規格書或科研採購理由。",
          "完成事前核准後才通知廠商出貨或開立發票。"
        ]
      },
      {
        title: "核銷與驗收",
        items: [
          "發票、報價單、核准內容與實際交付設備應一致。",
          "確認設備功能、數量、配件與序號後完成驗收紀錄。",
          "發票日期不得早於必要的請購核准日期。",
          "需要保固書、進口文件或其他佐證時一併保存。"
        ]
      },
      {
        title: "財產增加",
        items: [
          "依規定建立財產或物品資料，指定保管人與放置地點。",
          "取得財產標籤後黏貼於容易辨識且不影響設備使用的位置。",
          "設備照片、標籤與驗收文件依承辦單位要求歸檔。"
        ]
      },
      {
        title: "不可先買後補",
        text: "設備採購若需要事前請購，未核准前不要先付款、出貨或要求廠商開票，以免無法核銷。",
        tone: "alert"
      }
    ]
  },
  "project-funding": {
    code: "ADMIN / 05",
    category: "Project Funding",
    title: "國科會計畫經費",
    summary: "計畫經費必須依核定清單、用途與執行期間使用；不同科目不可僅因餘額不足就任意互換。",
    sections: [
      {
        title: "常見經費類型",
        items: [
          "業務費：材料、雜支、研究相關服務及核定用途。",
          "研究人力或獎助：依核定身分、期間及金額辦理。",
          "設備費：依核定設備項目及採購程序辦理。",
          "出國或差旅費：依核定目的、地點、期間與標準辦理。"
        ]
      },
      {
        title: "執行原則",
        items: [
          "支出日期、用途與成果應落在計畫執行期間及工作範圍內。",
          "每次支出前確認預算餘額及會計科目，不只看總餘額。",
          "聘用、獎助與按月請領應保留核准與工作紀錄。",
          "計畫結束前預留核銷、驗收與退補件時間。"
        ]
      },
      {
        title: "結餘與經費流用",
        items: [
          "經費流用應符合計畫規定並在支出前完成必要核准。",
          "系統顯示金額與實際可用餘額可能不同，應以承辦及主計確認結果為準。",
          "結餘款是否可保留、繼續使用或需繳回，依計畫與校方規定辦理。"
        ]
      },
      {
        title: "個資不得公開",
        text: "聘用與獎助文件可能含身分證、銀行帳戶、學生證及簽章。這些資料只可在授權流程中處理，不得上傳公開網站或公開儲存庫。",
        tone: "alert"
      }
    ]
  },
  lecturer: {
    code: "ADMIN / 06",
    category: "Industry Lecturer",
    title: "業師相關",
    summary: "辦理業師活動時，應同時準備聘任依據、鐘點與交通費文件，以及可證明活動完成的紀錄。",
    sections: [
      {
        title: "活動前",
        items: [
          "確認計畫允許的業師資格、授課主題、時數與費用標準。",
          "準備邀請、應聘或履歷等必要文件，並完成事前核准。",
          "事先確認鐘點費與交通費是否可同時支應，以及各自所需憑證。"
        ]
      },
      {
        title: "活動當日",
        items: [
          "準備簽到表或其他出席紀錄。",
          "拍攝能辨識活動主題、講者及參與情況的照片。",
          "確認實際授課時間、地點與核准內容一致。"
        ]
      },
      {
        title: "核銷文件",
        items: [
          "鐘點費印領或領款文件。",
          "交通票據及必要行程證明。",
          "業師履歷、活動紀錄、簽到表及成果照片。",
          "涉及個資的受領人資料應依校方安全流程傳遞與保存。"
        ]
      }
    ]
  },
  tender: {
    code: "ADMIN / 07",
    category: "Tender & Acceptance",
    title: "招標",
    summary: "達招標或採購門檻的案件，應先讓採購承辦確認程序，再決定規格、時程與驗收方式。",
    sections: [
      {
        title: "準備文件",
        items: [
          "採購目的、預算來源、數量與預估金額。",
          "以功能與性能描述需求的規格書，避免不當限制特定品牌。",
          "市場價格或廠商資料，作為預算合理性參考。",
          "交貨期限、保固、教育訓練及驗收條件。"
        ]
      },
      {
        title: "驗收重點",
        items: [
          "依契約規格逐項確認數量、功能、配件及文件。",
          "測試結果與缺失改善應留下紀錄。",
          "完成驗收後再依規定辦理付款及財產增加。"
        ]
      },
      {
        title: "先問承辦再接洽廠商",
        text: "招標案件的時程與文件要求較多，不宜先承諾交貨或指定得標結果。請在採購承辦確認後再進行後續作業。",
        tone: "alert"
      }
    ]
  },
  transfer: {
    code: "ADMIN / 08",
    category: "Accounting Adjustment",
    title: "回沖",
    summary: "回沖用來處理預付款、暫付款或會計科目調整；關鍵是能清楚追溯原始支出與調整原因。",
    sections: [
      {
        title: "先準備",
        items: [
          "原始申請或付款文件編號。",
          "實際發票、收據與明細。",
          "原核准金額、實際支出及差額說明。",
          "需要更正會計科目時，準備用途與調整原因。"
        ]
      },
      {
        title: "處理原則",
        items: [
          "原始款項、核銷憑證與回沖金額必須可以相互對應。",
          "有剩餘款或不足額時，依承辦指示辦理繳回或補正。",
          "完成後保存系統紀錄與紙本文件，避免同一筆款項重複處理。"
        ]
      },
      {
        title: "系統操作屬內部流程",
        text: "實際系統欄位、帳號權限與個案資料不在公開頁面展示；請由具權限成員依內部 SOP 操作。",
        tone: "alert"
      }
    ]
  },
  "domestic-travel": {
    code: "ADMIN / 09",
    category: "Domestic Travel",
    title: "國內差旅費",
    summary: "國內出差須先核准公務目的與期間，返校後再依實際行程、票據與現行標準核銷。",
    sections: [
      {
        title: "出發前",
        items: [
          "確認出差目的、地點、日期、計畫與可支用經費。",
          "完成必要的出差、差勤或課務程序。",
          "確認可搭乘交通工具、住宿上限及是否需要事前核准。"
        ]
      },
      {
        title: "保存憑證",
        items: [
          "車票、購票證明或其他可證明實際交通的文件。",
          "住宿發票或收據，內容應符合校方抬頭與統編要求。",
          "研討會議程、邀請、簽到或其他可證明公務目的的文件。",
          "行程變更時保留原因及必要核准。"
        ]
      },
      {
        title: "核銷檢查",
        items: [
          "申報日期與實際行程一致。",
          "交通、住宿與雜費沒有重複請領。",
          "費用只涵蓋核定公務期間與合理路線。",
          "不同身分的出差人員依各自適用標準辦理。"
        ]
      }
    ]
  },
  employment: {
    code: "ADMIN / 10",
    category: "Employment Certificate",
    title: "申請在職證明",
    summary: "在職或服務證明應由本人依目前聘任資料申請，公開頁只列準備方向，不處理任何個人資料。",
    sections: [
      {
        title: "申請前確認",
        items: [
          "確認需要的是在職證明、服務證明或其他特定格式。",
          "確認目前聘任身分、計畫名稱與聘任期間。",
          "詢問人事或計畫承辦單位的最新申請方式與處理時間。"
        ]
      },
      {
        title: "可能需要的資料",
        items: [
          "本人基本資料及聯絡方式。",
          "聘任核准或契約資料。",
          "證明用途、份數、語言及是否需要彌封。"
        ]
      },
      {
        title: "個資保護",
        text: "申請所需的身分證字號、地址、簽章及聘任資料不得貼在公開網頁、公開 Issue 或公開 Pull Request。",
        tone: "alert"
      }
    ]
  },
  "international-travel": {
    code: "ADMIN / 11",
    category: "International Travel",
    title: "國外差旅費",
    summary: "國外出差文件較多，應從事前簽准、行程與經費來源開始準備，返國後完成票據、匯率及出國報告。",
    sections: [
      {
        title: "事前簽准",
        ordered: true,
        items: [
          "確認出國目的、國家、城市、日期與使用計畫。",
          "準備邀請函、研討會資訊、議程與預估經費。",
          "完成公差、差勤、課務及計畫所需核准。",
          "核准後再依規定購買機票與安排住宿。"
        ]
      },
      {
        title: "旅途中保存",
        items: [
          "電子機票、付款證明、登機證及完整航段資料。",
          "住宿及必要交通憑證。",
          "研討會註冊、出席或發表證明。",
          "行程變更、延誤或取消的相關證明。"
        ]
      },
      {
        title: "返國後",
        items: [
          "依核定行程與現行日支標準整理差旅費。",
          "依校方規則採用正確日期與來源的匯率資料。",
          "完成出國報告、成果或其他計畫要求。",
          "核對所有費用未由其他單位重複補助。"
        ]
      },
      {
        title: "敏感資料只走授權流程",
        text: "護照、身分資料、教師差勤與支付資訊不得放在公開儲存庫。需要登入的實際流程請使用內部文件。",
        tone: "alert"
      }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("admin-document-modal");
  const panel = modal?.querySelector(".admin-document-panel");
  const code = document.getElementById("admin-document-code");
  const category = document.getElementById("admin-document-category");
  const title = document.getElementById("admin-document-title");
  const summary = document.getElementById("admin-document-summary");
  const sections = document.getElementById("admin-document-sections");
  const searchInput = document.getElementById("admin-search-input");
  const noResults = document.getElementById("admin-no-results");
  const cards = [...document.querySelectorAll("[data-admin-document]")];
  const closeButtons = [...document.querySelectorAll("[data-admin-modal-close]")];
  let previousFocus = null;

  function createSection(sectionData) {
    const section = document.createElement("section");
    section.className = "admin-document-section";
    if (sectionData.tone === "alert") section.classList.add("admin-document-alert");

    const heading = document.createElement("h3");
    heading.textContent = sectionData.title;
    section.append(heading);

    if (sectionData.text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = sectionData.text;
      section.append(paragraph);
    }

    if (sectionData.items?.length) {
      const list = document.createElement(sectionData.ordered ? "ol" : "ul");
      sectionData.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.append(listItem);
      });
      section.append(list);
    }

    return section;
  }

  function openDocument(documentId, updateHash = true) {
    const documentData = administrativeDocuments[documentId];
    if (!modal || !panel || !sections || !documentData) return;

    previousFocus = document.activeElement;
    code.textContent = documentData.code;
    category.textContent = documentData.category;
    title.textContent = documentData.title;
    summary.textContent = documentData.summary;
    sections.replaceChildren(...documentData.sections.map(createSection));

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-modal-open");
    if (updateHash) history.replaceState(null, "", `#admin-${documentId}`);
    requestAnimationFrame(() => panel.focus());
    window.playSynth?.("select");
  }

  function closeDocument() {
    if (!modal || modal.classList.contains("hidden")) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("admin-modal-open");
    if (location.hash.startsWith("#admin-")) {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
    }
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    window.playSynth?.("click");
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openDocument(card.dataset.adminDocument));
    card.addEventListener("mouseenter", () => window.playSynth?.("hover"));
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeDocument));

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeDocument();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDocument();
  });

  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLocaleLowerCase("zh-TW");
    let visibleCount = 0;

    cards.forEach((card) => {
      const isMatch = !keyword || card.innerText.toLocaleLowerCase("zh-TW").includes(keyword);
      card.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  });

  const initialDocumentId = location.hash.replace(/^#admin-/, "");
  if (administrativeDocuments[initialDocumentId]) openDocument(initialDocumentId, false);
});
