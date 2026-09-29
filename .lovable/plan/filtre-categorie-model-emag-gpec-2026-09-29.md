# Filtre categorie — model eMAG + GPeC

## Ce schimbăm
- Păstrăm denumirile și conținutul actual al filtrelor.
- Afișăm maximum 6 opțiuni în fiecare grup; restul apar prin „Vezi mai multe”, cu „Vezi mai puține” pentru restrângere.
- Pentru „Brand” și „Ingredient activ”, adăugăm căutare în interiorul listei când există mai mult de 6 opțiuni.
- Opțiunile selectate rămân primele și vizibile, inclusiv când lista este restrânsă.

## Desktop
- Filtrele rămân permanent în coloana laterală.
- Produsele și numărul rezultatelor se actualizează imediat după fiecare selecție, fără buton de aplicare.
- Filtrele active apar deasupra produselor, fiecare cu eliminare individuală, plus „Șterge toate”.

## Mobil
- Panoul ocupă ecranul și are antet și acțiuni fixe; doar conținutul paginii poate fi derulat, fără scroll în interiorul vreunui filtru.
- Numărul de rezultate din buton se actualizează pe loc pe măsură ce utilizatorul selectează.
- „Vezi X produse” confirmă selecția și închide panoul; „Șterge filtrele” resetează selecția în curs.

## Stări speciale
- Combinațiile fără rezultate sunt semnalate înainte de confirmare prin „Vezi 0 produse”.
- După aplicare, pagina fără rezultate păstrează filtrele active și permite eliminarea lor individuală sau integrală.
- Verificăm fluxul la 393 px și desktop, inclusiv lipsa scrollului orizontal.
