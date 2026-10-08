// Content for the extra game modes reached from the "Tantangan" hub:
// daily dungeons, the offline village arena, the cracker mine, and the gear workshop.

// Daily dungeons: DUNGEON_TICKETS clears per day each. Difficulty unlocks one level per win.
export const DUNGEON_TICKETS = 3;
export const DUNGEON_MAX = 30;
export const DUNGEONS = [
  { id: 'madu', name: 'Serbu Sarang Lebah Madu', boss: 'lebah', color: '#B0620A', icon: 'bolt', reward: 'Energi dan permata',
    desc: 'Madunya dijaga Lebah Notaris. Setiap tetes harus dilegalisir dulu.',
    give: lv => ({ energy: 3 + Math.floor(lv / 4), gems: 20 + lv * 5 }) },
  { id: 'gudang', name: 'Serbu Gudang Kelinci', boss: 'kelinci', color: '#7E43B5', icon: 'redeem', reward: 'Perlengkapan acak',
    desc: 'Barang sitaan Kelinci Penagih. Sebagian besar milik Santoni sendiri.',
    give: lv => ({ items: 1 + Math.floor(lv / 6), good: lv >= 8 }) },
  { id: 'kuil', name: 'Serbu Kuil Kerupuk', boss: 'kura', color: '#2F7A5C', icon: 'hardware', reward: 'Batu Asah untuk bengkel',
    desc: 'Kura-Kura Birokrat menjaga batu asah suci. Antreannya sangat panjang.',
    give: lv => ({ asah: 8 + lv * 3 }) },
  { id: 'kebun', name: 'Serbu Kebun Telur', boss: 'kodok', color: '#4F8A3A', icon: 'egg', reward: 'Telur pet dan pakan',
    desc: 'Kebun milik Kodok Ojek. Telurnya dititipkan pelanggan yang lupa mengambil.',
    give: lv => ({ telur: 1 + Math.floor(lv / 8), pakan: 6 + lv * 2 }) },
  { id: 'bank', name: 'Serbu Bank Buaya', boss: 'buaya', color: '#3C78C8', icon: 'toll', reward: 'Koin dalam jumlah tidak wajar',
    desc: 'Brankas Buaya Darat Rentenir. Bunganya ikut dibawa pulang.',
    give: lv => ({ coins: 1500 + lv * 650 }) }
];

// Village arena: fights against other "adventurers" (fictional NPCs) for season points.
export const ARENA = {
  name: 'Arena Kampung', tries: 5, startPoints: 1000, seasonDays: 7,
  rivals: [
    { name: 'Kapten Bebek', kind: 'bebek' }, { name: 'Lele Juara', kind: 'lele' }, { name: 'Kumbang Tegar', kind: 'kumbang' },
    { name: 'Tikus Lembur', kind: 'tikus' }, { name: 'Kelinci Kilat', kind: 'kelinci' }, { name: 'Kucing Viral', kind: 'kucing' },
    { name: 'Kambing Juri', kind: 'kambing' }, { name: 'Cumi Remix', kind: 'cumi' }, { name: 'Kodok Ngebut', kind: 'kodok' },
    { name: 'Monyet Parkir', kind: 'monyet' }, { name: 'Merak Glowing', kind: 'merak' }, { name: 'Kelelawar Subuh', kind: 'kelelawar' }, { name: 'Babi Tertib', kind: 'babi' }
  ],
  // Season-end gem reward by final rank.
  tiers: [{ rank: 1, gems: 500, title: 'Juara Kampung' }, { rank: 3, gems: 300, title: 'Tiga Besar' }, { rank: 10, gems: 150, title: 'Sepuluh Besar' }, { rank: 50, gems: 60, title: 'Peserta Setia' }]
};

// Cracker mine: a grid per floor, one pickaxe per dig, one staircase per floor.
export const MINE = {
  name: 'Tambang Kerupuk', picks: 20, cols: 5, rows: 6,
  // Loot weights for non-stair tiles.
  loot: [['kosong', 28], ['koin', 34], ['asah', 15], ['pakan', 9], ['permata', 10], ['peti', 4]]
};

// Gear workshop.
export const GEAR_MAX_LV = 30;
export const GEAR_MAX_STAR = 5;
export const RAR_MULT = { Biasa: 1, Langka: 1.5, Epik: 2.2, Legendaris: 3.2 };
export const DISMANTLE_ASAH = { Biasa: 2, Langka: 5, Epik: 12, Legendaris: 30 };
