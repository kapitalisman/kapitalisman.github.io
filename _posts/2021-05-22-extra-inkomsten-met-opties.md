---
title: Extra inkomsten met opties
subtitle: Opties
image: /assets/images/options.jpg
description: Opties
author: sam
categories:
    - opties
layout: post
---

Sinds april ben ik gestart met het verkopen van put opties om extra inkomsten te genereren. Die extra inkomsten gebruik ik vervolgens om dividend aandelen te kopen, die op hun beurt weer voor extra inkomsten zorgen in de vorm van dividend.

## Put Opties

Door het verkopen van een put optie krijg je betaald om aandelen te kopen tegen een lagere prijs. Je krijgt dus eigenlijk een dubbele korting. Echter zal de koper een dergelijke optie pas uitoefenen als de prijs van het onderliggende aandeel is gezakt tot onder die vooraf vastgestelde lagere prijs.

Dit kan je goed vergelijken met het verkopen van een verzekering. De koper betaalt een premie en in geval van schade (de prijs van het aandeel zakt onder de uitoefenprijs van de optie) is de verkoper verplicht om die schade te vergoeden (door het kopen van de aandelen voor de uitoefenprijs).

Maar nu komt het: als verkoper van een put optie ben je veel flexibeler dan als verkoper van een verzekering. Als de prijs van het aandeel is gezakt dan kun je er namelijk voor kiezen om het contract een maand te verlengen. Hiervoor ontvang je extra premie en dit geeft het aandeel wat tijd om te herstellen en de schade ongedaan te maken. En als de prijs van het aandeel juist is gestegen dan kun je er ook voor kiezen om het contract vroegtijdig te beëindigen.

In beide situaties is het dus mogelijk om het risico te beheersen, mits hiervoor niet teveel marge benodigd is.

## Het margevereiste

Door een put optie te verkopen ga je een verplichting aan. Net als een verzekeraar voldoende kapitaal moet aanhouden om solvabel te zijn, moet je als verkoper van een put optie ook voldoende onderpand hebben. Dit heet het margevereiste. Hoeveel dit precies is hangt af van de verplichting die je aangaat.

Mijn broker bepaalt het margevereiste $$ M $$ als volgt:

<!--- Put Price + \max ((20% * Underlying Price - Out of the Money Amount), (10% * Strike Price)) --->
<div>
  $$ M = P + \max(K - 80\% \cdot S, 10\% \cdot K) $$
</div>

met $$ P $$ de prijs van de put optie, $$ K $$ de uitoefenprijs en $$ S $$ de prijs van het onderliggende aandeel. Je hoeft dit gelukkig niet zelf uit te rekenen en bovendien verandert het margevereiste continu, aangezien de prijs van het onderliggende aandeel ook steeds verandert.

Het voornaamste is dat het vereiste onderpand typisch slechts 10 tot 20 procent van de waarde van de onderliggende aandelen bedraagt. En de portefeuille met dividend aandelen voldoet als onderpand.

## Een voorbeeld

Op 12 april verkocht ik een put optie in het aandeel Pfizer. De optie had een uitoefenprijs van $35 en de vervaldatum was 21 mei. Het aandeel had destijds een prijs van ongeveer $37. De koper betaalde mij een premie van $47.

Indien de koper overgaat tot het uitoefenen van de optie ben ik verplicht om 100 aandelen Pfizer te kopen voor in totaal $3,500. Dit zal natuurlijk niet gebeuren zolang de marktprijs boven de $35 ligt.

Het margevereiste bedroeg initieel $587, oftewel 16.7% van $3,500. Het onderpand, mijn portefeuille met dividend aandelen, moet dus minimaal $587 waard zijn om aan het margevereiste te voldoen.

In de grafiek hieronder staat de winst als functie van de aandeelprijs. Het break-even punt ligt bij een aandeelprijs van $34.53.

<div class="chart-wrapper">
    <canvas id="payoff" width="400" height="200" align="left">Deze grafiek wordt door jouw browser niet ondersteund.</canvas>
</div>
<script src="{{site.baseurl}}/assets/js/charts/2021-05-22-script.js"></script>

Pfizer is uiteindelijk in waarde gestegen en sloot 21 mei op ongeveer $40. De optie vervalt dan waardeloos en ik heb geen verplichtingen meer. De ontvangen premie mag ik houden.

## Conclusie

Door de portefeuille als onderpand in te zetten voor het verkopen van put opties is het mogelijk om extra inkomen te genereren. Een positie van 100 aandelen Pfizer zou momenteel $156 per jaar aan dividend opleveren. De put optie heeft mij in zes weken $47, oftewel 30% van het jaarlijkse dividend, opgeleverd.