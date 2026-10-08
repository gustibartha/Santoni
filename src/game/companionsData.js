// Companions ("Rekan Petualang") and pets.

// Companions are reformed enemies. Each gives a % stat bonus and a battle blessing ("Berkah
// Sinergi") while in the 3-slot team. Shards come from recruiting; 10 unlock a companion.
// `bless` holds the blessing's base value and its gain per star.
export const COMPANIONS = [
  { id: 'bebek', kind: 'bebek', name: 'Bebek Satpam', rar: 'Langka', stat: 'HP', bless: { id: 'peluit', name: 'Peluit Pagi', base: 20, star: 8 },
    blessDesc: v => `${v}% peluang musuh kaget dan melewatkan giliran pertamanya.`, line: 'Bebek meniup peluit. Musuh berhenti, mengira ada razia.' },
  { id: 'kelinci', kind: 'kelinci', name: 'Kelinci Penagih', rar: 'Langka', stat: 'ATK', bless: { id: 'tagih', name: 'Tagih Bunga', base: 15, star: 5 },
    blessDesc: v => `Koin dari perjalanan dan pertarungan +${v}%.`, line: 'Kelinci menagih musuh. Musuh membayar dengan koin dan rasa malu.' },
  { id: 'kodok', kind: 'kodok', name: 'Kodok Ojek', rar: 'Langka', stat: 'ATK', bless: { id: 'antar', name: 'Antar Jemput', base: 10, star: 3 },
    blessDesc: v => `${v}% peluang tiap giliran Santoni menyerang sekali lagi (50% ATK).`, line: 'Kodok mengantar Santoni ke depan musuh. Sekali lagi.' },
  { id: 'kucing', kind: 'kucing', name: 'Kucing Influencer', rar: 'Epik', stat: 'ATK', bless: { id: 'siaran', name: 'Siaran Langsung', base: 6, star: 2 },
    blessDesc: v => `Peluang kritis +${v}%. Penonton suka momen dramatis.`, line: 'Kucing menyorotkan ring light. Pukulan Santoni jadi lebih fotogenik.' },
  { id: 'kura', kind: 'kura', name: 'Kura-Kura Birokrat', rar: 'Epik', stat: 'HP', bless: { id: 'formulir', name: 'Formulir Rangkap', base: 8, star: 3 },
    blessDesc: v => `Kerusakan yang diterima −${v}%. Semua serangan harus mengisi formulir.`, line: 'Kura-Kura meminta musuh mengisi formulir dulu. Serangannya jadi pelan.' },
  { id: 'lebah', kind: 'lebah', name: 'Lebah Notaris', rar: 'Epik', stat: 'DEF', bless: { id: 'stempel', name: 'Stempel Sah', base: 60, star: 15 },
    blessDesc: v => `Pukulan pertama tiap battle +${v}%. Sudah dilegalisir.`, line: 'Lebah mengecap pukulan pertama Santoni. Sah dan berkekuatan hukum.' },
  { id: 'tikus', kind: 'tikus', name: 'Tikus Kantoran', rar: 'Langka', stat: 'DEF', bless: { id: 'lembur', name: 'Jam Lembur', base: 15, star: 5 },
    blessDesc: v => `Mulai giliran ke-5, serangan Santoni +${v}%. Lembur dibayar dengan pukulan.`, line: 'Tikus melirik jam. "Sudah lewat jam kerja," katanya. Santoni mulai serius.' },
  { id: 'lele', kind: 'lele', name: 'Lele Motivator', rar: 'Langka', stat: 'HP', bless: { id: 'semangat', name: 'Kata Mutiara', base: 2, star: 1 },
    blessDesc: v => `Tiap giliran Santoni, pulihkan ${v}% HP maksimal. Kamu pasti bisa.`, line: '"Kamu pasti bisa," kata Lele. Santoni merasa sedikit lebih sehat. Dan terganggu.' },
  { id: 'kumbang', kind: 'kumbang', name: 'Kumbang Galau', rar: 'Epik', stat: 'DEF', bless: { id: 'curhat', name: 'Sesi Curhat', base: 8, star: 3 },
    blessDesc: v => `ATK musuh −${v}%. Mereka ikut sedih mendengar curhatan Kumbang.`, line: 'Kumbang bercerita tentang mantannya. Musuh kehilangan semangat bertarung.' },
  { id: 'kambing', kind: 'kambing', name: 'Kambing Debat', rar: 'Epik', stat: 'ATK', bless: { id: 'bantah', name: 'Bantahan Telak', base: 15, star: 5 },
    blessDesc: v => `${v}% peluang membalas setiap serangan musuh dengan 60% ATK.`, line: 'Kambing berkata "menurut saya" lalu menanduk. Bantahan diterima.' },
  { id: 'cumi', kind: 'cumi', name: 'Cumi DJ', rar: 'Epik', stat: 'ATK', bless: { id: 'tinta', name: 'Tirai Tinta', base: 10, star: 3 },
    blessDesc: v => `${v}% peluang serangan musuh meleset karena tinta. Lampu disko ikut membantu.`, line: 'Cumi memutar lagu dan menyemprot tinta. Musuh tidak tahu harus memukul ke mana.' },
  { id: 'buaya', kind: 'buaya', name: 'Buaya Darat Rentenir', rar: 'Legendaris', stat: 'ATK', bless: { id: 'majemuk', name: 'Bunga Majemuk', base: 6, star: 2 },
    blessDesc: v => `Pulihkan HP sebesar ${v}% dari kerusakan yang diberikan.`, line: 'Buaya menghitung bunga dari tiap pukulan. Bunganya untuk Santoni.' },
  { id: 'gajah', kind: 'gajah', name: 'Gajah Komisaris', rar: 'Legendaris', stat: 'HP', bless: { id: 'veto', name: 'Hak Veto', base: 1, star: 0 },
    blessDesc: (v, star) => `Membatalkan ${star >= 3 ? 2 : 1} serangan musuh pertama tiap battle. Rapat ditolak.`, line: 'Gajah mengangkat tangan. "Veto." Serangan itu tidak jadi terjadi.' },
  { id: 'angsa', kind: 'angsa', name: 'Angsa Pengacara', rar: 'Legendaris', stat: 'DEF', bless: { id: 'banding', name: 'Ajukan Banding', base: 20, star: 5 },
    blessDesc: v => `Sekali per battle, saat HP habis Santoni bertahan dengan ${v}% HP.`, line: 'Angsa mengajukan banding atas kekalahan Santoni. Banding diterima.' },
  { id: 'monyet', kind: 'monyet', name: 'Monyet Juru Parkir', rar: 'Langka', stat: 'ATK', bless: { id: 'parkir', name: 'Uang Parkir', base: 15, star: 5 },
    blessDesc: v => `Tiap musuh yang dikalahkan dalam perjalanan memberi +${v} koin tambahan.`, line: 'Monyet meniup peluit. "Terus, terus, yak!" Musuh membayar parkir.' },
  { id: 'kelelawar', kind: 'kelelawar', name: 'Kelelawar Ronda', rar: 'Langka', stat: 'HP', bless: { id: 'ronda', name: 'Ronda Malam', base: 4, star: 1 },
    blessDesc: v => `Musuh memulai tiap battle dengan HP −${v}%. Kelelawar sudah memukulnya semalam.`, line: 'Kelelawar memukul kentongan sebelum battle dimulai. Musuh sudah lelah duluan.' },
  { id: 'merak', kind: 'merak', name: 'Merak Selebgram', rar: 'Epik', stat: 'DEF', bless: { id: 'pesona', name: 'Pesona Bulu', base: 8, star: 2 },
    blessDesc: v => `${v}% peluang musuh terpesona dan lupa menyerang.`, line: 'Merak mengembangkan ekornya. Musuh berhenti untuk berswafoto.' },
  { id: 'babi', kind: 'babi', name: 'Babi Hutan Penertib', rar: 'Epik', stat: 'ATK', bless: { id: 'seruduk', name: 'Serudukan Razia', base: 15, star: 5 },
    blessDesc: v => `Serangan Santoni +${v}% selama HP musuh di atas 70%.`, line: 'Babi Hutan menyeruduk duluan. Musuh belum siap ditertibkan.' },
  { id: 'kudanil', kind: 'kudanil', name: 'Kuda Nil Mandor', rar: 'Legendaris', stat: 'HP', bless: { id: 'mandor', name: 'Helm Proyek', base: 12, star: 4 },
    blessDesc: v => `Tiap battle dimulai dengan perisai sebesar ${v}% HP maksimal Santoni.`, line: 'Mandor memakaikan helm proyek ke Santoni. Keselamatan kerja nomor satu.' }
];
// Stat bonus % for a companion: base by rarity, +0.3% per level, +2% per star.
export const COMP_BASE = { Langka: 4, Epik: 6, Legendaris: 9 };
export const COMP_MAX_LV = 50;
export const COMP_STAR_SHARDS = [20, 40, 80, 120, 200];
export const COMP_UNLOCK = 10;
export const RECRUIT = { one: 150, ten: 1350, weights: { Langka: 60, Epik: 30, Legendaris: 10 }, shards: { Langka: 6, Epik: 4, Legendaris: 2 } };

// Pets: one active pet follows Santoni and adds flat stats. Eggs hatch a random pet (duplicates
// add a star). Pakan (food) gives XP; each level needs 10 × level XP.
export const PETS = [
  { id: 'ayam', name: 'Anak Ayam Kampung', rar: 'Biasa', per: { hp: 25 }, desc: 'Selalu mengikuti Santoni. Tidak tahu kenapa. Santoni juga tidak tahu.' },
  { id: 'siput', name: 'Siput Santai', rar: 'Langka', per: { def: 1.2, hp: 10 }, desc: 'Tidak pernah tertinggal. Entah bagaimana caranya.' },
  { id: 'kepiting', name: 'Kepiting Kantoran', rar: 'Langka', per: { atk: 3 }, desc: 'Berjalan menyamping ke kantor setiap hari. Jabatannya tidak jelas.' },
  { id: 'hantu', name: 'Burung Hantu Begadang', rar: 'Epik', per: { atk: 2, hp: 15 }, desc: 'Bangun malam, tidur siang. Persis seperti Santoni, tapi lebih bijak.' },
  { id: 'bebekkaret', name: 'Bebek Karet', rar: 'Biasa', per: { def: 1, hp: 15 }, desc: 'Berbunyi "cuit" setiap diinjak. Musuh jadi ragu menginjak apa pun.' },
  { id: 'kucingoren', name: 'Anak Kucing Oren', rar: 'Langka', per: { atk: 2.5, hp: 10 }, desc: 'Oren. Itu menjelaskan semuanya. Tidak ada yang bisa menjelaskan lebih jauh.' },
  { id: 'cupang', name: 'Cupang Juara', rar: 'Epik', per: { atk: 2, def: 1.5 }, desc: 'Juara kontes cupang tingkat RT. Dibawa ke mana-mana dalam toples.' },
  { id: 'naga', name: 'Naga Kerupuk', rar: 'Legendaris', per: { atk: 5, hp: 30 }, desc: 'Menyemburkan remah kerupuk. Kecil, renyah, berbahaya.' }
];
export const PET_MAX_LV = 30;
export const PET_MAX_STAR = 5;
export const EGG_WEIGHTS = { Biasa: 45, Langka: 35, Epik: 15, Legendaris: 5 };
export const EGG_PRICE = 90;
export const PAKAN_XP = 10;
