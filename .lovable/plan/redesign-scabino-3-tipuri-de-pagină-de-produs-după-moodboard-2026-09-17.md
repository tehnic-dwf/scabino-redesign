# Redesign Scabino — 3 tipuri de pagină de produs, după moodboard + audit

Pagina de produs existentă (Medicube Body Peel Shot) devine referința „Single SKU”, apoi adăugăm două tipuri noi: pachet (duo/trio) și rutină completă. Toate respectă identitatea Scabino: logo, paletă burgundy/bej/roz, Montserrat, fotografii reale.

## Principiul de bază

În 15 secunde clienta trebuie să înțeleagă: ce este → este pentru mine → când NU este pentru mine → cu ce îl compar → pot să-l folosesc cu ce am deja → ce cumpăr acum. Ton calm, fără hype, fără countdown, fără promisiuni nedovedite.

## A. Corecții pe pagina de produs actuală (din audit)

1. **Galerie completă** — 4–6 vizuale: produs, textură/pulverizare, etichetă cu ingrediente, aplicare. Miniaturi vizibile, nu un singur indicator.
2. **Linie de beneficiu sub titlu** — o frază care spune ce rezolvă produsul, separată de numele tehnic.
3. **Card „Verdict în 15 secunde”** — rol principal, textură, finish, parfum, moment AM/PM, nivel de rutină, „cel mai util dacă…”.
4. **Bloc „Alege-l dacă / Probabil nu dacă”** — aceeași greutate vizuală, 2–4 motive fiecare, cu trimitere spre alternativă.
5. **Încredere lângă buton** — un rând compact: produs original, metode de plată, retur, livrare. Nu doar în subsol.
6. **Loialitatea se micșorează** — o singură linie („+119 puncte cu această comandă”), mutată sub butonul principal, nu card de aceeași mărime.
7. **Chips-urile de atribute** — fie devin filtre reale care duc la categorie, fie primesc stil clar de etichetă informativă.
8. **Progres spre livrare gratuită** — „mai adaugă X lei pentru livrare gratuită”, lângă preț și în coș.
9. **Bloc „Ce știm / ce nu promitem”** — ce spune brandul, ce vedem în formulă, dovada dacă există, interpretarea noastră, ce nu promitem.
10. **Comparație cu maximum 2 alternative** — criterii: rol principal, textură, intensitate, nivel de experiență. Fără „câștigător”.
11. **Compatibilitate** — se combină / atenție / ai deja funcția acoperită.
12. **Cross-sell după logica rutinei** — „ce îi lipsește rutinei tale”, nu „alții au mai cumpărat”. Maximum 2–3 produse, marcate necesar/opțional.
13. **Recenzii cu filtre** — tip de ten, problemă, experiență; plusuri/minusuri vizibile, inclusiv păreri mai puțin favorabile.
14. **Feedback clar la adăugarea în coș** și ținte de atingere de minimum 44px pe mobil.

## B. Pagină nouă: pachet (duo/trio)

- Titlu orientat spre problemă, nu spre promoție.
- Preț separat real vs preț pachet + economia în lei și procent.
- „De ce sunt împreună” — roluri complementare, fără sinergie inventată.
- „Este pentru tine?” cu non-fit explicit: ai deja protecție solară → ia doar serul etc.
- Card pentru fiecare produs din pachet: rol, ingredient relevant, volum, link spre pagina lui.
- Protocol dimineață/seară sub formă de mic program vizual.
- Așteptări realiste: ce se poate observa vs ce nu cronometrăm.
- Verificare de suprapunere: bifezi ce folosești deja.
- Recenzii separate pentru pachet.

## C. Pagină nouă: rutină completă

- Titlu pe problemă și nivel („Rutină de bază pentru ten mixt și sensibil — 4 pași”), preț, economie.
- Configurator limitat: sensibilitate, experiență, textură preferată. Nu se poate înlocui orice pas cu orice produs.
- Program general: ce folosești dimineața, ce seara, ce e de bază și ce e opțional.
- Card pentru fiecare pas: rol, de ce există, produsul ales.
- Introducere treptată: începe cu baza, adaugă un produs nou pe rând.
- „Dacă pielea reacționează” — ce faci, calm, fără alarmă.
- Maximum 1–2 completări țintite.
- Reamintiri de reaprovizionare per produs, pentru că nu se termină simultan.
- Recenzii doar de la cumpărătorii setului.

## D. Sistem vizual comun

- Bază editorial-calmă, mult spațiu alb, colțuri moderate, umbre minime.
- Accent verde/teal foarte discret pentru „se potrivește”, accent cald coral/cărămiziu pentru limite — niciodată roșu alarmist.
- Gri-albastru discret pentru dovezi, ca să se distingă de mesajul comercial.
- Un singur buton dominant pe ecran, lângă preț.
- Pe mobil: orice secțiune lungă devine secțiune pliabilă; bara lipicioasă de cumpărare rămâne.

## Detalii tehnice

- React + TanStack Start, Tailwind, componente existente (`Header`, `Footer`, `ProductGallery`, `Reviews`, `ProductCard`).
- Componente noi partajate: `VerdictCard`, `FitNonFit`, `TrustRow`, `EvidenceBlock`, `CompareTable`, `CompatibilityBlock`, `RoutineGapCrossSell`, `FreeShippingProgress`, `SkuBreakdown`, `RoutineSchedule`, `RoutineCustomizer`.
- Rute: `/p/$slug` (single SKU), `/set/$slug` (pachet), `/rutina/$slug` (rutină completă).
- Date demonstrative locale în `src/data/`, extinse cu atribute de verdict, fit/non-fit, dovezi, compatibilitate și pași de rutină.
- Fără backend; coșul și favoritele rămân în memorie, ca prototip.

## Ordinea de lucru

1. Upgrade pagina de produs existentă (punctele A1–A14).
2. Pagina de pachet.
3. Pagina de rutină completă.
4. Apoi homepage, categorie, coș, checkout, confirmare.
