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

// --- Team battle ------------------------------------------------------------------------------
// Every companion in the team strikes on its own beat (Game.teamStrike); `role` picks the rider
// effect and `move` names the attack in the battle log. Pets bite every other turn.
export const ROLES = {
  stun: { label: 'Pelumpuh', desc: '20% peluang musuh lumpuh 1 giliran.', icon: 'electric_bolt' },
  koin: { label: 'Pemungut', desc: 'Tiap serangan menambah koin perjalanan.', icon: 'paid' },
  ganda: { label: 'Beruntun', desc: 'Menyerang dua kali beruntun.', icon: 'keyboard_double_arrow_right' },
  kritis: { label: 'Penembak jitu', desc: '35% peluang kritis ×2.', icon: 'target' },
  perisai: { label: 'Penjaga', desc: 'Memberi Santoni perisai 6% HP maks.', icon: 'shield' },
  pulih: { label: 'Penyembuh', desc: 'Memulihkan HP Santoni 5% HP maks.', icon: 'favorite' },
  lemah: { label: 'Pelemah', desc: 'Musuh terhuyung: ATK −15%, menumpuk sampai 3.', icon: 'trending_down' },
  bakar: { label: 'Pembakar', desc: 'Membakar musuh 2 giliran.', icon: 'local_fire_department' }
};
export const COMP_ATTACK = {
  bebek: { role: 'stun', move: 'Peluit Razia' }, kelinci: { role: 'koin', move: 'Tendangan Tagihan' },
  kodok: { role: 'ganda', move: 'Tabrak Lari' }, kucing: { role: 'kritis', move: 'Cakar Viral' },
  kura: { role: 'perisai', move: 'Tameng Formulir' }, lebah: { role: 'ganda', move: 'Sengat Stempel' },
  tikus: { role: 'ganda', move: 'Lempar Stapler' }, lele: { role: 'pulih', move: 'Tamparan Motivasi' },
  kumbang: { role: 'lemah', move: 'Curhat Panjang' }, kambing: { role: 'lemah', move: 'Tanduk Argumen' },
  cumi: { role: 'lemah', move: 'Semprot Tinta' }, buaya: { role: 'koin', move: 'Gigitan Bunga' },
  gajah: { role: 'perisai', move: 'Injak Rapat' }, angsa: { role: 'pulih', move: 'Gugatan Paruh' },
  monyet: { role: 'koin', move: 'Pungut Parkir' }, kelelawar: { role: 'ganda', move: 'Kentongan Ganda' },
  merak: { role: 'kritis', move: 'Kibas Pesona' }, babi: { role: 'stun', move: 'Seruduk Razia' },
  kudanil: { role: 'perisai', move: 'Duduki Musuh' }
};
// Strike strength as a share of Santoni's ATK, by rarity; +1.2% per level and +8% per star.
export const STRIKE_PCT = { Biasa: 0.26, Langka: 0.32, Epik: 0.42, Legendaris: 0.55 };
export const PET_ATTACK = {
  ayam: { role: 'ganda', move: 'Patuk Kilat' }, siput: { role: 'perisai', move: 'Lendir Pelindung' },
  kepiting: { role: 'lemah', move: 'Capit Kantor' }, hantu: { role: 'kritis', move: 'Tatapan Tengah Malam' },
  bebekkaret: { role: 'stun', move: 'Cicit Nyaring' }, kucingoren: { role: 'ganda', move: 'Cakar Oren' },
  cupang: { role: 'pulih', move: 'Gelembung Segar' }, naga: { role: 'bakar', move: 'Napas Mini' }
};
// Two companions in the team together unlock a team combo; `add` stacks onto the blessings.
export const TEAM_COMBOS = [
  { id: 'viral', name: 'Konten Viral', pair: ['kucing', 'merak'], desc: 'Peluang kritis +10%.', add: { siaran: 10 } },
  { id: 'razia', name: 'Razia Gabungan', pair: ['bebek', 'babi'], desc: 'Musuh pasti kaget dan melewatkan giliran pertamanya.', add: { peluit: 100 } },
  { id: 'birokrasi', name: 'Lembur Birokrasi', pair: ['tikus', 'kura'], desc: 'Kerusakan diterima −10%, Jam Lembur +10%.', add: { formulir: 10, lembur: 10 } },
  { id: 'penagih', name: 'Tagih Berbunga', pair: ['kelinci', 'buaya'], desc: 'Koin +15%, curi nyawa +4%.', add: { tagih: 15, majemuk: 4 } },
  { id: 'motivasi', name: 'Sesi Motivasi', pair: ['lele', 'kumbang'], desc: 'Pulih 2% HP tiap giliran, ATK musuh −5%.', add: { semangat: 2, curhat: 5 } },
  { id: 'antarparkir', name: 'Antar-Parkir', pair: ['kodok', 'monyet'], desc: 'Peluang serangan tambahan +12%.', add: { antar: 12 } },
  { id: 'rapatproyek', name: 'Rapat Proyek', pair: ['gajah', 'kudanil'], desc: 'Perisai awal +10% HP dan Veto +1.', add: { mandor: 10, veto: 1 } },
  { id: 'pestamalam', name: 'Pesta Malam', pair: ['cumi', 'kelelawar'], desc: 'Serangan musuh 10% lebih sering meleset.', add: { tinta: 10 } },
  { id: 'aktabanding', name: 'Akta Banding', pair: ['angsa', 'lebah'], desc: 'Pukulan pertama +40%, Banding +10%.', add: { stempel: 40, banding: 10 } },
  { id: 'sidang', name: 'Sidang Debat', pair: ['kambing', 'angsa'], desc: 'Peluang membantah +15%.', add: { bantah: 15 } },
  { id: 'posronda', name: 'Pos Ronda', pair: ['kelelawar', 'monyet'], desc: 'Musuh mulai battle dengan HP −5%.', add: { ronda: 5 } },
  { id: 'notulen', name: 'Notulen Rapat', pair: ['tikus', 'gajah'], desc: 'Semua Serangan Tim +20%.', add: { tim: 20 } }
];
