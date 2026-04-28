/* ============================================================
   validation.js — jQuery Form Validation
   ----------------------------------------------------------
   Uses jQuery to validate the forms on index.html (search)
   and book.html (passenger details). Checks for:
   • Empty / blank fields
   • Valid email format (regex)
   • Numeric-only phone numbers
   Shows inline error messages beneath each invalid field.
   ============================================================ */

$(document).ready(function () {
  "use strict";

  // ---------- Helper: email regex ----------
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * showError
   * Adds the "has-error" class to a form-group so the CSS
   * reveals the .error-message span inside it.
   * @param {jQuery} $input  - the input/select element
   * @param {string} message - error text to display
   */
  function showError($input, message) {
    var $group = $input.closest(".form-group");
    $group.addClass("has-error");
    $group.find(".error-message").text(message).show();
  }

  /**
   * clearError
   * Removes error styling from a single form-group.
   * @param {jQuery} $input - the input/select element
   */
  function clearError($input) {
    var $group = $input.closest(".form-group");
    $group.removeClass("has-error");
    $group.find(".error-message").hide();
  }

  /**
   * clearAllErrors
   * Removes every error state inside a given form.
   * @param {jQuery} $form - the form element
   */
  function clearAllErrors($form) {
    $form.find(".form-group").removeClass("has-error");
    $form.find(".error-message").hide();
  }

  // ==========================================================
  // 1. SEARCH FORM VALIDATION  (index.html — #searchForm)
  // ==========================================================
  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    var valid = true;
    clearAllErrors($(this));

    var $from = $("#fromCity");
    var $to = $("#toCity");
    var $date = $("#flightDate");

    // "From" city must be selected
    if (!$from.val()) {
      showError($from, "Please select a departure city.");
      valid = false;
    }

    // "To" city must be selected
    if (!$to.val()) {
      showError($to, "Please select a destination city.");
      valid = false;
    }

    // Date must not be empty
    if (!$date.val()) {
      showError($date, "Please choose a travel date.");
      valid = false;
    }

    // If valid, call the search handler from dummy-data.js
    if (valid) {
      handleFlightSearch($from.val(), $to.val(), $date.val());
    }
  });

  // ==========================================================
  // 2. BOOKING FORM VALIDATION  (book.html — #bookingForm)
  // ==========================================================
  $("#bookingForm").on("submit", function (e) {
    e.preventDefault();
    var valid = true;
    clearAllErrors($(this));

    var $name = $("#passengerName");
    var $id = $("#passengerId");
    var $email = $("#passengerEmail");
    var $phone = $("#passengerPhone");

    // Full Name — not empty
    if ($.trim($name.val()) === "") {
      showError($name, "Full name is required.");
      valid = false;
    }

    // National ID / Passport — not empty
    if ($.trim($id.val()) === "") {
      showError($id, "National ID or Passport number is required.");
      valid = false;
    }

    // Email — not empty & valid format
    if ($.trim($email.val()) === "") {
      showError($email, "Email address is required.");
      valid = false;
    } else if (!emailRegex.test($email.val())) {
      showError($email, "Please enter a valid email address.");
      valid = false;
    }

    // Phone — not empty & numeric only
    if ($.trim($phone.val()) === "") {
      showError($phone, "Phone number is required.");
      valid = false;
    } else if (!/^\d+$/.test($phone.val())) {
      showError($phone, "Phone number must contain only digits.");
      valid = false;
    }

    // If everything passes, show confirmation & redirect
    if (valid) {
      alert("✅ Booking confirmed! Redirecting to your ticket…");
      window.location.href = "tickets.html";
    }
  });

  // ==========================================================
  // 3. CONTACT FORM VALIDATION  (contact.html — #contactForm)
  // ==========================================================
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    var valid = true;
    clearAllErrors($(this));

    var $name    = $("#contactName");
    var $email   = $("#contactEmail");
    var $subject = $("#contactSubject");
    var $message = $("#contactMessage");

    // Name — not empty
    if ($.trim($name.val()) === "") {
      showError($name, "Your name is required.");
      valid = false;
    }

    // Email — not empty & valid format
    if ($.trim($email.val()) === "") {
      showError($email, "Email address is required.");
      valid = false;
    } else if (!emailRegex.test($email.val())) {
      showError($email, "Please enter a valid email address.");
      valid = false;
    }

    // Subject — must be selected
    if (!$subject.val()) {
      showError($subject, "Please select a subject.");
      valid = false;
    }

    // Message — not empty
    if ($.trim($message.val()) === "") {
      showError($message, "Please write your message.");
      valid = false;
    }

    if (valid) {
      alert("✅ Message sent! Our team will get back to you shortly.");
      this.reset();
    }
  });

  // --- Live: clear error when user starts typing ---
  $("input, select, textarea").on("input change", function () {
    clearError($(this));
  });
});
