# Before-and-After Accessibility Audit

**Project:** CityCare Hospital patient appointment website
**Standard:** WCAG 2.1 Level AA
**Pages:** `before` = legacy `index.html` on `main`; `after` = refactored `index.html` on
`feature/semantic-accessible-refactor`
**Method:** scripted checks in Chrome 153 (Playwright) using identical tests on both pages:
DOM structure, computed colour contrast on every text element, real Tab-key navigation,
empty-form submission, mobile viewport (390px) and 200% zoom, and the browser accessibility tree.

> Lighthouse and WAVE could not be installed in the build environment. Run both on each
> page in Chrome and record the results in section 6.

## 1. Results

| Check | Before | After |
|-------|--------|-------|
| `div` elements | 67 | 25 |
| Landmarks (header, nav, main, aside, footer) | 0 | 5 |
| Sections / articles | 0 / 0 | 6 / 8 |
| `h1` count | 0 | 1 |
| Headings (levels in order) | none | 15, no skipped levels |
| `lang` attribute | missing | `en` |
| Page title | "Hospital" | descriptive |
| Viewport meta (mobile layout width) | missing (980px) | present (390px) |
| Meta description | missing | present |
| Skip link | none | present, first Tab stop |
| Images without `alt` | 4 of 4 | 0 of 4 |
| Form controls without an accessible name | 11 of 11 | 0 of 15 |
| Controls relying on placeholder only | 6 | 0 |
| Clickable `div`s not reachable by keyboard | 6 | 0 |
| Text contrast failures (WCAG AA) | 24 of 47 text elements | 0 of 77 |
| Tab stops without a visible focus indicator | 9 of 9 | 0 of 28 |
| Submit control reachable by keyboard | No (it is a `div`) | Yes (`button`) |
| Empty form submitted | "Thank you, appointment booked!" alert | Error summary, 8 inline errors, focus moved to summary |
| Input types used | text, select, radio, checkbox, textarea | text, email, tel, date, select, radio, checkbox, textarea |
| Required / pattern / autocomplete attributes | 0 / 0 / 0 | 8 / 1 / 7 |
| Horizontal scroll at 390px and 200% zoom | none | none |

## 2. Main defects found in the "before" page
1. No landmarks or headings, so screen-reader users cannot jump between regions.
2. Navigation, "Book Appointment" and "Submit" are `div` elements with `onclick`, so they cannot be reached or operated with the keyboard.
3. Form fields have no labels (placeholders only), radios and checkbox have no names, all inputs are `type="text"`.
4. `outline: none` removes the focus indicator.
5. Low colour contrast: white on light blue (2.26:1), grey `#999` text (2.3 to 2.85:1), light-blue headings (1.82:1).
6. No `lang`, generic title, no viewport meta, images without `alt`.
7. The form accepts an empty submission and reports success.

## 3. Fixes made in the "after" page
- Semantic structure: `header`, `nav` (list of links), `main`, `section` with `aria-labelledby`, `article`, `aside`, `footer`, `address`, `time`.
- Heading outline: one `h1`, `h2` per section, `h3` per card.
- Form: `label` for every control, `fieldset`/`legend` for the radio group, the checkbox group and each form section, correct types (`email`, `tel`, `date`), `autocomplete`, `required`, `pattern`, `min`/`max` on dates, hints linked with `aria-describedby`.
- Validation: error summary (role `alert`) that receives focus and links to each field; inline messages with an icon (not colour only); `aria-invalid`; success message (role `status`).
- Keyboard: skip link, native `a` and `button` elements, visible 3px focus ring (including date inputs), 44px minimum targets.
- Visual: palette with at least 4.5:1 contrast, `prefers-reduced-motion` and forced-colours support.

## 4. Form validation tests (after page)
| Scenario | Result |
|----------|--------|
| Submit empty | Summary shown and focused; 8 messages |
| Bad inputs (future birth date, "bad" email, 2-digit phone, past appointment date) | Specific message for each |
| Department chosen | Doctor list filtered (Cardiology shows Dr. Anita Rao only) |
| Valid submission | Success message shown and focused |
| Arrow keys in radio group | Move selection |

## 5. Accessibility tree comparison
See `docs/aria-before.txt` and `docs/aria-after.txt`. In the before page every control
appears as an unnamed `radio`, `checkbox` or a `textbox` named only by its placeholder.
In the after page each control has a name, groups are announced ("Preferred time",
"Reminders (optional)") and the form is a named region.

## 6. Lighthouse and WAVE (to be completed on your machine)
| Page | Lighthouse Accessibility | WAVE errors | WAVE contrast errors | WAVE alerts |
|------|--------------------------|-------------|----------------------|-------------|
| Before | ____ / 100 | ____ | ____ | ____ |
| After | ____ / 100 | ____ | ____ | ____ |

## 7. Remaining recommendations
- Test with NVDA (Windows) or VoiceOver (macOS) using `docs/screen-reader-test.md`.
- Replace placeholder names, phone numbers and the address with real hospital data.
