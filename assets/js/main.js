/* ============================================================
   Общий скрипт сайта: подстановка данных из config.js,
   мобильное меню, анимации появления, маска телефона,
   валидация формы записи, фильтр афиши.
   ============================================================ */

(function () {
  "use strict";

  var SITE = window.SITE || {};

  /* ---------- 1. Подстановка данных из конфига ---------- */
  function siteValue(key) {
    if (Object.prototype.hasOwnProperty.call(SITE, key)) return SITE[key];
    /* поддержка вложенных ключей вида "kids.age" */
    return key.split(".").reduce(function (acc, part) {
      return acc && typeof acc === "object" ? acc[part] : undefined;
    }, SITE);
  }

  function initSiteData() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var value = siteValue(el.getAttribute("data-site"));
      if (typeof value === "string") el.textContent = value;
      else if (typeof value === "number") el.textContent = String(value);
    });

    document.querySelectorAll("[data-site-href]").forEach(function (el) {
      var key = el.getAttribute("data-site-href");
      if (key === "phone") el.setAttribute("href", "tel:" + (SITE.phoneRaw || ""));
      else if (key === "phoneShow") el.setAttribute("href", "tel:" + (SITE.phoneShowRaw || ""));
      else if (key === "email") el.setAttribute("href", "mailto:" + (SITE.email || ""));
      else if (key === "emailShow") el.setAttribute("href", "mailto:" + (SITE.emailShow || ""));
      else if (key === "map") {
        el.setAttribute("href", "https://yandex.ru/maps/?text=" + encodeURIComponent(SITE.mapQuery || ""));
      }
    });

    var yearEls = document.querySelectorAll("[data-year]");
    yearEls.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    var socialsBoxes = document.querySelectorAll("[data-socials]");
    if (socialsBoxes.length && Array.isArray(SITE.socials)) {
      var icons = {
        vk: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.8 18.1c-6.1 0-9.7-4.2-9.8-11.1h3.1c.1 5.1 2.4 7.2 4.1 7.7V7h2.9v4.4c1.7-.2 3.5-2.2 4.1-4.4h2.9c-.5 2.7-2.4 4.7-3.7 5.5 1.3.7 3.5 2.4 4.3 5.6h-3.2c-.6-2-2.3-3.6-4.4-3.8v3.8h-.3z"/></svg>',
        tg: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 19 19.1c-.2 1-.8 1.2-1.6.8l-4.4-3.3-2.1 2.1c-.2.2-.4.4-.9.4l.3-4.5 8.2-7.4c.4-.3-.1-.5-.6-.2L6.7 12.6 2.4 11.3c-1-.3-1-1 .2-1.4l18-6.9c.8-.3 1.5.2 1.3 1.3z"/></svg>',
        yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.2V8.8l5.5 3.2-5.5 3.2z"/></svg>',
        inst: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>'
      };
      var html = SITE.socials.map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.label + '" title="' + s.label + '">' +
          (icons[s.key] || s.label) + "</a>";
      }).join("");
      socialsBoxes.forEach(function (box) { box.innerHTML = html; });
    }

    document.querySelectorAll("[data-hours]").forEach(function (box) {
      if (!Array.isArray(SITE.hours)) return;
      box.innerHTML = SITE.hours.map(function (h) {
        return '<li><span>' + h.days + "</span><strong>" + h.time + "</strong></li>";
      }).join("");
    });

    /* расписание детской группы из config.js (SITE.kids.schedule) */
    document.querySelectorAll("[data-kids-schedule]").forEach(function (box) {
      var list = SITE.kids && SITE.kids.schedule;
      if (!Array.isArray(list)) return;
      box.innerHTML = list.map(function (h) {
        return '<li><span>' + h.day + "</span><strong>" + h.time + "</strong></li>";
      }).join("");
    });
  }

  /* ---------- 2. Шапка и мобильное меню ---------- */
  function initHeader() {
    var header = document.querySelector(".header");
    var burger = document.querySelector(".burger");
    var nav = document.getElementById("nav");

    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });

      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("is-open");
          burger.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });

      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          burger.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    }
  }

  /* ---------- 3. Появление блоков при прокрутке ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i, 6) * 60) + "ms";
      io.observe(el);
    });
  }

  /* ---------- 4. Маска телефона ---------- */
  function formatPhone(value) {
    var digits = value.replace(/\D/g, "");
    if (!digits) return "";
    if (digits[0] === "8") digits = "7" + digits.slice(1);
    if (digits[0] !== "7") digits = "7" + digits;
    digits = digits.slice(0, 11);

    var out = "+7";
    if (digits.length > 1) out += " (" + digits.slice(1, 4);
    if (digits.length >= 5) out += ") " + digits.slice(4, 7);
    if (digits.length >= 8) out += "-" + digits.slice(7, 9);
    if (digits.length >= 10) out += "-" + digits.slice(9, 11);
    return out;
  }

  function initPhoneMask() {
    document.querySelectorAll('input[type="tel"][data-mask="phone"]').forEach(function (input) {
      input.addEventListener("input", function () {
        var pos = input.selectionStart;
        var before = input.value.length;
        input.value = formatPhone(input.value);
        var after = input.value.length;
        try {
          input.setSelectionRange(pos + (after - before), pos + (after - before));
        } catch (err) { /* игнорируем в неподдерживающих браузерах */ }
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && input.value === "+7") input.value = "";
      });
    });
  }

  /* ---------- 5. Валидация и отправка формы записи ---------- */
  var GROUP_TITLES = {
    kids: "Детская группа (3–12 лет)",
    amateur: "Любительская группа",
    individual: "Индивидуальные занятия",
    trial: "Пробное занятие"
  };
  var LEVEL_TITLES = {
    none: "Никогда не танцевал(а)",
    basic: "Базовый уровень",
    advanced: "Продолжающий / опытный"
  };

  function setError(field, message) {
    if (!field) return;
    field.classList.add("has-error");
    var box = field.querySelector(".field__error");
    if (box) box.textContent = message;
  }

  function clearError(field) {
    if (!field) return;
    field.classList.remove("has-error");
  }

  function fieldOf(input) {
    return input.closest(".field") || input.closest(".check") || input.parentElement;
  }

  function initBookingForm() {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    var success = document.getElementById("bookingSuccess");

    var rules = {
      name: function (v) {
        if (v.trim().length < 2) return "Укажите имя — минимум 2 символа";
        if (!/^[А-Яа-яЁёA-Za-z\s\-]+$/.test(v.trim())) return "Имя может содержать только буквы, пробел и дефис";
        return "";
      },
      phone: function (v) {
        var digits = v.replace(/\D/g, "");
        if (digits.length !== 11) return "Введите телефон полностью: +7 (XXX) XXX-XX-XX";
        return "";
      },
      email: function (v) {
        if (!v.trim()) return "";
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/.test(v.trim())) return "Проверьте адрес email, например: name@mail.ru";
        return "";
      },
      group: function (v) {
        if (!v) return "Выберите группу для записи";
        return "";
      }
    };

    var inputs = form.querySelectorAll("input[name], select[name], textarea[name]");

    inputs.forEach(function (input) {
      var ev = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "input";
      input.addEventListener(ev, function () {
        if (input.name === "consent") {
          fieldOf(input).classList.remove("has-error");
          return;
        }
        if (rules[input.name]) {
          var msg = rules[input.name](input.value);
          if (!msg) clearError(fieldOf(input));
        }
        if (input.name === "level") {
          clearError(fieldOf(input));
        }
      });
      if (input.type === "radio") {
        input.addEventListener("change", function () { clearError(fieldOf(input)); });
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var values = {
        name: (data.get("name") || "").toString(),
        phone: (data.get("phone") || "").toString(),
        email: (data.get("email") || "").toString(),
        group: (data.get("group") || "").toString(),
        level: (data.get("level") || "").toString(),
        comment: (data.get("comment") || "").toString(),
        consent: data.get("consent")
      };

      var errors = 0;
      var firstInvalid = null;

      Object.keys(rules).forEach(function (key) {
        var input = form.querySelector('[name="' + key + '"]');
        var msg = rules[key](values[key] || "");
        if (msg) {
          setError(fieldOf(input), msg);
          errors++;
          if (!firstInvalid) firstInvalid = input;
        } else {
          clearError(fieldOf(input));
        }
      });

      var levelInput = form.querySelector('[name="level"]');
      if (!values.level) {
        setError(fieldOf(levelInput), "Выберите уровень подготовки");
        errors++;
        if (!firstInvalid) firstInvalid = levelInput;
      }

      var consentInput = form.querySelector('[name="consent"]');
      if (!values.consent) {
        fieldOf(consentInput).classList.add("has-error");
        errors++;
        if (!firstInvalid) firstInvalid = consentInput;
      }

      if (errors > 0) {
        var box = form.querySelector(".form-error-summary");
        if (box) {
          box.textContent = "Проверьте, пожалуйста, выделенные поля — их нужно заполнить корректно.";
          box.style.display = "block";
        }
        if (firstInvalid) {
          firstInvalid.focus({ preventScroll: true });
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      /* Демо-режим: данные никуда не отправляются.
         Для реальной работы подключите обработчик формы (backend / CRM / Telegram-бот). */
      if (success) {
        var summary = success.querySelector("[data-summary]");
        if (summary) {
          summary.innerHTML =
            "<div><span>Группа</span><b>" + (GROUP_TITLES[values.group] || values.group) + "</b></div>" +
            "<div><span>Имя</span><b>" + values.name.trim() + "</b></div>" +
            "<div><span>Телефон</span><b>" + values.phone + "</b></div>" +
            (values.email ? "<div><span>Email</span><b>" + values.email.trim() + "</b></div>" : "") +
            "<div><span>Уровень</span><b>" + (LEVEL_TITLES[values.level] || "—") + "</b></div>";
        }
        form.style.display = "none";
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "center" });

        var again = success.querySelector("[data-reset]");
        if (again) {
          again.addEventListener("click", function () {
            form.reset();
            form.style.display = "";
            success.classList.remove("is-visible");
            form.querySelectorAll(".has-error").forEach(function (el) { el.classList.remove("has-error"); });
            var box = form.querySelector(".form-error-summary");
            if (box) box.style.display = "none";
            form.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        }
      }
    });
  }

  /* ---------- 6. Мини-форма заказа выступления ---------- */
  function initOrderForm() {
    var form = document.getElementById("orderForm");
    if (!form) return;
    var success = document.getElementById("orderSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("orderName") || "").toString().trim();
      var phone = (data.get("orderPhone") || "").toString();
      var date = (data.get("orderDate") || "").toString();
      var format = (data.get("orderFormat") || "").toString();

      var ok = true;

      var nameField = fieldOf(form.querySelector('[name="orderName"]'));
      if (name.length < 2) { setError(nameField, "Как к вам обращаться?"); ok = false; } else clearError(nameField);

      var phoneField = fieldOf(form.querySelector('[name="orderPhone"]'));
      if (phone.replace(/\D/g, "").length !== 11) { setError(phoneField, "Введите телефон полностью"); ok = false; } else clearError(phoneField);

      var formatField = fieldOf(form.querySelector('[name="orderFormat"]'));
      if (!format) { setError(formatField, "Выберите повод / формат"); ok = false; } else clearError(formatField);

      if (!ok) return;

      if (success) {
        var text = success.querySelector("[data-order-summary]");
        if (text) {
          text.innerHTML = "Заявка: <b>" + format + "</b>" +
            (date ? ", дата — <b>" + date + "</b>" : "") +
            ". Мы свяжемся с вами по номеру <b>" + phone + "</b> в течение рабочего дня.";
        }
        form.style.display = "none";
        success.classList.add("is-visible");
      }
    });
  }

  /* ---------- 7. Фильтр афиши ---------- */
  function initAfishaFilter() {
    var bar = document.querySelector("[data-filter-bar]");
    if (!bar) return;
    var buttons = bar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll("[data-event]");
    var counter = document.querySelector("[data-filter-count]");
    var empty = document.querySelector("[data-empty-state]");

    function apply(filter) {
      var visible = 0;
      cards.forEach(function (card) {
        var type = card.getAttribute("data-type");
        var show = filter === "all" || type === filter;
        card.classList.toggle("is-hidden", !show);
        if (show) visible++;
      });
      if (counter) counter.textContent = "Показано: " + visible + " из " + cards.length;
      if (empty) empty.classList.toggle("is-visible", visible === 0);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        apply(btn.getAttribute("data-filter"));
      });
    });

    apply("all");
  }

  /* ---------- Запуск ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initSiteData();
    initHeader();
    initReveal();
    initPhoneMask();
    initBookingForm();
    initOrderForm();
    initAfishaFilter();
  });
})();
