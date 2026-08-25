// 初始化載入封包計算
        document.addEventListener('DOMContentLoaded', () => {
            calculatePacket();
        });

        function calculatePacket() {
            let idVal = parseInt(document.getElementById('calc-id').value);
            let posVal = parseInt(document.getElementById('calc-pos').value);
            let spdVal = parseInt(document.getElementById('calc-spd').value);

            // 限制防呆
            if (isNaN(idVal) || idVal < 0 || idVal > 253) idVal = 1;
            if (isNaN(posVal) || posVal < 0 || posVal > 1023) posVal = 512;
            if (isNaN(spdVal) || spdVal < 0 || spdVal > 1023) spdVal = 512;

            // 長度常數
            const len = 7;
            const inst = 3;
            const addr = 30;

            // 拆解 16-bit 位置與速度
            const posL = posVal & 0xFF;
            const posH = (posVal >> 8) & 0xFF;
            const spdL = spdVal & 0xFF;
            const spdH = (spdVal >> 8) & 0xFF;

            // 計算 Checksum (0xFF - (ID + Len + Inst + Addr + PosL + PosH + SpdL + SpdH))
            const sumBytes = idVal + len + inst + addr + posL + posH + spdL + spdH;
            const checksum = (0xFF - (sumBytes & 0xFF)) & 0xFF;

            // 更新網頁欄位顯示 (轉換為大寫 Hex 字串)
            document.getElementById('pkg-id').innerText = toHex(idVal);
            document.getElementById('pkg-pos-l').innerText = toHex(posL);
            document.getElementById('pkg-pos-h').innerText = toHex(posH);
            document.getElementById('pkg-spd-l').innerText = toHex(spdL);
            document.getElementById('pkg-spd-h').innerText = toHex(spdH);
            document.getElementById('pkg-chk').innerText = toHex(checksum);

            // 更新詳細算式顯示
            const formulaText = `計算過程：0xFF - (0x${toHex(idVal)} + 0x07 + 0x03 + 0x1E + 0x${toHex(posL)} + 0x${toHex(posH)} + 0x${toHex(spdL)} + 0x${toHex(spdH)}) = 0xFF - 0x${(sumBytes & 0xFF).toString(16).toUpperCase()} = 0x${checksum.toString(16).toUpperCase()}`;
            document.getElementById('calc-formula-detail').innerText = formulaText;
        }

        function toHex(val) {
            let hexStr = val.toString(16).toUpperCase();
            return hexStr.length < 2 ? '0' + hexStr : hexStr;
        }
