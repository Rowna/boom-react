
## Einen neuen Artikel zum Cart hinzufuegen

1. Der Nutzer drückt auf den "Add-to-cart" button im "Catalog"
2. Im Event-listener
   1. Die benötigten Artikel-Daten aus dem Firestore holen: Das ist das komplette Artikel-Dokument (`getDoc()`), nicht nur seine ID. Also das komplette Artikel-Objekt bzw. nur die fields, die fuer den Cart gebraucht werden. Dazu gehoert auch die ID. 
      1. ich baue dazu im Event-Handler ein neues Cart-Objekt, in dem ich nur die fields ablege, die nachher wirklich im Cart gebraucht werden.
   2. in `doc(db, "users", user.uid, "cart")` wird nun das komplette Cart-Artikel-Objekt angefügt.
   3. Das Outline-Cart-Icon durch ein "filled"-Icon austauschen.


__Erklärung zu 2.2:__\
Unsere App interessiert sich nicht dafür, welche User einen bestimmten Artikel (z.B. Sommeranzug) in ihren Carts haben. Sie interessiert sich aber dafür, welche Artikel User "Perrin" in seinem Cart hat. Deshalb gehören die Artikel im Cart zum User, und nicht der User zu "seinen" Artikeln.

## Einen Cart-Artikel aus dem Cart löschen

1. Der Nutzer drückt auf den gefuellten "Add-to-cart" button
2. Im Event-listener
   1. die Artikelnummer aus dem Cart-Array in `users/\${$app.user.uid}/cart` löschen
   3. Das Outline-Cart-Icon durch ein "filled"-Icon austauschen.

# TODO fuer später:

Wenn der user sich einloggt, sollen schon beim Aufbau des Katalogs die Cart-Symbole gefüllt sein, wenn ein bestimmter Artikel bereits im Cart liegt! Er muss das wissen, damit er nicht aus versehen einen Cart-Artikel löscht, der eigentlich im Cart liegt!

WEG --
Das Update in die Datenbank sollte bei `onDestroy` gesammelt erfolgen, wenn diese Page verlassen wird. Sonst wird bei jedem kleinen Klick auf den Cart eine komplizierte Datenbankabfrage gestartet. Wenn einer nur mit den Buttons rumspielt, koennen da über 100 Datenbankabfragen entstehen!!!



