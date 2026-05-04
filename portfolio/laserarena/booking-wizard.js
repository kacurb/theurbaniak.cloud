// ===================================
// BOOKING WIZARD JAVASCRIPT
// ===================================

// State
let currentStep = 1;
let selectedPackage = null;
let selectedAddons = [];
let extraPersons = 0;
let bookedSlots = [];
let currentPeriod = 'weekday';

// Package Data - defined in script.js, this is a fallback for standalone use
// Note: On rezerwacje.html, script.js loads first and defines packageData globally

// Period labels
const periodLabels = {
  'weekday': 'Poniedziałek - Czwartek',
  'friday-sunday': 'Piątek, Niedziela',
  'saturday-holiday': 'Sobota i Święta'
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log('Booking wizard initializing...');
  console.log('packageData available:', typeof packageData !== 'undefined');

  // Clear any previous session data on page load/refresh
  // Only keep if coming from cennik (check referrer)
  const fromCennik = document.referrer.includes('index.html') ||
                     document.referrer.includes('#cennik');
  if (!fromCennik) {
    sessionStorage.removeItem('selectedPackage');
  }

  // Reset form state
  resetFormState();

  setupDaySwitcher();
  console.log('Day switcher setup done');

  setupServiceSelector();
  console.log('Service selector setup done');

  setupGameOptions();
  setupDatePicker();
  setupPaymentMethodToggle();
  loadBookedSlots();

  // Only load from session if coming from cennik
  if (fromCennik) {
    loadFromSessionOrCart();
  }

  updateLiveSummary();

  console.log('Booking wizard initialized');
});

// Reset form state on page load
function resetFormState() {
  // Reset service selector
  const serviceSelect = document.getElementById('serviceSelect');
  if (serviceSelect) {
    serviceSelect.value = '';
  }

  // Hide individual options and preview
  const individualOptions = document.getElementById('individualGameOptions');
  if (individualOptions) {
    individualOptions.style.display = 'none';
  }

  const preview = document.getElementById('selectedServicePreview');
  if (preview) {
    preview.style.display = 'none';
  }

  // Reset date and time
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    dateInput.value = '';
  }

  const timeSelect = document.getElementById('bookingTime');
  if (timeSelect) {
    timeSelect.innerHTML = '<option value="">Najpierw wybierz datę</option>';
  }

  // Reset extra persons
  const extraPersonsInput = document.getElementById('extraPersons');
  if (extraPersonsInput) {
    extraPersonsInput.value = '0';
  }

  // Reset customer fields
  const customerFields = ['customerName', 'customerEmail', 'customerPhone', 'customerMessage'];
  customerFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) field.value = '';
  });

  // Reset global state
  selectedPackage = null;
  selectedAddons = [];
  extraPersons = 0;
  currentStep = 1;

  // Reset step display
  document.querySelectorAll('.wizard-step').forEach((step, index) => {
    step.classList.remove('active');
    if (index === 0) step.classList.add('active');
  });

  document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index === 0) step.classList.add('active');
  });
}

// Setup day switcher
function setupDaySwitcher() {
  const dayButtons = document.querySelectorAll('.booking-day-switcher .day-btn');
  console.log('Found day buttons:', dayButtons.length);

  dayButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Day button clicked:', this.getAttribute('data-period'));

      // Update active state
      dayButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Update current period
      currentPeriod = this.getAttribute('data-period');

      // Update all prices
      updateDropdownPrices();
      updateIndividualPrices();

      // Rebuild package if one is selected
      if (selectedPackage) {
        buildSelectedPackage(selectedPackage.serviceId);
      }
      updateServicePreview();
    });
  });

  // Initialize dropdown prices
  updateDropdownPrices();
}

// Update dropdown options with prices based on current period
function updateDropdownPrices() {
  console.log('updateDropdownPrices called, currentPeriod:', currentPeriod);

  const serviceSelect = document.getElementById('serviceSelect');
  if (!serviceSelect) {
    console.log('serviceSelect not found!');
    return;
  }

  console.log('packageData type:', typeof packageData);
  if (typeof packageData === 'undefined') {
    console.error('packageData is undefined!');
    return;
  }

  const options = serviceSelect.querySelectorAll('option[value]');
  console.log('Found options:', options.length);

  options.forEach(option => {
    const serviceId = option.value;
    if (!serviceId || !packageData[serviceId]) return;

    const pkg = packageData[serviceId];
    let price;

    if (serviceId === 'indywidualna') {
      // Show range for indywidualna
      const prices = pkg.prices[currentPeriod];
      price = 'od ' + prices['1'] + ' PLN/os';
    } else {
      price = pkg.prices[currentPeriod] + ' PLN';
    }

    // Update option text
    const baseText = getBaseOptionText(serviceId);
    option.textContent = baseText + ' - ' + price;
  });

  console.log('Dropdown prices updated');
}

// Get base text for dropdown option
function getBaseOptionText(serviceId) {
  const texts = {
    'impreza': 'Impreza (do 12 osób, 2h)',
    'urodziny': 'Urodziny (do 12 osób, 2h)',
    'indywidualna': 'Indywidualna (na osobę)',
    'nocna-operacja': 'Nocna Operacja (do 30 osób, 2h)',
    'poranna-zaprawa': 'Poranna Zaprawa (do 30 osób, 2h)'
  };
  return texts[serviceId] || serviceId;
}

// Setup service selector
function setupServiceSelector() {
  const serviceSelect = document.getElementById('serviceSelect');
  if (!serviceSelect) return;

  serviceSelect.addEventListener('change', onServiceChange);
}

// Handle service change
function onServiceChange() {
  console.log('onServiceChange called');

  const serviceSelect = document.getElementById('serviceSelect');
  const serviceId = serviceSelect.value;
  console.log('Selected service:', serviceId);

  const individualOptions = document.getElementById('individualGameOptions');
  const preview = document.getElementById('selectedServicePreview');

  if (!serviceId) {
    // No service selected
    if (individualOptions) individualOptions.style.display = 'none';
    if (preview) preview.style.display = 'none';
    selectedPackage = null;
    updateLiveSummary();
    return;
  }

  // Show/hide individual options
  if (serviceId === 'indywidualna') {
    if (individualOptions) individualOptions.style.display = 'block';
    updateIndividualPrices();
  } else {
    if (individualOptions) individualOptions.style.display = 'none';
  }

  // Build selected package
  buildSelectedPackage(serviceId);

  // Show preview
  if (preview) preview.style.display = 'block';
  updateServicePreview();
}

// Update individual game prices based on period
function updateIndividualPrices() {
  const prices = packageData['indywidualna'].prices[currentPeriod];

  const price1 = document.getElementById('gamePrice1');
  const price2 = document.getElementById('gamePrice2');
  const price3 = document.getElementById('gamePrice3');

  if (price1) price1.textContent = prices['2'] + ' PLN/os';
  if (price2) price2.textContent = prices['4'] + ' PLN/os';
  if (price3) price3.textContent = prices['6'] + ' PLN/os';

  // Update selected package if indywidualna is selected
  if (selectedPackage && selectedPackage.serviceId === 'indywidualna') {
    buildSelectedPackage('indywidualna');
    updateServicePreview();
  }
}

// Setup game options for indywidualna
function setupGameOptions() {
  const gameOptions = document.querySelectorAll('.game-option');

  gameOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Update selected state
      gameOptions.forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');

      // Check the radio
      this.querySelector('input[type="radio"]').checked = true;

      // Update package
      if (selectedPackage && selectedPackage.serviceId === 'indywidualna') {
        buildSelectedPackage('indywidualna');
        updateServicePreview();
        updateLiveSummary();
      }
    });
  });
}

// Build selected package object
function buildSelectedPackage(serviceId) {
  const pkg = packageData[serviceId];
  if (!pkg) return;

  let basePrice, duration, gamesSelected;

  if (serviceId === 'indywidualna') {
    // Get selected game option
    const selectedGame = document.querySelector('input[name="gameOption"]:checked');
    gamesSelected = selectedGame ? selectedGame.value : '2';

    const prices = pkg.prices[currentPeriod];
    basePrice = prices[gamesSelected];
    duration = pkg.gameDurations[gamesSelected];
  } else {
    basePrice = pkg.prices[currentPeriod];
    duration = pkg.duration;
  }

  selectedPackage = {
    serviceId: serviceId,
    serviceName: pkg.name,
    basePrice: basePrice,
    period: currentPeriod,
    periodLabel: periodLabels[currentPeriod],
    duration: duration,
    basePersons: pkg.basePersons,
    extraPersonCost: pkg.isPerPerson ? basePrice : (pkg.extraPersonCost || 0),
    isPerPerson: pkg.isPerPerson || false,
    gamesSelected: gamesSelected || null,
    features: pkg.features,
    addons: pkg.addons || [],
    allPrices: pkg.prices
  };

  // Load addons for this package
  loadAddons();
  updateLiveSummary();
}

// Update service preview
function updateServicePreview() {
  if (!selectedPackage) return;

  const pkg = packageData[selectedPackage.serviceId];
  if (!pkg) return;

  const previewIcon = document.getElementById('previewIcon');
  const previewName = document.getElementById('previewName');
  const previewPeriod = document.getElementById('previewPeriod');
  const previewPrice = document.getElementById('previewPrice');
  const previewDuration = document.getElementById('previewDuration');
  const previewPersons = document.getElementById('previewPersons');
  const previewExtraSep = document.getElementById('previewExtraSep');
  const previewExtra = document.getElementById('previewExtra');

  if (previewIcon) previewIcon.innerHTML = pkg.icon;
  if (previewName) previewName.textContent = selectedPackage.serviceName;
  if (previewPeriod) previewPeriod.textContent = selectedPackage.periodLabel;
  if (previewPrice) previewPrice.textContent = selectedPackage.basePrice;
  if (previewDuration) previewDuration.textContent = selectedPackage.duration;

  // Update persons info
  if (selectedPackage.isPerPerson) {
    if (previewPersons) previewPersons.textContent = 'cena za osobę';
    if (previewExtraSep) previewExtraSep.style.display = 'none';
    if (previewExtra) previewExtra.style.display = 'none';
  } else {
    if (previewPersons) previewPersons.textContent = 'do ' + selectedPackage.basePersons + ' osób';
    if (previewExtraSep) previewExtraSep.style.display = 'inline';
    if (previewExtra) {
      previewExtra.style.display = 'inline';
      previewExtra.textContent = '+' + selectedPackage.extraPersonCost + ' PLN/os ponad limit';
    }
  }
}

// Load from session storage or cart
function loadFromSessionOrCart() {
  const storedPackage = sessionStorage.getItem("selectedPackage");

  if (storedPackage) {
    const stored = JSON.parse(storedPackage);

    // Set the day switcher
    currentPeriod = stored.period || 'weekday';
    const dayBtns = document.querySelectorAll('.booking-day-switcher .day-btn');
    dayBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-period') === currentPeriod) {
        btn.classList.add('active');
      }
    });

    // Update dropdown prices for new period
    updateDropdownPrices();

    // Set the service select
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
      serviceSelect.value = stored.serviceId;

      // Trigger change
      if (stored.serviceId === 'indywidualna' && stored.gamesSelected) {
        const indivOptions = document.getElementById('individualGameOptions');
        if (indivOptions) indivOptions.style.display = 'block';
        updateIndividualPrices();

        // Select the game option
        const gameOptions = document.querySelectorAll('.game-option');
        gameOptions.forEach(opt => {
          opt.classList.remove('selected');
          if (opt.getAttribute('data-games') === stored.gamesSelected) {
            opt.classList.add('selected');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
          }
        });
      }

      buildSelectedPackage(stored.serviceId);
      const preview = document.getElementById('selectedServicePreview');
      if (preview) preview.style.display = 'block';
      updateServicePreview();

      // Auto-navigate to step 2 when coming from cennik
      setTimeout(function() {
        goToStep(2);
      }, 100);
    }

    // Clear session storage after loading
    sessionStorage.removeItem("selectedPackage");
  }
}

// Go to specific step
function goToStep(stepNum) {
  console.log('goToStep called:', stepNum);
  if (stepNum < 1 || stepNum > 5) return;

  // Mark previous steps as completed
  for (let i = 1; i < stepNum; i++) {
    const progressStep = document.querySelector(`.progress-step[data-step="${i}"]`);
    if (progressStep) progressStep.classList.add('completed');
  }

  currentStep = stepNum;

  // Update extra persons info when entering Step 2
  if (stepNum === 2) {
    updateExtraPersonsInfo();
  }

  updateStepDisplay();
}

// Load booked slots - use sheetsBookings from script.js if available
function loadBookedSlots() {
  // Wait for sheetsBookings to be loaded by script.js
  if (typeof sheetsBookings !== 'undefined' && sheetsBookings.length > 0) {
    // Use data from script.js (same data as calendar)
    bookedSlots = sheetsBookings.map(booking => ({
      date: booking.date,
      time: booking.time,
      endTime: booking.endTime || "",
      duration: booking.duration || 90,
      status: booking.status || "pending"
    }));
    console.log('Using sheetsBookings from script.js:', bookedSlots.length, 'slots');
  } else {
    // sheetsBookings not ready yet, wait and retry
    console.log('Waiting for sheetsBookings...');
    setTimeout(loadBookedSlots, 500);
  }
}

// Load addons for selected package
function loadAddons() {
  const addonsGrid = document.getElementById("addonsGrid");

  if (
    !selectedPackage ||
    !selectedPackage.addons ||
    selectedPackage.addons.length === 0
  ) {
    addonsGrid.innerHTML =
      '<p class="no-addons">Brak dostępnych dodatków dla tej usługi.</p>';
    return;
  }

  let html = "";
  selectedPackage.addons.forEach((addon) => {
    html += `
      <label class="addon-card" data-addon-id="${addon.id}" data-addon-price="${addon.price}">
        <input type="checkbox" name="addon_${addon.id}" value="${addon.id}" />
        <div class="addon-header">
          <span class="addon-name">${addon.name}</span>
          <span class="addon-price">${addon.price} PLN</span>
        </div>
        <div class="addon-checkbox">&#10003;</div>
      </label>
    `;
  });

  addonsGrid.innerHTML = html;

  // Add click handlers
  document.querySelectorAll(".addon-card").forEach((card) => {
    card.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      this.classList.toggle("selected", checkbox.checked);

      updateSelectedAddons();
      updateLiveSummary();
    });
  });
}

// Update selected addons array
function updateSelectedAddons() {
  selectedAddons = [];
  document.querySelectorAll(".addon-card.selected").forEach((card) => {
    selectedAddons.push({
      id: card.getAttribute("data-addon-id"),
      name: card.querySelector(".addon-name").textContent,
      price: parseInt(card.getAttribute("data-addon-price")),
    });
  });
}

// Change extra persons count
function changeExtraPersons(delta) {
  const input = document.getElementById("extraPersons");
  const newValue = parseInt(input.value) + delta;

  if (newValue >= 0 && newValue <= 50) {
    input.value = newValue;
    extraPersons = newValue;
    updateLiveSummary();
  }
}

// Setup date picker
function setupDatePicker() {
  const dateInput = document.getElementById("bookingDate");

  if (dateInput) {
    // Lokalne formatowanie daty (bez UTC)
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    dateInput.setAttribute("min", today);
    // Don't pre-select any date - let user choose
    dateInput.value = "";

    dateInput.addEventListener("change", function () {
      updateAvailableTimeSlots(this.value);
    });
  }
}

// Update available time slots based on selected date and package type
function updateAvailableTimeSlots(selectedDate) {
  console.log('updateAvailableTimeSlots called with date:', selectedDate);

  const timeSelect = document.getElementById("bookingTime");
  if (!timeSelect) return;

  let availableTimes = [];

  if (selectedPackage) {
    const serviceId = selectedPackage.serviceId;

    if (serviceId === "poranna-zaprawa") {
      availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"];
    } else if (serviceId === "nocna-operacja") {
      availableTimes = ["21:00", "22:00", "23:00"];
    } else {
      availableTimes = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00", "19:00"
      ];
    }
  } else {
    availableTimes = [
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
      "15:00", "16:00", "17:00", "18:00", "19:00"
    ];
  }

  console.log('All booked slots:', bookedSlots);
  console.log('Looking for date:', selectedDate);

  const dateBookings = bookedSlots.filter((slot) => slot.date === selectedDate);
  console.log('Bookings found for this date:', dateBookings);

  let optionsHTML = '<option value="">Wybierz godzinę</option>';

  availableTimes.forEach((time) => {
    const [hour, minute] = time.split(":").map(Number);
    let isBooked = false;

    dateBookings.forEach((booking) => {
      const [bookingHour, bookingMinute] = booking.time.split(":").map(Number);
      const bookingStartMinutes = bookingHour * 60 + (bookingMinute || 0);
      const bookingEndMinutes = bookingStartMinutes + booking.duration;

      const slotStartMinutes = hour * 60 + minute;
      const slotEndMinutes = slotStartMinutes + 120; // 2 hour slot

      // Check if slots overlap
      if (slotStartMinutes < bookingEndMinutes && slotEndMinutes > bookingStartMinutes) {
        isBooked = true;
        console.log(`Slot ${time} overlaps with booking ${booking.time} (duration: ${booking.duration}min)`);
      }
    });

    if (isBooked) {
      optionsHTML += `<option value="${time}" disabled>${time} - zajęte</option>`;
    } else {
      optionsHTML += `<option value="${time}">${time}</option>`;
    }
  });

  timeSelect.innerHTML = optionsHTML;
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
  const paymentOptions = document.querySelectorAll(
    'input[name="paymentMethod"]'
  );
  const bankInfo = document.getElementById("bankTransferInfo");

  paymentOptions.forEach((option) => {
    option.addEventListener("change", function () {
      if (this.value === "transfer") {
        bankInfo.style.display = "block";
      } else {
        bankInfo.style.display = "none";
      }
    });
  });
}

// Calculate total price
function calculateTotal() {
  if (!selectedPackage) return 0;

  let total = selectedPackage.basePrice;

  // For per-person packages (indywidualna), base price is per person
  // Extra persons = additional people at same price
  if (selectedPackage.isPerPerson) {
    // Base includes 1 person, extra persons at same rate
    total = selectedPackage.basePrice * (1 + extraPersons);
  } else {
    // Standard packages: base price + extra persons at extraPersonCost
    if (selectedPackage.extraPersonCost && extraPersons > 0) {
      total += extraPersons * selectedPackage.extraPersonCost;
    }
  }

  // Add addons
  selectedAddons.forEach((addon) => {
    total += addon.price;
  });

  return total;
}

// Update live summary
function updateLiveSummary() {
  const liveSummaryService = document.getElementById("liveSummaryService");
  const liveSummaryServicePrice = document.getElementById("liveSummaryServicePrice");

  if (!liveSummaryService || !liveSummaryServicePrice) return;

  if (!selectedPackage) {
    liveSummaryService.textContent = "Nie wybrano";
    liveSummaryServicePrice.textContent = "0 PLN";
    document.getElementById("liveSummaryTotal").textContent = "0 PLN";
    return;
  }

  let serviceName = selectedPackage.serviceName;
  if (selectedPackage.isPerPerson) {
    serviceName += ' (' + (1 + extraPersons) + ' os.)';
  }

  liveSummaryService.textContent = serviceName;

  // For per-person, show total for all persons in base price
  if (selectedPackage.isPerPerson) {
    const baseTotal = selectedPackage.basePrice * (1 + extraPersons);
    liveSummaryServicePrice.textContent = baseTotal + " PLN";
  } else {
    liveSummaryServicePrice.textContent = selectedPackage.basePrice + " PLN";
  }

  // Addons
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price,
    0
  );
  const addonsRow = document.getElementById("liveSummaryAddonsRow");
  if (addonsRow) {
    if (addonsTotal > 0) {
      addonsRow.style.display = "flex";
      document.getElementById("liveSummaryAddonsPrice").textContent =
        addonsTotal + " PLN";
    } else {
      addonsRow.style.display = "none";
    }
  }

  // Extra persons (only for non-per-person packages)
  const extraRow = document.getElementById("liveSummaryExtraRow");
  if (extraRow) {
    if (!selectedPackage.isPerPerson && extraPersons > 0 && selectedPackage.extraPersonCost) {
      extraRow.style.display = "flex";
      document.getElementById("liveSummaryExtraPrice").textContent =
        extraPersons * selectedPackage.extraPersonCost + " PLN";
    } else {
      extraRow.style.display = "none";
    }
  }

  // Total
  document.getElementById("liveSummaryTotal").textContent =
    calculateTotal() + " PLN";
}

// Update extra persons info in Step 2
function updateExtraPersonsInfo() {
  const extraPersonsInfo = document.getElementById("extraPersonsInfo");
  if (!extraPersonsInfo || !selectedPackage) return;

  if (selectedPackage.isPerPerson) {
    extraPersonsInfo.innerHTML = 'Dodaj więcej osób: <strong>' + selectedPackage.basePrice + ' PLN/os</strong>';
  } else if (selectedPackage.extraPersonCost) {
    extraPersonsInfo.innerHTML = 'Kolejna osoba ponad limit (' + selectedPackage.basePersons + '): <strong>' + selectedPackage.extraPersonCost + ' PLN</strong>';
  }
}

// Navigation functions
function nextStep() {
  console.log('nextStep called, currentStep:', currentStep);

  if (!validateCurrentStep()) {
    console.log('Validation failed');
    return;
  }

  if (currentStep < 6) {
    const progressStep = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    if (progressStep) progressStep.classList.add("completed");

    currentStep++;
    console.log('Moving to step:', currentStep);

    // Update extra persons info when entering Step 2
    if (currentStep === 2) {
      updateExtraPersonsInfo();
    }

    // Update summary before showing step 4
    if (currentStep === 4) {
      updateSummary();
    }

    updateStepDisplay();
  }
}

function prevStep() {
  if (currentStep > 1) {
    document
      .querySelector(`.progress-step[data-step="${currentStep}"]`)
      .classList.remove("active");
    currentStep--;
    updateStepDisplay();
  }
}

function updateStepDisplay() {
  // Hide all steps
  document.querySelectorAll(".wizard-step").forEach((step) => {
    step.classList.remove("active");
  });

  // Show current step
  document
    .querySelector(`.wizard-step[data-step="${currentStep}"]`)
    .classList.add("active");

  // Update progress indicators
  document.querySelectorAll(".progress-step").forEach((step) => {
    const stepNum = parseInt(step.getAttribute("data-step"));
    step.classList.remove("active");
    if (stepNum === currentStep) {
      step.classList.add("active");
    }
  });

  // Scroll to top of wizard
  document
    .querySelector(".wizard-content")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// Validate current step
function validateCurrentStep() {
  console.log('validateCurrentStep, step:', currentStep, 'selectedPackage:', selectedPackage);

  switch (currentStep) {
    case 1:
      if (!selectedPackage) {
        alert("Proszę wybrać usługę.");
        return false;
      }
      // Save to session storage
      sessionStorage.setItem('selectedPackage', JSON.stringify(selectedPackage));
      return true;

    case 2:
      return true;

    case 3:
      const date = document.getElementById("bookingDate").value;
      const time = document.getElementById("bookingTime").value;
      const name = document.getElementById("customerName").value.trim();
      const email = document.getElementById("customerEmail").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();

      if (!date) {
        alert("Proszę wybrać datę.");
        return false;
      }
      if (!time) {
        alert("Proszę wybrać godzinę.");
        return false;
      }
      if (!name) {
        alert("Proszę podać imię i nazwisko.");
        return false;
      }
      if (!email || !email.includes("@")) {
        alert("Proszę podać poprawny adres email.");
        return false;
      }
      if (!phone) {
        alert("Proszę podać numer telefonu.");
        return false;
      }
      return true;

    default:
      return true;
  }
}

// Update summary page
function updateSummary() {
  if (!selectedPackage) return;

  // Service name with persons for indywidualna
  let serviceName = selectedPackage.serviceName;
  if (selectedPackage.isPerPerson) {
    serviceName += ' (' + (1 + extraPersons) + ' osób)';
  }

  document.getElementById("summaryServiceName").textContent = serviceName;

  // Price calculation for display
  let baseDisplay;
  if (selectedPackage.isPerPerson) {
    baseDisplay = selectedPackage.basePrice * (1 + extraPersons);
  } else {
    baseDisplay = selectedPackage.basePrice;
  }
  document.getElementById("summaryServicePrice").textContent = baseDisplay + " PLN";
  document.getElementById("summaryServiceDetail").textContent =
    selectedPackage.duration + " | " + selectedPackage.periodLabel;

  // Addons
  const addonsList = document.getElementById("summaryAddonsList");
  const addonsSection = document.getElementById("summaryAddonsSection");

  if (selectedAddons.length > 0) {
    addonsSection.style.display = "block";
    let addonsHtml = "";
    selectedAddons.forEach((addon) => {
      addonsHtml += `<div class="summary-row"><span>${addon.name}</span><span>${addon.price} PLN</span></div>`;
    });
    addonsList.innerHTML = addonsHtml;
  } else {
    addonsSection.style.display = "none";
  }

  // Extra persons (only for non-per-person packages)
  const extraSection = document.getElementById("summaryExtraPersonsSection");
  if (!selectedPackage.isPerPerson && extraPersons > 0 && selectedPackage.extraPersonCost) {
    extraSection.style.display = "block";
    document.getElementById("summaryExtraPersonsCount").textContent =
      extraPersons + " osób";
    document.getElementById("summaryExtraPersonsPrice").textContent =
      extraPersons * selectedPackage.extraPersonCost + " PLN";
  } else {
    extraSection.style.display = "none";
  }

  // Date and time
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  document.getElementById("summaryDate").textContent = formatDate(date);
  document.getElementById("summaryTime").textContent = time;

  // Contact
  document.getElementById("summaryContactName").textContent =
    document.getElementById("customerName").value;
  document.getElementById("summaryContactEmail").textContent =
    document.getElementById("customerEmail").value;
  document.getElementById("summaryContactPhone").textContent =
    document.getElementById("customerPhone").value;

  // Total
  document.getElementById("summaryTotal").textContent =
    calculateTotal() + " PLN";

  // Update payment info
  document.getElementById("transferTitle").textContent =
    "Rezerwacja - " + document.getElementById("customerName").value;

  // Add to cart
  addBookingToCart();
}

// Add current booking to cart
function addBookingToCart() {
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;

  let details = formatDate(date) + " o " + time;
  if (selectedAddons.length > 0) {
    details += " + " + selectedAddons.length + " dodatki";
  }
  if (extraPersons > 0) {
    if (selectedPackage.isPerPerson) {
      details += " (" + (1 + extraPersons) + " osób)";
    } else {
      details += " + " + extraPersons + " dodatkowych osób";
    }
  }

  const cartItem = {
    name: selectedPackage.serviceName,
    details: details,
    price: calculateTotal(),
    packageData: selectedPackage,
    addons: selectedAddons,
    extraPersons: extraPersons,
    date: date,
    time: time,
  };

  let cart = { items: [], total: 0 };
  const savedCart = localStorage.getItem("laserArenaCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  const existingIndex = cart.items.findIndex(
    (item) =>
      item.name === cartItem.name &&
      item.date === cartItem.date &&
      item.time === cartItem.time
  );

  if (existingIndex !== -1) {
    cart.items[existingIndex] = cartItem;
  } else {
    cart.items.push(cartItem);
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
  localStorage.setItem("laserArenaCart", JSON.stringify(cart));
}

// Format date to Polish format
// WAŻNE: Parsujemy datę jako lokalną, nie UTC, żeby uniknąć przesunięcia o 1 dzień
function formatDate(dateString) {
  if (!dateString) return "-";

  // Parsowanie daty jako lokalnej (bez interpretacji jako UTC)
  // Format wejściowy: "YYYY-MM-DD"
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript miesiące 0-11
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("pl-PL", options);
  }

  // Fallback dla innych formatów
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("pl-PL", options);
}

// Submit booking
async function submitBooking() {
  let serviceSummary = selectedPackage.serviceName;
  if (selectedPackage.isPerPerson) {
    serviceSummary += ' (' + (1 + extraPersons) + ' osób)';
  }

  const bookingData = {
    service: serviceSummary,
    serviceId: selectedPackage.serviceId,
    period: selectedPackage.periodLabel,
    basePrice: selectedPackage.basePrice,
    addons: selectedAddons,
    extraPersons: extraPersons,
    extraPersonsCost: selectedPackage.isPerPerson
      ? extraPersons * selectedPackage.basePrice
      : extraPersons * (selectedPackage.extraPersonCost || 0),
    total: calculateTotal(),
    date: document.getElementById("bookingDate").value,
    time: document.getElementById("bookingTime").value,
    customer: {
      name: document.getElementById("customerName").value,
      email: document.getElementById("customerEmail").value,
      phone: document.getElementById("customerPhone").value,
      message: document.getElementById("customerMessage").value,
    },
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')
      .value,
  };

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
          name: bookingData.customer.name,
          email: bookingData.customer.email,
          phone: bookingData.customer.phone,
          service: bookingData.service + " (" + bookingData.period + ")",
          date: bookingData.date,
          time: bookingData.time,
          addons: bookingData.addons.map((a) => a.name).join(", ") || "Brak",
          extraPersons: bookingData.extraPersons,
          total: bookingData.total + " PLN",
          paymentMethod: bookingData.paymentMethod,
          message: bookingData.customer.message,
          _subject: "Nowa rezerwacja online - " + bookingData.customer.name,
          _template: "table",
        }),
      }
    );

    if (response.ok) {
      updateConfirmation(bookingData);
      nextStep();
      sessionStorage.removeItem("selectedPackage");
    } else {
      throw new Error("Failed to send");
    }
  } catch (error) {
    console.error("Error submitting booking:", error);
    alert(
      "Przepraszamy, wystapil blad. Prosimy o kontakt telefoniczny: +48 691 545 741"
    );
  }
}

// Update confirmation page
function updateConfirmation(bookingData) {
  document.getElementById("confirmationService").textContent =
    "Usluga: " + bookingData.service;
  document.getElementById("confirmationDate").textContent =
    "Data: " + formatDate(bookingData.date);
  document.getElementById("confirmationTime").textContent =
    "Godzina: " + bookingData.time;
  document.getElementById("confirmationTotal").textContent =
    "Suma: " + bookingData.total + " PLN";
}
