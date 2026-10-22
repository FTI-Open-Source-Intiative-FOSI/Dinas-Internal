// Mock Data - BEM KM FTI UNAND (Kabinet Vismayakriya 2025/2026)
// Sesuai Grand Proposal BEM KM FTI UNAND

export const ORGANISASI = {
  nama: 'BEM KM FTI Universitas Andalas',
  kabinet: 'Vismayakriya',
  periode: '2025/2026',
  totalPengurus: 81,
  totalUnit: 10,
  logo: '/logo-bem.png'
};

export const ROLES = {
  GUBERNUR: 'Gubernur',
  WAKIL_GUBERNUR: 'Wakil Gubernur',
  SEKRETARIS_DAERAH: 'Sekretaris Daerah',
  BENDAHARA_DAERAH: 'Bendahara Daerah',
  KEPALA_DINAS: 'Kepala Dinas',
  SEKRETARIS_DINAS: 'Sekretaris Dinas',
  BENDAHARA_DINAS: 'Bendahara Dinas',
  KEPALA_BIRO: 'Kepala Biro',
  SEKRETARIS_BIRO: 'Sekretaris Biro',
  BENDAHARA_BIRO: 'Bendahara Biro',
  STAFF: 'Staff',
};

// Pengurus Inti: Gubernur, Wagub, Sekda, Benda
export const ROLES_INTI = [
  ROLES.GUBERNUR,
  ROLES.WAKIL_GUBERNUR,
  ROLES.SEKRETARIS_DAERAH,
  ROLES.BENDAHARA_DAERAH
];

// Presidium BEM: Pengurus Inti + Kepala Dinas (Kadin) + Sekretaris Dinas (Sekdin) + Kepala Biro + Sekretaris Biro
export const ROLES_PRESIDIUM = [
  ...ROLES_INTI,
  ROLES.KEPALA_DINAS,
  ROLES.KEPALA_BIRO,
  ROLES.SEKRETARIS_DINAS,
  ROLES.SEKRETARIS_BIRO
];

export const DINAS_LIST = [
  {
    "id": "audkes",
    "kode": "AUDKES",
    "nama": "Biro AUDKES",
    "tipe": "Biro",
    "namaLengkap": "Biro Audit Internal dan Kestari"
  },
  {
    "id": "kso",
    "kode": "KSO",
    "nama": "Biro KSO",
    "tipe": "Biro",
    "namaLengkap": "Biro Kesenian dan Olahraga"
  },
  {
    "id": "adkesma",
    "kode": "ADKESMA",
    "nama": "Dinas ADKESMA",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Advokasi dan Kesejahteraan Mahasiswa"
  },
  {
    "id": "eksternal",
    "kode": "EKSTERNAL",
    "nama": "Dinas EKSTERNAL",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Hubungan Eksternal"
  },
  {
    "id": "internal",
    "kode": "INTERNAL",
    "nama": "Dinas INTERNAL",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Hubungan Internal"
  },
  {
    "id": "kastrat",
    "kode": "KASTRAT",
    "nama": "Dinas KASTRAT",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Kajian dan Aksi Strategis"
  },
  {
    "id": "medinkraf",
    "kode": "MEDINKRAF",
    "nama": "Dinas MEDINKRAF",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Media Informasi Kreatif"
  },
  {
    "id": "psdm",
    "kode": "PSDM",
    "nama": "Dinas PSDM",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Pengembangan Sumber Daya Mahasiswa"
  },
  {
    "id": "ristek",
    "kode": "RISTEK",
    "nama": "Dinas RISTEK",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Riset dan Teknologi"
  },
  {
    "id": "sosmasling",
    "kode": "SOSMASLING",
    "nama": "Dinas SOSMASLING",
    "tipe": "Dinas",
    "namaLengkap": "Dinas Sosial Masyarakat dan Lingkungan"
  },
  {
    "id": "sekda",
    "kode": "SEKDA",
    "nama": "Sekretaris Daerah",
    "tipe": "Inti",
    "namaLengkap": "Sekretariat Daerah BEM KM FTI UNAND"
  },
  {
    "id": "benda",
    "kode": "BENDA",
    "nama": "Bendahara Daerah",
    "tipe": "Inti",
    "namaLengkap": "Kebendaharaan Daerah BEM KM FTI UNAND"
  }
];

export const USERS = [
  {
    "id": "u1",
    "nama": "Mujahid Adlis Salam",
    "email": "mujahid.adlis@bem.fti.unand.ac.id",
    "role": "Gubernur",
    "dinasId": null,
    "avatar": "MS"
  },
  {
    "id": "u81",
    "nama": "Muhammad Farid Junaidi",
    "email": "muhammad.farid.junaidi@bem.fti.unand.ac.id",
    "role": "Wakil Gubernur",
    "dinasId": null,
    "avatar": "FJ"
  },
  {
    "id": "u2",
    "nama": "Alya Ananta Taufik",
    "email": "alya.ananta@bem.fti.unand.ac.id",
    "role": "Sekretaris Daerah",
    "dinasId": "sekda",
    "avatar": "AT"
  },
  {
    "id": "u3",
    "nama": "Ashyra Prasiwi",
    "email": "ashyra.prasiwi@bem.fti.unand.ac.id",
    "role": "Bendahara Daerah",
    "dinasId": "benda",
    "avatar": "AP"
  },
  {
    "id": "u4",
    "nama": "Equilibrilio Adilia",
    "email": "equilibrilio.adilia@bem.fti.unand.ac.id",
    "role": "Kepala Biro",
    "dinasId": "audkes",
    "avatar": "EA"
  },
  {
    "id": "u5",
    "nama": "Monica Cania",
    "email": "monica.cania@bem.fti.unand.ac.id",
    "role": "Sekretaris Biro",
    "dinasId": "audkes",
    "avatar": "MC"
  },
  {
    "id": "u6",
    "nama": "Naira Ramadhani Halil",
    "email": "naira.ramadhani@bem.fti.unand.ac.id",
    "role": "Bendahara Biro",
    "dinasId": "audkes",
    "avatar": "NH"
  },
  {
    "id": "u7",
    "nama": "Muhammad Rafi Saddiq",
    "email": "muhammad.rafi@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "audkes",
    "avatar": "MS"
  },
  {
    "id": "u8",
    "nama": "Habbiel Zidanu Arsa",
    "email": "habbiel.zidanu@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "audkes",
    "avatar": "HA"
  },
  {
    "id": "u9",
    "nama": "Aliyah Zahratul Salsa Dira",
    "email": "aliyah.zahratul@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "audkes",
    "avatar": "AD"
  },
  {
    "id": "u10",
    "nama": "Shofiya Naura Jannah",
    "email": "shofiya.naura@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "audkes",
    "avatar": "SJ"
  },
  {
    "id": "u11",
    "nama": "Rifdah Adela Putri",
    "email": "rifdah.adela@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "audkes",
    "avatar": "RP"
  },
  {
    "id": "u12",
    "nama": "Muhammad Farrel Giovanni",
    "email": "muhammad.farrel@bem.fti.unand.ac.id",
    "role": "Kepala Biro",
    "dinasId": "kso",
    "avatar": "MG"
  },
  {
    "id": "u13",
    "nama": "Adila Bintang Fauzi",
    "email": "adila.bintang@bem.fti.unand.ac.id",
    "role": "Sekretaris Biro",
    "dinasId": "kso",
    "avatar": "AF"
  },
  {
    "id": "u14",
    "nama": "Aisyah Desti Mitalianti",
    "email": "aisyah.desti@bem.fti.unand.ac.id",
    "role": "Bendahara Biro",
    "dinasId": "kso",
    "avatar": "AM"
  },
  {
    "id": "u15",
    "nama": "Fazwa Nisabila",
    "email": "fazwa.nisabila@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kso",
    "avatar": "FN"
  },
  {
    "id": "u16",
    "nama": "Haziq Raihandira",
    "email": "haziq.raihandira@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kso",
    "avatar": "HR"
  },
  {
    "id": "u17",
    "nama": "Endy Pardilian",
    "email": "endy.pardilian@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kso",
    "avatar": "EP"
  },
  {
    "id": "u18",
    "nama": "Filzi Jelila Inda Robbani",
    "email": "filzi.jelila@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kso",
    "avatar": "FR"
  },
  {
    "id": "u19",
    "nama": "Alexandra Beatrice Sjamsuardi",
    "email": "alexandra.beatrice@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kso",
    "avatar": "AS"
  },
  {
    "id": "u20",
    "nama": "Ahmad Faiz Batubara",
    "email": "ahmad.faiz@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "adkesma",
    "avatar": "AB"
  },
  {
    "id": "u21",
    "nama": "Khalisah Iori Syakirah",
    "email": "khalisah.iori@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "adkesma",
    "avatar": "KS"
  },
  {
    "id": "u22",
    "nama": "Syakira Naura Jannah",
    "email": "syakira.naura@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "adkesma",
    "avatar": "SJ"
  },
  {
    "id": "u23",
    "nama": "Muhammad Fajri Aulia",
    "email": "muhammad.fajri@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "adkesma",
    "avatar": "MA"
  },
  {
    "id": "u24",
    "nama": "Dwi Sonnia Rahmadani",
    "email": "dwi.sonnia@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "adkesma",
    "avatar": "DR"
  },
  {
    "id": "u25",
    "nama": "Hana Rahmadini",
    "email": "hana.rahmadini@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "adkesma",
    "avatar": "HR"
  },
  {
    "id": "u26",
    "nama": "Zahra Nurmaya",
    "email": "zahra.nurmaya@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "adkesma",
    "avatar": "ZN"
  },
  {
    "id": "u27",
    "nama": "Abdul Jabbar",
    "email": "abdul.jabbar@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "adkesma",
    "avatar": "AJ"
  },
  {
    "id": "u28",
    "nama": "Dzakira Hapsarini",
    "email": "dzakira.hapsarini@bem.fti.unand.ac.id",
    "role": "Nonaktif (Akses Dicabut)",
    "dinasId": "eksternal",
    "avatar": "DH",
    "isRevoked": true,
    "statusAkses": "Dicabut"
  },
  {
    "id": "u29",
    "nama": "Alya Putri Helda",
    "email": "alya.putri@bem.fti.unand.ac.id",
    "role": "Nonaktif (Akses Dicabut)",
    "dinasId": "eksternal",
    "avatar": "AH",
    "isRevoked": true,
    "statusAkses": "Dicabut"
  },
  {
    "id": "u30",
    "nama": "Zaskya Marvira",
    "email": "zaskya.marvira@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "eksternal",
    "avatar": "ZM"
  },
  {
    "id": "u31",
    "nama": "Weldia Novianda",
    "email": "weldia.novianda@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "eksternal",
    "avatar": "WN"
  },
  {
    "id": "u32",
    "nama": "Aisyah Widia Wati",
    "email": "aisyah.widia@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "eksternal",
    "avatar": "AW"
  },
  {
    "id": "u33",
    "nama": "Kesya Ashilah Rianto",
    "email": "kesya.ashilah@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "eksternal",
    "avatar": "KR"
  },
  {
    "id": "u34",
    "nama": "Muhammad Zaky Ilham",
    "email": "muhammad.zaky@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "eksternal",
    "avatar": "MI"
  },
  {
    "id": "u35",
    "nama": "Muhammad Farid Al Hafiz",
    "email": "muhammad.farid@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "eksternal",
    "avatar": "MH"
  },
  {
    "id": "u36",
    "nama": "Ferdian Rahman",
    "email": "ferdian.rahman@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "internal",
    "avatar": "FR"
  },
  {
    "id": "u37",
    "nama": "Adinda Queen Salsabilla",
    "email": "adinda.queen@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "internal",
    "avatar": "AS"
  },
  {
    "id": "u38",
    "nama": "Siti Kayla Reyhana",
    "email": "siti.kayla@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "internal",
    "avatar": "SR"
  },
  {
    "id": "u39",
    "nama": "Muhammad Yusuf",
    "email": "muhammad.yusuf@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "internal",
    "avatar": "MY"
  },
  {
    "id": "u40",
    "nama": "Sasya Zamora",
    "email": "sasya.zamora@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "internal",
    "avatar": "SZ"
  },
  {
    "id": "u41",
    "nama": "Ramadhani Amelia Putri",
    "email": "ramadhani.amelia@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "internal",
    "avatar": "RP"
  },
  {
    "id": "u42",
    "nama": "Muhammad Arief Nasril",
    "email": "muhammad.arief@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "internal",
    "avatar": "MN"
  },
  {
    "id": "u43",
    "nama": "Muhammad Athaya Abriansyah",
    "email": "muhammad.athaya@bem.fti.unand.ac.id",
    "role": "Nonaktif (Akses Dicabut)",
    "dinasId": "internal",
    "avatar": "MA",
    "isRevoked": true,
    "statusAkses": "Dicabut"
  },
  {
    "id": "u44",
    "nama": "Bayu Mutawakkil",
    "email": "bayu.mutawakkil@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "kastrat",
    "avatar": "BM"
  },
  {
    "id": "u45",
    "nama": "Rajel Novita",
    "email": "rajel.novita@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "kastrat",
    "avatar": "RN"
  },
  {
    "id": "u46",
    "nama": "Nadya Ulya Ramdhani",
    "email": "nadya.ulya@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "kastrat",
    "avatar": "NR"
  },
  {
    "id": "u47",
    "nama": "Luthfi Khairan Fauzan",
    "email": "luthfi.khairan@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kastrat",
    "avatar": "LF"
  },
  {
    "id": "u48",
    "nama": "Muhammad Nafil Makarim",
    "email": "muhammad.nafil@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kastrat",
    "avatar": "MM"
  },
  {
    "id": "u49",
    "nama": "Adam Maulana",
    "email": "adam.maulana@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kastrat",
    "avatar": "AM"
  },
  {
    "id": "u50",
    "nama": "Muhammad Teguh Al Ihsan",
    "email": "muhammad.teguh@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "kastrat",
    "avatar": "MI"
  },
  {
    "id": "u51",
    "nama": "Muhammad Ikhsan Pratama",
    "email": "muhammad.ikhsan@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "medinkraf",
    "avatar": "MP"
  },
  {
    "id": "u52",
    "nama": "Fazira Naysa",
    "email": "fazira.naysa@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "medinkraf",
    "avatar": "FN"
  },
  {
    "id": "u53",
    "nama": "Najma Hayett De Vitra",
    "email": "najma.hayett@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "medinkraf",
    "avatar": "NV"
  },
  {
    "id": "u54",
    "nama": "Adhitya Naufal",
    "email": "adhitya.naufal@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "medinkraf",
    "avatar": "AN"
  },
  {
    "id": "u55",
    "nama": "Raditya Hafis Abyanka",
    "email": "raditya.hafis@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "medinkraf",
    "avatar": "RA"
  },
  {
    "id": "u56",
    "nama": "Nazwa Mutiara Sabila",
    "email": "nazwa.mutiara@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "medinkraf",
    "avatar": "NS"
  },
  {
    "id": "u57",
    "nama": "Neza Kurnia Lahimi",
    "email": "neza.kurnia@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "medinkraf",
    "avatar": "NL"
  },
  {
    "id": "u58",
    "nama": "Zaki Alfurqani",
    "email": "zaki.alfurqani@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "psdm",
    "avatar": "ZA"
  },
  {
    "id": "u59",
    "nama": "Adinda Najwa Otvatiani",
    "email": "adinda.najwa@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "psdm",
    "avatar": "AO"
  },
  {
    "id": "u60",
    "nama": "Farrah Aulia",
    "email": "farrah.aulia@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "psdm",
    "avatar": "FA"
  },
  {
    "id": "u61",
    "nama": "Anatasya Noveralda",
    "email": "anatasya.noveralda@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "psdm",
    "avatar": "AN"
  },
  {
    "id": "u62",
    "nama": "Rembrand Sardi",
    "email": "rembrand.sardi@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "psdm",
    "avatar": "RS"
  },
  {
    "id": "u63",
    "nama": "Nabila Syahrani",
    "email": "nabila.syahrani@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "psdm",
    "avatar": "NS"
  },
  {
    "id": "u64",
    "nama": "Ghinada Fathanawafa Algma",
    "email": "ghinada.fathanawafa@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "psdm",
    "avatar": "GA"
  },
  {
    "id": "u65",
    "nama": "Lathifa Zahra",
    "email": "lathifa.zahra@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "psdm",
    "avatar": "LZ"
  },
  {
    "id": "u66",
    "nama": "Arib Jilham",
    "email": "arib.jilham@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "ristek",
    "avatar": "AJ"
  },
  {
    "id": "u67",
    "nama": "Ayesah Lutfiah Maharani",
    "email": "ayesah.lutfiah@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "ristek",
    "avatar": "AM"
  },
  {
    "id": "u68",
    "nama": "Dwimirza Intania Arsy",
    "email": "dwimirza.intania@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "ristek",
    "avatar": "DA"
  },
  {
    "id": "u69",
    "nama": "Raffael Syahadat Fahlevi",
    "email": "raffael.syahadat@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "ristek",
    "avatar": "RF"
  },
  {
    "id": "u70",
    "nama": "Bintang Veraldi Nibraceae",
    "email": "bintang.veraldi@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "ristek",
    "avatar": "BN"
  },
  {
    "id": "u71",
    "nama": "Davina Noerfazhira",
    "email": "davina.noerfazhira@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "ristek",
    "avatar": "DN"
  },
  {
    "id": "u72",
    "nama": "Salsabiil Aqiilah",
    "email": "salsabiil.aqiilah@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "ristek",
    "avatar": "SA"
  },
  {
    "id": "u73",
    "nama": "Faiz Anargya",
    "email": "faiz.anargya@bem.fti.unand.ac.id",
    "role": "Kepala Dinas",
    "dinasId": "sosmasling",
    "avatar": "FA"
  },
  {
    "id": "u74",
    "nama": "Zhafira Fatihah Oswiputri",
    "email": "zhafira.fatihah@bem.fti.unand.ac.id",
    "role": "Sekretaris Dinas",
    "dinasId": "sosmasling",
    "avatar": "ZO"
  },
  {
    "id": "u75",
    "nama": "Alisha Zhahira Zulfis",
    "email": "alisha.zhahira@bem.fti.unand.ac.id",
    "role": "Bendahara Dinas",
    "dinasId": "sosmasling",
    "avatar": "AZ"
  },
  {
    "id": "u76",
    "nama": "Nadine Latisha Elanda",
    "email": "nadine.latisha@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "sosmasling",
    "avatar": "NE"
  },
  {
    "id": "u77",
    "nama": "Yollin Irwan",
    "email": "yollin.irwan@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "sosmasling",
    "avatar": "YI"
  },
  {
    "id": "u78",
    "nama": "Ultan Pradipa Al Fitra",
    "email": "ultan.pradipa@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "sosmasling",
    "avatar": "UF"
  },
  {
    "id": "u79",
    "nama": "Kevin Andhika",
    "email": "kevin.andhika@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "sosmasling",
    "avatar": "KA"
  },
  {
    "id": "u80",
    "nama": "M. Ghaza Pratama",
    "email": "m.ghaza@bem.fti.unand.ac.id",
    "role": "Staff",
    "dinasId": "sosmasling",
    "avatar": "MP"
  }
];

export const STATUS_PROKER = {
  BELUM_MULAI: 'Belum Mulai',
  PERSIAPAN: 'Persiapan',
  BERJALAN: 'Berjalan',
  TERTUNDA: 'Tertunda',
  SELESAI: 'Selesai',
};

export const PROGRAM_KERJA = [
  {
    "id": "pk1",
    "nama": "Maternal (Manajemen Kinerja Internal)",
    "dinasId": "audkes",
    "picId": "u4",
    "deskripsi": "Program kerja Maternal (Manajemen Kinerja Internal) oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Seluruh pengurus BEM.",
    "target": "Seluruh pengurus BEM",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-30",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Maternal (Manajemen Kinerja Internal) berjalan sesuai rencana kerja unit.",
        "author": "u4"
      }
    ]
  },
  {
    "id": "pk2",
    "nama": "Sentra Arsip",
    "dinasId": "audkes",
    "picId": "u5",
    "deskripsi": "Program kerja Sentra Arsip oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Digitalisasi seluruh arsip BEM.",
    "target": "Digitalisasi seluruh arsip BEM",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-15",
    "status": "Berjalan",
    "progress": 75,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 38,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Sentra Arsip berjalan sesuai rencana kerja unit.",
        "author": "u5"
      }
    ]
  },
  {
    "id": "pk3",
    "nama": "Internal Performance Review",
    "dinasId": "audkes",
    "picId": "u6",
    "deskripsi": "Program kerja Internal Performance Review oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Evaluasi triwulanan 10 unit kerja.",
    "target": "Evaluasi triwulanan 10 unit kerja",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-10",
    "status": "Persiapan",
    "progress": 30,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Internal Performance Review berjalan sesuai rencana kerja unit.",
        "author": "u6"
      }
    ]
  },
  {
    "id": "pk4",
    "nama": "Harmoni Vismayakriya",
    "dinasId": "audkes",
    "picId": "u7",
    "deskripsi": "Program kerja Harmoni Vismayakriya oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Bonding seluruh pengurus 81 orang.",
    "target": "Bonding seluruh pengurus 81 orang",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-25",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Harmoni Vismayakriya telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u7"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Harmoni Vismayakriya berjalan sesuai rencana kerja unit.",
        "author": "u7"
      }
    ]
  },
  {
    "id": "pk5",
    "nama": "Staff of The Month",
    "dinasId": "audkes",
    "picId": "u8",
    "deskripsi": "Program kerja Staff of The Month oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Apresiasi bulanan staf teladan.",
    "target": "Apresiasi bulanan staf teladan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 50,
    "anggaran": 1200000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 66,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Staff of The Month berjalan sesuai rencana kerja unit.",
        "author": "u8"
      }
    ]
  },
  {
    "id": "pk6",
    "nama": "Ornament (Organization Development)",
    "dinasId": "audkes",
    "picId": "u9",
    "deskripsi": "Program kerja Ornament (Organization Development) oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Workshop penguatan kapasitas internal.",
    "target": "Workshop penguatan kapasitas internal",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-25",
    "status": "Persiapan",
    "progress": 25,
    "anggaran": 3000000,
    "kendala": "Menunggu pencairan tahap 1 dan finalisasi lokasi kegiatan.",
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Ornament (Organization Development) berjalan sesuai rencana kerja unit.",
        "author": "u9"
      }
    ]
  },
  {
    "id": "pk7",
    "nama": "Jejak Pengabdian",
    "dinasId": "audkes",
    "picId": "u10",
    "deskripsi": "Program kerja Jejak Pengabdian oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Buku rekam jejak kepengurusan Vismayakriya.",
    "target": "Buku rekam jejak kepengurusan Vismayakriya",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-20",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Jejak Pengabdian berjalan sesuai rencana kerja unit.",
        "author": "u10"
      }
    ]
  },
  {
    "id": "pk8",
    "nama": "Certificate of Service",
    "dinasId": "audkes",
    "picId": "u11",
    "deskripsi": "Program kerja Certificate of Service oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Penerbitan sertifikat kepengurusan resmi.",
    "target": "Penerbitan sertifikat kepengurusan resmi",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-28",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Certificate of Service berjalan sesuai rencana kerja unit.",
        "author": "u11"
      }
    ]
  },
  {
    "id": "pk9",
    "nama": "VisMart",
    "dinasId": "audkes",
    "picId": "u4",
    "deskripsi": "Program kerja VisMart oleh AUDKES Kabinet Vismayakriya 2025/2026. Target: Pengelolaan etalase merchandise dan logistik BEM.",
    "target": "Pengelolaan etalase merchandise dan logistik BEM",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-20",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 5000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan VisMart berjalan sesuai rencana kerja unit.",
        "author": "u4"
      }
    ]
  },
  {
    "id": "pk10",
    "nama": "RUKES",
    "dinasId": "kso",
    "picId": "u13",
    "deskripsi": "Program kerja RUKES oleh KSO Kabinet Vismayakriya 2025/2026. Target: Ruang unjuk bakat kesenian mahasiswa FTI.",
    "target": "Ruang unjuk bakat kesenian mahasiswa FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-15",
    "status": "Persiapan",
    "progress": 35,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 17,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan RUKES berjalan sesuai rencana kerja unit.",
        "author": "u13"
      }
    ]
  },
  {
    "id": "pk11",
    "nama": "RUKO",
    "dinasId": "kso",
    "picId": "u14",
    "deskripsi": "Program kerja RUKO oleh KSO Kabinet Vismayakriya 2025/2026. Target: Latihan rutin dan sparring olahraga mingguan.",
    "target": "Latihan rutin dan sparring olahraga mingguan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-10",
    "status": "Berjalan",
    "progress": 65,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 13,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan RUKO berjalan sesuai rencana kerja unit.",
        "author": "u14"
      }
    ]
  },
  {
    "id": "pk12",
    "nama": "FTI CUP 2026",
    "dinasId": "kso",
    "picId": "u15",
    "deskripsi": "Program kerja FTI CUP 2026 oleh KSO Kabinet Vismayakriya 2025/2026. Target: Kompetisi olahraga & seni antar angkatan FTI.",
    "target": "Kompetisi olahraga & seni antar angkatan FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-15",
    "status": "Persiapan",
    "progress": 40,
    "anggaran": 22000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 33,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI CUP 2026 berjalan sesuai rencana kerja unit.",
        "author": "u15"
      }
    ]
  },
  {
    "id": "pk13",
    "nama": "FTI SPORT",
    "dinasId": "kso",
    "picId": "u16",
    "deskripsi": "Program kerja FTI SPORT oleh KSO Kabinet Vismayakriya 2025/2026. Target: Fun run & senam bersama civitas akademika FTI.",
    "target": "Fun run & senam bersama civitas akademika FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-30",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 4500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan FTI SPORT telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u16"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI SPORT berjalan sesuai rencana kerja unit.",
        "author": "u16"
      }
    ]
  },
  {
    "id": "pk14",
    "nama": "Database Adkesma",
    "dinasId": "adkesma",
    "picId": "u25",
    "deskripsi": "Program kerja Database Adkesma oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Pemetaan komprehensif isu dan keluhan mahasiswa.",
    "target": "Pemetaan komprehensif isu dan keluhan mahasiswa",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-10",
    "status": "Berjalan",
    "progress": 80,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Database Adkesma berjalan sesuai rencana kerja unit.",
        "author": "u25"
      }
    ]
  },
  {
    "id": "pk15",
    "nama": "SEKAWAN (Seminar Kemahasiswaan)",
    "dinasId": "adkesma",
    "picId": "u26",
    "deskripsi": "Program kerja SEKAWAN (Seminar Kemahasiswaan) oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: 200 mahasiswa FTI UNAND.",
    "target": "200 mahasiswa FTI UNAND",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-05",
    "status": "Berjalan",
    "progress": 65,
    "anggaran": 8500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 13,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan SEKAWAN (Seminar Kemahasiswaan) berjalan sesuai rencana kerja unit.",
        "author": "u26"
      }
    ]
  },
  {
    "id": "pk16",
    "nama": "Interscholar",
    "dinasId": "adkesma",
    "picId": "u27",
    "deskripsi": "Program kerja Interscholar oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Info beasiswa dan pendampingan seleksi 50+ pendaftar.",
    "target": "Info beasiswa dan pendampingan seleksi 50+ pendaftar",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-25",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Interscholar berjalan sesuai rencana kerja unit.",
        "author": "u27"
      }
    ]
  },
  {
    "id": "pk17",
    "nama": "IPK+",
    "dinasId": "adkesma",
    "picId": "u20",
    "deskripsi": "Program kerja IPK+ oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Bimbingan belajar dan tutorial mata kuliah dasar teknik/TI.",
    "target": "Bimbingan belajar dan tutorial mata kuliah dasar teknik/TI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-20",
    "status": "Persiapan",
    "progress": 20,
    "anggaran": 3000000,
    "kendala": "Menunggu pencairan tahap 1 dan finalisasi lokasi kegiatan.",
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan IPK+ berjalan sesuai rencana kerja unit.",
        "author": "u20"
      }
    ]
  },
  {
    "id": "pk18",
    "nama": "Sahabat FTI",
    "dinasId": "adkesma",
    "picId": "u21",
    "deskripsi": "Program kerja Sahabat FTI oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Layanan konseling sebaya dan advokasi mental health.",
    "target": "Layanan konseling sebaya dan advokasi mental health",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-15",
    "status": "Berjalan",
    "progress": 55,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 83,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Sahabat FTI berjalan sesuai rencana kerja unit.",
        "author": "u21"
      }
    ]
  },
  {
    "id": "pk19",
    "nama": "Maba care",
    "dinasId": "adkesma",
    "picId": "u22",
    "deskripsi": "Program kerja Maba care oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Pendampingan adaptasi mahasiswa baru FTI.",
    "target": "Pendampingan adaptasi mahasiswa baru FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-31",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 6000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Maba care telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u22"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Maba care berjalan sesuai rencana kerja unit.",
        "author": "u22"
      }
    ]
  },
  {
    "id": "pk20",
    "nama": "Advotalk",
    "dinasId": "adkesma",
    "picId": "u23",
    "deskripsi": "Program kerja Advotalk oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Podcast & talkshow interaktif pembahasan isu kampus.",
    "target": "Podcast & talkshow interaktif pembahasan isu kampus",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-05",
    "status": "Berjalan",
    "progress": 45,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Advotalk berjalan sesuai rencana kerja unit.",
        "author": "u23"
      }
    ]
  },
  {
    "id": "pk21",
    "nama": "VismaCare",
    "dinasId": "adkesma",
    "picId": "u24",
    "deskripsi": "Program kerja VismaCare oleh ADKESMA Kabinet Vismayakriya 2025/2026. Target: Bantuan tanggap darurat finansial mahasiswa FTI.",
    "target": "Bantuan tanggap darurat finansial mahasiswa FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-30",
    "status": "Berjalan",
    "progress": 50,
    "anggaran": 5000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 66,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan VismaCare berjalan sesuai rencana kerja unit.",
        "author": "u24"
      }
    ]
  },
  {
    "id": "pk22",
    "nama": "BEM Visit",
    "dinasId": "eksternal",
    "picId": "u33",
    "deskripsi": "Program kerja BEM Visit oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Kunjungan studi banding ke 3 BEM universitas terkemuka.",
    "target": "Kunjungan studi banding ke 3 BEM universitas terkemuka",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-30",
    "status": "Persiapan",
    "progress": 30,
    "anggaran": 6000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan BEM Visit berjalan sesuai rencana kerja unit.",
        "author": "u33"
      }
    ]
  },
  {
    "id": "pk23",
    "nama": "Explore FTI",
    "dinasId": "eksternal",
    "picId": "u34",
    "deskripsi": "Program kerja Explore FTI oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Kunjungan edukasi siswa SMA/SMK ke laboratorium FTI.",
    "target": "Kunjungan edukasi siswa SMA/SMK ke laboratorium FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-20",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Explore FTI berjalan sesuai rencana kerja unit.",
        "author": "u34"
      }
    ]
  },
  {
    "id": "pk24",
    "nama": "Media Partner",
    "dinasId": "eksternal",
    "picId": "u35",
    "deskripsi": "Program kerja Media Partner oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Kolaborasi publikasi dengan 30+ institusi eksternal.",
    "target": "Kolaborasi publikasi dengan 30+ institusi eksternal",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 85,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 63,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Media Partner berjalan sesuai rencana kerja unit.",
        "author": "u35"
      }
    ]
  },
  {
    "id": "pk25",
    "nama": "FTI Reconnect",
    "dinasId": "eksternal",
    "picId": "u35",
    "deskripsi": "Program kerja FTI Reconnect oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Temu alumni FTI UNAND lintas angkatan.",
    "target": "Temu alumni FTI UNAND lintas angkatan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-15",
    "status": "Tertunda",
    "progress": 25,
    "anggaran": 7500000,
    "kendala": "Penyesuaian jadwal akademik kampus dan konfirmasi kehadiran pemangku kepentingan eksternal.",
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Reconnect berjalan sesuai rencana kerja unit.",
        "author": "u28"
      }
    ]
  },
  {
    "id": "pk26",
    "nama": "FTI FutureLink",
    "dinasId": "eksternal",
    "picId": "u32",
    "deskripsi": "Program kerja FTI FutureLink oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Jejaring industri & info magang dengan 15 perusahaan.",
    "target": "Jejaring industri & info magang dengan 15 perusahaan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-28",
    "status": "Persiapan",
    "progress": 35,
    "anggaran": 9000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 17,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI FutureLink berjalan sesuai rencana kerja unit.",
        "author": "u29"
      }
    ]
  },
  {
    "id": "pk27",
    "nama": "Delegasi",
    "dinasId": "eksternal",
    "picId": "u30",
    "deskripsi": "Program kerja Delegasi oleh EKSTERNAL Kabinet Vismayakriya 2025/2026. Target: Fasilitasi partisipasi forum mahasiswa tingkat nasional.",
    "target": "Fasilitasi partisipasi forum mahasiswa tingkat nasional",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-05",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 5000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Delegasi berjalan sesuai rencana kerja unit.",
        "author": "u30"
      }
    ]
  },
  {
    "id": "pk28",
    "nama": "Bakti FTI",
    "dinasId": "internal",
    "picId": "u39",
    "picIds": ["u39", "u40"],
    "picNama": "Muhammad Yusuf & Sasya Zamora",
    "deskripsi": "Program kerja Bakti FTI oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Aksi pengabdian masyarakat terpadu keluarga besar FTI.",
    "target": "Aksi pengabdian masyarakat terpadu keluarga besar FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-18",
    "status": "Persiapan",
    "progress": 40,
    "anggaran": 12000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 33,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Bakti FTI berjalan sesuai rencana kerja unit.",
        "author": "u39"
      }
    ]
  },
  {
    "id": "pk29",
    "nama": "FTI Parade",
    "dinasId": "internal",
    "picId": "u42",
    "picIds": ["u42", "u40"],
    "picNama": "Muhammad Arief Nasril & Sasya Zamora",
    "deskripsi": "Program kerja FTI Parade oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Pawai selebrasi dan pengenalan ormawa FTI.",
    "target": "Pawai selebrasi dan pengenalan ormawa FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-20",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 8000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan FTI Parade telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u40"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Parade berjalan sesuai rencana kerja unit.",
        "author": "u40"
      }
    ]
  },
  {
    "id": "pk30",
    "nama": "InKor (Internal Koordinasi)",
    "dinasId": "internal",
    "picId": "u42",
    "picIds": ["u42", "u40"],
    "picNama": "Muhammad Arief Nasril & Sasya Zamora",
    "deskripsi": "Program kerja InKor (Internal Koordinasi) oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Rapat sinergi bulanan seluruh dinas/biro Vismayakriya.",
    "target": "Rapat sinergi bulanan seluruh dinas/biro Vismayakriya",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-25",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan InKor (Internal Koordinasi) berjalan sesuai rencana kerja unit.",
        "author": "u41"
      }
    ]
  },
  {
    "id": "pk31",
    "nama": "SaMawa (Sapa Ormawa)",
    "dinasId": "internal",
    "picId": "u41",
    "picIds": ["u41", "u39"],
    "picNama": "Ramadhani Amelia Putri & Muhammad Yusuf",
    "deskripsi": "Program kerja SaMawa (Sapa Ormawa) oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Silaturahmi dan koordinasi ke seluruh Hima & UKM di FTI.",
    "target": "Silaturahmi dan koordinasi ke seluruh Hima & UKM di FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-12",
    "status": "Berjalan",
    "progress": 80,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan SaMawa (Sapa Ormawa) berjalan sesuai rencana kerja unit.",
        "author": "u42"
      }
    ]
  },
  {
    "id": "pk32",
    "nama": "VisGo (Vismayakriya Goro)",
    "dinasId": "internal",
    "picId": "u38",
    "picIds": ["u38", "u41"],
    "picNama": "Siti Kayla Reyhana & Ramadhani Amelia Putri",
    "deskripsi": "Program kerja VisGo (Vismayakriya Goro) oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Aksi gotong royong pemeliharaan sekretariat BEM.",
    "target": "Aksi gotong royong pemeliharaan sekretariat BEM",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-01",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan VisGo (Vismayakriya Goro) berjalan sesuai rencana kerja unit.",
        "author": "u38"
      }
    ]
  },
  {
    "id": "pk33",
    "nama": "Kalender FTI",
    "dinasId": "internal",
    "picId": "u42",
    "picIds": ["u42", "u40"],
    "picNama": "Muhammad Arief Nasril & Sasya Zamora",
    "deskripsi": "Program kerja Kalender FTI oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Penyusunan jadwal sinkronisasi seluruh agenda kegiatan FTI.",
    "target": "Penyusunan jadwal sinkronisasi seluruh agenda kegiatan FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-31",
    "status": "Berjalan",
    "progress": 90,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 75,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Kalender FTI berjalan sesuai rencana kerja unit.",
        "author": "u42"
      }
    ]
  },
  {
    "id": "pk34",
    "nama": "Graduation Needs",
    "dinasId": "internal",
    "picId": "u38",
    "picIds": ["u38", "u39"],
    "picNama": "Siti Kayla Reyhana & Muhammad Yusuf",
    "deskripsi": "Program kerja Graduation Needs oleh INTERNAL Kabinet Vismayakriya 2025/2026. Target: Apresiasi & penyambutan wisudawan FTI periode III & IV.",
    "target": "Apresiasi & penyambutan wisudawan FTI periode III & IV",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-08",
    "status": "Persiapan",
    "progress": 35,
    "anggaran": 6500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 17,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Graduation Needs berjalan sesuai rencana kerja unit.",
        "author": "u38"
      }
    ]
  },
  {
    "id": "pk35",
    "nama": "Diskusi Strategis",
    "dinasId": "kastrat",
    "picId": "u50",
    "deskripsi": "Program kerja Diskusi Strategis oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Kajian isu aktual kampus & nasional.",
    "target": "Kajian isu aktual kampus & nasional",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-22",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Diskusi Strategis berjalan sesuai rencana kerja unit.",
        "author": "u50"
      }
    ]
  },
  {
    "id": "pk36",
    "nama": "KPK",
    "dinasId": "kastrat",
    "picId": "u44",
    "deskripsi": "Program kerja KPK oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Kawal Kebijakan Kampus & transparansi UKT.",
    "target": "Kawal Kebijakan Kampus & transparansi UKT",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-18",
    "status": "Berjalan",
    "progress": 50,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 66,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan KPK berjalan sesuai rencana kerja unit.",
        "author": "u44"
      }
    ]
  },
  {
    "id": "pk37",
    "nama": "Kajian Strategis",
    "dinasId": "kastrat",
    "picId": "u45",
    "deskripsi": "Program kerja Kajian Strategis oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Rilis 4 naskah kajian komprehensif.",
    "target": "Rilis 4 naskah kajian komprehensif",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-30",
    "status": "Persiapan",
    "progress": 40,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 33,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Kajian Strategis berjalan sesuai rencana kerja unit.",
        "author": "u45"
      }
    ]
  },
  {
    "id": "pk38",
    "nama": "Kastrat Hypothetica",
    "dinasId": "kastrat",
    "picId": "u46",
    "deskripsi": "Program kerja Kastrat Hypothetica oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Ruang dialektika kritis mahasiswa berbasis data riset.",
    "target": "Ruang dialektika kritis mahasiswa berbasis data riset",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-15",
    "status": "Berjalan",
    "progress": 65,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 13,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Kastrat Hypothetica berjalan sesuai rencana kerja unit.",
        "author": "u46"
      }
    ]
  },
  {
    "id": "pk39",
    "nama": "RESTART (Regeneration of Strategic Studies)",
    "dinasId": "kastrat",
    "picId": "u47",
    "deskripsi": "Program kerja RESTART (Regeneration of Strategic Studies) oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Pelatihan analisis kebijakan dan advokasi publik.",
    "target": "Pelatihan analisis kebijakan dan advokasi publik",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-05",
    "status": "Persiapan",
    "progress": 20,
    "anggaran": 4500000,
    "kendala": "Menunggu pencairan tahap 1 dan finalisasi lokasi kegiatan.",
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan RESTART (Regeneration of Strategic Studies) berjalan sesuai rencana kerja unit.",
        "author": "u47"
      }
    ]
  },
  {
    "id": "pk40",
    "nama": "Pergerakan dan Pemberdayaan Perempuan",
    "dinasId": "kastrat",
    "picId": "u48",
    "deskripsi": "Program kerja Pergerakan dan Pemberdayaan Perempuan oleh KASTRAT Kabinet Vismayakriya 2025/2026. Target: Edukasi kesetaraan gender & pencegahan kekerasan seksual kampus.",
    "target": "Edukasi kesetaraan gender & pencegahan kekerasan seksual kampus",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-01",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Pergerakan dan Pemberdayaan Perempuan berjalan sesuai rencana kerja unit.",
        "author": "u48"
      }
    ]
  },
  {
    "id": "pk41",
    "nama": "FTI Spotlight",
    "dinasId": "medinkraf",
    "picId": "u56",
    "deskripsi": "Program kerja FTI Spotlight oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Pemberitaan prestasi mahasiswa & dosen FTI.",
    "target": "Pemberitaan prestasi mahasiswa & dosen FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 75,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 38,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Spotlight berjalan sesuai rencana kerja unit.",
        "author": "u56"
      }
    ]
  },
  {
    "id": "pk42",
    "nama": "Lensa Vismaya",
    "dinasId": "medinkraf",
    "picId": "u57",
    "deskripsi": "Program kerja Lensa Vismaya oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Dokumentasi visual & aftermovie kegiatan kabinet.",
    "target": "Dokumentasi visual & aftermovie kegiatan kabinet",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Lensa Vismaya berjalan sesuai rencana kerja unit.",
        "author": "u57"
      }
    ]
  },
  {
    "id": "pk43",
    "nama": "Visma Creative Studio",
    "dinasId": "medinkraf",
    "picId": "u51",
    "deskripsi": "Program kerja Visma Creative Studio oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Peningkatan aset visual, motion graphics, & branding.",
    "target": "Peningkatan aset visual, motion graphics, & branding",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-15",
    "status": "Berjalan",
    "progress": 80,
    "anggaran": 5000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Visma Creative Studio berjalan sesuai rencana kerja unit.",
        "author": "u51"
      }
    ]
  },
  {
    "id": "pk44",
    "nama": "FTI Active Media",
    "dinasId": "medinkraf",
    "picId": "u52",
    "deskripsi": "Program kerja FTI Active Media oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Pengelolaan konten harian Instagram, TikTok, & Website BEM.",
    "target": "Pengelolaan konten harian Instagram, TikTok, & Website BEM",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 85,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 63,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Active Media berjalan sesuai rencana kerja unit.",
        "author": "u52"
      }
    ]
  },
  {
    "id": "pk45",
    "nama": "FTI Media Connect",
    "dinasId": "medinkraf",
    "picId": "u53",
    "deskripsi": "Program kerja FTI Media Connect oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Workshop desain dan videografi bagi anggota internal.",
    "target": "Workshop desain dan videografi bagi anggota internal",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-28",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan FTI Media Connect telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u53"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Media Connect berjalan sesuai rencana kerja unit.",
        "author": "u53"
      }
    ]
  },
  {
    "id": "pk46",
    "nama": "VisID",
    "dinasId": "medinkraf",
    "picId": "u54",
    "deskripsi": "Program kerja VisID oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Panduan identitas visual standar Kabinet Vismayakriya.",
    "target": "Panduan identitas visual standar Kabinet Vismayakriya",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-07-30",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan VisID telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u54"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan VisID berjalan sesuai rencana kerja unit.",
        "author": "u54"
      }
    ]
  },
  {
    "id": "pk47",
    "nama": "Merchandise",
    "dinasId": "medinkraf",
    "picId": "u55",
    "deskripsi": "Program kerja Merchandise oleh MEDINKRAF Kabinet Vismayakriya 2025/2026. Target: Produksi PDH, lanyard, totebag, & apparel resmi BEM FTI.",
    "target": "Produksi PDH, lanyard, totebag, & apparel resmi BEM FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-25",
    "status": "Berjalan",
    "progress": 65,
    "anggaran": 8000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 13,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Merchandise berjalan sesuai rencana kerja unit.",
        "author": "u55"
      }
    ]
  },
  {
    "id": "pk48",
    "nama": "Vismaya Muda",
    "dinasId": "psdm",
    "picId": "u65",
    "deskripsi": "Program kerja Vismaya Muda oleh PSDM Kabinet Vismayakriya 2025/2026. Target: Magang kaderisasi mahasiswa baru di BEM KM FTI.",
    "target": "Magang kaderisasi mahasiswa baru di BEM KM FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-20",
    "status": "Berjalan",
    "progress": 55,
    "anggaran": 10000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 83,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Vismaya Muda berjalan sesuai rencana kerja unit.",
        "author": "u65"
      }
    ]
  },
  {
    "id": "pk49",
    "nama": "LKMM-TD FTI",
    "dinasId": "psdm",
    "picId": "u58",
    "deskripsi": "Program kerja LKMM-TD FTI oleh PSDM Kabinet Vismayakriya 2025/2026. Target: Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar.",
    "target": "Latihan Keterampilan Manajemen Mahasiswa Tingkat Dasar",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-10",
    "status": "Persiapan",
    "progress": 30,
    "anggaran": 15000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan LKMM-TD FTI berjalan sesuai rencana kerja unit.",
        "author": "u58"
      }
    ]
  },
  {
    "id": "pk50",
    "nama": "Vismaya Education",
    "dinasId": "psdm",
    "picId": "u59",
    "deskripsi": "Program kerja Vismaya Education oleh PSDM Kabinet Vismayakriya 2025/2026. Target: Seri upgrade soft skill kepemimpinan & manajemen waktu.",
    "target": "Seri upgrade soft skill kepemimpinan & manajemen waktu",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-18",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 4500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Vismaya Education berjalan sesuai rencana kerja unit.",
        "author": "u59"
      }
    ]
  },
  {
    "id": "pk51",
    "nama": "FTI Achievement Award",
    "dinasId": "psdm",
    "picId": "u60",
    "deskripsi": "Program kerja FTI Achievement Award oleh PSDM Kabinet Vismayakriya 2025/2026. Target: Malam penganugerahan mahasiswa berprestasi FTI.",
    "target": "Malam penganugerahan mahasiswa berprestasi FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-18",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 7000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Achievement Award berjalan sesuai rencana kerja unit.",
        "author": "u60"
      }
    ]
  },
  {
    "id": "pk52",
    "nama": "Bintang Aktivis Kampus",
    "dinasId": "psdm",
    "picId": "u61",
    "deskripsi": "Program kerja Bintang Aktivis Kampus oleh PSDM Kabinet Vismayakriya 2025/2026. Target: Apresiasi tokoh penggerak organisasi mahasiswa FTI.",
    "target": "Apresiasi tokoh penggerak organisasi mahasiswa FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-22",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Bintang Aktivis Kampus berjalan sesuai rencana kerja unit.",
        "author": "u61"
      }
    ]
  },
  {
    "id": "pk53",
    "nama": "FOSI",
    "dinasId": "ristek",
    "picId": "u69",
    "deskripsi": "Program kerja FOSI oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Forum Open Source & Inovasi Teknologi FTI UNAND.",
    "target": "Forum Open Source & Inovasi Teknologi FTI UNAND",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-24",
    "status": "Berjalan",
    "progress": 65,
    "anggaran": 6000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 13,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FOSI berjalan sesuai rencana kerja unit.",
        "author": "u69"
      }
    ]
  },
  {
    "id": "pk54",
    "nama": "IT Development",
    "dinasId": "ristek",
    "picId": "u70",
    "deskripsi": "Program kerja IT Development oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Pengembangan sistem manajemen internal & website resmi.",
    "target": "Pengembangan sistem manajemen internal & website resmi",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-30",
    "status": "Berjalan",
    "progress": 85,
    "anggaran": 8500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 63,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan IT Development berjalan sesuai rencana kerja unit.",
        "author": "u70"
      }
    ]
  },
  {
    "id": "pk55",
    "nama": "IT Competition Hub",
    "dinasId": "ristek",
    "picId": "u71",
    "deskripsi": "Program kerja IT Competition Hub oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Pendampingan & pembinaan delegasi kompetisi IT/Gemastik.",
    "target": "Pendampingan & pembinaan delegasi kompetisi IT/Gemastik",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-05",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan IT Competition Hub berjalan sesuai rencana kerja unit.",
        "author": "u71"
      }
    ]
  },
  {
    "id": "pk56",
    "nama": "HACKATHON",
    "dinasId": "ristek",
    "picId": "u72",
    "deskripsi": "Program kerja HACKATHON oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Kompetisi hackathon coding 24 jam tingkat nasional.",
    "target": "Kompetisi hackathon coding 24 jam tingkat nasional",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-28",
    "status": "Persiapan",
    "progress": 35,
    "anggaran": 18000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 17,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan HACKATHON berjalan sesuai rencana kerja unit.",
        "author": "u72"
      }
    ]
  },
  {
    "id": "pk57",
    "nama": "Techcorner",
    "dinasId": "ristek",
    "picId": "u66",
    "deskripsi": "Program kerja Techcorner oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Workshop mingguan AI, Web3, Cyber Security, & Cloud.",
    "target": "Workshop mingguan AI, Web3, Cyber Security, & Cloud",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-15",
    "status": "Berjalan",
    "progress": 75,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 38,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Techcorner berjalan sesuai rencana kerja unit.",
        "author": "u66"
      }
    ]
  },
  {
    "id": "pk58",
    "nama": "Codevora",
    "dinasId": "ristek",
    "picId": "u67",
    "deskripsi": "Program kerja Codevora oleh RISTEK Kabinet Vismayakriya 2025/2026. Target: Bootcamp intensif pemrograman untuk mahasiswa FTI.",
    "target": "Bootcamp intensif pemrograman untuk mahasiswa FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-25",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 5000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Codevora telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u67"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Codevora berjalan sesuai rencana kerja unit.",
        "author": "u67"
      }
    ]
  },
  {
    "id": "pk59",
    "nama": "FTI Sosial Aid",
    "dinasId": "sosmasling",
    "picId": "u75",
    "deskripsi": "Program kerja FTI Sosial Aid oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Penyaluran bantuan kemanusiaan & tanggap bencana Sumatera Barat.",
    "target": "Penyaluran bantuan kemanusiaan & tanggap bencana Sumatera Barat",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 80,
    "anggaran": 7500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Sosial Aid berjalan sesuai rencana kerja unit.",
        "author": "u75"
      }
    ]
  },
  {
    "id": "pk60",
    "nama": "FTI Ramadhan Berbagi Asa (RABA FTI)",
    "dinasId": "sosmasling",
    "picId": "u76",
    "deskripsi": "Program kerja FTI Ramadhan Berbagi Asa (RABA FTI) oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Buka bersama anak yatim & pembagian takjil sembako.",
    "target": "Buka bersama anak yatim & pembagian takjil sembako",
    "tanggalMulai": "2026-08-01",
    "deadline": "2027-03-20",
    "status": "Belum Mulai",
    "progress": 0,
    "anggaran": 11000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Ramadhan Berbagi Asa (RABA FTI) berjalan sesuai rencana kerja unit.",
        "author": "u76"
      }
    ]
  },
  {
    "id": "pk61",
    "nama": "On This Day",
    "dinasId": "sosmasling",
    "picId": "u77",
    "deskripsi": "Program kerja On This Day oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Kampanye sosial & kepedulian hari-hari besar lingkungan.",
    "target": "Kampanye sosial & kepedulian hari-hari besar lingkungan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan On This Day berjalan sesuai rencana kerja unit.",
        "author": "u77"
      }
    ]
  },
  {
    "id": "pk62",
    "nama": "Social Connect",
    "dinasId": "sosmasling",
    "picId": "u78",
    "deskripsi": "Program kerja Social Connect oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Jejaring kolaborasi dengan komunitas sosial di Kota Padang.",
    "target": "Jejaring kolaborasi dengan komunitas sosial di Kota Padang",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-10",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Social Connect berjalan sesuai rencana kerja unit.",
        "author": "u78"
      }
    ]
  },
  {
    "id": "pk63",
    "nama": "Sosgreen FTI",
    "dinasId": "sosmasling",
    "picId": "u79",
    "deskripsi": "Program kerja Sosgreen FTI oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Gerakan pilah sampah kampus & penanaman 100 bibit pohon.",
    "target": "Gerakan pilah sampah kampus & penanaman 100 bibit pohon",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-26",
    "status": "Persiapan",
    "progress": 40,
    "anggaran": 5500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 33,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Sosgreen FTI berjalan sesuai rencana kerja unit.",
        "author": "u79"
      }
    ]
  },
  {
    "id": "pk64",
    "nama": "FTI Lentera Cakrawala (FTI LENCA)",
    "dinasId": "sosmasling",
    "picId": "u80",
    "deskripsi": "Program kerja FTI Lentera Cakrawala (FTI LENCA) oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Program mengajar & revitalisasi perpustakaan sekolah pelosok.",
    "target": "Program mengajar & revitalisasi perpustakaan sekolah pelosok",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-08",
    "status": "Tertunda",
    "progress": 20,
    "anggaran": 6500000,
    "kendala": "Penyesuaian jadwal akademik kampus dan konfirmasi kehadiran pemangku kepentingan eksternal.",
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan FTI Lentera Cakrawala (FTI LENCA) berjalan sesuai rencana kerja unit.",
        "author": "u80"
      }
    ]
  },
  {
    "id": "pk65",
    "nama": "Bina Desa",
    "dinasId": "sosmasling",
    "picId": "u73",
    "deskripsi": "Program kerja Bina Desa oleh SOSMASLING Kabinet Vismayakriya 2025/2026. Target: Pengembangan teknologi tepat guna di desa mitra dampingan FTI.",
    "target": "Pengembangan teknologi tepat guna di desa mitra dampingan FTI",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-15",
    "status": "Persiapan",
    "progress": 35,
    "anggaran": 16000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 17,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Bina Desa berjalan sesuai rencana kerja unit.",
        "author": "u73"
      }
    ]
  },
  {
    "id": "pk66",
    "nama": "Tata Kelola Administrasi & Kestari",
    "dinasId": "sekda",
    "picId": "u2",
    "deskripsi": "Program kerja Tata Kelola Administrasi & Kestari oleh SEKDA Kabinet Vismayakriya 2025/2026. Target: Standarisasi alur disposisi surat & arsip digital presidium.",
    "target": "Standarisasi alur disposisi surat & arsip digital presidium",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 85,
    "anggaran": 3000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 63,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Tata Kelola Administrasi & Kestari berjalan sesuai rencana kerja unit.",
        "author": "u2"
      }
    ]
  },
  {
    "id": "pk67",
    "nama": "Inventarisasi Aset BEM",
    "dinasId": "sekda",
    "picId": "u2",
    "deskripsi": "Program kerja Inventarisasi Aset BEM oleh SEKDA Kabinet Vismayakriya 2025/2026. Target: Pencatatan QR code & audit kondisi barang sekretariat.",
    "target": "Pencatatan QR code & audit kondisi barang sekretariat",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-30",
    "status": "Berjalan",
    "progress": 75,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 38,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Inventarisasi Aset BEM berjalan sesuai rencana kerja unit.",
        "author": "u2"
      }
    ]
  },
  {
    "id": "pk68",
    "nama": "Standardisasi Format Proposal & LPJ",
    "dinasId": "sekda",
    "picId": "u2",
    "deskripsi": "Program kerja Standardisasi Format Proposal & LPJ oleh SEKDA Kabinet Vismayakriya 2025/2026. Target: Buku panduan resmi format proposal & LPJ kabinet.",
    "target": "Buku panduan resmi format proposal & LPJ kabinet",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-10",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Standardisasi Format Proposal & LPJ telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u2"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Standardisasi Format Proposal & LPJ berjalan sesuai rencana kerja unit.",
        "author": "u2"
      }
    ]
  },
  {
    "id": "pk69",
    "nama": "Rapat Koordinasi Presidium",
    "dinasId": "sekda",
    "picId": "u2",
    "deskripsi": "Program kerja Rapat Koordinasi Presidium oleh SEKDA Kabinet Vismayakriya 2025/2026. Target: Sinkronisasi mingguan Gubernur, Sekda, dan Benda.",
    "target": "Sinkronisasi mingguan Gubernur, Sekda, dan Benda",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 70,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 25,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Rapat Koordinasi Presidium berjalan sesuai rencana kerja unit.",
        "author": "u2"
      }
    ]
  },
  {
    "id": "pk70",
    "nama": "Pelatihan Kesekretariatan",
    "dinasId": "sekda",
    "picId": "u2",
    "deskripsi": "Program kerja Pelatihan Kesekretariatan oleh SEKDA Kabinet Vismayakriya 2025/2026. Target: Workshop persuratan & notulensi seluruh sekretaris biro/dinas.",
    "target": "Workshop persuratan & notulensi seluruh sekretaris biro/dinas",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-22",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 3500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Pelatihan Kesekretariatan telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u2"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Pelatihan Kesekretariatan berjalan sesuai rencana kerja unit.",
        "author": "u2"
      }
    ]
  },
  {
    "id": "pk71",
    "nama": "Pengelolaan Kas & Anggaran Vismayakriya",
    "dinasId": "benda",
    "picId": "u3",
    "deskripsi": "Program kerja Pengelolaan Kas & Anggaran Vismayakriya oleh BENDA Kabinet Vismayakriya 2025/2026. Target: Laporan arus kas real-time dan transparansi keuangan.",
    "target": "Laporan arus kas real-time dan transparansi keuangan",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-12-31",
    "status": "Berjalan",
    "progress": 80,
    "anggaran": 2000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 50,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Pengelolaan Kas & Anggaran Vismayakriya berjalan sesuai rencana kerja unit.",
        "author": "u3"
      }
    ]
  },
  {
    "id": "pk72",
    "nama": "Standardisasi SPJ & Verifikasi RAB",
    "dinasId": "benda",
    "picId": "u3",
    "deskripsi": "Program kerja Standardisasi SPJ & Verifikasi RAB oleh BENDA Kabinet Vismayakriya 2025/2026. Target: SOP pengajuan dana dan verifikasi bukti bayar.",
    "target": "SOP pengajuan dana dan verifikasi bukti bayar",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-08-15",
    "status": "Selesai",
    "progress": 100,
    "anggaran": 1500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 100,
        "status": "done"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-08-30",
        "isi": "Kegiatan Standardisasi SPJ & Verifikasi RAB telah selesai dilaksanakan dan LPJ telah diserahkan.",
        "author": "u3"
      },
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Standardisasi SPJ & Verifikasi RAB berjalan sesuai rencana kerja unit.",
        "author": "u3"
      }
    ]
  },
  {
    "id": "pk73",
    "nama": "Audit & Rekonsiliasi Finansial",
    "dinasId": "benda",
    "picId": "u3",
    "deskripsi": "Program kerja Audit & Rekonsiliasi Finansial oleh BENDA Kabinet Vismayakriya 2025/2026. Target: Pemeriksaan kepatuhan anggaran per cawu bersama Audkes.",
    "target": "Pemeriksaan kepatuhan anggaran per cawu bersama Audkes",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-10-15",
    "status": "Persiapan",
    "progress": 30,
    "anggaran": 2500000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "pending"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Audit & Rekonsiliasi Finansial berjalan sesuai rencana kerja unit.",
        "author": "u3"
      }
    ]
  },
  {
    "id": "pk74",
    "nama": "Optimalisasi Finansial Mandiri",
    "dinasId": "benda",
    "picId": "u3",
    "deskripsi": "Program kerja Optimalisasi Finansial Mandiri oleh BENDA Kabinet Vismayakriya 2025/2026. Target: Penggalangan dana kreatif & kerjasama sponsorship korporasi.",
    "target": "Penggalangan dana kreatif & kerjasama sponsorship korporasi",
    "tanggalMulai": "2026-08-01",
    "deadline": "2026-11-30",
    "status": "Berjalan",
    "progress": 60,
    "anggaran": 4000000,
    "kendala": null,
    "tahapan": [
      {
        "nama": "Penyusunan Proposal & RAB",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Koordinasi & Rapat Teknis",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Publikasi & Mobilisasi Sumber Daya",
        "progress": 100,
        "status": "done"
      },
      {
        "nama": "Pelaksanaan Kegiatan",
        "progress": 0,
        "status": "in-progress"
      },
      {
        "nama": "Evaluasi & Laporan Pertanggungjawaban (LPJ)",
        "progress": 0,
        "status": "pending"
      }
    ],
    "updates": [
      {
        "tanggal": "2026-09-08",
        "isi": "Progress pelaksanaan Optimalisasi Finansial Mandiri berjalan sesuai rencana kerja unit.",
        "author": "u3"
      }
    ]
  }
];

export const STATUS_DANA = {
  DRAFT: 'Draft',
  MENUNGGU: 'Menunggu Persetujuan',
  DISETUJUI: 'Disetujui',
  DITOLAK: 'Ditolak',
};

export const PENGAJUAN_DANA = [
  {
    "id": "pd1",
    "prokerId": "pk12",
    "dinasId": "kso",
    "nominal": 22000000,
    "status": "Menunggu Persetujuan",
    "catatan": "Pengajuan dana pelaksanaan FTI CUP 2026 mencakup sewa lapangan, perlengkapan, medali, wasit, dan P3K.",
    "tanggal": "2026-09-10",
    "diajukanOleh": "u12",
    "disetujuiOleh": null,
    "tanggalDisetujui": null,
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Sewa Lapangan Futsal & Basket (3 Hari)",
        "jumlah": 3,
        "satuan": "hari",
        "harga": 2500000,
        "total": 7500000
      },
      {
        "item": "Honor Wasit Berlisensi",
        "jumlah": 6,
        "satuan": "orang",
        "harga": 750000,
        "total": 4500000
      },
      {
        "item": "Medali, Plakat, & Trophy Juara Umum",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 4000000,
        "total": 4000000
      },
      {
        "item": "Konsumsi Panitia & Medis P3K",
        "jumlah": 100,
        "satuan": "pax",
        "harga": 30000,
        "total": 3000000
      },
      {
        "item": "Publikasi, Banner, & Perlengkapan Pertandingan",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 3000000,
        "total": 3000000
      }
    ]
  },
  {
    "id": "pd2",
    "prokerId": "pk15",
    "dinasId": "adkesma",
    "nominal": 8500000,
    "status": "Disetujui",
    "catatan": "Dana operasional Seminar Kemahasiswaan SEKAWAN bertema Hak & Kesejahteraan Mahasiswa FTI.",
    "tanggal": "2026-08-20",
    "diajukanOleh": "u20",
    "disetujuiOleh": "u3",
    "tanggalDisetujui": "2026-08-23",
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Honor 2 Narasumber Pakar Hukum & Advokasi",
        "jumlah": 2,
        "satuan": "orang",
        "harga": 2000000,
        "total": 4000000
      },
      {
        "item": "Konsumsi Peserta Seminar",
        "jumlah": 150,
        "satuan": "pax",
        "harga": 20000,
        "total": 3000000
      },
      {
        "item": "Sertifikat Cetak & Goodie Bag",
        "jumlah": 150,
        "satuan": "paket",
        "harga": 10000,
        "total": 1500000
      }
    ]
  },
  {
    "id": "pd3",
    "prokerId": "pk28",
    "dinasId": "internal",
    "nominal": 12000000,
    "status": "Menunggu Persetujuan",
    "catatan": "Pengajuan dana Bakti FTI untuk aksi pengabdian masyarakat terpadu.",
    "tanggal": "2026-09-08",
    "diajukanOleh": "u36",
    "disetujuiOleh": null,
    "tanggalDisetujui": null,
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Transportasi Armada Bus Mahasiswa",
        "jumlah": 2,
        "satuan": "unit",
        "harga": 2000000,
        "total": 4000000
      },
      {
        "item": "Paket Sembako Masyarakat Sasaran",
        "jumlah": 80,
        "satuan": "paket",
        "harga": 65000,
        "total": 5200000
      },
      {
        "item": "Peralatan Edukasi & Pengajaran Anak-anak",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 1800000,
        "total": 1800000
      },
      {
        "item": "Konsumsi Relawan & Logistik",
        "jumlah": 50,
        "satuan": "pax",
        "harga": 20000,
        "total": 1000000
      }
    ]
  },
  {
    "id": "pd4",
    "prokerId": "pk44",
    "dinasId": "ristek",
    "nominal": 18000000,
    "status": "Menunggu Persetujuan",
    "catatan": "Kompetisi Hackathon Coding 24 jam terbuka bagi mahasiswa teknologi se-Sumatera.",
    "tanggal": "2026-09-11",
    "diajukanOleh": "u66",
    "disetujuiOleh": null,
    "tanggalDisetujui": null,
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Hadiah Juara 1, 2, 3 & Kategori Khusus",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 10000000,
        "total": 10000000
      },
      {
        "item": "Honor Dewan Juri Profesional IT",
        "jumlah": 3,
        "satuan": "orang",
        "harga": 1500000,
        "total": 4500000
      },
      {
        "item": "Konsumsi Hackathon 24 Jam (Makan & Snack)",
        "jumlah": 60,
        "satuan": "paket",
        "harga": 40000,
        "total": 2400000
      },
      {
        "item": "Koneksi Internet Dedicated & Token Server Cloud",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 1100000,
        "total": 1100000
      }
    ]
  },
  {
    "id": "pd5",
    "prokerId": "pk25",
    "dinasId": "eksternal",
    "nominal": 7500000,
    "status": "Ditolak",
    "catatan": "Pengajuan dana Temu Alumni FTI UNAND.",
    "tanggal": "2026-09-02",
    "diajukanOleh": "u35",
    "disetujuiOleh": null,
    "tanggalDisetujui": null,
    "alasanDitolak": "RAB belum mencantumkan target kontribusi alumni dan detail sewa gedung belum ada penawaran resmi. Mohon revisi.",
    "rab": [
      {
        "item": "Sewa Gedung Pertemuan",
        "jumlah": 1,
        "satuan": "hari",
        "harga": 4500000,
        "total": 4500000
      },
      {
        "item": "Konsumsi Prasmanan Alumni & Dosen",
        "jumlah": 60,
        "satuan": "pax",
        "harga": 50000,
        "total": 3000000
      }
    ]
  },
  {
    "id": "pd6",
    "prokerId": "pk38",
    "dinasId": "medinkraf",
    "nominal": 3000000,
    "status": "Disetujui",
    "catatan": "Biaya langganan software editing, tools analitik media, dan perlengkapan produksi studio.",
    "tanggal": "2026-07-28",
    "diajukanOleh": "u51",
    "disetujuiOleh": "u3",
    "tanggalDisetujui": "2026-07-30",
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Langganan Adobe Creative Cloud & Canva Pro 6 Bulan",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 1800000,
        "total": 1800000
      },
      {
        "item": "Memory Card High Speed & Lighting Clip",
        "jumlah": 2,
        "satuan": "unit",
        "harga": 600000,
        "total": 1200000
      }
    ]
  },
  {
    "id": "pd7",
    "prokerId": "pk52",
    "dinasId": "sosmasling",
    "nominal": 16000000,
    "status": "Menunggu Persetujuan",
    "catatan": "Pengembangan teknologi filter air dan sarana belajar desa binaan FTI.",
    "tanggal": "2026-09-09",
    "diajukanOleh": "u73",
    "disetujuiOleh": null,
    "tanggalDisetujui": null,
    "alasanDitolak": null,
    "rab": [
      {
        "item": "Komponen Material Instalasi Filter Air Bersih",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 8000000,
        "total": 8000000
      },
      {
        "item": "Buku Bacaan & Rak Buku Sudut Baca Desa",
        "jumlah": 1,
        "satuan": "paket",
        "harga": 4000000,
        "total": 4000000
      },
      {
        "item": "Transportasi & Logistik Lapangan Tim 4 Minggu",
        "jumlah": 4,
        "satuan": "minggu",
        "harga": 1000000,
        "total": 4000000
      }
    ]
  }
];

export const RAPAT = [
  {
    "id": "r1",
    "judul": "Rapat Presidium & Pimpinan BEM Vismayakriya",
    "tanggal": "2026-09-14",
    "waktu": "19:30",
    "lokasi": "Ruang Rapat Gedung BEM KM FTI Lt. 2",
    "agenda": "Evaluasi triwulan 1, sinkronisasi anggaran bersama Bendahara Daerah, dan persiapan FTI CUP 2026.",
    "deskripsi": "Rapat koordinasi pimpinan tertinggi Kabinet Vismayakriya bersama Presidium.",
    "prokerId": "pk56",
    "dinasId": "sekda",
    "isPresidium": true,
    "peserta": [
      "u1",
      "u81",
      "u2",
      "u3",
      "u36",
      "u35"
    ],
    "status": "upcoming",
    "hasil": null
  },
  {
    "id": "r2",
    "judul": "Rapat Koordinasi Dinas Internal & Persiapan Bakti FTI",
    "tanggal": "2026-09-15",
    "waktu": "16:00",
    "lokasi": "Ruang Rapat Bersama FTI",
    "agenda": "Pemantapan kepanitiaan Bakti FTI, survei lokasi tahap akhir, dan koordinasi dengan Ormawa.",
    "deskripsi": "Rapat internal Dinas Internal BEM KM FTI UNAND dipimpin oleh Kadin.",
    "prokerId": "pk28",
    "dinasId": "internal",
    "peserta": [
      "u36",
      "u37",
      "u38",
      "u39",
      "u40",
      "u42"
    ],
    "status": "upcoming",
    "hasil": null
  },
  {
    "id": "r3",
    "judul": "Rapat Teknis Panitia FTI CUP 2026",
    "tanggal": "2026-09-17",
    "waktu": "15:30",
    "lokasi": "Zoom Meeting & Sekretariat BEM",
    "agenda": "Finalisasi regulasi cabang pertandingan futsal, basket, badminton, dan e-sport.",
    "deskripsi": "Koordinasi teknis pelaksanaan FTI CUP 2026 oleh Biro KSO.",
    "prokerId": "pk12",
    "dinasId": "kso",
    "peserta": [
      "u12",
      "u13",
      "u14",
      "u16"
    ],
    "status": "upcoming",
    "hasil": null
  },
  {
    "id": "r4",
    "judul": "Evaluasi Pelaksanaan Maba Care 2026",
    "tanggal": "2026-09-02",
    "waktu": "14:00",
    "lokasi": "Ruang Sidang FTI UNAND",
    "agenda": "Evaluasi rangkaian penyambutan mahasiswa baru, inventarisasi kendala mentoring, dan finalisasi LPJ.",
    "deskripsi": "Rapat evaluasi paripurna kegiatan Maba Care oleh Dinas Adkesma.",
    "prokerId": "pk19",
    "dinasId": "adkesma",
    "peserta": [
      "u20",
      "u21",
      "u23",
      "u26"
    ],
    "status": "selesai",
    "hasil": {
      "ringkasan": "Program Maba Care berjalan dengan sangat sukses, melibatkan 100% mahasiswa baru FTI UNAND 2025/2026 tanpa perpeloncoan.",
      "keputusan": [
        "Sistem peer-mentoring dinilai efektif dan akan direkomendasikan untuk tahun depan.",
        "LPJ dan rekapitulasi keuangan telah diverifikasi oleh Bendahara Dinas."
      ],
      "tindakLanjut": [
        {
          "isi": "Penyerahan berkas fisik LPJ ke Sekretaris Daerah",
          "picId": "u21",
          "deadline": "2026-09-10",
          "status": "Selesai"
        },
        {
          "isi": "Publikasi aftermovie dan dokumentasi ke Medinkraf",
          "picId": "u23",
          "deadline": "2026-09-12",
          "status": "Selesai"
        }
      ]
    }
  },
  {
    "id": "r5",
    "judul": "Pleno Evaluasi Harmoni Vismayakriya",
    "tanggal": "2026-08-27",
    "waktu": "20:00",
    "lokasi": "Gedung Pertemuan FTI UNAND",
    "agenda": "Apresiasi bonding kabinet dan evaluasi efektivitas team building 81 pengurus.",
    "deskripsi": "Evaluasi kegiatan keakraban seluruh jajaran BEM KM FTI Vismayakriya.",
    "prokerId": "pk4",
    "dinasId": "audkes",
    "peserta": [
      "u1",
      "u4",
      "u5",
      "u6"
    ],
    "status": "selesai",
    "hasil": {
      "ringkasan": "Harmoni Vismayakriya berhasil mempererat chemistry seluruh fungsionaris dari 10 unit kerja.",
      "keputusan": [
        "Forum temu santai informal akan diadakan secara berkala tiap bulan.",
        "Kinerja staf akan dinilai mulai September melalui program Staff of The Month."
      ],
      "tindakLanjut": [
        {
          "isi": "Distribusi kuesioner evaluasi kepuasan internal",
          "picId": "u5",
          "deadline": "2026-09-05",
          "status": "Selesai"
        }
      ]
    }
  }
];

export const KETENTUAN_PIKET = [
  {
    no: 1,
    judul: 'Waktu Pelaksanaan',
    deskripsi: 'Piket dilaksanakan pada pukul 09.00–16.00 WIB.',
    badge: '09.00–16.00 WIB'
  },
  {
    no: 2,
    judul: 'Kewajiban Jadwal',
    deskripsi: 'Setiap pengurus wajib melaksanakan piket sesuai jadwal.',
    badge: 'Wajib Sesuai Jadwal'
  },
  {
    no: 3,
    judul: 'Absensi Digital (GFORM)',
    deskripsi: 'Pengurus wajib mengisi absensi secara digital (GFORM).',
    badge: 'GFORM Digital'
  },
  {
    no: 4,
    judul: 'Kebersihan Sekretariat',
    deskripsi: 'Pengurus bertanggung jawab menjaga kebersihan sekretariat selama piket berlangsung.',
    badge: 'Tanggung Jawab Kebersihan'
  },
  {
    no: 5,
    judul: 'Pengecekan Inventaris',
    deskripsi: 'Pengurus wajib melakukan pengecekan kelengkapan inventaris sekretariat.',
    badge: 'Cek Inventaris'
  },
  {
    no: 6,
    judul: 'Izin & Pergantian Jadwal',
    deskripsi: 'Apabila berhalangan hadir sesuai jadwal, pengurus wajib melapor kepada PJ piket dan mengganti jadwal di hari lain.',
    badge: 'Lapor PJ & Ganti Hari'
  },
  {
    no: 7,
    judul: 'Tambahan Poin Hadir',
    deskripsi: 'Pengurus yang melaksanakan piket sesuai jadwal akan mendapatkan tambahan poin (+3).',
    badge: '+3 Poin'
  },
  {
    no: 8,
    judul: 'Pengurangan Poin / Denda',
    deskripsi: 'Pengurus yang tidak melaksanakan piket tanpa izin akan dikenakan pengurangan poin (-3) atau denda.',
    badge: '-3 Poin / Denda'
  },
  {
    no: 9,
    judul: 'Durasi Minimal',
    deskripsi: 'Durasi minimal pelaksanaan piket adalah 1 jam.',
    badge: 'Minimal 1 Jam'
  },
  {
    no: 10,
    judul: 'Kondisi Akhir Sekretariat',
    deskripsi: 'Setelah selesai piket, pastikan sekretariat dalam kondisi rapi, bersih, dan aman sebelum ditinggalkan.',
    badge: 'Rapi, Bersih, Aman'
  }
];

export const JADWAL_PIKET = [
  {
    "id": "jp1",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u21",
    "namaPetugas": "Khalisah Iori Syakirah",
    "status": "Hadir",
    "jamAbsen": "10:15",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp2",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u77",
    "namaPetugas": "Yollin Irwan",
    "status": "Hadir",
    "jamAbsen": "10:19",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp3",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u62",
    "namaPetugas": "Rembrand Sardi",
    "status": "Hadir",
    "jamAbsen": "10:23",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp4",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u15",
    "namaPetugas": "Fazwa Nisabila",
    "status": "Hadir",
    "jamAbsen": "10:27",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp5",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u31",
    "namaPetugas": "Weldia Novianda",
    "status": "Hadir",
    "jamAbsen": "10:31",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp6",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u3",
    "namaPetugas": "Ashyra Prasiwi",
    "status": "Hadir",
    "jamAbsen": "10:35",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp7",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u52",
    "namaPetugas": "Fazira Naysa",
    "status": "Hadir",
    "jamAbsen": "10:39",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp8",
    "minggu": "Ganjil",
    "hari": "Senin",
    "tanggal": "2026-09-14",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u24",
    "namaPetugas": "Dwi Sonnia Rahmadani",
    "status": "Hadir",
    "jamAbsen": "10:43",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp9",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u5",
    "namaPetugas": "Monica Cania",
    "status": "Hadir",
    "jamAbsen": "10:15",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp10",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u45",
    "namaPetugas": "Rajel Novita",
    "status": "Hadir",
    "jamAbsen": "10:19",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp11",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u53",
    "namaPetugas": "Najma Hayett De Vitra",
    "status": "Hadir",
    "jamAbsen": "10:23",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp12",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u43",
    "namaPetugas": "Muhammad Athaya Abriansyah",
    "status": "Hadir",
    "jamAbsen": "10:27",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp13",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u61",
    "namaPetugas": "Anatasya Noveralda",
    "status": "Hadir",
    "jamAbsen": "10:31",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp14",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u36",
    "namaPetugas": "Ferdian Rahman",
    "status": "Hadir",
    "jamAbsen": "10:35",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp15",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u9",
    "namaPetugas": "Aliyah Zahratul Salsa Dira",
    "status": "Hadir",
    "jamAbsen": "10:39",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp16",
    "minggu": "Ganjil",
    "hari": "Selasa",
    "tanggal": "2026-09-15",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u60",
    "namaPetugas": "Farrah Aulia",
    "status": "Hadir",
    "jamAbsen": "10:43",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp17",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u74",
    "namaPetugas": "Zhafira Fatihah Oswiputri",
    "status": "Hadir",
    "jamAbsen": "10:15",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp18",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u1",
    "namaPetugas": "Mujahid Adlis Salam",
    "status": "Hadir",
    "jamAbsen": "10:19",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp19",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u79",
    "namaPetugas": "Kevin Andhika",
    "status": "Hadir",
    "jamAbsen": "10:23",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp20",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u49",
    "namaPetugas": "Adam Maulana",
    "status": "Hadir",
    "jamAbsen": "10:27",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp21",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u51",
    "namaPetugas": "Muhammad Ikhsan Pratama",
    "status": "Hadir",
    "jamAbsen": "10:31",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp22",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u20",
    "namaPetugas": "Ahmad Faiz Batubara",
    "status": "Hadir",
    "jamAbsen": "10:35",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp23",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u75",
    "namaPetugas": "Alisha Zhahira Zulfis",
    "status": "Hadir",
    "jamAbsen": "10:39",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp24",
    "minggu": "Ganjil",
    "hari": "Rabu",
    "tanggal": "2026-09-16",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u4",
    "namaPetugas": "Equilibrilio Adilia",
    "status": "Hadir",
    "jamAbsen": "10:43",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp25",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u78",
    "namaPetugas": "Ultan Pradipa Al Fitra",
    "status": "Hadir",
    "jamAbsen": "11:10",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp26",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u34",
    "namaPetugas": "Muhammad Zaky Ilham",
    "status": "Hadir",
    "jamAbsen": "11:15",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp27",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u28",
    "namaPetugas": "Dzakira Hapsarini",
    "status": "Hadir",
    "jamAbsen": "11:20",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp28",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u56",
    "namaPetugas": "Nazwa Mutiara Sabila",
    "status": "Hadir",
    "jamAbsen": "11:25",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp29",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u16",
    "namaPetugas": "Haziq Raihandira",
    "status": "Hadir",
    "jamAbsen": "11:30",
    "fotoBukti": "/logo-bem.png",
    "poinPiket": 3
  },
  {
    "id": "jp30",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u67",
    "namaPetugas": "Ayesah Lutfiah Maharani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp31",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u59",
    "namaPetugas": "Adinda Najwa Otvatiani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp32",
    "minggu": "Ganjil",
    "hari": "Kamis",
    "tanggal": "2026-09-17",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u71",
    "namaPetugas": "Davina Noerfazhira",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp33",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u46",
    "namaPetugas": "Nadya Ulya Ramdhani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp34",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u69",
    "namaPetugas": "Raffael Syahadat Fahlevi",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp35",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u72",
    "namaPetugas": "Salsabiil Aqiilah",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp36",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u19",
    "namaPetugas": "Alexandra Beatrice Sjamsuardi",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp37",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u26",
    "namaPetugas": "Zahra Nurmaya",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp38",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u25",
    "namaPetugas": "Hana Rahmadini",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp39",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u8",
    "namaPetugas": "Habbiel Zidanu Arsa",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp40",
    "minggu": "Ganjil",
    "hari": "Jum'at",
    "tanggal": "2026-09-18",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u2",
    "namaPetugas": "Alya Ananta Taufik",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp41",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u10",
    "namaPetugas": "Shofiya Naura Jannah",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp42",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u35",
    "namaPetugas": "Muhammad Farid Al Hafiz",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp43",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u47",
    "namaPetugas": "Luthfi Khairan Fauzan",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp44",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u48",
    "namaPetugas": "Muhammad Nafil Makarim",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp45",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u29",
    "namaPetugas": "Alya Putri Helda",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp46",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u63",
    "namaPetugas": "Nabila Syahrani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp47",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u11",
    "namaPetugas": "Rifdah Adela Putri",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp48",
    "minggu": "Genap",
    "hari": "Senin",
    "tanggal": "2026-09-21",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u50",
    "namaPetugas": "Muhammad Teguh Al Ihsan",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp49",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u7",
    "namaPetugas": "Muhammad Rafi Saddiq",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp50",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u22",
    "namaPetugas": "Syakira Naura Jannah",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp51",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u32",
    "namaPetugas": "Aisyah Widia Wati",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp52",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u54",
    "namaPetugas": "Adhitya Naufal",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp53",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u40",
    "namaPetugas": "Sasya Zamora",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp54",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u57",
    "namaPetugas": "Neza Kurnia Lahimi",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp55",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u37",
    "namaPetugas": "Adinda Queen Salsabilla",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp56",
    "minggu": "Genap",
    "hari": "Selasa",
    "tanggal": "2026-09-22",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u70",
    "namaPetugas": "Bintang Veraldi Nibraceae",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp57",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u64",
    "namaPetugas": "Ghinada Fathanawafa Algma",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp58",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u81",
    "namaPetugas": "Muhammad Farid Junaidi",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp59",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u42",
    "namaPetugas": "Muhammad Arief Nasril",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp60",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u13",
    "namaPetugas": "Adila Bintang Fauzi",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp61",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u12",
    "namaPetugas": "Muhammad Farrel Giovanni",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp62",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u44",
    "namaPetugas": "Bayu Mutawakkil",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp63",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u38",
    "namaPetugas": "Siti Kayla Reyhana",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp64",
    "minggu": "Genap",
    "hari": "Rabu",
    "tanggal": "2026-09-23",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u68",
    "namaPetugas": "Dwimirza Intania Arsy",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp65",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u6",
    "namaPetugas": "Naira Ramadhani Halil",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp66",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u66",
    "namaPetugas": "Arib Jilham",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp67",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u18",
    "namaPetugas": "Filzi Jelila Inda Robbani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp68",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u23",
    "namaPetugas": "Muhammad Fajri Aulia",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp69",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u76",
    "namaPetugas": "Nadine Latisha Elanda",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp70",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u17",
    "namaPetugas": "Endy Pardilian",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp71",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u65",
    "namaPetugas": "Lathifa Zahra",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp72",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u80",
    "namaPetugas": "M. Ghaza Pratama",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp73",
    "minggu": "Genap",
    "hari": "Kamis",
    "tanggal": "2026-09-24",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u27",
    "namaPetugas": "Abdul Jabbar",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp74",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u14",
    "namaPetugas": "Aisyah Desti Mitalianti",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp75",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u39",
    "namaPetugas": "Muhammad Yusuf",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp76",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u33",
    "namaPetugas": "Kesya Ashilah Rianto",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp77",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u30",
    "namaPetugas": "Zaskya Marvira",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp78",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u41",
    "namaPetugas": "Ramadhani Amelia Putri",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp79",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u58",
    "namaPetugas": "Zaki Alfurqani",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp80",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u55",
    "namaPetugas": "Raditya Hafis Abyanka",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  },
  {
    "id": "jp81",
    "minggu": "Genap",
    "hari": "Jum'at",
    "tanggal": "2026-09-25",
    "jamMulai": "09:00",
    "jamSelesai": "16:00",
    "durasiMin": "1 Jam",
    "keterangan": "Jam Bebas (09.00 - 16.00 WIB)",
    "staffId": "u73",
    "namaPetugas": "Faiz Anargya",
    "status": "Belum Absen",
    "jamAbsen": null,
    "fotoBukti": null,
    "poinPiket": 0
  }
];


export const SESI_PIKET = [
  {
    "id": "sp1",
    "jadwalId": "jp1",
    "staffId": "u7",
    "fotoMasuk": "/logo-bem.png",
    "waktuMasuk": "2026-09-12T08:05:00",
    "fotoSelesai": "/logo-bem.png",
    "waktuSelesai": "2026-09-12T09:10:00",
    "durasi": 65,
    "status": "Selesai"
  }
];

export const NOTIFIKASI = [
  {
    "id": "n1",
    "tipe": "dana",
    "pesan": "Pengajuan dana FTI CUP 2026 (Rp 22.000.000) menunggu persetujuan Bendahara Daerah",
    "waktu": "2026-09-12T09:00:00",
    "read": false,
    "link": "/keuangan/pd1"
  },
  {
    "id": "n2",
    "tipe": "dana",
    "pesan": "Pengajuan dana Bakti FTI oleh Dinas Internal menunggu verifikasi RAB",
    "waktu": "2026-09-12T08:30:00",
    "read": false,
    "link": "/keuangan/pd3"
  },
  {
    "id": "n3",
    "tipe": "rapat",
    "target": "presidium",
    "pesan": "Rapat Presidium & Pimpinan BEM Vismayakriya besok, 14 September 19:30 WIB",
    "waktu": "2026-09-12T07:00:00",
    "read": false,
    "link": "/rapat/r1"
  },
  {
    "id": "n4",
    "tipe": "proker",
    "pesan": "Proker FTI Reconnect berstatus tertunda. Perlu penyesuaian jadwal.",
    "waktu": "2026-09-11T15:00:00",
    "read": true,
    "link": "/program-kerja/pk25"
  },
  {
    "id": "n5",
    "tipe": "piket",
    "pesan": "Jadwal piket sekretariat kamu besok, 13 September pukul 08:00 WIB",
    "waktu": "2026-09-12T06:00:00",
    "read": false,
    "link": "/piket"
  },
  {
    "id": "n6",
    "tipe": "dana",
    "pesan": "Pengajuan dana Temu Alumni FTI ditolak. Silakan tinjau catatan Bendahara Daerah.",
    "waktu": "2026-09-10T14:00:00",
    "read": true,
    "link": "/keuangan/pd5"
  },
  {
    "id": "n7",
    "tipe": "proker",
    "pesan": "Target progres IT Development oleh Dinas RISTEK mencapai 85%",
    "waktu": "2026-09-12T07:00:00",
    "read": true,
    "link": "/program-kerja/pk42"
  },
  {
    "id": "n8",
    "tipe": "rapat",
    "pesan": "Rapat Koordinasi Dinas Internal dijadwalkan 15 September pukul 16:00 WIB",
    "waktu": "2026-09-11T10:00:00",
    "read": true,
    "link": "/rapat/r2"
  }
];

// Helper functions
export function getUserById(id) {
  return USERS.find(u => u.id === id);
}

export function getDinasById(id) {
  return DINAS_LIST.find(d => d.id === id);
}

export function getProkerById(id) {
  return PROGRAM_KERJA.find(pk => pk.id === id);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function getProkerPic(proker) {
  if (!proker) return '-';
  if (proker.picNama) return proker.picNama;
  if (Array.isArray(proker.picIds) && proker.picIds.length > 0) {
    return proker.picIds.map(id => getUserById(id)?.nama || id).join(' & ');
  }
  if (proker.picId) {
    const u = getUserById(proker.picId);
    return u ? u.nama : '-';
  }
  return '-';
}

export function formatTime(timeStr) {
  return timeStr + ' WIB';
}
