# Dokumentation

### _Valgfrie opgave løst: **Opgave C - Cookies**_

## **Tech Stack**

### **React**
Jeg bruger React som mit framework i denne opgave, først og fremmest fordi det er det framework jeg føler mig mest hjemme i, og derfor kan arbejde hurtigt, effektivt, og mere detaljeorienteret.

Desuden har jeg valgt det, da det gør koden mere overskuelig, og derved arbejdet mere effektivt, da det introducerer brugen af komponenter.

### **Router**
React giver også mulighed for at undgå page-load ved brug af routeren @reach/router, hvilket optimerer min app og gør den hurtigere for brugeren.

### **SCSS (Sass)**
Til at håndtere min CSS har jeg valgt at bruge Sass. Sass tillader mig at gemme information i variabler, så det er let og effektivt at ændre f.eks. en font-størrelse over alle dokumenter, i stedet for at skulle gøre det manuelt, hvilket hurtigt kan føre til fejl.

Sass gør også min CSS mere overskuelig, da den tillader nesting, så jeg undgår super lange dokumenter.

### **Axios**
Mine HTTP-requests bliver foretaget af Axios, som jeg har valgt at bruge fordi den automatisk transformerer JSON-formater, og desuden virker på langt flere browsere end fetch gør.

### **useForm fra react-hook-form**
Til min log ind process har jeg brugt react-hook-form, da dette gør det langt nemmere at validere (læs: kortere kode, mere overskuelig kode).

### **react-icons**
Til visning af ikoner i appen bruger jeg ikoner fra `react-icons`, da denne pakke har et større udvalg end FontAwesome, som jeg ellers tidligere har brugt.

## **Kodeeksempel**
Målet med søgesiden var følgende:
* Når siden åbnes vises kun søgefeltet
* Når brugeren skriver i søgefeltet kommer resultater for matchende hold frem under søgefeltet
* Er der ingen matches vises en besked om, at der ingen resultater var

Jeg lægger ud med at oprette et axios kald, som henter alle aktiviteter som findes i APIet.

Derefter opretter jeg en funktion med parameteret event (ses første kodeeksempel herunder), da funktionen først udføres når eventet `onKeyUp` bliver udført i søgefeltet.

Inde i funktionen opretter jeg et nyt, midlertidigt array, som jeg kan bruge til at filtrere alle aktiviteter som jeg hentede i mit axios kald. Dette gør jeg da funktionen overskriver det originale array, hvilket - hvis vi arbejdede direkte med arrayet fra APIet - ville returnere et ubrugeligt array. Derfor opretter jeg et midlertidigt array hver gang brugeren taster noget i søgefeltet; på denne måde bliver ingen information overskrevet, og jeg har konstant adgang til hele arrayet fra mit axios kald.

Inde i mit midlertidige array, som bliver gemt i variablen `tempArray`, filtrerer jeg hen over hver eneste aktivitet i arrayet. Først tjekker jeg, via et `if statement`, hvorvidt der overhovedet er skrevet noget i søgefeltet - om mængden af karakterer som brugeren har tastet er over 1.

Inde i det `if statement` tjekker jeg så, via en håndfuld if statements, hvorvidt en specifik `key's value` matcher hvad der er blevet tastet i søgefeltet.

Hvis dette er tilfældet (true), så returneres en liste af matchende søgeresultater (se andet kodeeksempel herunder), og ellers vises intet. Funktionen med at intet vises er integreret så brugeren ikke ser samtlige aktiviteter når de loader siden, men bare en blank side.

Al denne information bliver gemt i et nyt `state` (`searchResults`) så jeg har adgang til det længere nede i min kode.

```javascript
function search(event){
    var tempArray = activities.filter(element => {
        if(event.target.value.length >= 1){
            if(element.name.toLowerCase().includes(event.target.value.toLowerCase())){
                return true
            } 
            if(element.weekday.toLowerCase().includes(event.target.value.toLowerCase())){
                return true
            }
            if(element.description.toLowerCase().includes(event.target.value.toLowerCase())){
                return true
            }
        } else {
            setsearchResults([]);
        }
    })

    setsearchResults(tempArray);
}
```
Nede i mit return tjekker jeg først hvorvidt `openClose` er true, hvilket er et state gemt i en context, som sættes til `true` når brugeren markerer søgefeltet.

Jeg laver en `ternary iterator` som tjekker om `searchResults`, det midlertidige array som oprettes via søgefeltet, overhovedet returnerer noget. Er dette ikke tilfældet, så vises en besked om, at brugeren skal prøve at søge igen. Men hvis `serachResults` ikke er tom, så itererer jeg hen over det for at returnere hver enkelt resultat i listeform. I dette tilfælde bliver hvert resultat vist ved hjælp af et komponent.

```javascript
{openClose && 
<ul className="search__liste">
    {searchResults.length === 0
    ? <p className="noResults">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet</p>
    : searchResults.map(function(activity){
        return(
            <AktivitetCard
                to={`/aktiviteter/${activity.id}`}
                key={`${activity.id}${activity.name}`}
                alt={activity.name}
                src={activity.asset.url}
                name={activity.name}
                minAge={activity.minAge}
                maxAge={activity.maxAge}
            />
        )
    })}
</ul>}
```