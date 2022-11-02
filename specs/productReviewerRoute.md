

## Artikel mit mehr Attributen für Cart auswählen

1. (Ohne User-Auswahl): User klickt den Button "add to Cart" ohne selbst Color- und Size auszuwählen, dann wird das erste Element aus color-Array mit size-Array ins Shopping Cart gelegt. 

2. (Mit User-Auswahl): wenn der User eine Farbe oder eine Große auswählt, dann werden diese ausgewählten Werte zusammen mit article-id ins Shopping-Cart gelegt.

"Ins Shopping Cart gelegt" bedeutet: 
Es erfolgt eine Abfrage ans Backend, in der alle Elemente des Artikels mit den richtigen Updates zum Überschreiben in die Datenbank geschickt werden (reset).  

## Um fortzufahren müssen folgende Dinge passieren: 
1. Ich muss das aktuelle Cart-Objekt als Variable in meinem Code holen
2. ich muss das aktuelle cart-objekt mit hilfe der neuen Daten updaten.
3. ich muss das upgedatete cart-objekt ins Backend schicken, damit das update auch in der Datenbank ankommt.

Wenn alles erfolgreich ist, muss das aktuelle cart-objekt in der anwendung angezeigt werden.