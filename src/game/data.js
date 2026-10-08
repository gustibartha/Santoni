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
  { id: 'kesiangan', name: 'Bangun Kesiangan', rar: 'Legendaris', icon: 'alarm', desc: 'Sekali per perjalanan: saat HP habis, Santoni bangun lagi dengan 50% HP.', learn: 'Santoni menyetel alarm. Alarmnya juga ketiduran.' },
  // Elemental skills
  { id: 'bara', el: 'api', name: 'Ekor Membara', rar: 'Langka', icon: 'whatshot', desc: '35% peluang membakar musuh 3 giliran: 10% ATK tiap giliran.', learn: 'Ujung ekor Santoni mulai berasap. Santoni pura-pura tidak mencium.' },
  { id: 'naga', el: 'api', name: 'Napas Naga Kecil', rar: 'Epik', icon: 'volcano', desc: 'Tiap 4 serangan, semburan api 150% ATK dan membakar musuh.', learn: 'Santoni bersendawa. Keluar api. Santoni minta maaf ke rumput.' },
  { id: 'setrum', el: 'petir', name: 'Colokan Longgar', rar: 'Langka', icon: 'electric_bolt', desc: '20% peluang menyetrum 60% ATK. Musuh lumpuh dan melewatkan 1 giliran.', learn: 'Santoni menemukan colokan di jalan. Sejak itu bulunya berdiri.' },
  { id: 'badai', el: 'petir', name: 'Awan Pribadi', rar: 'Legendaris', icon: 'thunderstorm', desc: 'Awan kecil mengikuti Santoni. Tiap giliran musuh, petir menyambar 50% ATK.', learn: 'Sebuah awan memutuskan mengikuti Santoni. Tidak ada yang mengundangnya.' },
  { id: 'batu', el: 'tanah', name: 'Kulit Batu Kali', rar: 'Langka', icon: 'landscape', desc: 'Awal tiap battle, dapat perisai 20% HP maks yang menyerap kerusakan.', learn: 'Santoni berendam di kali. Keluarnya sedikit lebih keras.' },
  { id: 'gempa', el: 'tanah', name: 'Hentakan Gempa', rar: 'Epik', icon: 'landslide', desc: 'Tiap 3 serangan, hentakan 90% ATK. Musuh terhuyung: ATK −15%, menumpuk sampai 3.', learn: 'Santoni menghentakkan kaki. Gunung di kejauhan ikut kaget.' },
  { id: 'tiup', el: 'angin', name: 'Tiupan Sepoi', rar: 'Biasa', icon: 'cyclone', desc: '15% peluang angin ikut menyerang 60% ATK.', learn: 'Angin sepoi mulai mengikuti Santoni. Angin itu kesepian.' },
  { id: 'topan', el: 'angin', name: 'Topan Kecil', rar: 'Epik', icon: 'tornado', desc: 'Tiap 5 serangan, topan 200% ATK. Musuh terlempar dan melewatkan 1 giliran.', learn: 'Santoni berputar terlalu lama. Sekarang ada topan. Santoni pusing.' }
];
// Older skills that also count toward an element.
for (const [id, el] of [['sambal', 'api'], ['statis', 'petir'], ['kipas', 'angin'], ['kardus', 'tanah']]) SKILLS.find(k => k.id === id).el = el;

export const ELEMENTS = {
  api: { label: 'API', icon: 'local_fire_department', color: '#D2532A' },
  petir: { label: 'PETIR', icon: 'bolt', color: '#C28A16' },
  tanah: { label: 'TANAH', icon: 'landscape', color: '#8E5A2B' },
  angin: { label: 'ANGIN', icon: 'air', color: '#3C78C8' }
};
// Owning skills of both elements unlocks a combo.
export const COMBOS = [
  { id: 'kobaran', els: ['api', 'angin'], name: 'Kobaran', desc: 'Angin meniup api: kerusakan terbakar ×1,5.' },
  { id: 'badaipetir', els: ['petir', 'angin'], name: 'Badai Petir', desc: 'Peluang menyetrum +10%.' },
  { id: 'magma', els: ['api', 'tanah'], name: 'Magma', desc: 'Hentakan Gempa juga membakar musuh.' }
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
// Newer enemies have a battle trait (see Game.battleStep); `trait` is the short tag, `traitDesc` the rule.
Object.assign(ENEMIES, {
  kucing: { name: 'Kucing Influencer', icon: 'photo_camera', hp: 360, atk: 66, def: 8, trait: 'BERPOSE', traitDesc: '20% peluang menghindari serangan biasa Santoni. Ia sedang berpose.', intro: 'Ia sedang siaran langsung. Santoni masuk frame tanpa izin.', hit: 'Kucing Influencer mencakar sambil bilang "jangan lupa like".', lose: 'Ia mengakhiri siaran. Penontonnya tiga, termasuk ibunya.' },
  kura: { name: 'Kura-Kura Birokrat', icon: 'description', hp: 520, atk: 46, def: 26, trait: 'CANGKANG', traitDesc: 'Serangan biasa Santoni berkurang 35% selama HP-nya di atas setengah.', intro: 'Formulir perkelahian harus diisi rangkap tiga dan dilegalisir.', hit: 'Kura-Kura Birokrat menunda kerusakan, lalu tetap memberikannya.', lose: 'Ia masuk ke cangkang. Urusan dilanjutkan hari Senin.' },
  kambing: { name: 'Kambing Debat', icon: 'campaign', hp: 400, atk: 70, def: 10, trait: 'ARGUMEN', traitDesc: 'Tiap serangan ketiga adalah argumen pamungkas: kerusakan ×1,6.', intro: 'Ia tidak setuju dengan Santoni. Santoni belum bicara.', hit: 'Kambing Debat menanduk sambil bilang "menurut saya pribadi".', lose: 'Ia setuju untuk tidak setuju. Lalu pergi sambil mengunyah kertas.' },
  cumi: { name: 'Cumi DJ', icon: 'headphones', hp: 330, atk: 74, def: 6, trait: 'TINTA', traitDesc: '30% peluang menyemprot tinta: serangan Santoni berikutnya hanya setengah.', intro: 'Ia memutar lagu yang sama sejak 2009. Dengan penuh percaya diri.', hit: 'Cumi DJ menyemprot tinta tepat saat bagian drop.', lose: 'Musiknya berhenti. Semua orang diam-diam lega.' },
  kodok: { name: 'Kodok Ojek', icon: 'two_wheeler', hp: 350, atk: 58, def: 12, trait: 'NGEBUT', traitDesc: 'Menabrak dua kali sekaligus: kerusakan ×1,2.', intro: '"Ke mana, Mas?" Ia tidak menunggu jawaban.', hit: 'Kodok Ojek menyalip, menabrak, lalu minta bintang lima.', lose: 'Ia pergi mencari penumpang lain. Tarifnya naik saat hujan.' },
  buaya: { name: 'Buaya Darat Rentenir', icon: 'payments', hp: 1700, atk: 80, def: 18, boss: true, trait: 'BUNGA', traitDesc: 'Memulihkan HP sebesar 25% kerusakan yang ia berikan. Bunganya berbunga.', intro: 'Ia meminjamkan uang dengan bunga yang tidak masuk akal. Santoni tidak meminjam.', hit: 'Buaya Darat menggigit. Bunganya ikut menggigit.', lose: 'Ia menghapus semua utang. Sambil menangis di atas tumpukan kuitansi.', immune: 'Rentenir tidak bisa digertak. Rentenir yang biasanya menggertak.' },
  gajah: { name: 'Gajah Komisaris', icon: 'groups', hp: 2400, atk: 84, def: 24, boss: true, trait: 'INJAK', traitDesc: 'Tiap serangan ketiga menginjak: kerusakan ×1,8 dan tanah bergetar.', intro: 'Ia datang ke rapat hanya untuk menolak semua usulan.', hit: 'Gajah Komisaris menginjak. Dengan sangat berwibawa.', lose: 'Ia menyetujui kekalahannya sendiri. Rapat ditutup lebih awal.', immune: 'Komisaris tidak bisa digertak. Gertakan harus diajukan lewat sekretaris.' }
});
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
  kaoskaki: { name: 'Kaus Kaki Ganjil', type: 'sepatu', rar: 'Biasa', stat: 'DEF', val: 9, lvl: 3, icon: 'nordic_walking', desc: 'Satu motif bebek, satu motif galaksi.' },
  // New weapons
  raket: { name: 'Raket Nyamuk Listrik', type: 'senjata', rar: 'Langka', stat: 'ATK', val: 40, lvl: 9, icon: 'sports_tennis', desc: 'Dijual sebagai alat rumah tangga. Santoni tidak setuju.' },
  sapu: { name: 'Sapu Lidi Sakti', type: 'senjata', rar: 'Epik', stat: 'ATK', val: 52, lvl: 11, icon: 'cleaning_services', desc: 'Seribu lidi, satu tekad. Menyapu musuh dan debu sekaligus.' },
  ulekan: { name: 'Ulekan Batu Nenek', type: 'senjata', rar: 'Epik', stat: 'ATK', val: 61, lvl: 13, icon: 'blender', desc: 'Sudah menghaluskan sambal tiga generasi. Musuh berikutnya.' },
  gitar: { name: 'Gitar Pengamen Legendaris', type: 'senjata', rar: 'Legendaris', stat: 'ATK', val: 76, lvl: 18, icon: 'music_note', desc: 'Senarnya lima. Lagunya satu. Semua orang tetap menangis.' },
  // New gear
  caping: { name: 'Caping Sawah', type: 'topi', rar: 'Langka', stat: 'HP', val: 170, lvl: 6, icon: 'agriculture', desc: 'Lebar, adem, dan bisa untuk menampung hujan.' },
  blangkon: { name: 'Blangkon Kondangan', type: 'topi', rar: 'Epik', stat: 'HP', val: 240, lvl: 12, icon: 'face', desc: 'Dipakai sekali setahun. Hari ini termasuk.' },
  batik: { name: 'Kemeja Batik Rapi', type: 'baju', rar: 'Epik', stat: 'DEF', val: 20, lvl: 11, icon: 'checkroom', desc: 'Motif parang. Disetrika oleh nenek dengan penuh harapan.' },
  sarung: { name: 'Sarung Kotak-Kotak', type: 'baju', rar: 'Langka', stat: 'DEF', val: 15, lvl: 7, icon: 'checkroom', desc: 'Bisa jadi baju, selimut, atau tas darurat.' },
  peluit: { name: 'Kalung Peluit Satpam', type: 'kalung', rar: 'Langka', stat: 'ATK', val: 21, lvl: 8, icon: 'campaign', desc: 'Disita dari Bebek Satpam. Bebeknya masih mencari.' },
  kunci: { name: 'Gantungan Kunci Kenangan', type: 'kalung', rar: 'Epik', stat: 'ATK', val: 29, lvl: 12, icon: 'key', desc: 'Oleh-oleh dari kota yang tidak pernah Santoni datangi.' },
  pinggang: { name: 'Tas Pinggang Turis', type: 'sabuk', rar: 'Langka', stat: 'HP', val: 150, lvl: 7, icon: 'work', desc: 'Berisi permen, tiket bekas, dan rasa ingin tahu.' },
  bakiak: { name: 'Bakiak Kayu', type: 'sepatu', rar: 'Epik', stat: 'DEF', val: 19, lvl: 10, icon: 'directions_walk', desc: 'Bunyinya terdengar dari tiga desa. Musuh tahu Santoni datang.' },
  // Third wave of gear
  kipasangin: { name: 'Kipas Angin Meja', type: 'senjata', rar: 'Epik', stat: 'ATK', val: 57, lvl: 14, icon: 'mode_fan', desc: 'Tiga kecepatan. Yang ketiga tidak pernah dipakai karena terlalu berisik.' },
  peci: { name: 'Peci Hitam Licin', type: 'topi', rar: 'Langka', stat: 'HP', val: 165, lvl: 8, icon: 'face', desc: 'Licin sekali. Lalat pun tidak bisa hinggap.' },
  mahkota: { name: 'Mahkota Kardus', type: 'topi', rar: 'Legendaris', stat: 'HP', val: 330, lvl: 20, icon: 'crown', desc: 'Dibuat dari kardus mi instan. Kewibawaannya asli.' },
  jaketojek: { name: 'Jaket Ojek Hijau', type: 'baju', rar: 'Langka', stat: 'DEF', val: 16, lvl: 9, icon: 'checkroom', desc: 'Disita dari Kodok Ojek. Masih ada nomor antrean di saku.' },
  jubah: { name: 'Jubah Mandi Hotel', type: 'baju', rar: 'Epik', stat: 'DEF', val: 23, lvl: 15, icon: 'dry_cleaning', desc: 'Bukan dicuri. Hanya belum dikembalikan.' },
  bawang: { name: 'Kalung Bawang Putih', type: 'kalung', rar: 'Biasa', stat: 'ATK', val: 12, lvl: 5, icon: 'eco', desc: 'Mengusir vampir dan sebagian besar teman.' },
  karate: { name: 'Sabuk Karate Pinjaman', type: 'sabuk', rar: 'Epik', stat: 'HP', val: 210, lvl: 14, icon: 'sports_martial_arts', desc: 'Sabuk hitam. Pemiliknya sabuk kuning. Jangan tanya.' },
  sepaturoda: { name: 'Sepatu Roda Bekas', type: 'sepatu', rar: 'Langka', stat: 'DEF', val: 17, lvl: 11, icon: 'roller_skating', desc: 'Satu rodanya macet. Santoni berbelok ke kiri terus.' }
};
// A Legendaris item is guaranteed within this many chest opens.
export const LEGEND_PITY = 40;

// Travel stance, picked in the lobby before leaving. Effects are applied in Game.
export const STANCES = {
  santai: { name: 'Santai', icon: 'self_improvement', desc: 'Pulih 3% HP tiap hari. Musuh lebih jarang muncul. Santoni tidak terburu-buru.' },
  nekat: { name: 'Nekat', icon: 'local_fire_department', desc: 'Musuh lebih sering muncul, tapi koin dan XP +25%. Santoni pura-pura berani.' },
  penasaran: { name: 'Penasaran', icon: 'travel_explore', desc: 'Lebih banyak kejadian aneh dan +1 acak ulang tiap naik level.' }
};
// Route choice offered at the forks (about 1/3 and 2/3 of the way). Lasts `days` days.
export const ROUTES = {
  aman: { name: 'Jalan Setapak', icon: 'park', hint: 'aman · pulih 15%', desc: 'Tidak ada musuh selama 3 hari. Pulihkan 15% HP sekarang.', days: 3 },
  pintas: { name: 'Jalan Pintas', icon: 'fast_forward', hint: 'lompat 2 hari', desc: 'Langsung melompat 2 hari ke depan. Hadiahnya ikut terlewat.', days: 0 },
  bahaya: { name: 'Jalan Berbahaya', icon: 'skull', hint: 'musuh · koin ×2', desc: 'Musuh tiap hari selama 3 hari. Koin ×2 dan XP ×1,5 dari mereka.', days: 3 }
};
export const FORK_TEXT = 'Jalan bercabang tiga. Papan petunjuknya sudah lama jatuh. Santoni menatap ketiganya dengan ekspresi yang sama.';

// Missions. `stat` is a counter tracked by Game.track(); daily ones reset at local midnight.
// Rewards: coins, gems, energy, or an item id.
export const DAILY_QUESTS = [
  { id: 'jalan', stat: 'days', target: 15, icon: 'hiking', title: 'Jalan-jalan Santai', desc: 'Tempuh 15 hari perjalanan. Santoni bilang ini olahraga.', reward: { coins: 800 } },
  { id: 'musuh', stat: 'kills', target: 8, icon: 'swords', title: 'Bersih-bersih Jalan', desc: 'Kalahkan 8 musuh. Mereka akan baik-baik saja. Mungkin.', reward: { gems: 30 } },
  { id: 'skill', stat: 'skills', target: 6, icon: 'school', title: 'Belajar Hal Baru', desc: 'Pelajari 6 skill. Santoni tidak menjanjikan akan mengingatnya.', reward: { energy: 5 } },
  { id: 'peti', stat: 'pulls', target: 1, icon: 'redeem', title: 'Penasaran Peti', desc: 'Buka peti kayu misterius sekali. Asapnya wangi kayu.', reward: { coins: 500 } },
  { id: 'jurus', stat: 'ults', target: 2, icon: 'bolt', title: 'Jurus Andalan', desc: 'Keluarkan jurus pamungkas 2 kali.', reward: { gems: 25 } },
  { id: 'gertak', stat: 'bluffs', target: 2, icon: 'sports_martial_arts', title: 'Berdiri Dua Kaki', desc: 'Usir 2 musuh dengan Pose Seram.', reward: { coins: 600 } }
];
export const QUESTS = [
  { id: 'bab1', stat: 'chapters', target: 1, icon: 'flag', title: 'Langkah Pertama', desc: 'Selesaikan satu bab sampai bos terakhir.', reward: { gems: 100 } },
  { id: 'bab5', stat: 'chapters', target: 5, icon: 'map', title: 'Penjelajah Sejati', desc: 'Selesaikan 5 bab. Peta mulai terlihat penuh coretan.', reward: { gems: 300 } },
  { id: 'bab14', stat: 'chapters', target: 14, icon: 'emoji_events', title: 'Tamat, Katanya', desc: 'Selesaikan ke-14 bab. Gajah Komisaris menutup rapat.', reward: { item: 'mahkota' } },
  { id: 'bos10', stat: 'bosses', target: 10, icon: 'local_police', title: 'Pemburu Bos', desc: 'Kalahkan 10 bos. Mereka mulai membicarakan Santoni.', reward: { gems: 150 } },
  { id: 'musuh100', stat: 'kills', target: 100, icon: 'military_tech', title: 'Seratus Urusan', desc: 'Kalahkan 100 musuh sepanjang masa.', reward: { item: 'gitar' } },
  { id: 'hari300', stat: 'days', target: 300, icon: 'directions_walk', title: 'Kaki Seribu Hari', desc: 'Tempuh total 300 hari. Sandal kiri sudah tipis.', reward: { energy: 20 } },
  { id: 'kombo', stat: 'combos', target: 3, icon: 'auto_awesome', title: 'Ahli Elemen', desc: 'Buka kombo elemen 3 kali.', reward: { gems: 120 } },
  { id: 'jurus20', stat: 'ults', target: 20, icon: 'bolt', title: 'Pamungkas Sejati', desc: 'Keluarkan jurus pamungkas 20 kali.', reward: { coins: 5000 } },
  { id: 'menara10', stat: 'tower', target: 10, icon: 'apartment', title: 'Tangga Darurat', desc: 'Capai lantai 10 Menara Tanpa Lift.', reward: { gems: 200 } },
  { id: 'menara25', stat: 'tower', target: 25, icon: 'domain', title: 'Puncak Menara', desc: 'Capai lantai 25. Udaranya tipis, rapatnya tebal.', reward: { item: 'ulekan' } }
];

// Menara Tanpa Lift: endless battle stages. Every 5th floor is a boss; enemies scale per floor.
export const TOWER = {
  name: 'Menara Tanpa Lift', cost: 3,
  desc: 'Lantai demi lantai, satu musuh per lantai. Liftnya rusak sejak menara dibangun.',
  bosses: ['lebah', 'angsa', 'buaya', 'gajah'],
  pool: ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci', 'kucing', 'kura', 'kambing', 'cumi', 'kodok']
};

// Given once to existing saves so returning players get to try the new gear.
export const GEAR_GIFTS = [
  { id: 'perlengkapan-baru-1', items: ['raket', 'caping'] },
  { id: 'perlengkapan-baru-2', items: ['kipasangin', 'bawang'] }
];
// The weapon with the highest ATK gets the elegant floating animation.
export const TOP_WEAPON = Object.keys(ITEMS).filter(id => ITEMS[id].type === 'senjata').sort((a, b) => ITEMS[b].val - ITEMS[a].val)[0];

// Weapon ultimates ("jurus pamungkas"). The gauge fills during battle; when full, the
// equipped weapon's ultimate fires. Every element the run owns joins in (see ULT_ELEMENTS).
export const ULTIMATES = {
  sumpit: { name: 'Seribu Sumpitan', desc: '5 tusukan beruntun 55% ATK. Tusukan terakhir pasti kritis.', line: 'Sumpit Santoni bergerak terlalu cepat untuk dilihat. Termasuk oleh Santoni.' },
  payung: { name: 'Payung Badai', desc: 'Hempasan 180% ATK. Payung terbuka dan menangkis 2 serangan berikutnya.', line: 'Santoni membuka payung. Badai datang dari dalam payung itu.' },
  centong: { name: 'Kenduri Terakhir', desc: 'Hantaman nasi 320% ATK dan pulihkan 30% HP. Semua orang kenyang.', line: 'Santoni mengangkat centong. Aroma nasi kenduri memenuhi udara.' },
  raket: { name: 'Setrum Massal', desc: '3 sabetan listrik 75% ATK. Musuh pasti lumpuh 1 giliran.', line: 'Santoni menekan tombol raket. Udara berbau gosong.' },
  sapu: { name: 'Sapu Bersih', desc: 'Sapuan 260% ATK. Musuh terhuyung dua kali lipat: ATK −30%.', line: 'Santoni menyapu. Musuh ikut tersapu, bersama debu dan harga dirinya.' },
  ulekan: { name: 'Ulek Sampai Halus', desc: '4 ulekan beruntun 45/65/85/170% ATK. Makin lama makin halus.', line: 'Santoni mengulek dengan irama nenek. Pelan, lalu tidak pelan.' },
  kipasangin: { name: 'Putaran Tiga', desc: '3 hembusan 85% ATK di kecepatan tertinggi. ATK musuh −15%.', line: 'Santoni memutar kenop ke angka tiga. Untuk pertama kalinya.' },
  gitar: { name: 'Konser Tunggal', desc: 'Petikan 280% ATK. Musuh terpesona 1 giliran, Santoni pulih 20% HP.', line: 'Santoni memetik satu lagu galau. Musuh lupa sedang berkelahi.' },
  none: { name: 'Tamparan Malas', desc: 'Tamparan 220% ATK. Santoni tidak senang harus melakukannya.', line: 'Santoni menghela napas, lalu menampar. Sekali saja.' }
};
export const ULT_ELEMENTS = {
  api: 'membakar 3 giliran',
  petir: 'melumpuhkan 1 giliran',
  tanah: 'ATK musuh −15%',
  angin: '+30% kerusakan'
};

// Dungeons ("bab"). Each has its own enemy pool, mid-run boss (`mid`) and final boss (`boss`),
// and a colour theme for the travel scene (sky/hill/ground), the lobby (l*) and battles.
// Enemies get 14% tougher per chapter.
const T = (sky, hill, ground, lSky, lHill, lGround, battle) => ({ sky, hill, ground, lSky, lHill, lGround, battle });
export const CHAPTERS = [
  { name: 'Kebun Bambu Tetangga', rule: { id: 'bambu', name: 'Rebung Gratis', desc: 'Tiap 5 hari, Santoni ngemil rebung tetangga: pulih 10% HP.' }, icon: 'forest', desc: 'Tetangga belum tahu.', pool: ['tikus', 'bebek', 'kumbang'], mid: 'kelinci', boss: 'lebah', theme: T('#E3EFD3', '#9CCB8E', '#7FB77A', '#CFE6B8', '#A8D49A', '#E2F0D0', '#1C2A1F') },
  { name: 'Pasar Subuh', rule: { id: 'tawar', name: 'Tawar-Menawar', desc: 'Semua kejadian berbayar setengah harga. Penjualnya masih mengantuk.' }, icon: 'storefront', desc: 'Buka jam tiga pagi. Santoni bangun jam tiga sore.', pool: ['tikus', 'bebek', 'kelinci'], mid: 'lele', boss: 'lebah', theme: T('#F9E3C8', '#E8B48A', '#D9A86A', '#F6C9A0', '#E9A97A', '#F3E1C0', '#2A2220') },
  { name: 'Rawa Kerupuk', rule: { id: 'renyah', name: 'Serba Renyah', desc: 'Pukulan kritis ×2,5, bukan ×2. Semuanya terdengar kriuk.' }, icon: 'water', desc: 'Rawanya renyah. Jangan tanya kenapa.', pool: ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci'], mid: 'lebah', boss: 'angsa', theme: T('#F7D9BF', '#B5D7C2', '#9CCBB0', '#F3B49A', '#E8A584', '#CFE6D6', '#1E2622') },
  { name: 'Gunung Kasur', rule: { id: 'kantuk', name: 'Kantuk Berat', desc: '10% giliran Santoni tertidur: tidak menyerang, tapi pulih 5% HP.' }, icon: 'landscape', desc: 'Sangat empuk. Banyak yang tidak kembali karena ketiduran.', pool: ['kumbang', 'kelinci', 'bebek'], mid: 'lebah', boss: 'angsa', theme: T('#E9E5F7', '#C9C1EA', '#EEEAF8', '#D9D2F2', '#BDB3E6', '#F1EEFA', '#23213A') },
  { name: 'Gua Wi-Fi Lemah', rule: { id: 'lag', name: 'Sinyal Lag', desc: '15% serangan siapa pun tertahan "buffering" dan tidak terjadi.' }, icon: 'wifi_off', desc: 'Satu bar. Kadang nol. Bosnya selalu buffering.', pool: ['kumbang', 'tikus', 'lele'], mid: 'lebah', boss: 'angsa', theme: T('#5A5470', '#7A7398', '#8C85A8', '#6E6890', '#857DA6', '#A39CC0', '#15131F') },
  { name: 'Kantor Pajak Hutan', rule: { id: 'pajak', name: 'Potong Pajak', desc: '15% dari setiap koin yang didapat dipotong pajak. Ada kuitansinya.' }, icon: 'account_balance', desc: 'Antrean nomor 4.891. Bawa fotokopi KTP.', pool: ['tikus', 'kelinci', 'bebek'], mid: 'lebah', boss: 'angsa', theme: T('#ECE6DA', '#B4BEB8', '#C9BBA6', '#DCD3C2', '#BFC8C2', '#E8E0D0', '#222624') },
  { name: 'Pantai Sandal Hilang', rule: { id: 'ombak', name: 'Sandal Hanyut', desc: 'Di awal perjalanan, satu equipment acak terbawa ombak dan tidak aktif.' }, icon: 'beach_access', desc: 'Semua sandal kiri berakhir di sini. Yang kanan tidak pernah datang.', pool: ['lele', 'bebek', 'kumbang'], mid: 'kelinci', boss: 'angsa', theme: T('#D3ECF6', '#7FC4DC', '#F3DFA8', '#BFE3F1', '#86C7DE', '#F5E4B4', '#14293A') },
  { name: 'Kebun Durian Jatuh', rule: { id: 'durian', name: 'Durian Jatuh', desc: 'Tiap hari 12% peluang kejatuhan durian: −8% HP, tapi +20 XP. Wangi.' }, icon: 'park', desc: 'Pakai helm. Duriannya tidak pilih-pilih kepala.', pool: ['kumbang', 'kelinci', 'tikus', 'lele'], mid: 'lebah', boss: 'angsa', theme: T('#F1EECB', '#A7C66A', '#8FB55A', '#E8E6B0', '#B4CF78', '#E6EDC4', '#1F2A14') },
  { name: 'Gunung Es Teh Manis', rule: { id: 'manis', name: 'Kebanyakan Gula', desc: 'Semua pemulihan HP ×1,5, tapi DEF Santoni −15%.' }, icon: 'ac_unit', desc: 'Dingin, manis, dan terlalu banyak gula. Dokter gigi tidak setuju.', pool: ['bebek', 'lele', 'kelinci', 'kumbang'], mid: 'lebah', boss: 'angsa', theme: T('#EAF6F8', '#CDE8EE', '#D9A36A', '#DDF0F4', '#C3E2EA', '#E9C58F', '#1E2A33') },
  { name: 'Istana Angsa Pengacara', rule: { id: 'pasal', name: 'Pasal 47', desc: 'Pose Seram dilarang di istana ini. Semua perkelahian wajib.' }, icon: 'castle', desc: 'Semua pintu terkunci. Kuncinya ada di pasal 47.', pool: ['tikus', 'bebek', 'kumbang', 'lele', 'kelinci'], mid: 'lebah', boss: 'angsa', theme: T('#F3E3F0', '#D8B4D8', '#C9A86A', '#EED3EA', '#D3A8D3', '#E8D6A8', '#2A1A2A') },
  { name: 'Terminal Bus Abadi', rule: { id: 'ngetem', name: 'Ngetem Lama', desc: 'Musuh lebih sering mampir, tapi semua XP ×1,3.' }, icon: 'directions_bus', desc: 'Busnya berangkat "sebentar lagi" sejak 1998. Kodok Ojek menawarkan jalan pintas.', pool: ['kodok', 'kambing', 'tikus'], mid: 'kucing', boss: 'buaya', theme: T('#E4E8EC', '#AEB8C2', '#9AA0A8', '#D6DCE2', '#B4BEC8', '#C9CED4', '#1B2028') },
  { name: 'Mal Diskon 90%', rule: { id: 'diskon', name: 'Harga Coret', desc: 'Hadiah koin ×2, tapi kejadian berbayar dua kali lipat harganya.' }, icon: 'shopping_bag', desc: 'Diskonnya nyata. Harganya dinaikkan dulu kemarin.', pool: ['kucing', 'cumi', 'kelinci', 'kambing'], mid: 'kodok', boss: 'buaya', theme: T('#FBE3EC', '#F2AFC8', '#E9D7C6', '#F8D0DF', '#EFA2BE', '#F3E2D2', '#2A1822') },
  { name: 'Laut Dalam Karaoke', rule: { id: 'karaoke', name: 'Giliran Nyanyi', desc: 'Tiap giliran ke-4, musuh sibuk bernyanyi dan lupa menyerang.' }, icon: 'scuba_diving', desc: 'Dua ribu meter di bawah laut. Mikrofonnya tetap menyala.', pool: ['cumi', 'lele', 'kura', 'kodok'], mid: 'buaya', boss: 'gajah', theme: T('#BFE4EA', '#4FA3B8', '#3E7F8F', '#A9D9E2', '#5DB0C2', '#7FC0CC', '#0E1E2A') },
  { name: 'Menara Rapat Tanpa Akhir', rule: { id: 'notulen', name: 'Rapat Diperpanjang', desc: 'Musuh pulih 3% HP tiap giliran mereka. Rapat belum selesai.' }, icon: 'apartment', desc: 'Rapat tentang rapat berikutnya. Notulennya sudah 900 halaman.', pool: ['kura', 'kambing', 'kucing', 'cumi', 'tikus'], mid: 'buaya', boss: 'gajah', theme: T('#EEE8DC', '#C8B8A0', '#A8957A', '#E6DCCA', '#CBB89C', '#D8CBB4', '#211D18') }
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
