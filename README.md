---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: ce659f80fdfde855dd681dcf1b01a219_41cab4e7e8fc11f1a20652540072b1e8
    ReservedCode1: yJIcG9XS2Uu5mCFjU1khcBGtRZcYwti7oFdNqC79KB0yxpEuFBj986H/lNZOSrX4KzS7tq4QfOIxZywHi2igPEk58cC1STFy46qbUlOBzvV3u39QY4r1BrOQjSQJ+SmD0m+pViXcBGDzDY75vXdAjCwYbA9A+zvmehf1cCkdXDepJzvq+dFAu1w21nY=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: ce659f80fdfde855dd681dcf1b01a219_41cab4e7e8fc11f1a20652540072b1e8
    ReservedCode2: yJIcG9XS2Uu5mCFjU1khcBGtRZcYwti7oFdNqC79KB0yxpEuFBj986H/lNZOSrX4KzS7tq4QfOIxZywHi2igPEk58cC1STFy46qbUlOBzvV3u39QY4r1BrOQjSQJ+SmD0m+pViXcBGDzDY75vXdAjCwYbA9A+zvmehf1cCkdXDepJzvq+dFAu1w21nY=
---

---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: ce659f80fdfde855dd681dcf1b01a219_40d1c2bde8f811f1a20652540072b1e8
    ReservedCode1: VRhDsJbfJKiwZDWmFxELHtkuOXGJLMZP94sKEnp8ABgjzKnLtGuDxfqm/up/Xl1cY0yZCvhhN/PA9hlD3J9GfGGgHMqQZojKG3wOdlZA06CwM580SLFHmOmKQ/NB74/CM//pKm68Z6yaSAPFTylVLQSXIA7GVsyidw1U0lDOyUkEo/mci9WOWSvk2Ys=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: ce659f80fdfde855dd681dcf1b01a219_40d1c2bde8f811f1a20652540072b1e8
    ReservedCode2: VRhDsJbfJKiwZDWmFxELHtkuOXGJLMZP94sKEnp8ABgjzKnLtGuDxfqm/up/Xl1cY0yZCvhhN/PA9hlD3J9GfGGgHMqQZojKG3wOdlZA06CwM580SLFHmOmKQ/NB74/CM//pKm68Z6yaSAPFTylVLQSXIA7GVsyidw1U0lDOyUkEo/mci9WOWSvk2Ys=
---

# Сайт танцевального ансамбля «Эрисеули»

Готовый статический сайт: HTML + CSS + JS, без сборки и зависимостей.
Открывается двойным кликом по `index.html` прямо с диска (все пути относительные).

## Структура

```
output/
├─ index.html            # Главная: о ансамбле, направления, достижения, преподаватели, галерея
├─ zapis.html            # Запись на занятия: 4 формата (вкл. детскую группу) + форма регистрации
├─ afisha.html           # Афиша: концерты и конкурсы, фильтр по типу
├─ show-group.html       # Шоу-группа: форматы, программы, заказ выступления, телефон
├─ contacts.html         # Контакты: телефон, адрес, режим работы, детская группа, соцсети, карта-заглушка
├─ README.md
└─ assets/
   ├─ css/style.css      # Все стили, дизайн-токены, адаптив (1080 / 900 / 620 px)
   └─ js/
      ├─ config.js       # ⚠ ЕДИНЫЙ ФАЙЛ НАСТРОЕК — все плейсхолдеры здесь
      └─ main.js         # Меню, анимации, маска телефона, валидация форм, фильтр афиши
```

## Что заменить (файл `assets/js/config.js`)

| Ключ | Что это | Где отображается |
|---|---|---|
| `name`, `nameShort`, `tagline`, `slogan` | название и слоганы | шапка, подвал, заголовки |
| `phone`, `phoneRaw` | **единый телефон**: запись на занятия и заказ шоу-группы | шапка, запись, шоу-группа, контакты, подвал |
| `phoneShow`, `phoneShowRaw` | то же значение (совместимость шаблона) | страницы, где раньше был отдельный номер |
| `email`, `emailShow` | почта (общие вопросы и заказы выступлений) | контакты, шоу-группа, подвал |
| `address`, `addressNote`, `mapQuery` | адрес зала и запрос для карты | контакты, афиша, подвал |
| `hours`, `hoursShort` | режим работы студии (Сб 14:00–18:00, Вс 18:30–21:00) | контакты, подвал |
| `kids` | детская группа 3–12 лет и её расписание (Сб/Вс 12:00–14:00) | главная, запись, контакты |
| `socials` | ссылки на соцсети (`vk`, `tg`, `yt`, `inst`) | подвал, контакты |
| `legal`, `copyright` | реквизиты и копирайт | подвал |

### Текущие контактные данные

- Телефон (единый): **+7 (916) 315-98-88** — запись на занятия и заказ шоу-группы
- Почта: **Luka.evgen@bk.ru**
- Адрес: **м. Тёплый Стан, ТЦ «Спектр», минус 1 этаж**
- Режим работы студии: **суббота 14:00–18:00, воскресенье 18:30–21:00**
- Детская группа (3–12 лет): **суббота 12:00–14:00, воскресенье 12:00–14:00**

Правки в `config.js` автоматически применяются на всех страницах
(элементы с `data-site="ключ"`, ссылки с `data-site-href="ключ"`).

## Детская группа

Данные детской группы задаются один раз в `config.js` (ключ `kids`):
`title`, `age`, `schedule` (массив `{ day, time }`). Расписание выводится:

- на главной — карточка в блоке «Направления» + бейдж в первом экране (якорь `#kids`);
- в `zapis.html` — карточка группы, пункт в `<select id="group">` (`value="kids"`) и блок в боковой колонке;
- в `contacts.html` — карточка «Режим работы студии» и расписание детской группы (якорь `#kids-schedule`).

Подстановка в HTML — через пустой `<ul data-kids-schedule></ul>` и `data-site="kids.age"`:
`main.js` читает вложенные ключи через точку, поэтому новые поля достаточно добавить в конфиг.

## Как подключить рабочую отправку форм

Формы `#bookingForm` (запись) и `#orderForm` (заказ выступления) работают в демо-режиме:
валидируют поля и показывают сообщение об успехе, но никуда не отправляют данные.
Чтобы принимать заявки, в `assets/js/main.js` в обработчиках `submit` замените блок
«Демо-режим» на `fetch()` к вашему backend / CRM / Telegram-боту.
Ничего больше менять не нужно: валидация, маска телефона и сообщение об успехе останутся.

## Как добавить событие в афишу

Скопируйте любой блок `<article class="card event reveal" data-event data-type="concert">`
в `afisha.html`, поменяйте дату, площадку, название, описание и статус:

- `badge--tickets` — «Билеты»
- `badge--free` — «Вход свободный»
- `badge--results` — «Итоги» (для прошедших событий добавьте класс `event--past`)

`data-type` принимает `concert` или `competition` — по нему работает фильтр.

## Изображения

Фотографии заменены стилизованными заглушками (градиенты, инициалы, подписи),
поэтому сайт ничего не грузит из сети и работает офлайн. Чтобы поставить реальные фото:
в галерее на главной замените `<div class="gallery__item">` на `<img>`/`background-image`,
у преподавателей — блок `.teacher__photo`, на странице шоу-группы — `.hero` / карточки форматов.

## Проверено

- все внутренние ссылки и `assets/` пути валидны, HTML-теги сбалансированы;
- `main.js` и `config.js` проходят проверку синтаксиса (Node.js `--check`);
- адаптив: 1080 px (планшет), 900 px (мобильное меню-бургер), 620 px (телефон);
- доступность: `aria-label`, `aria-expanded`, `role="status"` для сообщений, `prefers-reduced-motion`.
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
