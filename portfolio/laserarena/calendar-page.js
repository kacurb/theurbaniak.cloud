// ===================================
// CALENDAR PAGE JAVASCRIPT
// ===================================

// ===================================
// FUNKCJE POMOCNICZE DO DAT
// Używamy lokalnego czasu, NIE UTC, żeby uniknąć przesunięć o 1 dzień
// ===================================

// Formatuj datę do stringa "YYYY-MM-DD" (lokalny czas)
function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Parsuj string "YYYY-MM-DD" do obiektu Date (lokalny czas)
function parseDateFromString(dateString) {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateString);
}

// Pobierz poniedziałek dla podanej daty
function getMondayOfWeek(date) {
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
let calCurrentWeekStart = getMondayOfWeek(new Date());

// Bookings from Google Sheets
let calBookings = [];

// Time slots (00:00 to 23:00)
const CAL_TIME_SLOTS = [];
for (let i = 0; i < 24; i++) {
  CAL_TIME_SLOTS.push(String(i).padStart(2, "0") + ":00");
}

// Day names
const CAL_DAY_NAMES = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

// Month names
const CAL_MONTH_NAMES = [
  "Stycznia",
  "Lutego",
  "Marca",
  "Kwietnia",
  "Maja",
  "Czerwca",
  "Lipca",
  "Sierpnia",
  "Września",
  "Października",
  "Listopada",
  "Grudnia",
];

// Service names mapping
const SERVICE_NAMES = {
  impreza: "Impreza",
  urodziny: "Urodziny",
  indywidualna: "Indywidualna",
  "nocna-operacja": "Nocna Operacja",
  "poranna-zaprawa": "Poranna Zaprawa",
  event: "Event",
  basic: "Podstawowa",
  premium: "Premium",
};

// Fetch bookings from Google Sheets
// UWAGA: Daty są teraz poprawnie formatowane w Apps Script (Europe/Warsaw)
async function loadCalendarBookings() {
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbzc-6KvnBYf_j5BWr1E15fNrht-MCGd8CmwAlicP6Jy3N4T-Vd5NAzVrOKY9O2ZqDYYAQ/exec";

  try {
    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    calBookings = [];

    for (const [apiDate, bookings] of Object.entries(data)) {
      // Daty są już poprawnie sformatowane w Apps Script (Europe/Warsaw)
      const date = apiDate;

      if (Array.isArray(bookings)) {
        bookings.forEach((booking) => {
          if (typeof booking === "object" && booking.time) {
            // New format: time (start), endTime, duration, status, service
            const bookingObj = {
              date: date,
              time: booking.time || "12:00",
              endTime: booking.endTime || "",
              service: booking.service || "",
              status: booking.status || "pending", // 'confirmed' or 'pending'
              duration: parseInt(booking.duration) || 90,
              email: booking.email || "",
              phone: booking.phone || "",
              people: booking.people || "",
            };
            calBookings.push(bookingObj);
            console.log(
              `📅 ${bookingObj.time}-${bookingObj.endTime || "?"} | ${
                bookingObj.service || "Rezerwacja"
              }`
            );
          }
        });
      }
    }

    renderFullCalendar();
  } catch (error) {
    console.error("Error loading calendar bookings:", error);
    // Use test data
    calBookings = [
      {
        date: getTodayString(),
        time: "19:00",
        endTime: "21:00",
        service: "impreza",
        status: "confirmed",
        duration: 120,
      },
      {
        date: getTomorrowString(),
        time: "14:00",
        endTime: "16:00",
        service: "urodziny",
        status: "pending",
        duration: 120,
      },
    ];
    renderFullCalendar();
  }
}

// Helper functions for dates - używamy funkcji pomocniczej
function getTodayString() {
  return formatDateToString(new Date());
}

function getTomorrowString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatDateToString(d);
}

// Initialize Calendar
function initFullCalendar() {
  const prevBtn = document.getElementById("prevWeek");
  const nextBtn = document.getElementById("nextWeek");
  const todayBtn = document.getElementById("todayBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      changeCalWeek(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      changeCalWeek(1);
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener("click", function () {
      goToToday();
    });
  }

  loadCalendarBookings();
}

// Go to today
function goToToday() {
  calCurrentWeekStart = getMondayOfWeek(new Date());
  renderFullCalendar();
}

// Change Week
function changeCalWeek(direction) {
  calCurrentWeekStart.setDate(calCurrentWeekStart.getDate() + direction * 7);
  renderFullCalendar();
}

// Render Full Calendar
function renderFullCalendar() {
  const weekRangeElement = document.getElementById("calendarWeekRange");
  const calendarContainer = document.getElementById("fullCalendar");

  if (!weekRangeElement || !calendarContainer) return;

  // Calculate week end
  const weekEnd = new Date(calCurrentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  // Update week range display
  const startDay = calCurrentWeekStart.getDate();
  const endDay = weekEnd.getDate();
  const startMonth = CAL_MONTH_NAMES[calCurrentWeekStart.getMonth()];
  const endMonth = CAL_MONTH_NAMES[weekEnd.getMonth()];
  const startYear = calCurrentWeekStart.getFullYear();
  const endYear = weekEnd.getFullYear();

  if (startYear === endYear) {
    if (calCurrentWeekStart.getMonth() === weekEnd.getMonth()) {
      weekRangeElement.textContent = `${startDay} - ${endDay} ${startMonth} ${startYear}`;
    } else {
      weekRangeElement.textContent = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
    }
  } else {
    weekRangeElement.textContent = `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }

  // Clear calendar
  calendarContainer.innerHTML = "";

  // Build grid HTML
  let gridHTML = "";

  // Time column
  gridHTML += '<div class="cal-time-column">';
  gridHTML += '<div class="cal-time-header">Czas</div>';
  CAL_TIME_SLOTS.forEach((time) => {
    gridHTML += `<div class="cal-time-slot">${time}</div>`;
  });
  gridHTML += "</div>";

  // Day columns
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = formatDateToString(today);

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(calCurrentWeekStart);
    currentDay.setDate(calCurrentWeekStart.getDate() + i);

    // Używamy funkcji pomocniczej do formatowania daty
    const dayString = formatDateToString(currentDay);
    const isToday = dayString === todayString;
    const isWeekend = i === 5 || i === 6;
    const isPast = currentDay < today;

    gridHTML += '<div class="cal-day-column">';

    // Day header
    let headerClass = "cal-day-header";
    if (isToday) headerClass += " today";
    if (isWeekend) headerClass += " weekend";

    gridHTML += `<div class="${headerClass}">`;
    gridHTML += `<span class="cal-day-name">${CAL_DAY_NAMES[i]}</span>`;
    gridHTML += `<span class="cal-day-date">${currentDay.getDate()}</span>`;
    gridHTML += "</div>";

    // Day grid with time slots
    gridHTML += '<div class="cal-day-grid">';

    // Add time grid rows
    CAL_TIME_SLOTS.forEach((time, index) => {
      const slotClass = isPast ? "cal-grid-slot past" : "cal-grid-slot";
      gridHTML += `<div class="${slotClass}" data-time="${time}" data-day="${dayString}"></div>`;
    });

    // Add booking events for this day
    const dayBookings = calBookings.filter((b) => b.date === dayString);

    dayBookings.forEach((booking) => {
      const eventHTML = createCalendarEventHTML(booking);
      gridHTML += eventHTML;
    });

    gridHTML += "</div>"; // cal-day-grid
    gridHTML += "</div>"; // cal-day-column
  }

  calendarContainer.innerHTML = gridHTML;
}

// Create calendar event HTML with time and name
function createCalendarEventHTML(booking) {
  const startTime = booking.time;
  const duration = booking.duration || 90;
  const status = booking.status || "pending";
  const serviceType = booking.service || "";

  // Calculate start hour and minute
  const [startHour, startMinute] = startTime.split(":").map(Number);

  // Use endTime from booking if available, otherwise calculate
  let endTime = booking.endTime;
  if (!endTime) {
    const totalMinutes = startHour * 60 + startMinute + duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    endTime =
      String(endHour).padStart(2, "0") +
      ":" +
      String(endMinute).padStart(2, "0");
  }

  // Find start slot index
  const startIndex = CAL_TIME_SLOTS.findIndex(
    (t) => parseInt(t.split(":")[0]) === startHour
  );

  if (startIndex === -1) return "";

  // Calculate top position (40px per hour)
  const topPosition = startIndex * 40 + (startMinute / 60) * 40;

  // Calculate height based on duration (40px per hour)
  const height = (duration / 60) * 40;

  // Determine status class
  // status: 'confirmed' (1 in sheet) or 'pending' (0 or empty in sheet)
  const statusClass = status === "confirmed" ? "confirmed" : "pending";

  // Get service name
  const serviceName = SERVICE_NAMES[serviceType] || serviceType || "Rezerwacja";

  // Build event HTML with time range and name
  const eventHTML = `
    <div class="cal-booking-event ${statusClass}" style="top: ${topPosition}px; height: ${height}px;">
      <div class="cal-event-time">${startTime} - ${endTime}</div>
      <div class="cal-event-name">${serviceName}</div>
    </div>
  `;

  return eventHTML;
}

// Export bookings for other pages
window.getCalendarBookings = function () {
  return calBookings;
};

window.getBookedSlots = function (dateString) {
  return calBookings.filter((b) => b.date === dateString);
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initFullCalendar();
});

// Auto-refresh every 5 minutes
setInterval(function () {
  loadCalendarBookings();
}, 5 * 60 * 1000);
