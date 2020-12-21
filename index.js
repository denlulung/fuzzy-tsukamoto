const _ = require('lodash');
//PRODUCT ABC

//VARIABEL & HIMPUNAN:
// PERMINTAAN: TURUN & NAIK
// PERSEDIAAN: SEDIKIT & BANYAK
//PRODUKSI: BERKURANG & BERTAMBAH

//RULE:
// 1. IF permintaan TURUN and persediaan BANYAK THEN produksi BERKURANG;
// 2. IF permintaan TURUN and persediaan SEDIKIT THEN produksi BERKURANG;
// 3. IF permintaan NAIK and persediaan BANYAK THEN produksi BERTAMBAH;
// 4. IF permintaan NAIK and persediaan SEDIKIT THEN produksi BERTAMBAH;

//SETUP HUMPUNAN:
//HIMPUNAN VARIABEL PERMINTAAN:
//PERMINTAAN NAIK (pmNaik)
const pmNaikFrom = 1000;
const pmNaikTo = 5000;

//PERMINTAAN TURUN (pmTurun)
const pmTurunFrom = 1000;
const pmTurunTo = 5000;

//HIMPUNAN VARIABEL PERSEDIAAN:
//PERSEDIAAN BANYAK (psBanyak)
const psBanyakFrom = 100;
const psBanyakTo = 600;

//PERSEDIAAN SEDIKIT (psSedikit)
const psSedikitFrom = 100;
const psSedikitTo = 600;

//HIMPUNAN VARIABEL PRODUKSI:
//PRODUKSI BERTAMBAH (prBertambah)
const prBertambahFrom = 2000;
const prBertambahTo = 7000;

//PRODUKSI BERKURANG (prBerkurang)
const prBerkurangFrom = 2000;
const prBerkurangTo = 7000;

//PERMASALAHAN (INPUT):
//berapa produksi jika
let nPermintaan = 4000;
let nPersediaan = 300;

//FUNGSI:
const anggotaPermintaan = (permintaan) => {
    let turun = (pmTurunTo - permintaan) / (pmTurunTo-pmTurunFrom);
    let naik = (permintaan-pmNaikFrom) / (pmNaikTo-pmNaikFrom);

    return {turun, naik};
}

const anggotaPersediaan = (persediaan) => {
    let sedikit = (psSedikitTo - persediaan) / (psSedikitTo-psSedikitFrom);
    let banyak = (persediaan-psBanyakFrom) / (psBanyakTo-psBanyakFrom);

    return {sedikit, banyak};
}

// const anggotaProduksi = (produksi) => {
//     let kurang = (prBerkurangTo - produksi) / (prBerkurangTo-prBerkurangFrom);
//     let tambah = (produksi-prBertambahFrom) / (prBertambahTo-prBertambahFrom);

//     return {kurang, tambah};
// }

const cariNilaiZKurang = (keanggotaanZ) => {
    return (keanggotaanZ * (prBerkurangTo-prBerkurangFrom) - prBerkurangTo) * -1
}

const cariNilaiZTambah = (keanggotaanZ) => {
    return keanggotaanZ * (prBertambahTo-prBertambahFrom) + prBertambahFrom
}

//fungsi menghitung nilai z (produksi)
// metode tsukamoto
const nilaiProduksi = (permintaan, persediaan) => {
    let z = [];
    let keanggotaanZ = [];

    //rule 1
    //IF permintaan TURUN and persediaan BANYAK THEN produksi BERKURANG;
    z.push(Math.min(anggotaPermintaan(permintaan).turun, anggotaPersediaan(persediaan).banyak));
    keanggotaanZ.push(cariNilaiZKurang(z[0]));

    //rule2
    //IF permintaan TURUN and persediaan SEDIKIT THEN produksi BERKURANG;
    z.push(Math.min(anggotaPermintaan(permintaan).turun, anggotaPersediaan(persediaan).sedikit));
    keanggotaanZ.push(cariNilaiZKurang(z[1]));

    //rule3
    //IF permintaan NAIK and persediaan BANYAK THEN produksi BERTAMBAH;
    z.push(Math.min(anggotaPermintaan(permintaan).naik, anggotaPersediaan(persediaan).banyak));
    keanggotaanZ.push(cariNilaiZTambah(z[2]));

    //rule4
    //IF permintaan NAIK and persediaan SEDIKIT THEN produksi BERTAMBAH;
    z.push(Math.min(anggotaPermintaan(permintaan).naik, anggotaPersediaan(persediaan).sedikit));
    keanggotaanZ.push(cariNilaiZTambah(z[3]));

    let n = 0;
    for (let i = 0; i < 4; i++) {
        n = n+ (z[i]*keanggotaanZ[i]);
    }

    return Math.round(n/_.sum(z));

}


console.log(`permintaan: ${nPermintaan}`)
console.log(`persediaan: ${nPersediaan}`)
console.log(`Jadi, jumlah makanan kaleng yang harus di produksi adalah ${nilaiProduksi(nPermintaan, nPersediaan)} kemasan`);