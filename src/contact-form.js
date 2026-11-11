/**
 * contact-form.js — no backend: builds a mailto: link from the form and opens
 * the visitor's email app with the message filled in.
 */
export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    // `required` accepts whitespace-only input; reject it explicitly.
    const blank = !name ? form.elements.name : !message ? form.elements.message : null;
    if (blank) {
      blank.setCustomValidity('Please fill this in.');
      blank.reportValidity();
      blank.addEventListener('input', () => blank.setCustomValidity(''), { once: true });
      return;
    }

    const subject = `Portfolio inquiry from ${name}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`;
    const href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    if (status) {
      status.textContent = `Your email app should open now. If it doesn't, email ${form.dataset.to} directly.`;
    }
  });
}
