## Refactor the hospital appointment page to semantic, accessible HTML

### Summary
Refactors the legacy `div`-based CityCare Hospital page into semantic HTML5 and makes the
patient appointment form accessible and validated.

### Changes
- **Structure:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`; one `h1` with a strict `h2` and `h3` outline.
- **Form:** real `label`s, `fieldset` and `legend` groups, `email`, `tel` and `date` inputs, `autocomplete`, `required`, patterns and date limits.
- **Validation:** error summary with links, inline messages, `aria-invalid`, success message, doctor list filtered by department.
- **Keyboard:** skip link, native links and button, visible focus ring, no `onclick` on `div`s.
- **Visual:** inline styles moved to `css/styles.css`; contrast raised to WCAG AA; responsive layout.
- **Metadata:** `lang`, viewport, descriptive title and description.

### Before and after (scripted audit)
| Check | Before | After |
|-------|--------|-------|
| Landmarks | 0 | 5 |
| Unnamed form controls | 11 | 0 |
| Contrast failures | 24 | 0 |
| Tab stops without focus ring | 9 | 0 |
| Submit reachable by keyboard | No | Yes |
| Empty form accepted | Yes | No |

Full report: `docs/accessibility-audit.md`. Screen-reader test sheet: `docs/screen-reader-test.md`.

### How to test
1. Open `index.html` and press Tab: the skip link is first.
2. Submit the form empty: the error summary appears and takes focus.
3. Fill the form and submit: the success message appears.
4. Run Lighthouse and WAVE and compare with the `main` branch.

### Checklist
- [x] Semantic landmarks and heading hierarchy
- [x] Labels, input types, validation
- [x] Keyboard navigation and focus indicators
- [x] Before-and-after audit
- [ ] Screen-reader test completed (see test sheet)
