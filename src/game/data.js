// Static game content: rarities, skills, enemies, events, items, chapters, shop offers.
// All player-facing copy is Indonesian, matching the design.

export const OUT = '2px 0 0 #2B1E18,-2px 0 0 #2B1E18,0 2px 0 #2B1E18,0 -2px 0 #2B1E18,1.5px 1.5px 0 #2B1E18,-1.5px 1.5px 0 #2B1E18,1.5px -1.5px 0 #2B1E18,-1.5px -1.5px 0 #2B1E18,0 4px 0 #2B1E18';
export const RAR = {
  Biasa: { label: 'BIASA', fg: '#5E6E52', bg: '#E1E7D6', w: 52 },
  Langka: { label: 'LANGKA', fg: '#3166B0', bg: '#D5E3F6', w: 30 },
  Epik: { label: 'EPIK', fg: '#7E43B5', bg: '#E7D9F5', w: 14 },
  Legendaris: { label: 'LEGENDARIS', fg: '#B0620A', bg: '#FBE3B8', w: 4 }
};
export const SKILLS = [
  { id: 'cakar', name: 'Cakar Bambu', rar: 'Biasa', icon: 'pets', desc: '+12% ATK. Bambu tidak terlibat.', learn: 'Kuku Santoni kini sedikit lebih serius.' },
  { id: 'bulu', name: 'Bulu Tebal', rar: 'Biasa', icon: 'shield', desc: '+18% HP maks. Juga hangat.', learn: 'Santoni mengembang. Secara harfiah.' },
  { id: 'kerupuk', name: 'Lempar Kerupuk', rar: 'Biasa', icon: 'cookie', desc: 'Serangan pertama tiap battle 160% ATK. Kerupuk tidak kembali.', learn: 'Santoni menyimpan kerupuk di tempat yang tidak perlu kita tahu.' },
  { id: 'kipas', name: 'Ekor Kipas', rar: 'Langka', icon: 'air', desc: 'Tiap 3 serangan, ekor mengipas musuh: 80% ATK. Musuh jadi sejuk.', learn: 'Ekor Santoni bergerak sendiri. Santoni memutuskan tidak bertanya.' },
  { id: 'gertak', name: 'Pose Seram', rar: 'Langka', icon: 'sports_martial_arts', desc: 'Musuh 20% melewatkan giliran. Peluang gertak +15%.', learn: 'Santoni berlatih berdiri dengan dua kaki. Cukup meyakinkan.' },
  { id: 'kritis', name: 'Tatapan Kosong', rar: 'Langka', icon: 'visibility', desc: '+15% peluang kritis. Tidak ada yang tahu Santoni memikirkan apa.', learn: 'Santoni menatap jauh. Sangat jauh.' },
  { id: 'ngemil', name: 'Ngemil', rar: 'Langka', icon: 'ramen_dining', desc: 'Pulihkan HP sebesar 15% kerusakan yang diberikan.', learn: 'Santoni kini bisa makan sambil bertarung. Dan sebaliknya.' },
  { id: 'tidur', name: 'Tidur Ayam', rar: 'Epik', icon: 'bedtime', desc: 'Sekali per battle saat HP < 30%: pulihkan 35% HP. Musuh menunggu karena sungkan.', learn: 'Santoni menguasai seni tidur di mana saja.' },
  { id: 'statis', name: 'Bulu Statis', rar: 'Epik', icon: 'bolt', desc: '25% peluang petir 70% ATK tiap serangan. Bulu makin mengembang.', learn: 'Santoni menggosok badan ke karpet. Sekarang Santoni berbahaya.' },
  { id: 'belang', name: 'Sembilan Belang', rar: 'Legendaris', icon: 'auto_awesome', desc: 'Tiap serangan diikuti sabetan ekor 45% ATK. Ekornya tetap satu.', learn: 'Belang di ekor Santoni bersinar. Lalu berhenti. Malu.' },
  { id: 'menguap', name: 'Menguap', rar: 'Biasa', icon: 'snooze', desc: '12% peluang menghindari serangan musuh. Waktunya selalu pas.', learn: 'Santoni menguap. Sebuah tinju lewat di tempat kepalanya tadi berada.' },
  { id: 'celengan', name: 'Celengan Ayam', rar: 'Biasa', icon: 'savings', desc: '+30% koin dari musuh dan kejadian di jalan.', learn: 'Santoni membawa celengan. Celengannya berbunyi tiap Santoni melangkah.' },
  { id: 'kardus', name: 'Kardus Bekas', rar: 'Biasa', icon: 'inventory_2', desc: '+15% DEF. Serangan pertama musuh tiap battle hanya setengah sakit.', learn: 'Santoni memakai kardus. Tulisannya "JANGAN DIBANTING".' },
  { id: 'catat', name: 'Buku Catatan', rar: 'Biasa', icon: 'edit_note', desc: '+30% XP dari semua sumber. Naik level lebih cepat.', learn: 'Santoni mulai mencatat. Catatan pertama: "beli bambu".' },
  { id: 'sabar', name: 'Kesabaran Tipis', rar: 'Langka', icon: 'hourglass_bottom', desc: 'Tiap kali terkena serangan, ATK +7% sampai battle selesai. Menumpuk.', learn: 'Santoni menghitung sampai sepuluh. Santoni berhenti di tujuh.' },
  { id: 'kaktus', name: 'Bantal Kaktus', rar: 'Langka', icon: 'grass', desc: 'Memantulkan 30% kerusakan yang diterima ke musuh.', learn: 'Santoni tidur di atas kaktus. Kaktusnya yang minta maaf.' },
  { id: 'sambal', name: 'Sambal Terasi', rar: 'Epik', icon: 'local_fire_department', desc: 'Tiap serangan menambah 1 lapis pedas (maks 5). Musuh kepedasan 6% ATK per lapis tiap giliran.', learn: 'Santoni membawa sambal dalam toples. Tutupnya tidak rapat.' },
  { id: 'kembaran', name: 'Kembaran Tak Resmi', rar: 'Epik', icon: 'group', desc: '30% peluang kembaran ikut memukul 70% ATK. Ia mengaku sepupu.', learn: 'Ada panda merah lain yang mirip Santoni. Ia tidak mau ditanya.' },
  { id: 'sindiran', name: 'Sindiran Halus', rar: 'Epik', icon: 'sentiment_dissatisfied', desc: '+50% kerusakan ke musuh yang HP-nya di bawah 35%.', learn: 'Santoni belajar menyindir. Santoni tidak pernah menaikkan suara.' },
  { id: 'kesiangan', name: 'Bangun Kesiangan', rar: 'Legendaris', icon: 'alarm', desc: 'Sekali per perjalanan: saat HP habis, Santoni bangun lagi dengan 50% HP.', learn: 'Santoni menyetel alarm. Alarmnya juga ketiduran.' }
];
// Energy refills one point every `regenMs` up to `max`, also while the game is closed.
export const ENERGY = { max: 30, cost: 5, regenMs: 5 * 60 * 1000 };
export const ENEMIES = {
  tikus: { name: 'Tikus Kantoran', icon: 'pest_control_rodent', hp: 300, atk: 62, def: 6, intro: 'Ia membawa map berisi laporan yang belum selesai.', hit: 'Tikus Kantoran melempar stapler.', lose: 'Ia pulang lebih awal. Pertama kalinya dalam enam tahun.' },
  bebek: { name: 'Bebek Satpam', icon: 'flutter_dash', hp: 380, atk: 54, def: 14, intro: 'Ia meminta Santoni menitipkan KTP.', hit: 'Bebek Satpam meniup peluit tepat di telinga Santoni.', lose: 'Ia kembali ke pos. Pura-pura tidak terjadi apa-apa.' },
  kumbang: { name: 'Kumbang Galau', icon: 'pest_control', hp: 260, atk: 72, def: 4, intro: 'Ia baru putus. Ia ingin seseorang ikut merasakan.', hit: 'Kumbang Galau curhat. Kerusakan emosional.', lose: 'Ia terbang, merasa sedikit lebih baik.' },
  lele: { name: 'Lele Motivator', icon: 'set_meal', hp: 420, atk: 50, def: 10, intro: '"Kamu pasti bisa," katanya, lalu menyerang.', hit: 'Lele Motivator menampar dengan kumis dan kata-kata mutiara.', lose: '"Kegagalan adalah guru," katanya. Ia tampak tidak yakin.' },
  kelinci: { name: 'Kelinci Penagih', icon: 'cruelty_free', hp: 340, atk: 64, def: 8, intro: 'Katanya Santoni punya utang. Santoni tidak ingat. Kelinci ingat.', hit: 'Kelinci Penagih menendang. Bunganya 2% per hari.', lose: 'Ia mencoret nama Santoni. Untuk sementara.' },
  lebah: { name: 'Lebah Notaris', icon: 'emoji_nature', hp: 1300, atk: 72, def: 16, boss: true, intro: 'Semua perkelahian harus dilegalisir.', hit: 'Lebah Notaris menyengat lalu mencap.', lose: 'Ia mengesahkan kekalahannya sendiri. Rapi.', immune: 'Notaris tidak bisa digertak. Semua sudah tercatat.' },
  angsa: { name: 'Angsa Pengacara', icon: 'gavel', hp: 2000, atk: 78, def: 20, boss: true, intro: 'Ia mewakili semua angsa yang pernah merasa dirugikan.', hit: 'Angsa Pengacara mengajukan keberatan. Dengan paruh.', lose: 'Ia mengajukan banding. Banding ditolak.', immune: 'Bos tidak bisa digertak. Bos punya pengacara. Bos adalah pengacara.' }
};
export const COMMON = ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci'];
export const EVENTS = [
  { id: 'batu', text: 'Seekor biawak menjual batu. Katanya batu itu bisa bicara. Batu itu diam saja.',
    a: { label: 'Beli batunya', icon: 'paid', cost: 80, hint: '−80 koin', res: () => ({ t: 'Santoni membeli batu. Batu itu tetap diam, tapi Santoni merasa lebih kuat.', atk: 14 }) },
    b: { label: 'Lanjut jalan', icon: 'directions_walk', hint: '—', res: () => ({ t: 'Santoni lanjut jalan. Biawak tidak tersinggung. Biawak memang begitu.' }) } },
  { id: 'sumur', text: 'Ada sumur. Dari dalam sumur, seseorang berteriak, "Jangan lihat ke bawah."',
    a: { label: 'Lihat ke bawah', icon: 'visibility', hint: '50 : 50', res: () => (Math.random() < 0.5 ? { t: 'Santoni melihat ke bawah. Isinya sup. Masih hangat.', hp: 220 } : { t: 'Santoni melihat ke bawah. Isinya lebah. Lebahnya juga kaget.', hp: -160 }) },
    b: { label: 'Hormati permintaannya', icon: 'handshake', hint: '+XP', res: () => ({ t: 'Santoni tidak melihat. Santoni merasa dewasa.', xp: 45 }) } },
  { id: 'asuransi', text: 'Seekor bebek menawarkan asuransi jiwa. Preminya satu bambu per hari.',
    a: { label: 'Daftar', icon: 'verified_user', hint: 'HP maks ↑', res: () => ({ t: 'Santoni mendaftar asuransi. Polisnya berlaku sejak kemarin.', maxHp: 160 }) },
    b: { label: 'Tolak dengan sopan', icon: 'block', hint: '—', res: () => ({ t: 'Santoni menolak asuransi. Bebek mengangguk. Bebek sudah terbiasa ditolak.' }) } },
  { id: 'sandal', text: 'Santoni menemukan sandal. Hanya yang kiri.',
    a: { label: 'Pakai', icon: 'checkroom', hint: 'DEF ↑', res: () => ({ t: 'Santoni memakai sandal kiri. Langkahnya kini asimetris.', def: 10 }) },
    b: { label: 'Tinggalkan', icon: 'directions_walk', hint: '+koin', res: () => ({ t: 'Sandal itu menatap Santoni pergi. Di bawahnya ada koin.', coins: 40 }) } },
  { id: 'hujan', text: 'Hujan turun. Ada daun talas lebar di dekat sini.',
    a: { label: 'Berteduh', icon: 'umbrella', hint: '+HP', res: () => ({ t: 'Santoni berteduh di bawah daun talas. Santoni kering, daun basah.', hp: 140 }) },
    b: { label: 'Hujan-hujanan', icon: 'water_drop', hint: 'ATK ↑', res: () => ({ t: 'Santoni basah kuyup, tapi bertekad. Tidak jelas bertekad apa.', atk: 10 }) } },
  { id: 'katak', text: 'Seekor katak menantang Santoni lomba diam.',
    a: { label: 'Terima', icon: 'sentiment_neutral', hint: '+XP', res: () => ({ t: 'Santoni menang lomba diam. Katak masih diam. Mungkin katak juga menang.', xp: 60 }) },
    b: { label: 'Menolak dengan diam', icon: 'do_not_disturb_on', hint: '?', res: () => ({ t: 'Katak menganggap diam Santoni sebagai jawaban. Dan kemenangan.', xp: 20 }) } },
  { id: 'tombol', text: 'Ada tombol merah di tengah jalan. Tidak ada tulisan apa-apa.',
    a: { label: 'Tekan', icon: 'radio_button_checked', hint: 'skill?', res: () => ({ t: 'Santoni menekan tombol merah. Sesuatu berubah. Di dalam diri Santoni.', skill: true }) },
    b: { label: 'Jangan', icon: 'pan_tool', hint: '+koin', res: () => ({ t: 'Santoni tidak menekan tombol. Tombol tampak kecewa. Santoni dapat koin entah dari mana.', coins: 60 }) } },
  { id: 'kerupuk', text: 'Pedagang kerupuk keliling lewat. Kerupuknya melempem.',
    a: { label: 'Beli satu', icon: 'cookie', cost: 30, hint: '−30 koin', res: () => ({ t: 'Santoni makan kerupuk melempem. Melempem, tapi jujur.', hp: 110 }) },
    b: { label: 'Pura-pura tidak lihat', icon: 'visibility_off', hint: '—', res: () => ({ t: 'Santoni pura-pura tidak lihat. Pedagang juga. Semua lega.' }) } }
];
export const FLAVOR = [
  { t: 'Santoni berjalan. Jalannya lurus. Santoni juga.' },
  { t: 'Seekor kupu-kupu hinggap di kepala Santoni. Santoni membiarkannya.', hp: 30 },
  { t: 'Santoni menemukan koin di bawah batu. Batunya tidak keberatan.', coins: 25 },
  { t: 'Angin bertiup ke arah yang salah. Santoni tetap jalan.' },
  { t: 'Santoni memikirkan bambu. Lalu memikirkan bambu lagi.', xp: 15 },
  { t: 'Ada papan bertuliskan "Belok kiri". Santoni belok kanan. Tidak terjadi apa-apa.' },
  { t: 'Santoni tidur siang empat jam. Dunia tidak menunggu.', hp: 90 },
  { t: 'Seekor siput menyalip Santoni. Santoni tidak mengejar.' },
  { t: 'Santoni bertemu bayangannya sendiri. Mereka saling mengangguk.', xp: 10 },
  { t: 'Seseorang menjatuhkan dompet. Isinya struk belanja dan 12 koin.', coins: 12 }
];
export const ITEMS = {
  sumpit: { name: 'Sumpit Bambu', type: 'senjata', rar: 'Langka', stat: 'ATK', val: 36, lvl: 12, icon: 'ramen_dining', desc: 'Dua batang. Satu untuk menyerang, satu cadangan.' },
  payung: { name: 'Payung Lipat', type: 'senjata', rar: 'Biasa', stat: 'ATK', val: 22, lvl: 8, icon: 'beach_access', desc: 'Bisa untuk menyerang. Bisa untuk hujan. Jarang keduanya.' },
  centong: { name: 'Centong Nasi Kuno', type: 'senjata', rar: 'Epik', stat: 'ATK', val: 58, lvl: 1, icon: 'restaurant', desc: 'Pernah dipakai di tiga kenduri. Aura nasinya masih terasa.' },
  panci: { name: 'Panci Antik', type: 'topi', rar: 'Epik', stat: 'HP', val: 260, lvl: 10, icon: 'soup_kitchen', desc: 'Dipakai di kepala. Masih bisa untuk merebus.' },
  pramuka: { name: 'Topi Pramuka', type: 'topi', rar: 'Biasa', stat: 'HP', val: 120, lvl: 5, icon: 'school', desc: 'Siap sedia. Tidak jelas untuk apa.' },
  helm: { name: 'Helm Proyek', type: 'topi', rar: 'Langka', stat: 'HP', val: 190, lvl: 4, icon: 'engineering', desc: 'Kuning. Membuat Santoni tampak bertanggung jawab.' },
  syal: { name: 'Syal Rajut Nenek', type: 'baju', rar: 'Langka', stat: 'DEF', val: 14, lvl: 9, icon: 'checkroom', desc: 'Panjangnya empat meter. Nenek tidak tahu kapan berhenti.' },
  jashujan: { name: 'Jas Hujan Plastik', type: 'baju', rar: 'Biasa', stat: 'DEF', val: 8, lvl: 6, icon: 'water_drop', desc: 'Berbunyi kresek setiap Santoni bergerak.' },
  tutup: { name: 'Kalung Tutup Botol', type: 'kalung', rar: 'Langka', stat: 'ATK', val: 18, lvl: 7, icon: 'trip_origin', desc: 'Tutup botol limun. Dikoleksi dengan serius.' },
  cincin: { name: 'Cincin Karet', type: 'kalung', rar: 'Biasa', stat: 'ATK', val: 10, lvl: 4, icon: 'radio_button_unchecked', desc: 'Bekas ikat bungkus nasi. Elastis secara emosional.' },
  rafia: { name: 'Tali Rafia', type: 'sabuk', rar: 'Biasa', stat: 'HP', val: 90, lvl: 6, icon: 'cable', desc: 'Merah muda. Kuat menahan apa saja kecuali angin.' },
  gesper: { name: 'Gesper Raksasa', type: 'sabuk', rar: 'Epik', stat: 'HP', val: 180, lvl: 2, icon: 'link', desc: 'Beratnya dua kilo. Gaya tetap nomor satu.' },
  sandal: { name: 'Sandal Kiri', type: 'sepatu', rar: 'Legendaris', stat: 'DEF', val: 22, lvl: 15, icon: 'directions_walk', desc: 'Hanya yang kiri. Ternyata cukup.' },
  kaoskaki: { name: 'Kaus Kaki Ganjil', type: 'sepatu', rar: 'Biasa', stat: 'DEF', val: 9, lvl: 3, icon: 'nordic_walking', desc: 'Satu motif bebek, satu motif galaksi.' }
};
export const CHAPTERS = [
  { name: 'Kebun Bambu Tetangga', icon: 'forest', desc: 'Tetangga belum tahu.' },
  { name: 'Pasar Subuh', icon: 'storefront', desc: 'Buka jam tiga pagi. Santoni bangun jam tiga sore.' },
  { name: 'Rawa Kerupuk', icon: 'water', desc: 'Rawanya renyah. Jangan tanya kenapa.' },
  { name: 'Gunung Kasur', icon: 'landscape', desc: 'Sangat empuk. Banyak yang tidak kembali karena ketiduran.' },
  { name: 'Gua Wi-Fi Lemah', icon: 'wifi_off', desc: 'Satu bar. Kadang nol. Bosnya selalu buffering.' },
  { name: 'Kantor Pajak Hutan', icon: 'account_balance', desc: 'Antrean nomor 4.891. Bawa fotokopi KTP.' }
];
export const OFFERS = [
  { id: 'energi', name: 'Energi ×10', icon: 'bolt', rar: 'Langka', cur: 'gem', price: 50, give: { energy: 10 }, msg: 'Energi +10. Santoni tetap mengantuk.' },
  { id: 'koin', name: 'Sekantong Koin', icon: 'toll', rar: 'Legendaris', cur: 'gem', price: 80, give: { coins: 6000 }, msg: '+6.000 koin. Kantongnya ikut.' },
  { id: 'kerupuk', name: 'Kerupuk Gratis', icon: 'cookie', rar: 'Biasa', cur: 'ad', price: 'Gratis', give: { energy: 3 }, msg: 'Kerupuk dimakan. Energi +3. Iklannya dilewati.' },
  { id: 'permata', name: 'Permata Receh', icon: 'diamond', rar: 'Epik', cur: 'coin', price: 9000, give: { gems: 50 }, msg: '+50 permata. Recehnya berkilau.' },
  { id: 'asah', name: 'Batu Asah', icon: 'hardware', rar: 'Biasa', cur: 'coin', price: 2500, give: {}, msg: 'Batu asah dibeli. Belum ada yang diasah.' },
  { id: 'misteri', name: 'Item Misteri', icon: 'help', rar: 'Epik', cur: 'gem', price: 120, give: { item: true }, msg: '' }
];
export const QUOTES = ['Santoni tidak sampai ujung. Tapi Santoni sampai di suatu tempat.', 'Perjalanan ini mengajarkan sesuatu. Santoni lupa apa.', 'Santoni pulang dengan tas penuh dan ekspresi yang sama.'];
export const QUOTES_WIN = ['Bab selesai. Santoni mengangguk sekali. Itu sudah perayaan.', 'Angsa Pengacara kalah. Santoni tidak menyewa pengacara. Tidak perlu.'];
export const POSES = [['idle', 'Diam'], ['seram', 'Pose Seram'], ['walk', 'Jalan'], ['attack', 'Serang'], ['hurt', 'Terkena'], ['sleep', 'Tidur']];
export const BUBBLES = ['Hari ini saya pergi. Mungkin besok juga.', 'Saya tidak marah. Wajah saya memang begini.', 'Ransel sudah siap. Saya belum.', 'Rawanya renyah, katanya. Kita lihat saja.', 'Ketuk saya lagi. Tidak akan terjadi apa-apa.'];
