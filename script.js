// Mr. Striper — small interactions

function initSite() {
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

  // Contact form submission (Web3Forms)
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var submitBtn = document.getElementById('contactSubmitBtn');
    var statusEl = document.getElementById('formStatus');
    var submitBtnDefaultText = submitBtn.textContent;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.success) {
            throw new Error(data.message || 'Submission failed.');
          }
          contactForm.reset();
          statusEl.textContent = "Thanks! Your request is in — we'll be in touch soon.";
          statusEl.className = 'form-status form-status-success';
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong sending that. Please call or email us directly instead.';
          statusEl.className = 'form-status form-status-error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtnDefaultText;
        });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite);
} else {
  initSite();
}
