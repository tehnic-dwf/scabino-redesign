# Plan redesign Scabino

## Obiectiv
Construim un prototip frontend fidel identității actuale Scabino, ușor de sincronizat, partajat și rulat din GitHub. Redesignul va acoperi în final homepage, categorie, produs, coș, checkout și pagina de confirmare, începând cu **pagina de produs**.

## Direcție vizuală stabilită
- Păstrăm logo-ul, paleta burgundy–roz–alb, fonturile și limbajul vizual existente pe scabino.ro.
- Folosim imaginile reale de produs și elementele de brand disponibile pe site, fără a inventa o identitate nouă.
- Compoziție premium și aerisită, cu ierarhie mai clară și spațiere generoasă.
- Experiență adaptată complet pentru desktop și mobil.

## Etapa 1 — Pagina de produs

### Structură
1. **Antet Scabino**
   - bandă de livrare, logo, căutare, cont, favorite și coș;
   - navigarea principală existentă, reorganizată pentru lizibilitate;
   - variantă mobilă compactă.

2. **Zona principală a produsului**
   - galerie amplă cu imagine principală și miniaturi;
   - brand, denumire, rating, disponibilitate și cod produs;
   - descriere scurtă, preț, selector cantitate și buton „Adaugă în coș”;
   - favorite, expediere și livrare gratuită prezentate compact;
   - zona de cumpărare rămâne vizibilă la derulare pe desktop, fără a domina pagina.

3. **Argumente de alegere**
   - ingrediente-cheie, tip de ten, beneficii și momentul din rutină;
   - Scabino Loyalty integrat discret;
   - informația esențială este vizibilă înaintea textelor detaliate.

4. **Conținut detaliat**
   - detalii produs, beneficii, ingrediente, utilizare și informații suplimentare;
   - secțiuni pliabile și ușor de parcurs;
   - păstrăm conținutul real al produsului Medicube analizat de pe site.

5. **Recenzii și recomandări**
   - scor, distribuția evaluărilor, fotografii și recenzii reale;
   - formularul de recenzie ca fereastră dedicată;
   - produse recomandate într-o listă coerentă vizual.

### Interacțiuni incluse în prototip
- schimbarea imaginii principale din miniaturi;
- selector de cantitate;
- adăugare demonstrativă în coș și actualizarea contorului;
- favorite;
- deschiderea/închiderea secțiunilor și a formularului de recenzie;
- căutare și navigare demonstrativă între paginile existente în prototip.

## Etapele următoare
1. **Homepage** — prezentare de campanii, categorii, branduri și produse recomandate.
2. **Categorie** — listare, sortare, filtre și stare mobilă dedicată.
3. **Coș** — modificare cantități, eliminare produse, sumar și prag de livrare gratuită.
4. **Checkout** — date client, livrare, plată și sumar clar al comenzii.
5. **Thank you page** — confirmare, detalii comandă și pașii următori.

Toate paginile vor reutiliza același antet, subsol, produse, controale și reguli vizuale, astfel încât experiența să rămână consecventă.

## Implementare tehnică
- React cu TanStack Start și Tailwind CSS, în structura deja pregătită pentru versionare GitHub.
- Pagini separate, cu linkuri partajabile și informații proprii pentru motoare de căutare și social media.
- Date demonstrative locale pentru prima versiune; fără conectare la sistemul real de comenzi în această etapă.
- Componente comune pentru navigare, galerie, produs, preț, cantitate, recenzii și sumar de comandă.
- Imaginile Scabino vor fi preluate în proiect pentru o randare stabilă, nu încărcate direct de pe site la fiecare vizită.
- Verificare vizuală și funcțională pe desktop și mobil după fiecare pagină.

## Livrabilul primei etape
O pagină de produs Scabino completă și interactivă, construită în jurul produsului Medicube Hypochlorous Acid Body Peel Shot, care stabilește sistemul vizual și componentele reutilizabile pentru restul magazinului.
