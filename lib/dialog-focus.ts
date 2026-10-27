import type { KeyboardEvent } from 'react';
/** Keep keyboard navigation inside the modal, including Safari's boundary cases. */
export function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return;
  const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), iframe, [tabindex="0"]')).filter(element => element.getClientRects().length > 0);
  const first = elements[0], last = elements[elements.length - 1];
  if (!first || !last) return;
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !event.currentTarget.contains(active))) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && (active === last || !event.currentTarget.contains(active))) {
    event.preventDefault(); first.focus();
  }
}
