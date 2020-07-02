export default function bwEncrypt(sIn) {
        var sOut, iLen, iLenAdd, iSeed, iSeedL;
        var i;

        if (sIn == "" || sIn == null)
            return "";
        sOut = "";
        iLen = sIn.length;
        iSeed = Math.floor(Math.random() * 50000 + 10000);
        iSeedL = iSeed % 256;
        sOut += bw_itos(iSeed).substr(1, 4);
        if (iLen < 256) {
            sOut += bw_itos(iSeedL ^ iLen);
        } else {
            sOut += bw_itos(iSeed ^ iLen);
        }
        for (i = 0; i < iLen; i++) {
            if (sIn.charCodeAt(i) < 256) {
                sOut += bw_itos(iSeedL ^ sIn.charCodeAt(i));
            } else {
                sOut += bw_itos(iSeed ^ sIn.charCodeAt(i));
            }
        }
        if (sOut.length >= 16)
            return sOut;
        iLenAdd = 16 - sOut.length;
        for (i = 0; i < iLenAdd; i++)
            sOut += bw_itos(Math.floor(Math.random() * 256));
        return sOut;
    }

    function bw_itos(val) {
        var sOut, iH, iL;

        sOut = "";
        iH = Math.floor(val / 256);
        iL = val % 256;
        if (iH > 0)
            sOut += String.fromCharCode(113) + String.fromCharCode(97 + Math.floor(iH / 16)) + String.fromCharCode(97 + iH %
                16)
        sOut += String.fromCharCode(97 + Math.floor(iL / 16)) + String.fromCharCode(97 + iL % 16);

        return sOut;
    }
