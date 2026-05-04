// ===================================
// LASER ARENA POZNAŃ - JAVASCRIPT
// ===================================

// Translations Object
const translations = {
  pl: {
    // Navigation
    nav_about: "O nas",
    nav_offer: "Oferta",
    nav_pricing: "Cennik",
    nav_booking: "Rezerwacje",
    nav_results: "Wyniki",
    nav_gallery: "Galeria",
    nav_faq: "F.A.Q.",
    nav_blog: "Blog",
    nav_contact: "Kontakt",

    // Hero Section
    hero_badge: "EST. 1848 FORT",
    hero_subtitle:
      "Najnowocześniejszy LaserTag w historycznych podziemiach Fortu II",
    hero_feature1: "STATYSTYKI NA ŻYWO",
    hero_feature2: "KONFIGUROWALNA BROŃ",
    hero_feature3: "UNIKALNE SCENARIUSZE",
    hero_cta_primary: "Zarezerwuj teraz",
    hero_cta_secondary: "Dowiedz się więcej",
    scroll_down: "Przewiń w dół",

    // About Section
    about_title: "O nas",
    about_heading: "Historia spotyka przyszłość",
    about_p1:
      "Laser Arena Poznań to wyjątkowe miejsce, gdzie historia spotyka się z najnowszą technologią. Nasza arena LaserTag mieści się w autentycznych podziemiach Fortu II z 1848 roku - ceglanych korytarzach pełnych historii i tajemniczej atmosfery.",
    about_p2:
      "Wyróżniamy się na tle konkurencji zaawansowanym systemem statystyk w czasie rzeczywistym, możliwością pełnej konfiguracji broni oraz unikalnych scenariuszy gry. To nie tylko rozgrywka - to immersyjne doświadczenie taktyczne w autentycznym militarnym środowisku.",
    about_stat1: "Rok budowy fortu",
    about_stat2: "Graczy jednocześnie",
    about_stat3: "Scenariuszy gry",

    // Offer Section
    offer_title: "Oferta",
    offer_lasertag_title: "LaserTag Arena",
    offer_lasertag_desc:
      "Profesjonalna arena w podziemiach fortu. Statystyki na żywo, konfigurowalna broń, różnorodne scenariusze gry.",
    offer_lasertag_f1: "Statystyki w czasie rzeczywistym",
    offer_lasertag_f2: "Pełna konfiguracja broni",
    offer_lasertag_f3: "5 unikalnych scenariuszy",
    offer_lasertag_f4: "Autentyczne militarne wnętrza",
    offer_events_title: "Sala Integracyjna",
    offer_events_desc:
      "Przestronna sala idealna na urodziny, wieczory kawalerskie, panieńskie i eventy firmowe.",
    offer_events_f1: "Wynajem dla grup",
    offer_events_f2: "Catering na zamówienie",
    offer_events_f3: "Sprzęt audio-video",
    offer_events_f4: "Atmosfera historycznego fortu",
    offer_outdoor_title: "Wiata z Paleniskiem",
    offer_outdoor_desc:
      "Zewnętrzna przestrzeń z paleniskiem - idealna na integrację po rozgrywkach lub samodzielne eventy.",
    offer_outdoor_f1: "Zadaszona wiata",
    offer_outdoor_f2: "Profesjonalne palenisko",
    offer_outdoor_f3: "Miejsce na grilla",
    offer_outdoor_f4: "Stoły i miejsca siedzące",

    // Pricing Section
    pricing_title: "Cennik",
    pricing_training_info:
      "⏱️ Każda rezerwacja uwzględnia <strong>15 minut</strong> na szkolenie.",

    // Results Section
    results_title: "Wyniki",
    results_intro:
      "Sprawdź swoje statystyki z ostatnich rozgrywek. Śledź postępy, porównuj wyniki i rywalizuj z innymi graczami!",
    results_search: "Wpisz kod gracza lub email...",
    results_search_btn: "Szukaj",
    results_placeholder: "Wprowadź kod gracza aby zobaczyć statystyki",
    results_leaderboard_title: "🏆 Ranking Miesiąca",
    results_rank: "Miejsce",
    results_player: "Gracz",
    results_score: "Punkty",
    results_games: "Gry",

    // Footer
    footer_desc:
      "Najnowocześniejszy LaserTag w historycznych podziemiach Fortu II z 1878 roku.",
    footer_quick_links: "Szybkie linki",
    footer_info: "Informacje",
    footer_privacy: "Polityka prywatności",
    footer_terms: "Regulamin",
    footer_hours: "Godziny otwarcia",
    footer_rights: "Wszelkie prawa zastrzeżone.",
  },

  en: {
    // Navigation
    nav_about: "About",
    nav_offer: "Offer",
    nav_pricing: "Pricing",
    nav_booking: "Booking",
    nav_results: "Results",
    nav_gallery: "Gallery",
    nav_faq: "F.A.Q.",
    nav_blog: "Blog",
    nav_contact: "Contact",

    // Hero Section
    hero_badge: "EST. 1848 FORT",
    hero_subtitle: "The most advanced LaserTag in historic Fort II underground",
    hero_feature1: "LIVE STATISTICS",
    hero_feature2: "CONFIGURABLE WEAPONS",
    hero_feature3: "UNIQUE SCENARIOS",
    hero_cta_primary: "Book now",
    hero_cta_secondary: "Learn more",
    scroll_down: "Scroll down",

    // About Section
    about_title: "About",
    about_heading: "History meets the future",
    about_p1:
      "Laser Arena Poznań is a unique place where history meets cutting-edge technology. Our LaserTag arena is located in the authentic underground of Fort II from 1848 - brick corridors full of history and mysterious atmosphere.",
    about_p2:
      "We stand out from the competition with an advanced real-time statistics system, full weapon configuration capabilities, and unique game scenarios. It's not just gameplay - it's an immersive tactical experience in an authentic military environment.",
    about_stat1: "Fort construction year",
    about_stat2: "Players simultaneously",
    about_stat3: "Game scenarios",

    // Offer Section
    offer_title: "Offer",
    offer_lasertag_title: "LaserTag Arena",
    offer_lasertag_desc:
      "Professional arena in fort underground. Live statistics, configurable weapons, diverse game scenarios.",
    offer_lasertag_f1: "Real-time statistics",
    offer_lasertag_f2: "Full weapon configuration",
    offer_lasertag_f3: "10+ unique scenarios",
    offer_lasertag_f4: "Authentic military interiors",
    offer_events_title: "Integration Room",
    offer_events_desc:
      "Spacious room ideal for birthdays, bachelor and bachelorette parties, and corporate events.",
    offer_events_f1: "Group rental",
    offer_events_f2: "Catering on request",
    offer_events_f3: "Audio-video equipment",
    offer_events_f4: "Historic fort atmosphere",
    offer_outdoor_title: "Shelter with Fireplace",
    offer_outdoor_desc:
      "Outdoor space with fireplace - ideal for integration after games or standalone events.",
    offer_outdoor_f1: "Covered shelter",
    offer_outdoor_f2: "Professional fireplace",
    offer_outdoor_f3: "BBQ area",
    offer_outdoor_f4: "Tables and seating",

    // Pricing Section
    pricing_title: "Pricing",
    pricing_basic_title: "Basic Game",
    pricing_basic_badge: "Popular",
    pricing_per_person: "/person",
    pricing_basic_f2: "Standard scenarios",
    pricing_basic_f3: "Live statistics",
    pricing_basic_f4: "Pre-game briefing",
    pricing_premium_title: "Premium Package",
    pricing_premium_badge: "Best",
    pricing_premium_f2: "All scenarios",
    pricing_premium_f3: "Full weapon configuration",
    pricing_premium_f4: "Integration room (1h)",
    pricing_premium_f5: "Video recording of gameplay",
    pricing_event_title: "Corporate Event",
    pricing_event_badge: "Groups",
    pricing_custom: "Custom",
    pricing_event_f1: "From 15 people",
    pricing_event_f2: "Entire arena rental",
    pricing_event_f3: "Room + shelter with fireplace",
    pricing_event_f4: "Catering on request",
    pricing_event_f5: "Dedicated group coordinator",
    pricing_btn: "Book",
    pricing_contact_btn: "Contact",
    pricing_note:
      "* Prices for groups of min. 6 people. Minimum fee applies for smaller groups. Book by phone or contact form.",

    // Booking Section
    booking_title: "Booking",
    form_name: "Full name",
    form_email: "Email",
    form_phone: "Phone",
    form_date: "Date",
    form_time: "Time",
    form_people: "Number of people",
    form_package: "Package",
    form_package_basic: "Basic",
    form_package_premium: "Premium",
    form_package_event: "Event",
    form_message: "Additional information",
    form_submit: "Send booking",
    booking_info_title: "Booking information",
    booking_info_1: "📞 You can also call: <strong>+48 XXX XXX XXX</strong>",
    booking_info_2: "⏰ Booking confirmation within 24h",
    booking_info_3: "👥 Minimum group: 6 people (smaller groups - minimum fee)",
    booking_info_4: "💳 30% deposit required for groups over 15 people",
    booking_hours_title: "Opening hours",
    booking_weekdays: "Mon - Fri:",
    booking_weekend: "Sat - Sun:",

    // Results Section
    results_title: "Results",
    results_intro:
      "Check your statistics from recent games. Track progress, compare results and compete with other players!",
    results_search: "Enter player code or email...",
    results_search_btn: "Search",
    results_placeholder: "Enter player code to see statistics",
    results_leaderboard_title: "🏆 Monthly Ranking",
    results_rank: "Rank",
    results_player: "Player",
    results_score: "Score",
    results_games: "Games",

    // Gallery Section
    gallery_title: "Gallery",
    gallery_arena: "Arena corridors",
    gallery_underground: "Fort underground",
    gallery_equipment: "Professional equipment",
    gallery_event_room: "Integration room",
    gallery_outdoor: "Shelter with fireplace",
    gallery_gameplay: "Game action",

    // FAQ Section
    faq_title: "F.A.Q.",
    faq_q1: "How is LaserTag different from paintball?",
    faq_a1:
      "LaserTag is a fully electronic system based on infrared technology. No paint, no marks, no pain - just pure tactical gameplay with full real-time statistics. You can play in regular clothes!",
    faq_q2: "What is the minimum age to play?",
    faq_a2:
      "We recommend LaserTag for people aged 8 and up. Children under 12 should play under adult supervision. There's no upper age limit - LaserTag is great fun for everyone!",
    faq_q3: "Do I need my own equipment?",
    faq_a3:
      "No! We provide all professional equipment - laser markers, sensor vests, statistics system. Just come in comfortable clothes and sports shoes.",
    faq_q4: "How do live statistics work?",
    faq_a4:
      "Our system automatically records every hit, elimination, points scored and other statistics. After the game, each player receives a detailed report with results that can be checked on our website.",
    faq_q5: "Can I rent the entire arena?",
    faq_a5:
      "Yes! We offer rental of the entire arena with integration room and shelter for groups from 15 people. Perfect for corporate events, birthdays or bachelor parties. Contact us for details.",
    faq_q6: "What is gameplay like for beginners?",
    faq_a6:
      "Each session starts with a briefing where we explain the rules, show how to use the equipment and present the arena. First rounds are simpler so everyone can get familiar with the game mechanics.",

    // Blog Section
    blog_title: "Blog",
    blog_cat_history: "History",
    blog_cat_guide: "Guide",
    blog_cat_events: "Events",
    blog_post1_title: "History of Fort II - from 1848 to today",
    blog_post1_excerpt:
      "Discover the fascinating history of fortifications that have survived for over 170 years as a testament to military construction...",
    blog_post2_title: "5 tactics that will dominate gameplay",
    blog_post2_excerpt:
      "Learn proven strategies that will help your team gain an advantage in any scenario...",
    blog_post3_title: "LaserTag as corporate team building",
    blog_post3_excerpt:
      "Why is LaserTag a great idea for a corporate event? See how to organize an unforgettable party for your team...",
    blog_read_more: "Read more →",

    // Contact Section
    contact_title: "Contact",
    contact_get_in_touch: "Get in touch",
    contact_address_label: "Address",
    contact_phone_label: "Phone",
    contact_email_label: "Email",
    contact_social_label: "Social Media",
    contact_map_placeholder: "Google Maps",
    contact_map_note: "(Insert Google Maps iframe with fort location here)",

    // Footer
    footer_desc:
      "The most advanced LaserTag in historic Fort II underground from 1848.",
    footer_quick_links: "Quick links",
    footer_info: "Information",
    footer_privacy: "Privacy policy",
    footer_terms: "Terms of service",
    footer_hours: "Opening hours",
    footer_rights: "All rights reserved.",
  },

  de: {
    // Navigation
    nav_about: "Über uns",
    nav_offer: "Angebot",
    nav_pricing: "Preise",
    nav_booking: "Buchung",
    nav_results: "Ergebnisse",
    nav_gallery: "Galerie",
    nav_faq: "F.A.Q.",
    nav_blog: "Blog",
    nav_contact: "Kontakt",

    // Hero Section
    hero_badge: "GEGR. 1848 FORT",
    hero_subtitle:
      "Das fortschrittlichste LaserTag im historischen Fort II Untergrund",
    hero_feature1: "LIVE-STATISTIKEN",
    hero_feature2: "KONFIGURIERBARE WAFFEN",
    hero_feature3: "EINZIGARTIGE SZENARIEN",
    hero_cta_primary: "Jetzt buchen",
    hero_cta_secondary: "Mehr erfahren",
    scroll_down: "Nach unten scrollen",

    // About Section
    about_title: "Über uns",
    about_heading: "Geschichte trifft Zukunft",
    about_p1:
      "Laser Arena Poznań ist ein einzigartiger Ort, an dem Geschichte auf modernste Technologie trifft. Unsere LaserTag-Arena befindet sich im authentischen Untergrund des Forts II aus dem Jahr 1848 - in Backsteinkorridoren voller Geschichte und geheimnisvoller Atmosphäre.",
    about_p2:
      "Wir heben uns von der Konkurrenz durch ein fortschrittliches Echtzeit-Statistiksystem, vollständige Waffenkonfigurationsmöglichkeiten und einzigartige Spielszenarien ab. Es ist nicht nur Gameplay - es ist ein immersives taktisches Erlebnis in authentischer militärischer Umgebung.",
    about_stat1: "Baujahr des Forts",
    about_stat2: "Spieler gleichzeitig",
    about_stat3: "Spielszenarien",

    // Offer Section
    offer_title: "Angebot",
    offer_lasertag_title: "LaserTag Arena",
    offer_lasertag_desc:
      "Professionelle Arena im Fort-Untergrund. Live-Statistiken, konfigurierbare Waffen, vielfältige Spielszenarien.",
    offer_lasertag_f1: "Echtzeit-Statistiken",
    offer_lasertag_f2: "Vollständige Waffenkonfiguration",
    offer_lasertag_f3: "10+ einzigartige Szenarien",
    offer_lasertag_f4: "Authentische militärische Innenräume",
    offer_events_title: "Integrationsraum",
    offer_events_desc:
      "Geräumiger Raum ideal für Geburtstage, Junggesellen- und Junggesellinnenabschiede sowie Firmenevents.",
    offer_events_f1: "Gruppenvermietung",
    offer_events_f2: "Catering auf Anfrage",
    offer_events_f3: "Audio-Video-Ausstattung",
    offer_events_f4: "Historische Fort-Atmosphäre",
    offer_outdoor_title: "Unterstand mit Feuerstelle",
    offer_outdoor_desc:
      "Außenbereich mit Feuerstelle - ideal für Integration nach Spielen oder eigenständige Events.",
    offer_outdoor_f1: "Überdachter Unterstand",
    offer_outdoor_f2: "Professionelle Feuerstelle",
    offer_outdoor_f3: "Grillplatz",
    offer_outdoor_f4: "Tische und Sitzgelegenheiten",

    // Pricing Section
    pricing_title: "Preise",
    pricing_basic_title: "Basis-Spiel",
    pricing_basic_badge: "Beliebt",
    pricing_per_person: "/Person",
    pricing_basic_f2: "Standard-Szenarien",
    pricing_basic_f3: "Live-Statistiken",
    pricing_basic_f4: "Einweisung vor dem Spiel",
    pricing_premium_title: "Premium-Paket",
    pricing_premium_badge: "Beste",
    pricing_premium_f2: "Alle Szenarien",
    pricing_premium_f3: "Vollständige Waffenkonfiguration",
    pricing_premium_f4: "Integrationsraum (1 Std.)",
    pricing_premium_f5: "Videoaufnahme des Spiels",
    pricing_event_title: "Firmenevent",
    pricing_event_badge: "Gruppen",
    pricing_custom: "Individual",
    pricing_event_f1: "Ab 15 Personen",
    pricing_event_f2: "Gesamte Arena-Miete",
    pricing_event_f3: "Raum + Unterstand mit Feuerstelle",
    pricing_event_f4: "Catering auf Anfrage",
    pricing_event_f5: "Dedizierter Gruppenkoordinator",
    pricing_btn: "Buchen",
    pricing_contact_btn: "Kontakt",
    pricing_note:
      "* Preise für Gruppen ab 6 Personen. Mindestgebühr gilt für kleinere Gruppen. Buchung per Telefon oder Kontaktformular.",

    // Booking Section
    booking_title: "Buchung",
    form_name: "Vollständiger Name",
    form_email: "E-Mail",
    form_phone: "Telefon",
    form_date: "Datum",
    form_time: "Zeit",
    form_people: "Anzahl der Personen",
    form_package: "Paket",
    form_package_basic: "Basis",
    form_package_premium: "Premium",
    form_package_event: "Event",
    form_message: "Zusätzliche Informationen",
    form_submit: "Buchung senden",
    booking_info_title: "Buchungsinformationen",
    booking_info_1:
      "📞 Sie können auch anrufen: <strong>+48 XXX XXX XXX</strong>",
    booking_info_2: "⏰ Buchungsbestätigung innerhalb von 24 Std.",
    booking_info_3:
      "👥 Mindestgruppe: 6 Personen (kleinere Gruppen - Mindestgebühr)",
    booking_info_4:
      "💳 30% Anzahlung erforderlich für Gruppen über 15 Personen",
    booking_hours_title: "Öffnungszeiten",
    booking_weekdays: "Mo - Fr:",
    booking_weekend: "Sa - So:",

    // Results Section
    results_title: "Ergebnisse",
    results_intro:
      "Überprüfen Sie Ihre Statistiken aus den letzten Spielen. Verfolgen Sie Fortschritte, vergleichen Sie Ergebnisse und wetteifern Sie mit anderen Spielern!",
    results_search: "Spielercode oder E-Mail eingeben...",
    results_search_btn: "Suchen",
    results_placeholder: "Spielercode eingeben, um Statistiken zu sehen",
    results_leaderboard_title: "🏆 Monatsrangliste",
    results_rank: "Rang",
    results_player: "Spieler",
    results_score: "Punkte",
    results_games: "Spiele",

    // Gallery Section
    gallery_title: "Galerie",
    gallery_arena: "Arena-Korridore",
    gallery_underground: "Fort-Untergrund",
    gallery_equipment: "Professionelle Ausrüstung",
    gallery_event_room: "Integrationsraum",
    gallery_outdoor: "Unterstand mit Feuerstelle",
    gallery_gameplay: "Spielaktion",

    // FAQ Section
    faq_title: "F.A.Q.",
    faq_q1: "Wie unterscheidet sich LaserTag von Paintball?",
    faq_a1:
      "LaserTag ist ein vollständig elektronisches System basierend auf Infrarottechnologie. Keine Farbe, keine Spuren, kein Schmerz - nur reines taktisches Gameplay mit vollständigen Echtzeit-Statistiken. Sie können in normaler Kleidung spielen!",
    faq_q2: "Was ist das Mindestalter zum Spielen?",
    faq_a2:
      "Wir empfehlen LaserTag für Personen ab 8 Jahren. Kinder unter 12 Jahren sollten unter Aufsicht von Erwachsenen spielen. Es gibt keine Altersobergrenze - LaserTag macht jedem Spaß!",
    faq_q3: "Brauche ich eigene Ausrüstung?",
    faq_a3:
      "Nein! Wir stellen die gesamte professionelle Ausrüstung zur Verfügung - Lasermarkierer, Sensorwesten, Statistiksystem. Kommen Sie einfach in bequemer Kleidung und Sportschuhen.",
    faq_q4: "Wie funktionieren Live-Statistiken?",
    faq_a4:
      "Unser System zeichnet automatisch jeden Treffer, jede Eliminierung, erzielte Punkte und andere Statistiken auf. Nach dem Spiel erhält jeder Spieler einen detaillierten Bericht mit Ergebnissen, der auf unserer Website überprüft werden kann.",
    faq_q5: "Kann ich die gesamte Arena mieten?",
    faq_a5:
      "Ja! Wir bieten die Vermietung der gesamten Arena mit Integrationsraum und Unterstand für Gruppen ab 15 Personen an. Perfekt für Firmenevents, Geburtstage oder Junggesellenabschiede. Kontaktieren Sie uns für Details.",
    faq_q6: "Wie sieht das Gameplay für Anfänger aus?",
    faq_a6:
      "Jede Sitzung beginnt mit einem Briefing, in dem wir die Regeln erklären, zeigen, wie man die Ausrüstung benutzt und die Arena präsentieren. Die ersten Runden sind einfacher, damit sich jeder mit der Spielmechanik vertraut machen kann.",

    // Blog Section
    blog_title: "Blog",
    blog_cat_history: "Geschichte",
    blog_cat_guide: "Leitfaden",
    blog_cat_events: "Veranstaltungen",
    blog_post1_title: "Geschichte des Forts II - von 1848 bis heute",
    blog_post1_excerpt:
      "Entdecken Sie die faszinierende Geschichte der Befestigungsanlagen, die über 170 Jahre als Zeugnis militärischer Baukunst überdauert haben...",
    blog_post2_title: "5 Taktiken, die das Gameplay dominieren werden",
    blog_post2_excerpt:
      "Lernen Sie bewährte Strategien kennen, die Ihrem Team in jedem Szenario einen Vorteil verschaffen...",
    blog_post3_title: "LaserTag als Firmen-Teambuilding",
    blog_post3_excerpt:
      "Warum ist LaserTag eine großartige Idee für ein Firmenevent? Sehen Sie, wie Sie eine unvergessliche Party für Ihr Team organisieren...",
    blog_read_more: "Mehr lesen →",

    // Contact Section
    contact_title: "Kontakt",
    contact_get_in_touch: "Kontaktieren Sie uns",
    contact_address_label: "Adresse",
    contact_phone_label: "Telefon",
    contact_email_label: "E-Mail",
    contact_social_label: "Social Media",
    contact_map_placeholder: "Google Maps",
    contact_map_note: "(Google Maps iframe mit Fort-Standort hier einfügen)",

    // Footer
    footer_desc:
      "Das fortschrittlichste LaserTag im historischen Fort II Untergrund aus dem Jahr 1848.",
    footer_quick_links: "Schnelllinks",
    footer_info: "Informationen",
    footer_privacy: "Datenschutz",
    footer_terms: "Nutzungsbedingungen",
    footer_hours: "Öffnungszeiten",
    footer_rights: "Alle Rechte vorbehalten.",
  },
};

// ===================================
// THEME SWITCHING
// ===================================

let currentLang = localStorage.getItem("language") || "pl";

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    updateThemeIcon(savedTheme, themeToggle);

    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme, themeToggle);
    });
  }
});

function updateThemeIcon(theme, themeToggle) {
  if (!themeToggle) return;
  const icon = themeToggle.querySelector(".theme-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "☀" : "🌙";
  }
}

// ===================================
// LANGUAGE SWITCHING (DROPDOWN)
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const langDropdown = document.querySelector(".language-dropdown");
  const langDropdownBtn = document.getElementById("langDropdownBtn");
  const langDropdownMenu = document.getElementById("langDropdownMenu");
  const langOptions = document.querySelectorAll(".lang-option");
  const langCurrent = langDropdown
    ? langDropdown.querySelector(".lang-current")
    : null;

  // Set initial language
  setLanguage(currentLang);

  // Toggle dropdown
  if (langDropdownBtn) {
    langDropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("active");
    });
  }

  // Language option click
  langOptions.forEach((option) => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
      if (langDropdown) {
        langDropdown.classList.remove("active");
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (langDropdown && !langDropdown.contains(e.target)) {
      langDropdown.classList.remove("active");
    }
  });

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("language", lang);

    // Update current language display
    if (langCurrent) {
      langCurrent.textContent = lang.toUpperCase();
    }

    // Update active option
    langOptions.forEach((option) => {
      option.classList.toggle(
        "active",
        option.getAttribute("data-lang") === lang
      );
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", lang);

    // Update all translatable elements
    updateTranslations();
  }
});

function updateTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = translations[currentLang][key];

    if (translation) {
      // Check if element contains HTML tags
      if (translation.includes("<")) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  // Update placeholders
  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const translation = translations[currentLang][key];
    if (translation) {
      element.placeholder = translation;
    }
  });
}

// ===================================
// MOBILE NAVIGATION
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});

// ===================================
// SMOOTH SCROLL WITH OFFSET
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
      } else {
        navbar.style.boxShadow = "none";
      }

      lastScroll = currentScroll;
    });
  }
});

// ===================================
// FAQ ACCORDION
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach((faq) => faq.classList.remove("active"));

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
});

// ===================================
// BOOKING FORM HANDLING
// ===================================
// Obsługa formularza rezerwacji jest w rezerwacje.html

// ===================================
// RESULTS SEARCH
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const playerSearchBtn = document.querySelector(".results-search .btn");
  const playerSearchInput = document.getElementById("playerSearch");

  if (playerSearchBtn && playerSearchInput) {
    playerSearchBtn.addEventListener("click", () => {
      const searchTerm = playerSearchInput.value.trim();

      if (searchTerm) {
        // Here you would typically fetch results from a server
        console.log("Searching for:", searchTerm);

        // Show mock results
        displayPlayerResults(searchTerm);
      }
    });

    playerSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        playerSearchBtn.click();
      }
    });
  }
});

function displayPlayerResults(playerCode) {
  const resultsDisplay = document.getElementById("resultsDisplay");

  // Mock data - replace with actual API call
  const mockResults = {
    player: playerCode,
    gamesPlayed: 12,
    totalScore: 8450,
    wins: 7,
    accuracy: "78%",
    eliminations: 156,
    assists: 42,
  };

  resultsDisplay.innerHTML = `
        <div class="player-stats">
            <h3 style="color: var(--accent-primary); margin-bottom: 2rem; text-align: center;">
                ${translations[currentLang].results_player}: ${mockResults.player}
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                <div class="stat-item">
                    <div class="stat-number">${mockResults.gamesPlayed}</div>
                    <div class="stat-label">${translations[currentLang].results_games}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${mockResults.totalScore}</div>
                    <div class="stat-label">${translations[currentLang].results_score}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${mockResults.wins}</div>
                    <div class="stat-label">Wins</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${mockResults.accuracy}</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${mockResults.eliminations}</div>
                    <div class="stat-label">Eliminations</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${mockResults.assists}</div>
                    <div class="stat-label">Assists</div>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all section elements
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});

// ===================================
// GALLERY LIGHTBOX (Simple version)
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      const src = img.getAttribute("src");
      const alt = img.getAttribute("alt");

      // Create lightbox (simple version)
      const lightbox = document.createElement("div");
      lightbox.style.cssText = `
              position: fixed;
              inset: 0;
              background: rgba(0, 0, 0, 0.95);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
              cursor: pointer;
          `;

      const lightboxImg = document.createElement("img");
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxImg.style.cssText = `
              max-width: 90%;
              max-height: 90%;
              border-radius: 8px;
          `;

      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);

      lightbox.addEventListener("click", () => {
        lightbox.remove();
      });
    });
  });
});

// ===================================
// INITIALIZE
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("Laser Arena Poznań - Website initialized");
  console.log("Current theme:", localStorage.getItem("theme") || "dark");
  console.log("Current language:", currentLang);
});

// ===================================
// WEEKLY CALENDAR FUNCTIONALITY
// ===================================

// ===================================
// FUNKCJE POMOCNICZE DO DAT
// Używamy lokalnego czasu, NIE UTC, żeby uniknąć przesunięć o 1 dzień
// ===================================

// Formatuj datę do stringa "YYYY-MM-DD" (lokalny czas)
function calFormatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Parsuj string "YYYY-MM-DD" do obiektu Date (lokalny czas)
function calParseDateFromString(dateString) {
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateString);
}

// Pobierz poniedziałek dla podanej daty
function calGetMondayOfWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = d.getDay();
  // Niedziela (0) -> cofamy się o 6 dni
  // Inne dni -> cofamy się o (dayOfWeek - 1) dni
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setDate(d.getDate() + diff);
  return d;
}

// ===================================

// Calendar State
let currentWeekStart = calGetMondayOfWeek(new Date());

// Bookings from Google Sheets
let sheetsBookings = [];

// Time slots (7:00 AM to 11:00 PM)
const TIME_SLOTS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

// Day names for different languages
const DAY_NAMES = {
  pl: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
};

// Month names for different languages
const MONTH_NAMES = {
  pl: [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  de: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ],
};

// Fetch bookings from Google Sheets
// UWAGA: Daty są teraz poprawnie formatowane w Apps Script (Europe/Warsaw)
async function loadBookingsFromSheets() {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxtgllhsHX3BXEU5r3iipxfyEBKND0qtCzbxFuozKYYfxtCdQH_Mqo-jwbb13v8HvFviw/exec";

  try {
    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Convert data to array format
    sheetsBookings = [];

    for (const [apiDate, bookings] of Object.entries(data)) {
      // Daty są już poprawnie sformatowane w Apps Script (Europe/Warsaw)
      const date = apiDate;

      if (Array.isArray(bookings)) {
        bookings.forEach((booking) => {
          // Handle different booking formats
          let timeString = "12:00";

          // If booking is a string (ISO date like "1899-12-30T13:36:00.000Z")
          if (typeof booking === "string") {
            const timeObj = new Date(booking);
            const hours = timeObj.getHours();
            const minutes = timeObj.getMinutes();
            timeString =
              String(hours).padStart(2, "0") +
              ":" +
              String(minutes).padStart(2, "0");

            // Create minimal booking object
            booking = {
              time: timeString,
              name: "Rezerwacja",
              status: "", // Empty status = orange/yellow
              duration: 90,
            };
          }
          // If booking is an object with time property
          else if (typeof booking === "object" && booking.time) {
            if (
              typeof booking.time === "string" &&
              booking.time.includes("T")
            ) {
              // ISO date string
              const timeObj = new Date(booking.time);
              const hours = timeObj.getHours();
              const minutes = timeObj.getMinutes();
              timeString =
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0");
            } else if (typeof booking.time === "string") {
              // Already formatted like "19:00"
              timeString = booking.time;
            } else if (
              booking.time instanceof Date ||
              typeof booking.time === "object"
            ) {
              // Date object
              const timeObj = new Date(booking.time);
              const hours = timeObj.getHours();
              const minutes = timeObj.getMinutes();
              timeString =
                String(hours).padStart(2, "0") +
                ":" +
                String(minutes).padStart(2, "0");
            }
          }

          // New format: service (usługa), status ('confirmed' or 'pending')
          const serviceName = booking.service || booking.name || "Rezerwacja";
          const bookingObj = {
            date: date,
            time: timeString,
            endTime: booking.endTime || "",
            name: serviceName,
            email: booking.email || "",
            phone: booking.phone || "",
            people: booking.people || "",
            package: booking.service || booking.package || "",
            status: booking.status || "pending", // 'confirmed' or 'pending'
            duration: parseInt(booking.duration) || 90,
            message: booking.message || "",
          };
          sheetsBookings.push(bookingObj);
          console.log(
            `📅 ${bookingObj.time}-${bookingObj.endTime || "?"} | ${
              bookingObj.package || "Rezerwacja"
            }`
          );
        });
      } else if (typeof bookings === "string") {
        // Legacy format - just time strings
        const bookingObj = {
          date: date,
          time: bookings,
          name: "Rezerwacja",
          status: "", // Empty = orange/yellow
          duration: 90,
        };
        sheetsBookings.push(bookingObj);
        console.log(`📅 ${bookingObj.time} | Rezerwacja`);
      } else if (typeof bookings === "object") {
        // Single booking object (not in array) - new format
        const singleServiceName =
          bookings.service || bookings.name || "Rezerwacja";
        const bookingObj = {
          date: date,
          time: bookings.time || "12:00",
          endTime: bookings.endTime || "",
          name: singleServiceName,
          email: bookings.email || "",
          phone: bookings.phone || "",
          people: bookings.people || "",
          package: bookings.service || bookings.package || "",
          status: bookings.status || "pending", // 'confirmed' or 'pending'
          duration: parseInt(bookings.duration) || 90,
          message: bookings.message || "",
        };
        sheetsBookings.push(bookingObj);
        console.log(
          `📅 ${bookingObj.time}-${bookingObj.endTime || "?"} | ${
            bookingObj.package || "Rezerwacja"
          }`
        );
      }
    }

    renderWeeklyCalendar();
  } catch (error) {
    console.error("❌ Error loading bookings:", error);
    console.error("❌ Error details:", error.message);

    // Use fallback test data
    sheetsBookings = [
      {
        date: "2025-12-24",
        time: "19:00",
        endTime: "20:30",
        name: "Test Fallback",
        email: "test@test.pl",
        phone: "111222333",
        people: "5",
        package: "Event",
        status: "pending", // 'confirmed' or 'pending'
        duration: 90,
      },
    ];
    console.log("⚠️ Using fallback data:", sheetsBookings);
    renderWeeklyCalendar();
  }
}

// Initialize Calendar
function initWeeklyCalendar() {
  const prevBtn = document.getElementById("prevWeek");
  const nextBtn = document.getElementById("nextWeek");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      changeWeek(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      changeWeek(1);
    });
  }

  loadBookingsFromSheets();
}

// Change Week
function changeWeek(direction) {
  currentWeekStart.setDate(currentWeekStart.getDate() + direction * 7);
  renderWeeklyCalendar();
}

// Render Weekly Calendar
function renderWeeklyCalendar() {
  const weekRangeElement = document.getElementById("calendarWeekRange");
  const calendarContainer = document.getElementById("weeklyCalendar");

  if (!weekRangeElement || !calendarContainer) return;

  // Calculate week end
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  // Update week range display
  const lang = currentLang || "pl";
  const monthNames = MONTH_NAMES[lang];
  const startDay = currentWeekStart.getDate();
  const endDay = weekEnd.getDate();
  const startMonth = monthNames[currentWeekStart.getMonth()];
  const endMonth = monthNames[weekEnd.getMonth()];
  const year = currentWeekStart.getFullYear();

  if (currentWeekStart.getMonth() === weekEnd.getMonth()) {
    weekRangeElement.textContent = `${startDay} - ${endDay} ${startMonth} ${year}`;
  } else {
    weekRangeElement.textContent = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  }

  // Clear calendar
  calendarContainer.innerHTML = "";

  // Build grid HTML
  let gridHTML = "";

  // Time column
  gridHTML += '<div class="time-column">';
  gridHTML += '<div class="time-header">Czas</div>';
  TIME_SLOTS.forEach((time) => {
    gridHTML += `<div class="time-slot">${time}</div>`;
  });
  gridHTML += "</div>";

  // Day columns
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = calFormatDateToString(today);
  const dayNames = DAY_NAMES[lang];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(currentWeekStart);
    currentDay.setDate(currentWeekStart.getDate() + i);

    // Używamy funkcji pomocniczej do formatowania daty
    const dayString = calFormatDateToString(currentDay);
    const isToday = dayString === todayString;
    const isWeekend = i === 5 || i === 6;

    gridHTML += '<div class="day-column">';

    // Day header
    let headerClass = "day-header";
    if (isToday) headerClass += " today";
    if (isWeekend) headerClass += " weekend";

    gridHTML += `<div class="${headerClass}">`;
    gridHTML += `<span class="day-name">${dayNames[i]}</span>`;
    gridHTML += `<span class="day-date">${currentDay.getDate()}</span>`;
    gridHTML += "</div>";

    // Time grid with events
    gridHTML += '<div class="day-time-grid">';

    // Add time grid rows
    TIME_SLOTS.forEach((time, index) => {
      gridHTML += `<div class="time-grid-row" data-time="${time}" data-day="${dayString}"></div>`;
    });

    // Add booking events for this day
    const dayBookings = sheetsBookings.filter((b) => b.date === dayString);

    dayBookings.forEach((booking) => {
      const eventHTML = createBookingEventHTML(booking);
      gridHTML += eventHTML;
    });

    gridHTML += "</div>"; // day-time-grid
    gridHTML += "</div>"; // day-column
  }

  calendarContainer.innerHTML = gridHTML;
}

// Create booking event HTML
function createBookingEventHTML(booking) {
  // Calculate position and height
  const startTime = booking.time; // e.g., "19:00"
  const duration = booking.duration || 90; // minutes
  const status = booking.status || ""; // Empty string = orange/yellow by default

  // Find start hour index
  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]) || 0;
  const startIndex = TIME_SLOTS.findIndex(
    (t) => parseInt(t.split(":")[0]) === startHour
  );

  if (startIndex === -1) return "";

  // Calculate top position (60px per hour)
  const topPosition = startIndex * 60 + (startMinute / 60) * 60;

  // Calculate height based on duration (60px per hour)
  const height = (duration / 60) * 60;

  // Determine status class
  // Red if status is 'confirmed', otherwise orange/yellow (pending)
  const statusClass = status === "confirmed" ? "confirmed" : "pending";

  // Build event HTML - EMPTY TILE, just color
  let eventHTML = `<div class="booking-event ${statusClass}" style="top: ${topPosition}px; height: ${height}px;"></div>`;

  return eventHTML;
}

// Initialize when DOM is ready
setTimeout(function () {
  initWeeklyCalendar();
  console.log("✅ Weekly calendar initialized");
}, 500);

// Auto-refresh every 5 minutes
setInterval(function () {
  loadBookingsFromSheets();
}, 5 * 60 * 1000);

// ===================================
// PRICING DAY SWITCHER
// ===================================

function initDaySwitcher() {
  const daySwitchBtns = document.querySelectorAll(".day-switch-btn");
  const pricingGrids = document.querySelectorAll(".pricing-cards-grid");

  daySwitchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const period = btn.getAttribute("data-period");

      // Update active button
      daySwitchBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Show corresponding pricing grid
      pricingGrids.forEach((grid) => {
        if (grid.getAttribute("data-period") === period) {
          grid.style.display = "grid";
        } else {
          grid.style.display = "none";
        }
      });
    });
  });
}

// Initialize day switcher when DOM is ready
document.addEventListener("DOMContentLoaded", initDaySwitcher);

// ===================================
// PACKAGE SELECTION - REDIRECT TO BOOKING
// ===================================

// Package data with full details
const packageData = {
  impreza: {
    name: "Impreza",
    icon: "&#127919;",
    duration: "2 godziny",
    basePersons: 12,
    extraPersonCost: 30,
    prices: {
      weekday: 799,
      "friday-sunday": 899,
      "saturday-holiday": 949,
    },
    extraHourCost: {
      weekday: 250,
      "friday-sunday": 300,
      "saturday-holiday": null,
    },
    features: [
      "Czas trwania: 2 godziny",
      "Do 12 osob",
      "Kolejna osoba - 30 PLN",
    ],
    addons: [
      { id: "extra-hour", name: "Kolejna godzina", price: 250 },
      { id: "catering", name: "Catering (napoje i przekaski)", price: 200 },
      { id: "pizza", name: "Pizza (4 sztuki 30 cm)", price: 200 },
    ],
  },
  urodziny: {
    name: "Urodziny",
    icon: "&#127874;",
    duration: "2 godziny",
    basePersons: 12,
    extraPersonCost: 30,
    prices: {
      weekday: 749,
      "friday-sunday": 849,
      "saturday-holiday": 899,
    },
    extraHourCost: {
      weekday: 250,
      "friday-sunday": 300,
      "saturday-holiday": null,
    },
    features: [
      "Czas trwania: 2 godziny",
      "Do 12 osob",
      "Kolejna osoba - 30 PLN",
    ],
    addons: [
      { id: "extra-hour", name: "Kolejna godzina", price: 250 },
      { id: "invitations", name: "Zestaw zaproszen", price: 20 },
      { id: "catering", name: "Catering (napoje i przekaski)", price: 200 },
      { id: "pizza", name: "Pizza (4 sztuki 30 cm)", price: 200 },
    ],
  },
  indywidualna: {
    name: "Indywidualna",
    icon: "&#128100;",
    duration: "do 90 minut",
    basePersons: 1,
    isPerPerson: true,
    prices: {
      weekday: { 2: 29, 4: 58, 6: 79 },
      "friday-sunday": { 2: 39, 4: 78, 6: 99 },
      "saturday-holiday": { 2: 39, 4: 78, 6: 99 },
    },
    gameDurations: { 2: "30 minut", 4: "60 minut", 6: "90 minut" },
    features: ["Rezerwacja na telefon", "Znizka dla uczniow -20% pn-czw"],
    addons: [],
  },
  "nocna-operacja": {
    name: "Nocna Operacja",
    icon: "&#127769;",
    subtitle: "Po godzinach otwarcia",
    duration: "2 godziny",
    basePersons: 30,
    extraPersonCost: 30,
    prices: {
      weekday: 749,
      "friday-sunday": 749,
      "saturday-holiday": 749,
    },
    extraHourCost: 200,
    features: [
      "7 dni w tygodniu po godzinach otwarcia lokalu",
      "Czas trwania: 2 godziny",
      "Do 30 osob",
      "Kolejna osoba - 30 PLN",
    ],
    addons: [
      { id: "extra-hour", name: "Kolejna godzina", price: 200 },
      { id: "catering", name: "Catering (napoje i przekaski)", price: 200 },
    ],
  },
  "poranna-zaprawa": {
    name: "Poranna Zaprawa",
    icon: "&#127749;",
    subtitle: "Szkolenie dla grup",
    duration: "2 godziny",
    basePersons: 30,
    extraPersonCost: 30,
    prices: {
      weekday: 749,
      "friday-sunday": 749,
      "saturday-holiday": 749,
    },
    extraHourCost: 200,
    features: [
      "Poniedzialek - piatek: 9:00 - 15:00",
      "Czas trwania: 2 godziny",
      "Do 30 osob",
      "Kolejna osoba - 30 PLN",
    ],
    addons: [{ id: "extra-hour", name: "Kolejna godzina", price: 200 }],
  },
};

// Select package and redirect to booking page
function selectPackage(serviceId, price, period) {
  // Get package details
  const pkg = packageData[serviceId];
  if (!pkg) {
    console.error("Package not found:", serviceId);
    return;
  }

  // Store selection in sessionStorage
  const selection = {
    serviceId: serviceId,
    serviceName: pkg.name,
    basePrice: price,
    period: period,
    periodLabel: getPeriodLabel(period),
    duration: pkg.duration,
    basePersons: pkg.basePersons,
    extraPersonCost: pkg.isPerPerson ? price : pkg.extraPersonCost || 0,
    isPerPerson: pkg.isPerPerson || false,
    features: pkg.features,
    addons: pkg.addons || [],
    allPrices: pkg.prices,
  };

  sessionStorage.setItem("selectedPackage", JSON.stringify(selection));

  // Redirect to booking page
  window.location.href = "rezerwacje.html";
}

// Get period label in Polish
function getPeriodLabel(period) {
  const labels = {
    weekday: "Poniedziałek - Czwartek",
    "friday-sunday": "Piątek, Niedziela",
    "saturday-holiday": "Sobota i Święta",
  };
  return labels[period] || period;
}

// Individual option selection
document.addEventListener("DOMContentLoaded", function () {
  const individualOptions = document.querySelectorAll(".individual-option");

  individualOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selection from siblings
      const parent = this.closest(".individual-options");
      parent.querySelectorAll(".individual-option").forEach((opt) => {
        opt.classList.remove("selected");
      });

      // Select this option
      this.classList.add("selected");

      // Update the button price
      const price = this.getAttribute("data-price");
      const games = this.getAttribute("data-games");
      const card = this.closest(".pricing-card");
      const button = card.querySelector(".card-cta");

      // Update onclick to use selected price
      const period = card.getAttribute("data-period");
      button.setAttribute(
        "onclick",
        `selectPackage('indywidualna', ${price}, '${period}')`
      );
    });
  });
});

// ===================================
// SHOPPING CART FUNCTIONALITY
// ===================================

// Cart state
let cart = {
  items: [],
  total: 0,
};

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("laserArenaCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("laserArenaCart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(item) {
  cart.items.push(item);
  calculateTotal();
  saveCart();
  updateCartUI();
}

// Remove item from cart
function removeFromCart(index) {
  cart.items.splice(index, 1);
  calculateTotal();
  saveCart();
  updateCartUI();
}

// Clear cart
function clearCart() {
  cart.items = [];
  cart.total = 0;
  saveCart();
  updateCartUI();
}

// Calculate total
function calculateTotal() {
  cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
}

// Update cart UI
function updateCartUI() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartCount || !cartItems || !cartTotal) return;

  // Update count
  cartCount.textContent = cart.items.length;
  cartCount.style.display = cart.items.length > 0 ? "flex" : "none";

  // Update items list
  if (cart.items.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Koszyk jest pusty</p>';
  } else {
    let html = "";
    cart.items.forEach((item, index) => {
      html += `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-details">${item.details || ""}</div>
          </div>
          <span class="cart-item-price">${item.price} PLN</span>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">&#10005;</button>
        </div>
      `;
    });
    cartItems.innerHTML = html;
  }

  // Update total
  cartTotal.textContent = cart.total + " PLN";
}

// Toggle cart dropdown
function toggleCart() {
  const cartDropdown = document.getElementById("cartDropdown");
  if (cartDropdown) {
    cartDropdown.classList.toggle("active");
  }
}

// Initialize cart functionality
document.addEventListener("DOMContentLoaded", function () {
  loadCart();

  const cartBtn = document.getElementById("cartBtn");
  const cartClose = document.getElementById("cartClose");
  const cartDropdown = document.getElementById("cartDropdown");

  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleCart();
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", function () {
      cartDropdown.classList.remove("active");
    });
  }

  // Close cart when clicking outside
  document.addEventListener("click", function (e) {
    if (
      cartDropdown &&
      !cartDropdown.contains(e.target) &&
      e.target !== cartBtn
    ) {
      cartDropdown.classList.remove("active");
    }
  });
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch(
          "https://formsubmit.co/ajax/laserarenapoznan@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone || "Nie podano",
              subject: data.subject,
              message: data.message,
              _subject: "Nowa wiadomosc ze strony - " + data.subject,
              _template: "table",
            }),
          }
        );

        if (response.ok) {
          alert(
            "Dziekujemy za wiadomosc! Odpowiemy najszybciej jak to mozliwe."
          );
          contactForm.reset();
        } else {
          throw new Error("Failed to send");
        }
      } catch (error) {
        console.error("Error sending contact form:", error);
        alert(
          "Przepraszamy, wystapil blad. Prosimy o kontakt telefoniczny: +48 691 545 741"
        );
      }
    });
  }
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  gtag("event", "conversion", {
    send_to: "AW-16691092408/O8mOCN3A-94bELi395Y-",
  });
  // NIE return false - formularz się wyśle!
});
