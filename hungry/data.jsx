// data.jsx — menu items, translations, customization templates
// Authentic HK 茶餐廳 menu, three languages.

const T = {
  // common
  order_now: { 'zh-TW': '即時點餐', 'zh-CN': '即时点餐', en: 'ORDER NOW' },
  hint: { 'zh-TW': '行貨港式,即叫即做', 'zh-CN': '行货港式,即叫即做', en: 'Authentic Cha Chaan Teng' },
  brand: { 'zh-TW': '茶記 0823', 'zh-CN': '茶记 0823', en: 'CHA KEE 0823' },
  search_ph: { 'zh-TW': '搵餐點 / 例如 凍檸茶', 'zh-CN': '搜餐点 / 例如 冻柠茶', en: 'Search menu / e.g. iced lemon tea' },
  back: { 'zh-TW': '返回', 'zh-CN': '返回', en: 'Back' },
  cart: { 'zh-TW': '購物車', 'zh-CN': '购物车', en: 'Cart' },
  empty_cart: { 'zh-TW': '購物車空空如也', 'zh-CN': '购物车空空如也', en: 'Cart is empty' },
  empty_hint: { 'zh-TW': '揀啲嘢食先啦~', 'zh-CN': '挑点东西先吧~', en: 'Pick something tasty first' },
  add_to_cart: { 'zh-TW': '加入購物車', 'zh-CN': '加入购物车', en: 'Add to cart' },
  added: { 'zh-TW': '已加入', 'zh-CN': '已加入', en: 'Added' },
  view_cart: { 'zh-TW': '查看購物車', 'zh-CN': '查看购物车', en: 'View cart' },
  subtotal: { 'zh-TW': '小計', 'zh-CN': '小计', en: 'Subtotal' },
  total: { 'zh-TW': '總計', 'zh-CN': '总计', en: 'Total' },
  service: { 'zh-TW': '服務費 10%', 'zh-CN': '服务费 10%', en: 'Service 10%' },
  checkout: { 'zh-TW': '前往結帳', 'zh-CN': '前往结账', en: 'Checkout' },
  table_no: { 'zh-TW': '枱號', 'zh-CN': '台号', en: 'Table no.' },
  table_ph: { 'zh-TW': '輸入枱號 (1-99)', 'zh-CN': '输入台号 (1-99)', en: 'Enter table no.' },
  payment: { 'zh-TW': '付款方式', 'zh-CN': '付款方式', en: 'Payment' },
  pay_online: { 'zh-TW': '即時網上付款', 'zh-CN': '即时网上付款', en: 'Pay online now' },
  pay_cash: { 'zh-TW': '現金付款 (到櫃位)', 'zh-CN': '现金付款 (到柜台)', en: 'Cash (at counter)' },
  pay_subtitle_online: { 'zh-TW': 'Visa / Mastercard / FPS / Apple Pay', 'zh-CN': 'Visa / Mastercard / FPS / Apple Pay', en: 'Visa / Mastercard / FPS / Apple Pay' },
  pay_subtitle_cash: { 'zh-TW': '請出餐後到收銀枱付款', 'zh-CN': '请出餐后到收银台付款', en: 'Pay at the counter after meal' },
  notes_label: { 'zh-TW': '備註 (可選)', 'zh-CN': '备注 (可选)', en: 'Notes (optional)' },
  notes_ph: { 'zh-TW': '對食物或服務嘅特別要求...', 'zh-CN': '对食物或服务的特别要求...', en: 'Special requests...' },
  place_order: { 'zh-TW': '確認下單', 'zh-CN': '确认下单', en: 'Place order' },
  order_received: { 'zh-TW': '已收到訂單!', 'zh-CN': '已收到订单!', en: 'Order received!' },
  prep_time: { 'zh-TW': '預計 12 分鐘出餐', 'zh-CN': '预计 12 分钟出餐', en: 'Ready in ~12 min' },
  order_no: { 'zh-TW': '單號', 'zh-CN': '单号', en: 'Order #' },
  start_new: { 'zh-TW': '加單 / 開新訂單', 'zh-CN': '加单 / 开新订单', en: 'Order more / New order' },
  qty: { 'zh-TW': '數量', 'zh-CN': '数量', en: 'Qty' },
  remove: { 'zh-TW': '刪除', 'zh-CN': '删除', en: 'Remove' },
  required: { 'zh-TW': '必選', 'zh-CN': '必选', en: 'Required' },
  optional: { 'zh-TW': '可選', 'zh-CN': '可选', en: 'Optional' },
  recommended: { 'zh-TW': '熱賣', 'zh-CN': '热卖', en: 'Hot' },
  signature: { 'zh-TW': '招牌', 'zh-CN': '招牌', en: 'Signature' },
  new_item: { 'zh-TW': '新品', 'zh-CN': '新品', en: 'New' },
  all_items: { 'zh-TW': '全部', 'zh-CN': '全部', en: 'All' },
  no_results: { 'zh-TW': '搵唔到 "{q}" 嘅結果', 'zh-CN': '搜不到 "{q}" 的结果', en: 'No results for "{q}"' },
  items_in_cart: { 'zh-TW': '件商品', 'zh-CN': '件商品', en: 'items' },
  est_time: { 'zh-TW': '預計時間', 'zh-CN': '预计时间', en: 'Est. time' },
  dine_in: { 'zh-TW': '堂食', 'zh-CN': '堂食', en: 'Dine-in' },
  takeout: { 'zh-TW': '外賣', 'zh-CN': '外卖', en: 'Takeout' },
  open_hours: { 'zh-TW': '營業中 · 07:00 – 22:30', 'zh-CN': '营业中 · 07:00 – 22:30', en: 'Open · 07:00 – 22:30' },
  greeting: { 'zh-TW': '食咗未?', 'zh-CN': '食过没?', en: 'Hungry?' },
  greeting_sub: { 'zh-TW': '由你嘅手機,直接落單到廚房', 'zh-CN': '由你的手机,直接下单到厨房', en: 'From your phone, straight to the kitchen' },
  step1: { 'zh-TW': '揀分類或者搵嘢食', 'zh-CN': '挑分类或搜美食', en: 'Pick a category or search' },
  step2: { 'zh-TW': '揀餐點 · 自訂走冰加底', 'zh-CN': '挑餐点 · 定制走冰加底', en: 'Customise your dish' },
  step3: { 'zh-TW': '加入購物車 · 結帳出餐', 'zh-CN': '加入购物车 · 结账出餐', en: 'Add to cart · checkout' },
};

const CATS = [
  { id: 'main',    label: { 'zh-TW': '主菜', 'zh-CN': '主菜', en: 'Mains' },     glyph: '飯' },
  { id: 'drinks',  label: { 'zh-TW': '飲品', 'zh-CN': '饮品', en: 'Drinks' },    glyph: '飲' },
  { id: 'dessert', label: { 'zh-TW': '甜品', 'zh-CN': '甜品', en: 'Desserts' },  glyph: '甜' },
];

// Customization option groups (reusable templates)
const PORTION = {
  id: 'portion', required: true,
  label: { 'zh-TW': '份量', 'zh-CN': '份量', en: 'Portion' },
  opts: [
    { id: 'reg', label: { 'zh-TW': '正常', 'zh-CN': '正常', en: 'Regular' }, price: 0 },
    { id: 'lrg', label: { 'zh-TW': '加大', 'zh-CN': '加大', en: 'Large' },   price: 8 },
  ],
};
const ICE = {
  id: 'ice', required: true,
  label: { 'zh-TW': '冰量', 'zh-CN': '冰量', en: 'Ice' },
  opts: [
    { id: 'reg',  label: { 'zh-TW': '正常', 'zh-CN': '正常', en: 'Regular' }, price: 0 },
    { id: 'less', label: { 'zh-TW': '少冰', 'zh-CN': '少冰', en: 'Less ice' }, price: 0 },
    { id: 'no',   label: { 'zh-TW': '走冰', 'zh-CN': '走冰', en: 'No ice' },   price: 2 },
  ],
};
const SUGAR = {
  id: 'sugar', required: true,
  label: { 'zh-TW': '糖度', 'zh-CN': '糖度', en: 'Sugar' },
  opts: [
    { id: 'reg',  label: { 'zh-TW': '正常', 'zh-CN': '正常', en: 'Regular' }, price: 0 },
    { id: 'less', label: { 'zh-TW': '少甜', 'zh-CN': '少甜', en: 'Less' },    price: 0 },
    { id: 'no',   label: { 'zh-TW': '走甜', 'zh-CN': '走甜', en: 'No sugar' },price: 0 },
  ],
};
const TEMP = {
  id: 'temp', required: true,
  label: { 'zh-TW': '冷熱', 'zh-CN': '冷热', en: 'Temperature' },
  opts: [
    { id: 'hot',  label: { 'zh-TW': '熱', 'zh-CN': '热', en: 'Hot' },  price: 0 },
    { id: 'cold', label: { 'zh-TW': '凍 (+$3)', 'zh-CN': '冻 (+$3)', en: 'Iced (+$3)' }, price: 3 },
  ],
};
const SPICE = {
  id: 'spice', required: false,
  label: { 'zh-TW': '辣度', 'zh-CN': '辣度', en: 'Spice' },
  opts: [
    { id: '0', label: { 'zh-TW': '不辣', 'zh-CN': '不辣', en: 'None' },    price: 0 },
    { id: '1', label: { 'zh-TW': '小辣', 'zh-CN': '小辣', en: 'Mild' },    price: 0 },
    { id: '2', label: { 'zh-TW': '中辣', 'zh-CN': '中辣', en: 'Medium' },  price: 0 },
    { id: '3', label: { 'zh-TW': '大辣', 'zh-CN': '大辣', en: 'Hot' },     price: 0 },
  ],
};
const RICE_EXTRAS = {
  id: 'extras', required: false, multi: true,
  label: { 'zh-TW': '加配', 'zh-CN': '加配', en: 'Add-ons' },
  opts: [
    { id: 'egg',    label: { 'zh-TW': '加蛋', 'zh-CN': '加蛋', en: 'Extra egg' },        price: 5 },
    { id: 'rice',   label: { 'zh-TW': '加底', 'zh-CN': '加底', en: 'Extra rice' },       price: 6 },
    { id: 'cheese', label: { 'zh-TW': '加芝士', 'zh-CN': '加芝士', en: 'Add cheese' },   price: 8 },
    { id: 'noOnion',label: { 'zh-TW': '走青/蔥', 'zh-CN': '走青/葱', en: 'No green onion' }, price: 0 },
  ],
};
const DRINK_EXTRAS = {
  id: 'extras', required: false, multi: true,
  label: { 'zh-TW': '加料', 'zh-CN': '加料', en: 'Add-ons' },
  opts: [
    { id: 'pearl', label: { 'zh-TW': '加珍珠', 'zh-CN': '加珍珠', en: 'Tapioca pearls' }, price: 6 },
    { id: 'milk',  label: { 'zh-TW': '加奶', 'zh-CN': '加奶', en: 'Extra milk' },        price: 3 },
    { id: 'lemon', label: { 'zh-TW': '加檸檬', 'zh-CN': '加柠檬', en: 'Extra lemon' },   price: 2 },
  ],
};

// Menu items
// Each item: id, cat, name (3 langs), short tagline, price (HKD), tags, custom (option groups)
const ITEMS = [
  // ── Mains ───────────────────────────────────────────────
  { id: 'm1', cat: 'main', price: 78, tags: ['signature','hot'],
    name: { 'zh-TW': '乾炒牛河', 'zh-CN': '干炒牛河', en: 'Beef Ho Fun' },
    sub:  { 'zh-TW': '鑊氣十足 · 嫩滑牛肉', 'zh-CN': '镬气十足 · 嫩滑牛肉', en: 'Stir-fried flat rice noodles, wok-charred beef' },
    desc: { 'zh-TW': '師傅大火快炒,牛肉滑嫩、河粉條條分明、豉油香氣撲鼻。', 'zh-CN': '师傅大火快炒,牛肉滑嫩、河粉条条分明、豉油香气扑鼻。', en: 'Tossed over high flame, tender beef, smoky soy aroma.' },
    custom: [PORTION, RICE_EXTRAS] },
  { id: 'm2', cat: 'main', price: 72, tags: ['hot'],
    name: { 'zh-TW': '焗豬扒飯', 'zh-CN': '焗猪扒饭', en: 'Baked Pork Chop Rice' },
    sub:  { 'zh-TW': '茄汁芝士 · 香脆豬扒', 'zh-CN': '茄汁芝士 · 香脆猪扒', en: 'Crispy pork chop, tomato sauce, melted cheese' },
    desc: { 'zh-TW': '炸到金黃嘅豬扒,鋪上炒蛋粒飯,焗到芝士拉絲。', 'zh-CN': '炸到金黄的猪扒,铺上炒蛋粒饭,焗到芝士拉丝。', en: 'Crispy pork chop over egg fried rice, baked with cheese.' },
    custom: [PORTION, RICE_EXTRAS] },
  { id: 'm3', cat: 'main', price: 68, tags: [],
    name: { 'zh-TW': '揚州炒飯', 'zh-CN': '扬州炒饭', en: 'Yangzhou Fried Rice' },
    sub:  { 'zh-TW': '蝦仁叉燒 · 粒粒分明', 'zh-CN': '虾仁叉烧 · 粒粒分明', en: 'Shrimp, char siu, egg' },
    desc: { 'zh-TW': '經典做法,蝦仁、叉燒、青豆同蛋粒齊飛。', 'zh-CN': '经典做法,虾仁、叉烧、青豆和蛋粒齐飞。', en: 'Classic: shrimp, char siu, peas and egg.' },
    custom: [PORTION, RICE_EXTRAS] },
  { id: 'm4', cat: 'main', price: 58, tags: ['signature'],
    name: { 'zh-TW': '雲吞麵', 'zh-CN': '云吞面', en: 'Wonton Noodles' },
    sub:  { 'zh-TW': '蝦肉雲吞 · 大地魚湯底', 'zh-CN': '虾肉云吞 · 大地鱼汤底', en: 'Shrimp wontons, flounder broth' },
    desc: { 'zh-TW': '手包蝦雲吞,配傳統大地魚熬製湯底,彈牙幼麵。', 'zh-CN': '手包虾云吞,配传统大地鱼熬制汤底,弹牙幼面。', en: 'Hand-wrapped shrimp wontons in dried flounder broth.' },
    custom: [PORTION] },
  { id: 'm5', cat: 'main', price: 48, tags: [],
    name: { 'zh-TW': '餐肉蛋公仔麵', 'zh-CN': '餐肉蛋公仔面', en: 'Spam & Egg Noodles' },
    sub:  { 'zh-TW': '早餐之王 · 午餐肉煎蛋', 'zh-CN': '早餐之王 · 午餐肉煎蛋', en: 'Spam, fried egg, instant noodles' },
    desc: { 'zh-TW': '茶記永恆組合,公仔麵浸湯,煎到香脆嘅午餐肉同流心煎蛋。', 'zh-CN': '茶记永恒组合,公仔面浸汤,煎到香脆的午餐肉和流心煎蛋。', en: 'Eternal cha chaan teng combo: noodles, crispy spam, runny egg.' },
    custom: [PORTION, RICE_EXTRAS] },
  { id: 'm6', cat: 'main', price: 82, tags: ['new'],
    name: { 'zh-TW': '滑蛋蝦仁飯', 'zh-CN': '滑蛋虾仁饭', en: 'Shrimp & Egg Rice' },
    sub:  { 'zh-TW': '彈牙鮮蝦 · 滑嫩蛋汁', 'zh-CN': '弹牙鲜虾 · 滑嫩蛋汁', en: 'Plump shrimp, silky egg gravy' },
    desc: { 'zh-TW': '鮮蝦同滑蛋淋上白飯,蛋汁包裹每一粒米。', 'zh-CN': '鲜虾和滑蛋淋上白饭,蛋汁包裹每一粒米。', en: 'Shrimp in silky egg gravy over rice.' },
    custom: [PORTION, RICE_EXTRAS] },
  { id: 'm7', cat: 'main', price: 88, tags: ['signature'],
    name: { 'zh-TW': '燒味雙拼飯', 'zh-CN': '烧味双拼饭', en: 'BBQ Duo Rice' },
    sub:  { 'zh-TW': '叉燒燒鴨 · 兩款任揀', 'zh-CN': '叉烧烧鸭 · 两款任挑', en: 'Pick two: char siu, roast duck, soy chicken' },
    desc: { 'zh-TW': '即日新鮮燒味,任揀兩款配白飯及青菜。', 'zh-CN': '即日新鲜烧味,任挑两款配白饭及青菜。', en: 'Daily fresh roasts, two of your choice over rice.' },
    custom: [PORTION] },
  { id: 'm8', cat: 'main', price: 62, tags: ['hot'],
    name: { 'zh-TW': '星洲炒米', 'zh-CN': '星洲炒米', en: 'Singapore Rice Noodles' },
    sub:  { 'zh-TW': '咖喱香 · 微辣可選', 'zh-CN': '咖喱香 · 微辣可选', en: 'Curry powder, shrimp, BBQ pork' },
    desc: { 'zh-TW': '咖喱粉炒米粉,蝦仁、叉燒同青椒,愛辣可加辣。', 'zh-CN': '咖喱粉炒米粉,虾仁、叉烧和青椒,爱辣可加辣。', en: 'Curry-tossed rice vermicelli with shrimp, char siu, peppers.' },
    custom: [PORTION, SPICE] },

  // ── Drinks ──────────────────────────────────────────────
  { id: 'd1', cat: 'drinks', price: 22, tags: ['signature','hot'],
    name: { 'zh-TW': '凍檸茶', 'zh-CN': '冻柠茶', en: 'Iced Lemon Tea' },
    sub:  { 'zh-TW': '七片真檸檬', 'zh-CN': '七片真柠檬', en: 'Seven slices of real lemon' },
    desc: { 'zh-TW': '錫蘭紅茶配新鮮檸檬,可以自己 chuck 多陣。', 'zh-CN': '锡兰红茶配新鲜柠檬,可以自己 chuck 多阵。', en: 'Ceylon black tea with fresh lemon — chuck it yourself.' },
    custom: [ICE, SUGAR, DRINK_EXTRAS] },
  { id: 'd2', cat: 'drinks', price: 22, tags: ['signature'],
    name: { 'zh-TW': '港式奶茶', 'zh-CN': '港式奶茶', en: 'HK Milk Tea' },
    sub:  { 'zh-TW': '絲襪奶茶 · 香滑濃郁', 'zh-CN': '丝袜奶茶 · 香滑浓郁', en: 'Silk-stocking milk tea, smooth and rich' },
    desc: { 'zh-TW': '混合三款茶葉,以絲襪反覆撞茶,加淡奶調出順滑口感。', 'zh-CN': '混合三款茶叶,以丝袜反复撞茶,加淡奶调出顺滑口感。', en: 'Three-blend tea pulled through silk stocking, with evaporated milk.' },
    custom: [TEMP, SUGAR, DRINK_EXTRAS] },
  { id: 'd3', cat: 'drinks', price: 25, tags: ['hot'],
    name: { 'zh-TW': '鴛鴦', 'zh-CN': '鸳鸯', en: 'Yuenyeung' },
    sub:  { 'zh-TW': '咖啡 + 奶茶', 'zh-CN': '咖啡 + 奶茶', en: 'Coffee + milk tea' },
    desc: { 'zh-TW': '七成奶茶三成咖啡,口感層次分明,香港味道。', 'zh-CN': '七成奶茶三成咖啡,口感层次分明,香港味道。', en: '70% milk tea, 30% coffee — quintessentially HK.' },
    custom: [TEMP, SUGAR] },
  { id: 'd4', cat: 'drinks', price: 24, tags: [],
    name: { 'zh-TW': '阿華田', 'zh-CN': '阿华田', en: 'Ovaltine' },
    sub:  { 'zh-TW': '童年回憶', 'zh-CN': '童年回忆', en: 'Childhood in a cup' },
    desc: { 'zh-TW': '麥芽朱古力香,熱凍俱佳。', 'zh-CN': '麦芽朱古力香,热冻俱佳。', en: 'Malty chocolate goodness.' },
    custom: [TEMP, SUGAR] },
  { id: 'd5', cat: 'drinks', price: 24, tags: [],
    name: { 'zh-TW': '好立克', 'zh-CN': '好立克', en: 'Horlicks' },
    sub:  { 'zh-TW': '麥精飲料', 'zh-CN': '麦精饮料', en: 'Maltable warmth' },
    desc: { 'zh-TW': '濃郁麥精,飲完瞓得好。', 'zh-CN': '浓郁麦精,饮完睡得好。', en: 'Comforting malted milk drink.' },
    custom: [TEMP, SUGAR] },
  { id: 'd6', cat: 'drinks', price: 26, tags: ['new'],
    name: { 'zh-TW': '鹹檸七', 'zh-CN': '咸柠七', en: 'Salty Lime 7-Up' },
    sub:  { 'zh-TW': '醃檸檬 · 七喜', 'zh-CN': '腌柠檬 · 七喜', en: 'Salted lime + 7-Up' },
    desc: { 'zh-TW': '醃過嘅鹹檸檬加七喜,鹹中帶酸甜,夏天救星。', 'zh-CN': '腌过的咸柠檬加七喜,咸中带酸甜,夏天救星。', en: 'Preserved salty lime in 7-Up — summer saviour.' },
    custom: [ICE] },
  { id: 'd7', cat: 'drinks', price: 28, tags: ['hot'],
    name: { 'zh-TW': '紅豆冰', 'zh-CN': '红豆冰', en: 'Red Bean Ice' },
    sub:  { 'zh-TW': '煉奶碎冰 · 大粒紅豆', 'zh-CN': '炼奶碎冰 · 大粒红豆', en: 'Crushed ice, condensed milk, red beans' },
    desc: { 'zh-TW': '煉奶淋住碎冰,底層大粒紅豆,茶記獨家味道。', 'zh-CN': '炼奶淋住碎冰,底层大粒红豆,茶记独家味道。', en: 'Crushed ice, condensed milk, plump red beans at the bottom.' },
    custom: [SUGAR] },
  { id: 'd8', cat: 'drinks', price: 18, tags: [],
    name: { 'zh-TW': '滾水蛋', 'zh-CN': '滚水蛋', en: 'Hot Water Egg' },
    sub:  { 'zh-TW': '老一輩補品', 'zh-CN': '老一辈补品', en: 'Old-school comfort drink' },
    desc: { 'zh-TW': '滾水撞生雞蛋,加糖,簡單但暖胃。', 'zh-CN': '滚水撞生鸡蛋,加糖,简单但暖胃。', en: 'Boiling water poured over raw egg + sugar.' },
    custom: [SUGAR] },

  // ── Desserts ────────────────────────────────────────────
  { id: 's1', cat: 'dessert', price: 38, tags: ['signature','hot'],
    name: { 'zh-TW': '西多士', 'zh-CN': '西多士', en: 'French Toast' },
    sub:  { 'zh-TW': '花生醬 · 牛油糖漿', 'zh-CN': '花生酱 · 牛油糖浆', en: 'Peanut butter, butter, syrup' },
    desc: { 'zh-TW': '兩片麵包夾花生醬,蛋漿浸透油炸,鋪一塊牛油同糖漿。', 'zh-CN': '两片面包夹花生酱,蛋浆浸透油炸,铺一块牛油和糖浆。', en: 'Peanut-butter-filled toast, deep fried, topped with butter & syrup.' },
    custom: [] },
  { id: 's2', cat: 'dessert', price: 12, tags: ['signature'],
    name: { 'zh-TW': '蛋撻', 'zh-CN': '蛋挞', en: 'Egg Tart' },
    sub:  { 'zh-TW': '即日新鮮焗', 'zh-CN': '即日新鲜焗', en: 'Baked daily' },
    desc: { 'zh-TW': '酥皮蛋撻,熱辣辣出爐。', 'zh-CN': '酥皮蛋挞,热辣辣出炉。', en: 'Flaky crust, custard fresh from the oven.' },
    custom: [] },
  { id: 's3', cat: 'dessert', price: 14, tags: [],
    name: { 'zh-TW': '菠蘿包', 'zh-CN': '菠萝包', en: 'Pineapple Bun' },
    sub:  { 'zh-TW': '加冰凍牛油 +$4', 'zh-CN': '加冰冻牛油 +$4', en: 'Add cold butter +$4' },
    desc: { 'zh-TW': '酥脆菠蘿皮,鬆軟麵包,加塊冷牛油更正。', 'zh-CN': '酥脆菠萝皮,松软面包,加块冷牛油更正。', en: 'Crispy sweet crust, fluffy bread, butter slab optional.' },
    custom: [{ id: 'butter', required: false, multi: true,
      label: { 'zh-TW': '加料', 'zh-CN': '加料', en: 'Add-ons' },
      opts: [{ id: 'butter', label: { 'zh-TW': '加冰凍牛油', 'zh-CN': '加冰冻牛油', en: 'Cold butter slab' }, price: 4 }] }] },
  { id: 's4', cat: 'dessert', price: 28, tags: [],
    name: { 'zh-TW': '紅豆沙', 'zh-CN': '红豆沙', en: 'Red Bean Soup' },
    sub:  { 'zh-TW': '陳皮 · 蓮子', 'zh-CN': '陈皮 · 莲子', en: 'With tangerine peel & lotus seeds' },
    desc: { 'zh-TW': '慢煮三小時,綿綿紅豆,陳皮香。', 'zh-CN': '慢煮三小时,绵绵红豆,陈皮香。', en: 'Slow-simmered three hours, smooth and fragrant.' },
    custom: [TEMP] },
  { id: 's5', cat: 'dessert', price: 42, tags: ['new'],
    name: { 'zh-TW': '楊枝甘露', 'zh-CN': '杨枝甘露', en: 'Mango Pomelo Sago' },
    sub:  { 'zh-TW': '泰國芒果 · 西米柚肉', 'zh-CN': '泰国芒果 · 西米柚肉', en: 'Thai mango, sago, pomelo' },
    desc: { 'zh-TW': '新鮮泰國芒果蓉,西米同柚肉,清新解暑。', 'zh-CN': '新鲜泰国芒果蓉,西米和柚肉,清新解暑。', en: 'Fresh mango purée, sago pearls, pomelo. Cooling.' },
    custom: [] },
  { id: 's6', cat: 'dessert', price: 22, tags: [],
    name: { 'zh-TW': '豆腐花', 'zh-CN': '豆腐花', en: 'Tofu Pudding' },
    sub:  { 'zh-TW': '黃糖漿', 'zh-CN': '黄糖浆', en: 'With brown sugar syrup' },
    desc: { 'zh-TW': '滑嫩豆腐花,淋上黃糖漿。', 'zh-CN': '滑嫩豆腐花,淋上黄糖浆。', en: 'Silken tofu pudding with brown sugar syrup.' },
    custom: [TEMP] },
];

// Translation helper
function tr(key, lang) {
  const v = T[key];
  if (!v) return key;
  return v[lang] || v['zh-TW'] || key;
}

// Format price
function fmt(n) { return '$' + Number(n).toFixed(0); }

// Default selection for an item (first option of each required group)
function defaultSelection(item) {
  const sel = {};
  (item.custom || []).forEach(g => {
    if (g.multi) sel[g.id] = [];
    else if (g.required) sel[g.id] = g.opts[0].id;
    else sel[g.id] = null;
  });
  return sel;
}

// Compute line price for a cart entry
function linePrice(entry) {
  const it = ITEMS.find(x => x.id === entry.itemId);
  if (!it) return 0;
  let p = it.price;
  (it.custom || []).forEach(g => {
    const v = entry.sel[g.id];
    if (g.multi && Array.isArray(v)) {
      v.forEach(id => { const o = g.opts.find(o => o.id === id); if (o) p += o.price; });
    } else if (v) {
      const o = g.opts.find(o => o.id === v);
      if (o) p += o.price;
    }
  });
  return p * (entry.qty || 1);
}

// Summarise selection (for cart display)
function summariseSel(item, sel, lang) {
  const parts = [];
  (item.custom || []).forEach(g => {
    const v = sel[g.id];
    if (g.multi && Array.isArray(v)) {
      v.forEach(id => { const o = g.opts.find(o => o.id === id); if (o) parts.push(o.label[lang]); });
    } else if (v) {
      const o = g.opts.find(o => o.id === v);
      if (o && (g.required ? o.id !== g.opts[0].id : true)) parts.push(o.label[lang]);
    }
  });
  return parts.join(' · ');
}

// Hydrate ITEMS from localStorage if admin has edited the menu
let ACTIVE_ITEMS = ITEMS;
try {
  const stored = localStorage.getItem('chakee_menu');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length) ACTIVE_ITEMS = parsed;
  }
} catch (e) {}

function saveMenu(items) {
  ACTIVE_ITEMS = items;
  window.ITEMS = items;
  try { localStorage.setItem('chakee_menu', JSON.stringify(items)); } catch(e){}
}
function resetMenu() {
  try { localStorage.removeItem('chakee_menu'); } catch(e){}
  ACTIVE_ITEMS = ITEMS;
  window.ITEMS = ITEMS;
}
// proxy ITEMS array — re-export ACTIVE_ITEMS as ITEMS for screens
function getItems() { return ACTIVE_ITEMS; }

// Order log helpers
function pushOrder(order) {
  try {
    const cur = JSON.parse(localStorage.getItem('chakee_orders') || '[]');
    cur.unshift({ ...order, ts: Date.now(), status: 'new' });
    localStorage.setItem('chakee_orders', JSON.stringify(cur.slice(0, 100)));
  } catch(e){}
}
function getOrders() {
  try { return JSON.parse(localStorage.getItem('chakee_orders') || '[]'); }
  catch(e) { return []; }
}
function setOrderStatus(ts, status) {
  try {
    const cur = JSON.parse(localStorage.getItem('chakee_orders') || '[]');
    const next = cur.map(o => o.ts === ts ? { ...o, status } : o);
    localStorage.setItem('chakee_orders', JSON.stringify(next));
  } catch(e){}
}

Object.assign(window, {
  T, CATS, ITEMS: ACTIVE_ITEMS, tr, fmt, defaultSelection, linePrice, summariseSel,
  PORTION, ICE, SUGAR, TEMP, SPICE, RICE_EXTRAS, DRINK_EXTRAS,
  saveMenu, resetMenu, getItems, pushOrder, getOrders, setOrderStatus,
});
