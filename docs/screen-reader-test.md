# Screen-Reader Test Sheet

Test both pages with **NVDA** (Windows, free from nvaccess.org) and Chrome, or
**VoiceOver** (macOS, Cmd + F5). Complete the "Actual" columns yourself and note the
date, software and version.

Tester: __________  Date: __________  Software: __________

## Part A: What a screen reader is given (checked automatically)
The browser accessibility tree (`docs/aria-before.txt`, `docs/aria-after.txt`) shows
that the after page exposes named regions, a heading outline, named form controls and
named groups, while the before page exposes unnamed radios, an unnamed checkbox and
placeholder-only text boxes.

## Part B: Manual tests
| # | Task | Expected on AFTER page | Actual (before) | Actual (after) |
|---|------|------------------------|-----------------|----------------|
| 1 | Open page, press Tab once | "Skip to main content" link announced | | |
| 2 | Press D (NVDA) to jump through landmarks | banner, navigation, main, complementary, content info | | |
| 3 | Press H to jump through headings | One level 1 then level 2 and 3 headings in order | | |
| 4 | Press K to list links | Home, Services, Doctors, Appointment, Book an appointment | | |
| 5 | Tab to the name field | "Full name, edit, required" | | |
| 6 | Tab to the date of birth field | "Date of birth, required" (date type) | | |
| 7 | Tab to the email field | Label, hint "We will send your confirmation here", "required" | | |
| 8 | Tab to the radio group | "Preferred time, group, Morning, radio button, 1 of 3" | | |
| 9 | Press the arrow keys in the radio group | Selection moves and is announced | | |
| 10 | Tab to the consent checkbox | "I confirm the details are correct ..., checkbox, not checked, required" | | |
| 11 | Press Enter on "Request appointment" with the form empty | "There is a problem" announced; focus on the summary | | |
| 12 | Press Enter on a summary link | Focus moves to that field and its error is read | | |
| 13 | Fill the form correctly and submit | Success message is announced | | |
| 14 | Try to operate the before page with keyboard only | Navigation and Submit cannot be reached | | |

## Result summary
Issues found: ______________________________________________
