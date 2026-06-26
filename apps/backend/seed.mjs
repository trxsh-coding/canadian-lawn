// Run: STRAPI_SEED_TOKEN=xxx node seed.mjs

import { faker } from '@faker-js/faker/locale/ru';
import axios from 'axios';

const API = 'http://localhost:1337/api';
const TOKEN = process.env.STRAPI_SEED_TOKEN;

if (!TOKEN) {
  console.error('Нужен STRAPI_SEED_TOKEN. Запуск: STRAPI_SEED_TOKEN=xxx node seed.mjs');
  process.exit(1);
}

const api = axios.create({
  baseURL: API,
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
});

const post = async (endpoint, data, { publish = false } = {}) => {
  const url = publish ? `${endpoint}?status=published` : endpoint;
  const res = await api.post(url, { data });
  return res.data.data;
};

const put = async (endpoint, data, { publish = false } = {}) => {
  const url = publish ? `${endpoint}?status=published` : endpoint;
  const res = await api.put(url, { data });
  return res.data.data;
};

const toSlug = (str) =>
  str.toLowerCase()
    .replace(/ё/g, 'e').replace(/й/g, 'j').replace(/ц/g, 'c').replace(/у/g, 'u')
    .replace(/к/g, 'k').replace(/е/g, 'e').replace(/н/g, 'n').replace(/г/g, 'g')
    .replace(/ш/g, 'sh').replace(/щ/g, 'sch').replace(/з/g, 'z').replace(/х/g, 'h')
    .replace(/ф/g, 'f').replace(/ы/g, 'y').replace(/в/g, 'v').replace(/а/g, 'a')
    .replace(/п/g, 'p').replace(/р/g, 'r').replace(/о/g, 'o').replace(/л/g, 'l')
    .replace(/д/g, 'd').replace(/ж/g, 'zh').replace(/э/g, 'e').replace(/я/g, 'ya')
    .replace(/ч/g, 'ch').replace(/с/g, 's').replace(/м/g, 'm').replace(/и/g, 'i')
    .replace(/т/g, 't').replace(/ь/g, '').replace(/ъ/g, '').replace(/б/g, 'b')
    .replace(/ю/g, 'yu').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const run = async (label, items, fn) => {
  console.log(`\nСоздаю ${items.length} — ${label}...`);
  let ok = 0;
  const results = [];
  for (const item of items) {
    try {
      const r = await fn(item);
      results.push(r);
      ok++;
      process.stdout.write('.');
    } catch (err) {
      process.stdout.write('x');
      const msg = err.response?.data?.error?.message ?? err.message;
      console.error(`\n  Ошибка:`, msg);
    }
  }
  console.log(`\n  ✅ ${label}: ${ok}/${items.length}`);
  return results;
};

// ── Products ──────────────────────────────────────────────────────────────────
const products = [
  { name: 'Универсальный газон Классик',       type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Спортивный газон Про',               type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Теневой газон Лесной',               type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Быстрорастущий газон Экспресс',      type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Декоративный газон Люкс',            type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Газон для сухих мест Засухо',        type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Смесь для тени Тенелюб',             type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Элитный газон Премиум',              type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Газон для дачи Эконом',              type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Ремонтная смесь Реставратор',        type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Мавританский газон Полевой',         type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Партерный газон Английский',         type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Газон Устойчивый Плюс',              type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Смесь Теневая Микс',                 type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Газон Скоростной Спринт',            type: 'lawn',      price: { min: 300,   max: 3000   } },
  { name: 'Газонная смесь Солнечный луг',       type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Смесь Альпийский пейзаж',            type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Газон-микс Городской',               type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Профессиональная смесь Стадион',     type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Смесь Тенистый сад',                 type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Газон-микс Засухоустойчивый',        type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Смесь Быстрый старт',                type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Газон-микс Универсал Плюс',          type: 'lawn-mix',  price: { min: 500,   max: 5000   } },
  { name: 'Трактор газонный Husqvarna TS354D',  type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Райдер John Deere X350',             type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Мини-трактор Stiga Estate 598',      type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Газонный трактор Craftsman T310',    type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Райдер Cub Cadet XT2 LX46',         type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Трактор Ariens IKON XD 52',          type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Газонный трактор Toro TimeCutter',   type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Райдер Husqvarna TS338',             type: 'tractor',   price: { min: 50000, max: 500000 } },
  { name: 'Газонокосилка роторная Bosch Rotak 37',   type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Триммер электрический Stihl FSE 31',       type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Аэратор газонный Husqvarna SA50',          type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Скарификатор Champion SC5313BS',           type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Мульчер садовый Viking MB 650 V',          type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Газонокосилка самоходная Honda HRG416',    type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Кромкорез электрический Black+Decker',     type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Вертикуттер AL-KO Combi Care',             type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Газонокосилка аккумуляторная EGO LM1903E', type: 'technique', price: { min: 3000, max: 80000 } },
  { name: 'Воздуходувка Stihl BGA 45',                type: 'technique', price: { min: 3000, max: 80000 } },
];

async function seedProducts() {
  await run('продукты', products, ({ name, type, price }) =>
    post('/products', {
      name,
      slug: toSlug(name) + '-' + faker.string.alphanumeric(4).toLowerCase(),
      type,
      price: faker.number.int(price),
      old_price: faker.datatype.boolean(0.35) ? faker.number.int({ min: price.max, max: price.max * 2 }) : null,
      description: faker.lorem.paragraphs(2),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      quantity: faker.number.int({ min: 2, max: 200 }),
    })
  );
}

// ── Brands ────────────────────────────────────────────────────────────────────
async function seedBrands() {
  const names = ['DLF Seeds', 'Barenbrug', 'Greenfield', 'Газон Сити', 'Семена Алтая', 'Агрофирма Поиск', 'Husqvarna', 'WOLF-Garten'];
  await run('бренды', names, (name) =>
    post('/brands', { name, slug: toSlug(name) })
  );
}

// ── Lawn Types ────────────────────────────────────────────────────────────────
async function seedLawnTypes() {
  const names = ['Мятлик луговой', 'Овсяница красная', 'Райграс пастбищный', 'Овсяница тростниковая', 'Мятлик дубравный', 'Полевица тонкая'];
  await run('типы газонов', names, (name) =>
    post('/lawn-types', { name, slug: toSlug(name) })
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
async function seedFeatures() {
  const names = [
    'Теневыносливый', 'Засухоустойчивый', 'Быстрый рост', 'Морозостойкий',
    'Низкорослый', 'Спортивный', 'Декоративный', 'Для влажных почв',
    'Партерный', 'Ремонтный',
  ];
  await run('особенности', names, (name) =>
    post('/features', { name, slug: toSlug(name) })
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
async function seedCategories() {
  const names = ['Газоны', 'Смеси', 'Тракторы', 'Техника', 'Удобрения', 'Инструменты', 'Аксессуары', 'Акция'];
  await run('категории', names, (name) =>
    post('/categories', { name, uid: toSlug(name) })
  );
}

// ── Partners Types ────────────────────────────────────────────────────────────
async function seedPartnersTypes() {
  const items = [
    { name: 'Официальный дилер',    slug: 'official-dealer',  description: 'Авторизованные официальные дилеры продукции.', rank: 1 },
    { name: 'Садовый центр',        slug: 'garden-center',    description: 'Специализированные садовые магазины и питомники.', rank: 2 },
    { name: 'Агромаркет',           slug: 'agromarket',       description: 'Крупные агрорынки и торговые комплексы.', rank: 3 },
    { name: 'Строительный магазин', slug: 'builder-store',    description: 'Строительные гипермаркеты с садовым отделом.', rank: 4 },
    { name: 'Интернет-магазин',     slug: 'online-store',     description: 'Онлайн-партнёры с доставкой по России.', rank: 5 },
  ];
  await run('типы партнёров', items, (item) =>
    post('/partners-types', item, { publish: true })
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────
async function seedBlog() {
  const posts = [
    {
      title: 'Как выбрать газонную траву: полное руководство',
      slug: 'kak-vybrat-gazonnuyu-travu',
      description: 'Разбираемся в видах газонных трав и помогаем сделать правильный выбор для вашего участка.',
      date: '2025-03-15',
      blocks: '<h2>Виды газонных трав</h2><p>Выбор газонной травы зависит от условий участка: освещённости, типа почвы и предполагаемой нагрузки. Рассмотрим основные виды.</p><h3>Мятлик луговой</h3><p>Отличается медленным, но устойчивым ростом. Идеален для декоративных газонов, хорошо переносит вытаптывание.</p><h3>Овсяница красная</h3><p>Теневыносливая культура с тонкими листьями. Подходит для участков с частичным затенением.</p>',
    },
    {
      title: 'Весенний уход за газоном: пошаговая инструкция',
      slug: 'vesenniy-uhod-za-gazonom',
      description: 'Что нужно сделать с газоном после зимы, чтобы он выглядел идеально всё лето.',
      date: '2025-04-01',
      blocks: '<h2>Первые шаги весной</h2><p>Как только снег сошёл и почва подсохла, начинайте подготовку газона к новому сезону.</p><ol><li><strong>Граблевание</strong> — уберите мёртвую траву и листья.</li><li><strong>Аэрация</strong> — прокол дёрна улучшит доступ воды и воздуха к корням.</li><li><strong>Подкормка</strong> — внесите азотное удобрение для стимуляции роста.</li><li><strong>Первая стрижка</strong> — срежьте траву до 4–5 см.</li></ol>',
    },
    {
      title: 'Аэрация газона: когда и как делать',
      slug: 'aeratsiya-gazonu-kogda-i-kak',
      description: 'Подробное руководство по аэрации: инструменты, сроки, техника выполнения.',
      date: '2025-05-10',
      blocks: '<h2>Зачем нужна аэрация</h2><p>Со временем почва под газоном уплотняется, что мешает проникновению воды, воздуха и питательных веществ к корням. Аэрация решает эту проблему.</p><h2>Когда проводить</h2><p>Лучшее время — <strong>осень (сентябрь)</strong> или <strong>весна (апрель–май)</strong>. Осенняя аэрация особенно эффективна, так как трава успевает восстановиться до зимы.</p>',
    },
    {
      title: 'Газон в тени: выбор сорта и особенности ухода',
      slug: 'gazon-v-teni',
      description: 'Советы по созданию красивого газона в тенистых уголках сада.',
      date: '2025-05-25',
      blocks: '<h2>Проблема тенистых участков</h2><p>На участках с менее чем 4 часами прямого солнца большинство газонных трав растёт плохо. Однако есть виды, которые отлично адаптированы к тени.</p><h2>Лучшие сорта для тени</h2><ul><li>Овсяница красная ползучая</li><li>Мятлик дубравный</li><li>Полевица тонкая</li></ul>',
    },
    {
      title: 'Борьба с болезнями газона: профилактика и лечение',
      slug: 'bolezni-gazona',
      description: 'Как распознать грибковые и бактериальные заболевания газона и эффективно с ними бороться.',
      date: '2025-06-08',
      blocks: '<h2>Самые частые болезни</h2><h3>Снежная плесень</h3><p>Появляется после таяния снега в виде розоватых или белых пятен. Лечение: фунгициды на основе ипродиона или флудиоксонила.</p><h3>Ржавчина газона</h3><p>Оранжевый или ржавый налёт на листьях. Причина — нехватка азота и влаги. Лечение: подкормка и нормализация полива.</p>',
    },
    {
      title: 'Системы полива газона: обзор и выбор',
      slug: 'sistemy-poliva-gazona',
      description: 'Сравниваем дождевальные установки, капельный полив и умные системы орошения.',
      date: '2025-06-20',
      blocks: '<h2>Типы систем полива</h2><p>Правильный полив — залог здорового газона. Рассмотрим основные варианты.</p><h3>Роторные дождеватели</h3><p>Охватывают большую площадь, равномерно распределяют воду. Подходят для больших газонов.</p><h3>Статические форсунки</h3><p>Дешевле и проще в установке, но менее равномерны. Хороши для небольших участков.</p><h3>Умные системы</h3><p>Подключаются к датчикам погоды и управляются со смартфона. Экономят до 40% воды.</p>',
    },
    {
      title: 'Осенняя подготовка газона к зиме',
      slug: 'osennaya-podgotovka-gazonu',
      description: 'Комплекс мероприятий для защиты газона в холодный сезон.',
      date: '2025-09-01',
      blocks: '<h2>Что сделать осенью</h2><p>Правильная подготовка газона к зиме гарантирует его быстрое восстановление весной.</p><ol><li>Последняя стрижка на высоте 5–6 см</li><li>Аэрация и пескование</li><li>Внесение фосфорно-калийных удобрений</li><li>Обработка фунгицидом против снежной плесени</li><li>Посев на проплешины</li></ol>',
    },
    {
      title: 'Газонный трактор или самоходная косилка: что выбрать?',
      slug: 'traktor-ili-samohodnaya-kosilka',
      description: 'Сравниваем технику для больших и средних газонов, разбираем плюсы и минусы.',
      date: '2025-07-14',
      blocks: '<h2>Когда нужен трактор</h2><p>Газонный трактор оправдан при площади участка <strong>от 25 соток</strong>. Он значительно ускоряет работу и снижает физическую нагрузку.</p><h2>Самоходная косилка</h2><p>Оптимальна для участков от 6 до 25 соток. Манёвренна, проще в обслуживании, дешевле в покупке.</p><h2>На что обратить внимание</h2><ul><li>Ширина захвата</li><li>Объём травосборника</li><li>Мощность двигателя</li><li>Наличие мульчирования</li></ul>',
    },
  ];

  await run('блог', posts, (p) => post('/blogs', p));
}

// ── Purposes ──────────────────────────────────────────────────────────────────
async function seedPurposes() {
  const names = [
    'Спортивные газоны', 'Декоративные газоны', 'Газоны для игровых площадок',
    'Партерные газоны', 'Газоны для тени', 'Газоны для засушливых условий',
    'Ремонт и восстановление', 'Придорожные откосы',
  ];
  await run('назначения', names, (name) =>
    post('/purposes', { name, slug: toSlug(name) }, { publish: true })
  );
}

// ── Lawns (content type) ──────────────────────────────────────────────────────
async function seedLawns() {
  const lawns = [
    {
      name: 'Мятлик луговой Premium',
      slug: 'myatlik-lugovoy-premium',
      speed: 4, resistance: 9, isFeature: true,
      seasonality: 'Круглогодичный', germination_time: '14–21 день', full_cover_time: '60–90 дней',
      density: 'Высокая', frost_resistance: 'Отличная', shade_tolerance: 'Слабая', heat_resistance: 'Средняя',
      description: 'Классический партерный газон из мятлика лугового. Образует плотный, насыщенно-зелёный ковёр с высокой устойчивостью к вытаптыванию.',
      type: [{ name: 'Мятлик луговой', percent: 100 }],
      price: [{ weight: 1, price: 420 }, { weight: 5, price: 1950 }, { weight: 10, price: 3700 }],
      landing: { april: true, may: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '3–5 см' }, { name: 'Норма высева', value: '30–40 г/м²' }],
    },
    {
      name: 'Овсяница красная Shade',
      slug: 'ovsyanitsa-krasnaya-shade',
      speed: 6, resistance: 7, isFeature: false,
      seasonality: 'Круглогодичный', germination_time: '10–14 дней', full_cover_time: '45–60 дней',
      density: 'Средняя', frost_resistance: 'Высокая', shade_tolerance: 'Высокая', heat_resistance: 'Слабая',
      description: 'Теневыносливый газон на основе ползучей овсяницы. Идеален для участков под деревьями и в полутени.',
      type: [{ name: 'Овсяница красная', percent: 80 }, { name: 'Мятлик дубравный', percent: 20 }],
      price: [{ weight: 1, price: 380 }, { weight: 5, price: 1700 }, { weight: 10, price: 3200 }],
      landing: { april: true, may: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '4–6 см' }, { name: 'Норма высева', value: '35–45 г/м²' }],
    },
    {
      name: 'Райграс Sport Pro',
      slug: 'rajgras-sport-pro',
      speed: 9, resistance: 8, isFeature: true,
      seasonality: 'Весна-Лето', germination_time: '5–7 дней', full_cover_time: '21–30 дней',
      density: 'Высокая', frost_resistance: 'Средняя', shade_tolerance: 'Слабая', heat_resistance: 'Средняя',
      description: 'Быстрорастущий спортивный газон с высокой регенеративной способностью. Используется на стадионах и площадках.',
      type: [{ name: 'Райграс пастбищный', percent: 70 }, { name: 'Мятлик луговой', percent: 30 }],
      price: [{ weight: 1, price: 350 }, { weight: 5, price: 1600 }, { weight: 10, price: 3000 }],
      landing: { april: true, may: true, june: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '2.5–4 см' }, { name: 'Норма высева', value: '40–50 г/м²' }],
    },
    {
      name: 'Универсальная смесь Classic Mix',
      slug: 'universalnaya-smes-classic-mix',
      speed: 7, resistance: 8, isFeature: false,
      seasonality: 'Весна-Осень', germination_time: '7–14 дней', full_cover_time: '40–60 дней',
      density: 'Высокая', frost_resistance: 'Высокая', shade_tolerance: 'Средняя', heat_resistance: 'Средняя',
      description: 'Сбалансированная смесь для создания классического газона на большинстве типов участков.',
      type: [{ name: 'Мятлик луговой', percent: 40 }, { name: 'Овсяница красная', percent: 40 }, { name: 'Райграс пастбищный', percent: 20 }],
      price: [{ weight: 1, price: 400 }, { weight: 5, price: 1800 }, { weight: 10, price: 3400 }],
      landing: { april: true, may: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '3–5 см' }, { name: 'Норма высева', value: '30–40 г/м²' }],
    },
    {
      name: 'Засухоустойчивый Dry Land',
      slug: 'zasuhoustojchivy-dry-land',
      speed: 5, resistance: 6, isFeature: false,
      seasonality: 'Весна-Лето', germination_time: '10–18 дней', full_cover_time: '50–70 дней',
      density: 'Средняя', frost_resistance: 'Средняя', shade_tolerance: 'Слабая', heat_resistance: 'Высокая',
      description: 'Специальная смесь для регионов с жарким летом и дефицитом осадков. Сохраняет зелёный вид при минимальном поливе.',
      type: [{ name: 'Овсяница тростниковая', percent: 60 }, { name: 'Мятлик луговой', percent: 40 }],
      price: [{ weight: 1, price: 360 }, { weight: 5, price: 1650 }, { weight: 10, price: 3100 }],
      landing: { may: true, june: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '5–7 см' }, { name: 'Норма высева', value: '35–45 г/м²' }],
    },
    {
      name: 'Мавританский Wildflower',
      slug: 'mavritanskiy-wildflower',
      speed: 8, resistance: 5, isFeature: true,
      seasonality: 'Весна-Лето', germination_time: '10–21 день', full_cover_time: '30–45 дней',
      density: 'Низкая', frost_resistance: 'Средняя', shade_tolerance: 'Слабая', heat_resistance: 'Высокая',
      description: 'Декоративный мавританский газон с полевыми цветами. Не требует частой стрижки, создаёт эффект природного луга.',
      type: [{ name: 'Полевица тонкая', percent: 50 }, { name: 'Овсяница красная', percent: 50 }],
      price: [{ weight: 1, price: 500 }, { weight: 5, price: 2300 }, { weight: 10, price: 4300 }],
      landing: { april: true, may: true, august: true, september: true },
      characteristic: [{ name: 'Высота стрижки', value: '10–15 см (1–2 раза в год)' }, { name: 'Норма высева', value: '20–30 г/м²' }],
    },
  ];

  await run('газоны (коллекция)', lawns, (lawn) =>
    post('/lawns', lawn, { publish: true })
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
async function seedFaq() {
  const faqs = [
    { title: 'Когда лучше всего сеять газон?',      slug: 'kogda-seyat-gazon',      blocks: '<p>Оптимальное время — <strong>весна (апрель–май)</strong> или <strong>ранняя осень (август–сентябрь)</strong>. Весной почва прогрета, осенью меньше сорняков.</p>' },
    { title: 'Как подготовить почву перед посевом?', slug: 'podgotovka-pochvy',       blocks: '<p>Перекопайте на 15–20 см, удалите корни сорняков, выровняйте граблями. При необходимости внесите песок или чернозём.</p>' },
    { title: 'Сколько воды нужно газону?',           slug: 'poliv-gazona',            blocks: '<p>В жаркий период — <strong>2–3 раза в неделю</strong>, 20–30 л на м². Лучшее время — раннее утро или вечер.</p>' },
    { title: 'Когда делать первую стрижку?',         slug: 'pervaya-strizhka',        blocks: '<p>При достижении <strong>8–10 см</strong>. Срезайте не более 1/3 высоты. Ножи должны быть острыми.</p>' },
    { title: 'Как бороться с сорняками?',            slug: 'borba-s-sornyakami',      blocks: '<p>Регулярная стрижка подавляет большинство сорняков. Для устойчивых — точечная обработка гербицидами избирательного действия.</p>' },
    { title: 'Нужно ли удобрять газон?',             slug: 'udobrenie-gazona',        blocks: '<p>Да. Весной — азотные, летом — комплексные NPK, осенью — фосфорно-калийные для укрепления корней перед зимой.</p>' },
    { title: 'Что такое аэрация и зачем она нужна?', slug: 'aeratsiya-gazona',        blocks: '<p>Прокалывание дёрна на 8–10 см. Улучшает доступ воздуха и воды к корням. Проводится <strong>раз в год</strong>, обычно осенью.</p>' },
    { title: 'Как ухаживать за газоном зимой?',      slug: 'gazon-zimoy',             blocks: '<p>Избегайте хождения по замёрзшей траве. В ноябре проведите последнее удобрение, молодые посевы прикройте лутрасилом.</p>' },
    { title: 'Почему газон желтеет?',                slug: 'gazon-zhelteyet',         blocks: '<p>Причины: <strong>нехватка азота</strong>, пересыхание, грибковые болезни или повреждение солями. Определите причину и устраните её.</p>' },
    { title: 'Можно ли сеять газон в тени?',         slug: 'gazon-v-teni',            blocks: '<p>Да, но нужны <strong>теневыносливые смеси</strong> на основе овсяницы красной и мятлика дубравного.</p>' },
  ];

  await run('FAQ', faqs, (faq) => post('/faqs', faq));
}

// ── Partners ──────────────────────────────────────────────────────────────────
async function seedPartners() {
  const cities = [
    { city: 'Москва',          lat: 55.7558, lng: 37.6173 },
    { city: 'Санкт-Петербург', lat: 59.9343, lng: 30.3351 },
    { city: 'Екатеринбург',    lat: 56.8389, lng: 60.6057 },
    { city: 'Новосибирск',     lat: 54.9884, lng: 82.9357 },
    { city: 'Казань',          lat: 55.8304, lng: 49.0661 },
    { city: 'Краснодар',       lat: 45.0448, lng: 38.9760 },
    { city: 'Нижний Новгород', lat: 56.2965, lng: 43.9361 },
    { city: 'Самара',          lat: 53.2038, lng: 50.1606 },
  ];

  const partners = [
    { name: 'ГазонСтрой Москва',  city: cities[0], phone: '+7 (495) 123-45-67', working_hours: 'Пн–Пт 9:00–18:00',  open_on_weekends: false, rank: 1, isFeature: true  },
    { name: 'Зелёный двор',        city: cities[0], phone: '+7 (495) 987-65-43', working_hours: 'Пн–Вс 8:00–20:00',  open_on_weekends: true,  rank: 2, isFeature: true  },
    { name: 'СПб Газон',           city: cities[1], phone: '+7 (812) 111-22-33', working_hours: 'Пн–Сб 9:00–19:00',  open_on_weekends: true,  rank: 1, isFeature: false },
    { name: 'Северный газон',      city: cities[1], phone: '+7 (812) 444-55-66', working_hours: 'Пн–Пт 10:00–18:00', open_on_weekends: false, rank: 2, isFeature: false },
    { name: 'УралГрин',            city: cities[2], phone: '+7 (343) 222-33-44', working_hours: 'Пн–Пт 9:00–18:00',  open_on_weekends: false, rank: 1, isFeature: false },
    { name: 'Сибирский газон',     city: cities[3], phone: '+7 (383) 555-66-77', working_hours: 'Пн–Вс 9:00–21:00',  open_on_weekends: true,  rank: 1, isFeature: true  },
    { name: 'КазаньГазон Про',     city: cities[4], phone: '+7 (843) 333-44-55', working_hours: 'Пн–Сб 9:00–17:00',  open_on_weekends: true,  rank: 1, isFeature: false },
    { name: 'ЮгГрин Краснодар',    city: cities[5], phone: '+7 (861) 777-88-99', working_hours: 'Пн–Вс 8:00–22:00',  open_on_weekends: true,  rank: 1, isFeature: true  },
    { name: 'Волжский газон',      city: cities[6], phone: '+7 (831) 666-77-88', working_hours: 'Пн–Пт 9:00–18:00',  open_on_weekends: false, rank: 1, isFeature: false },
    { name: 'СамараГрин',          city: cities[7], phone: '+7 (846) 999-00-11', working_hours: 'Пн–Сб 9:00–19:00',  open_on_weekends: true,  rank: 1, isFeature: false },
  ];

  await run('партнёры', partners, ({ name, city, phone, working_hours, open_on_weekends, rank, isFeature }) =>
    post('/partners', {
      name, phone, working_hours, open_on_weekends, rank, isFeature,
      location: {
        lat: city.lat + (Math.random() - 0.5) * 0.05,
        lng: city.lng + (Math.random() - 0.5) * 0.05,
        address: `${city.city}, ул. ${faker.location.street()}, ${faker.number.int({ min: 1, max: 150 })}`,
      },
      how_to_get: faker.lorem.sentence(),
      website: `https://${faker.internet.domainName()}`,
    })
  );
}

// ── Contact Page (single type) ────────────────────────────────────────────────
async function seedContactPage() {
  console.log('\nОбновляю contact-page...');
  try {
    await put('/contact-page', {
      company_name: 'ООО «Канадский газон»',
      inn: '7701234567',
      kpp: '770101001',
      request_mail: 'info@canadian-lawn.ru',
      offer_mail: 'partners@canadian-lawn.ru',
      PSRN: { value: '1027700132195', date: '2002-07-15' },
    });
    console.log('  ✅ contact-page обновлён');
  } catch (err) {
    console.error('  x Ошибка contact-page:', err.response?.data?.error?.message ?? err.message);
  }
}

// ── About Page (single type) ──────────────────────────────────────────────────
async function seedAboutPage() {
  console.log('\nОбновляю about-page...');
  try {
    await put('/about-page', {
      description: '<p><strong>Канадский газон</strong> — ведущий поставщик газонных семян и садовой техники в России. Более 15 лет мы помогаем создавать идеальные газоны для частных владельцев, спортивных объектов и муниципальных территорий.</p><p>Наша продукция — это семена премиального качества от ведущих европейских производителей, прошедшие строгий отбор и адаптированные к климатическим условиям России.</p>',
      items: [
        { title: 'Наша миссия', block: '<p>Сделать красивый газон доступным для каждого. Мы предлагаем профессиональные решения для частного и коммерческого использования.</p>' },
        { title: 'Качество семян', block: '<p>Работаем только с сертифицированными поставщиками: DLF Seeds, Barenbrug, Greenfield. Каждая партия проходит лабораторный контроль всхожести.</p>' },
        { title: 'Экспертная поддержка', block: '<p>Наши агрономы консультируют по подбору сорта, подготовке почвы и уходу на всех этапах роста газона.</p>' },
        { title: 'Партнёрская сеть', block: '<p>Более 200 авторизованных партнёров по всей России. Доставка в любую точку страны в течение 3–5 рабочих дней.</p>' },
      ],
    }, { publish: true });
    console.log('  ✅ about-page обновлён');
  } catch (err) {
    console.error('  x Ошибка about-page:', err.response?.data?.error?.message ?? err.message);
  }
}

// ── Run all ───────────────────────────────────────────────────────────────────
console.log('🌱 Запускаю полный сид...');

seedProducts()
  .then(() => seedBrands())
  .then(() => seedLawnTypes())
  .then(() => seedFeatures())
  .then(() => seedCategories())
  .then(() => seedPartnersTypes())
  .then(() => seedBlog())
  .then(() => seedPurposes())
  .then(() => seedLawns())
  .then(() => seedFaq())
  .then(() => seedPartners())
  .then(() => seedContactPage())
  .then(() => seedAboutPage())
  .then(() => console.log('\n\n🎉 Сид завершён!'))
  .catch(err => {
    console.error('\n❌ Ошибка:', err.response?.data ?? err.message ?? err);
    process.exit(1);
  });