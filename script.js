// Mr. Striper — small interactions

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 6px 18px -10px rgba(0,0,0,0.45)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Lot pricing estimator
  var steppers = document.querySelectorAll('.stepper');
  var totalEl = document.getElementById('estimatorTotal');
  var breakdownEl = document.getElementById('estimatorBreakdown');

  if (steppers.length && totalEl && breakdownEl) {
    function clampValue(input) {
      var n = parseInt(input.value, 10);
      if (isNaN(n) || n < 0) n = 0;
      input.value = n;
      return n;
    }

    function recalc() {
      var total = 0;
      var rows = [];

      steppers.forEach(function (stepper) {
        var price = parseFloat(stepper.getAttribute('data-price'));
        var label = stepper.getAttribute('data-label');
        var input = stepper.querySelector('.stepper-value');
        var qty = clampValue(input);

        if (qty > 0) {
          var lineTotal = qty * price;
          total += lineTotal;
          rows.push('<li><span>' + qty + ' &times; ' + label + '</span><strong>$' + lineTotal.toLocaleString() + '</strong></li>');
        }
      });

      totalEl.textContent = '$' + total.toLocaleString();
      breakdownEl.innerHTML = rows.length
        ? rows.join('')
        : '<li class="estimator-empty">Add stalls or markings to see a price.</li>';
    }

    steppers.forEach(function (stepper) {
      var input = stepper.querySelector('.stepper-value');
      var decBtn = stepper.querySelector('[data-action="dec"]');
      var incBtn = stepper.querySelector('[data-action="inc"]');

      decBtn.addEventListener('click', function () {
        input.value = Math.max(0, clampValue(input) - 1);
        recalc();
      });

      incBtn.addEventListener('click', function () {
        input.value = clampValue(input) + 1;
        recalc();
      });

      input.addEventListener('input', recalc);
    });

    recalc();
  }
});
