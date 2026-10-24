
/* ========= KONFIGURASI (edit di sini) ========= */

const WHATSAPP_NUMBER = "6285210821601";

const SITE_CONFIG = {
  address: "Jl. Letjen Suprapto No.36, RT.15/RW.3, Harapan Mulya, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10640",

  hours: "09.00 - 20.00",

  mapsLink: "https://www.google.com/maps/place/Primagama+Galur/data=!4m2!3m1!1s0x0:0xfd77aa60868b3a58?sa=X&ved=1t:2428&ictx=111",

  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.675690738391!2d106.854505!3d-6.1741556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5ad1548eb21%3A0xfd77aa60868b3a58!2sPrimagama%20Galur!5e0!3m2!1sid!2sid!4v1792582369716!5m2!1sid!2sid"
};

const DEFAULT_MESSAGE =
  "Halo Admin NEW PRIMAGAMA GALUR, saya ingin bertanya mengenai program bimbingan belajar.";

/* ============================================== */


/* ========= FUNGSI PEMBANTU ========= */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const waReady = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

const waURL = msg =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;


/* ========= NOMOR WHATSAPP ========= */

$$(".wa-link").forEach(a => {
  const topic = a.dataset.msg;

  const msg = topic
    ? `Halo Admin NEW PRIMAGAMA GALUR, saya ingin bertanya mengenai ${topic}.`
    : DEFAULT_MESSAGE;

  if (waReady) {
    a.href = waURL(msg);
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.addEventListener("click", e => {
      e.preventDefault();
      alert("Nomor WhatsApp admin belum diatur. Isi WHATSAPP_NUMBER di script.js.");
    });
  }
});


/* ========= KONTAK ========= */

const contactAddress = $("#c-address");
const footerAddress = $("#f-address");
const contactHours = $("#c-hours");
const contactWhatsApp = $("#c-wa");
const footerWhatsApp = $("#f-wa");

if (contactAddress) {
  contactAddress.textContent = SITE_CONFIG.address;
}

if (footerAddress) {
  footerAddress.textContent = SITE_CONFIG.address;
}

if (contactHours) {
  contactHours.textContent = SITE_CONFIG.hours;
}

const displayedNumber = waReady
  ? "+" + WHATSAPP_NUMBER
  : "[Masukkan nomor WhatsApp admin]";

if (contactWhatsApp) {
  contactWhatsApp.textContent = displayedNumber;
}

if (footerWhatsApp) {
  footerWhatsApp.textContent = displayedNumber;
}

const route = $("#route");

if (route) {
  if (SITE_CONFIG.mapsLink) {
    route.href = SITE_CONFIG.mapsLink;
  } else {
    route.addEventListener("click", e => {
      e.preventDefault();
      alert("Tautan Google Maps belum diatur. Isi mapsLink di script.js.");
    });
  }
}

const map = $("#map");

if (map && SITE_CONFIG.mapsEmbedUrl) {
  const f = document.createElement("iframe");

  f.src = SITE_CONFIG.mapsEmbedUrl;
  f.title = "Peta lokasi NEW PRIMAGAMA GALUR";
  f.loading = "lazy";

  map.replaceChildren(f);
}


/* ========= TAHUN OTOMATIS ========= */

const year = $("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ========= MENU MOBILE ========= */

const burger = $("#burger");
const menu = $("#menu");

const setMenu = open => {
  if (!menu || !burger) return;

  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute(
    "aria-label",
    open ? "Tutup menu" : "Buka menu"
  );
};

if (burger && menu) {
  burger.addEventListener("click", () => {
    setMenu(!menu.classList.contains("open"));
  });

  $$("a", menu).forEach(a => {
    a.addEventListener("click", () => setMenu(false));
  });
}


/* ========= SMOOTH SCROLL ========= */

$$('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");

    if (!id || id.length < 2) return;

    const target = $(id);

    if (!target) return;

    // Tombol WhatsApp harus membuka popup pilihan admin.
    if (a.classList.contains("wa-link")) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });

    history.replaceState(null, "", id);
  });
});


/* ========= CAROUSEL PROMO ========= */

(function () {
  const track = $("#track");
  const dotsBox = $("#dots");
  const carousel = $("#carousel");
  const prev = $("#prev");
  const next = $("#next");

  // Jika carousel tidak ada di HTML, lewati bagian ini.
  // Fitur lain tetap berjalan.
  if (!track || !dotsBox || !carousel || !prev || !next) {
    return;
  }

  const slides = $$(".slide", track);

  if (slides.length === 0) return;

  let i = 0;

  const dots = slides.map((_, n) => {
    const d = document.createElement("button");

    d.className = "dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", `Slide ${n + 1}`);

    d.addEventListener("click", () => go(n));

    dotsBox.appendChild(d);

    return d;
  });

  function go(n) {
    i = (n + slides.length) % slides.length;

    track.style.transform = `translateX(-${i * 100}%)`;

    dots.forEach((d, k) => {
      d.setAttribute("aria-selected", String(k === i));
    });

    slides.forEach((s, k) => {
      s.setAttribute("aria-hidden", String(k !== i));

      $$("a,button", s).forEach(el => {
        el.tabIndex = k === i ? 0 : -1;
      });
    });
  }

  prev.addEventListener("click", () => go(i - 1));
  next.addEventListener("click", () => go(i + 1));

  carousel.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") go(i - 1);
    if (e.key === "ArrowRight") go(i + 1);
  });

  // Swipe untuk layar sentuh.
  let x0 = null;

  track.addEventListener("touchstart", e => {
    x0 = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", e => {
    if (x0 === null) return;

    const dx = e.changedTouches[0].clientX - x0;

    if (Math.abs(dx) > 50) {
      go(dx < 0 ? i + 1 : i - 1);
    }

    x0 = null;
  });

  go(0);
})();


/* ========= LIGHTBOX GALERI ========= */

const lb = $("#lightbox");
const lbImg = $("#lbImg");
const lbClose = $("#lbClose");

let lastFocus = null;

function closeLB() {
  if (!lb || !lbImg || lb.hidden) return;

  lb.hidden = true;
  lbImg.src = "";

  if (lastFocus) lastFocus.focus();
}

$$(".g-item").forEach(b => {
  b.addEventListener("click", () => {
    if (!lb || !lbImg) return;

    lastFocus = b;
    lbImg.src = b.dataset.full || "";
    lbImg.alt = b.dataset.alt || "";

    lb.hidden = false;

    if (lbClose) lbClose.focus();
  });
});

if (lbClose) {
  lbClose.addEventListener("click", closeLB);
}

if (lb) {
  lb.addEventListener("click", e => {
    if (e.target === lb) closeLB();
  });
}


/* ========= FALLBACK GAMBAR ========= */

$$("img[data-fallback]").forEach(img => {
  img.addEventListener("error", () => {
    const d = document.createElement("div");

    d.className = "img-fallback";
    d.setAttribute("role", "img");
    d.setAttribute("aria-label", img.alt);
    d.textContent = "Gambar tidak dapat dimuat: " + img.alt;

    img.replaceWith(d);
  });
});


/* ========= FORMULIR MINAT ========= */

const interestForm = $("#interest");

if (interestForm) {
  interestForm.addEventListener("submit", e => {
    e.preventDefault();

    const nick = $("#nick");
    const level = $("#level");
    const phone = $("#phone");

    // Pastikan elemen formulir tersedia.
    if (!nick || !level || !phone) {
      console.error("Elemen formulir minat belum lengkap.");
      return;
    }

    const check = (el, ok, msg) => {
      const errorElement = $("#e-" + el.id);

      if (errorElement) {
        errorElement.textContent = ok ? "" : msg;
      }

      el.classList.toggle("invalid", !ok);
      el.setAttribute("aria-invalid", String(!ok));

      return ok;
    };

    const cleanPhone = phone.value.replace(/[\s-]/g, "");

    const results = [
      check(
        nick,
        nick.value.trim().length >= 2,
        "Isi nama panggilan minimal 2 huruf."
      ),

      check(
        level,
        !!level.value,
        "Pilih jenjang pendidikan."
      ),

      check(
        phone,
        /^(?:\+?62|0)8\d{7,11}$/.test(cleanPhone),
        "Isi nomor kontak yang valid, contoh 0812xxxxxxx."
      )
    ];

    if (results.includes(false)) return;

    if (!waReady) {
      alert("Nomor WhatsApp admin belum diatur. Isi WHATSAPP_NUMBER di script.js.");
      return;
    }

    const msg =
      `Halo Admin NEW PRIMAGAMA GALUR, saya ${nick.value.trim()} ` +
      `(jenjang ${level.value}) ingin bertanya tentang program belajar. ` +
      `Kontak orang tua/wali: ${phone.value.trim()}.`;

    window.open(waURL(msg), "_blank", "noopener");
  });
}


/* ========= POP-UP PILIHAN ADMIN WHATSAPP ========= */

(function () {
  const modal = $("#adminModal");
  const closeButton = $("#closeAdminModal");

  if (!modal || !closeButton) {
    console.warn(
      "Popup admin tidak ditemukan. Periksa elemen #adminModal dan #closeAdminModal di index.html."
    );
    return;
  }

  // Nomor WhatsApp kedua admin.
  const adminNumbers = {
    1: "6285210821601",
    2: "6285139550998"
  };

  // Menyimpan pesan sesuai tombol yang diklik.
  let currentMessage = "";

  function openAdminModal(message) {
    currentMessage = message || DEFAULT_MESSAGE;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeAdminModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Tangkap klik tombol WhatsApp untuk membuka popup.
  document.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const trigger = target.closest(".wa-link");

    if (!trigger) return;

    event.preventDefault();

    openAdminModal(trigger.dataset.msg);
  });

  // Pilih admin lalu buka WhatsApp dengan pesan otomatis.
  $$("[data-admin]", modal).forEach(button => {
    button.addEventListener("click", () => {
      const adminId = button.dataset.admin;
      const phone = adminNumbers[adminId];

      if (!phone) return;

      const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(currentMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      closeAdminModal();
    });
  });

  // Tombol X untuk menutup popup.
  closeButton.addEventListener("click", closeAdminModal);

  // Klik area gelap untuk menutup popup.
  $$("[data-close-modal]", modal).forEach(element => {
    element.addEventListener("click", closeAdminModal);
  });

  // Tombol Escape untuk menutup popup dan menu mobile.
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    closeLB();
    setMenu(false);

    if (modal.classList.contains("is-open")) {
      closeAdminModal();
    }
  });
})();
