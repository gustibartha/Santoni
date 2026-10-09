// Letters in the lobby mailbox ("Surat"). Gifts are claimed once; their keys match state fields.
export const MAIL = [
  { id: 'sambut', from: 'Kantor Pos Hutan', icon: 'local_post_office', color: '#D2532A', date: '8 Okt',
    title: 'Kotak surat sudah dibuka',
    body: 'Mulai hari ini, surat untuk Santoni dikirim ke sini dan tidak lagi dilempar ke kepalanya. Terlampir sedikit bekal dari kantor pos. Jangan dihabiskan sekaligus. Atau dihabiskan saja, kami tidak akan tahu.',
    gifts: [{ k: 'gems', v: 100 }, { k: 'energy', v: 10 }] },
  { id: 'elemen', from: 'Pandai Besi Desa', icon: 'local_fire_department', color: '#B0420A', date: '8 Okt',
    title: 'Equipment sekarang punya elemen',
    body: 'Ketuk equipment di halaman Hero untuk melihat elemennya. Elemen equipment ikut menyulut Jurus Pamungkas dan dihitung untuk Kombo. Pasang dua atau lebih yang elemennya sama untuk Resonansi: API menambah ATK, TANAH menambah HP, ANGIN menambah DEF, PETIR menambah peluang kritis.',
    gifts: [{ k: 'asah', v: 20 }] },
  { id: 'akun', from: 'Tim Santoni', icon: 'cloud_done', color: '#3C78C8', date: '8 Okt',
    title: 'Progres bisa disimpan online',
    body: 'Ketuk foto Santoni di kiri atas atau buka Jurnal, lalu masuk dengan email. Progres ikut pindah ke HP lain. Lupa sandi? Sekarang ada tombolnya.',
    gifts: [{ k: 'coins', v: 2000 }] },
  { id: 'warga', from: 'Kuda Nil Mandor', icon: 'engineering', color: '#7A6A9E', date: '7 Okt',
    title: 'Lima warga baru di lingkungan',
    body: 'Perkenalkan: Monyet Juru Parkir, Merak Selebgram, Kelelawar Ronda, Babi Hutan Penertib, dan saya sendiri. Kami bisa jadi lawan, bisa juga jadi rekan. Tergantung siapa yang menang. Terlampir bingkisan dari proyek.',
    gifts: [{ k: 'telur', v: 1 }, { k: 'pakan', v: 10 }] },
  { id: 'asuransi1', from: 'Bebek Asuransi', icon: 'flutter_dash', color: '#C28A16', date: '6 Okt',
    title: 'Penawaran asuransi ekor',
    body: 'Yth. Santoni, ekor Anda tampak berisiko tinggi: terlalu belang dan terlalu sering dikibaskan. Premi hanya 300 koin per bulan. Klaim dapat diajukan setelah ekor hilang, disertai bukti berupa ekor tersebut.',
    gifts: [] },
  { id: 'asuransi2', from: 'Bebek Asuransi', icon: 'flutter_dash', color: '#C28A16', date: '7 Okt',
    title: 'Pengingat: asuransi ekor',
    body: 'Kami belum menerima jawaban Anda. Kami anggap itu tanda setuju. Sebagai ucapan terima kasih, terlampir hadiah yang sangat besar menurut ukuran bebek.',
    gifts: [{ k: 'coins', v: 1 }] }
];

export const GIFTS = {
  coins: { icon: 'paid', label: 'koin', bg: '#FBE3B8' },
  gems: { icon: 'diamond', label: 'permata', bg: '#E7D9F5' },
  energy: { icon: 'bolt', label: 'energi', bg: '#D5E3F6' },
  asah: { icon: 'hardware', label: 'Batu Asah', bg: '#E1E7D6' },
  telur: { icon: 'egg', label: 'telur', bg: '#FFF3C4' },
  pakan: { icon: 'nutrition', label: 'pakan', bg: '#E1F0D0' }
};
