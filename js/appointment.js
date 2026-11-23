/* ==========================================================
   Accessible validation for the patient appointment form.
   - Native constraint validation with custom, readable messages
   - Error summary receives focus and links to each field
   - Inline errors linked with aria-describedby; aria-invalid set
   - Date limits: date of birth cannot be in the future,
     appointment date cannot be in the past
   - Doctor list is filtered by the chosen department
   ========================================================== */
(function () {
  "use strict";

  var form = document.getElementById("appointment-form");
  if (!form) { return; }

  var summary = document.getElementById("error-summary");
  var summaryList = document.getElementById("error-list");
  var successBox = document.getElementById("success-box");
  var reason = document.getElementById("reason");
  var counter = document.getElementById("reason-count");
  var dob = document.getElementById("dob");
  var visitDate = document.getElementById("visit-date");
  var department = document.getElementById("department");
  var doctor = document.getElementById("doctor");

  /* ---- Date limits (local date, yyyy-mm-dd) ---- */
  function today() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  dob.max = today();
  visitDate.min = today();

  /* ---- Character counter ---- */
  function updateCounter() {
    var left = reason.maxLength - reason.value.length;
    counter.textContent = left + " character" + (left === 1 ? "" : "s") + " remaining";
  }
  reason.addEventListener("input", updateCounter);
  updateCounter();

  /* ---- Filter doctors by department ---- */
  var allDoctorOptions = Array.prototype.slice.call(doctor.options);
  function filterDoctors() {
    var dept = department.value;
    doctor.innerHTML = "";
    allDoctorOptions.forEach(function (opt) {
      if (!opt.value || !dept || opt.getAttribute("data-dept") === dept) {
        doctor.appendChild(opt);
      }
    });
    doctor.selectedIndex = 0;
  }
  department.addEventListener("change", filterDoctors);

  /* ---- Messages ---- */
  var REQUIRED = {
    "full-name": "Enter your full name.",
    "dob": "Enter your date of birth.",
    "email": "Enter your email address.",
    "phone": "Enter your mobile number.",
    "department": "Select a department.",
    "visit-date": "Choose a preferred appointment date.",
    "slot-morning": "Select a preferred time (morning, afternoon or evening).",
    "consent": "Tick the confirmation box to continue."
  };

  function messageFor(field) {
    var v = field.validity;
    if (v.valueMissing) { return REQUIRED[field.id] || "Complete this field."; }
    if (v.badInput) { return "Enter a valid date."; }
    if (v.typeMismatch && field.type === "email") { return "Enter an email address in the format name@example.com."; }
    if (v.patternMismatch && field.id === "phone") { return "Enter a 10-digit mobile number using digits only."; }
    if (v.rangeOverflow && field.id === "dob") { return "Date of birth cannot be in the future."; }
    if (v.rangeUnderflow && field.id === "visit-date") { return "Choose today's date or a later date."; }
    return "Check this field.";
  }

  function errorBox(field) {
    var id = field.type === "radio" ? field.name + "-error" : field.id + "-error";
    return document.getElementById(id);
  }

  function setInvalid(field, on) {
    if (field.type === "radio") {
      var radios = form.querySelectorAll('input[name="' + field.name + '"]');
      for (var i = 0; i < radios.length; i++) {
        if (on) { radios[i].setAttribute("aria-invalid", "true"); } else { radios[i].removeAttribute("aria-invalid"); }
      }
    } else if (on) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }

  function clearError(field) {
    var box = errorBox(field);
    if (box) { box.textContent = ""; box.classList.remove("is-visible"); }
    setInvalid(field, false);
  }

  function showError(field, text) {
    var box = errorBox(field);
    if (box) { box.textContent = text; box.classList.add("is-visible"); }
    setInvalid(field, true);
  }

  /* ---- Submit ---- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.classList.remove("is-visible");
    summaryList.innerHTML = "";

    var fields = form.querySelectorAll("input, select, textarea");
    var seenRadio = {};
    var problems = [];

    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.type === "radio") {
        if (seenRadio[f.name]) { continue; }
        seenRadio[f.name] = true;
      }
      clearError(f);
      if (!f.required && f.value === "") { continue; }

      var valid = f.type === "radio"
        ? form.querySelector('input[name="' + f.name + '"]:checked') !== null
        : f.checkValidity();

      if (!valid) {
        var text = messageFor(f);
        showError(f, text);
        problems.push({ field: f, text: text });
      }
    }

    if (problems.length) {
      for (var p = 0; p < problems.length; p++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + problems[p].field.id;
        a.textContent = problems[p].text;
        a.setAttribute("data-target", problems[p].field.id);
        li.appendChild(a);
        summaryList.appendChild(li);
      }
      summary.classList.add("is-visible");
      summary.focus();
      return;
    }

    summary.classList.remove("is-visible");
    successBox.classList.add("is-visible");
    successBox.focus();
    form.reset();
    filterDoctors();
    updateCounter();
  });

  /* ---- Summary links move focus to the field ---- */
  summaryList.addEventListener("click", function (event) {
    var link = event.target.closest("a[data-target]");
    if (!link) { return; }
    event.preventDefault();
    var target = document.getElementById(link.getAttribute("data-target"));
    if (target) { target.focus(); }
  });

  /* ---- Clear an error as soon as the field becomes valid ---- */
  function revalidate(event) {
    var f = event.target;
    if (f.checkValidity && f.checkValidity()) { clearError(f); }
  }
  form.addEventListener("input", revalidate);
  form.addEventListener("change", revalidate);
})();
