# Dokumentation

Albert Pinnerup Andersen - WU13

## Techstack

- Next.js
- TailwindCSS
- TypeScript
- Zod
- ShadCN

Jeg har valgt Next.js, da jeg syntes det er rart at få en masse ting serveret på et sølvfad. Framworket gør blandt andet brug af filbaseret routing, serverside-rendering og nem konfigurering af caching. Det gør at jeg ikke selv skal sammensætte mange forskellige eksterne pakker og biblioteker. Der er ingen grund til at genopfinde den dybe tallerken, når andre udviklere har siddet med den hovedpine i mange år før mig.

At næsten al funktionalitet er samlet et sted gør det meget nemmere for mig at læse dokumentation, da jeg ikke konstant skal skifte mellem forskellige økosystemer.

Jeg har valgt at bruge TailwindCSS, da det muliggør at have min styling side om side med min logik - det reducere fil/kontekst skift, hvilket for mig giver en bedre "developer experience", end hvis jeg f.eks. havde valgt SASS, hvor styling foregår i et seperat dokument.
Jeg kan godt lide at arbejde atomiseret, altså at bygge UI af en masse små komponenter. Tailwind gør, at min styling og markup hænger tæt sammen, hvilket betyder, at jeg kan iterere hurtigere, da ikke skal navigere imellem tonsvis af filer.

Jeg har valgt at bruge TypeScript, da det også giver mig en bedre developer experience. Det er en kæmpe gave, når man skal håndtere data fra et API, props på komponenter osv., da typerne hjælper med at sikre, at data har den forventede struktur.

Det betyder, at mange fejl bliver fanget allerede ved build-time frem for først at opstå under runtime, hvilket gør udviklingsprocessen mere stabil og forudsigelig.
Samtidig gør TypeScript det meget nemmere at arbejde på andres kode samt at refaktorere, da de forventede datatyper allerede er defineret og dokumenteret DIREKTE i kode basen.

## Tredjeparts kode

- shadCN
  UI komponent bibliotek. koden bliver lagt direkte ind i ens projekt så man kan ændre den hvis man har lyst. ShadCN gør at jeg kan bruge min tid på vigtig logik istedet for at designe komponenter som andre har perfektioneret og gjort 100 gange før.
  Jeg har blandt andet brugt ShadCN til min carousel, buttons og menu.
  Jeg har valgt at bruge shadCN frem for andre komponent biblioteker (som f.eks. heroUI), da det er openSource og, som nævnt før, så bliver koden lagt direkte ind i ens kode base, så man har rent faktisk ownership over ens kode.

- Zod
  runtime type validering. Bruges til at lave error messages og type validere formularer. Da typescript kun kører ved buildtime, så er zod rigtig rart at have, så der ikke bliver sendt 'ulovlig' data til ens formularer.
  Jeg har valgt Zod, fremfor andre biblioteker som f.eks. yup, da Zod er bygget TIL typescript og ikke som en eftertanke. Dette gør at jeg kan bruge mine schemas som en "single source of truth", så jeg ikke skal holde både types og schemas i sync.

## Valgfri opgave

Jeg har valgt at løse valgfri opgave B

## Valg undervejs

Jeg har forsøgt så vidt som muligt, at splitte logik op og strukturere projektet. Det vil sige en mappe til alle layouts (der ikke er root layout), en fil til auth helpers, en mappe til actions, route groups osv. Dette er for at nemmere at kunne holde overblik og for ikke at komme til lave spaghette kode.
Jeg har valgt ikke at bygge UI til de komponenter der kræver at jeg løser endnu en valgfri opgave. Dette har jeg gjort for at give brugeren bedre helheds oplevelse - altså ikke lave UI der ikke kan/gør noget.
Jeg har også valgt kun at låse "my profile" siden bag authentication - det har jeg gjort da jeg fandt det nemmere og mere elegant at lave conditional rendering på de komponenter og sider hvor der var enkelte ting låst bag authentication.

## Kode Eksempel

```jsx
    export default async function classesDetailsPage({ params }: { params: Promise<{ id: string }> }) {
        const { id } = await params;
        const cookieStore = await cookies();

        const classId = Number(id);

        if (!Number.isInteger(classId) || classId <= 0) {
            notFound();
        }

        const classSingle: ClassesType = await fetchUtil(`classes/${String(classId)}`);

        console.log('single class', classSingle);

        if (!classSingle?.id) {
            notFound();
        }
        const userId = cookieStore.get('userId')?.value;

        const isAuthenticated = await checkAuthentication();

         let user;

        if (isAuthenticated) {
            user = await getUser();
            } else {
                user = 'default';
            }

        const initialJoinedState =
            classSingle?.users?.some((user) => user.id === Number(userId)) || false;

        const ratingsData = await fetchUtil(`classes/${classId}/ratings`);

        const avgRating = ratingsData.length
            ? ratingsData.reduce((sum: number, current: RatingType) => sum + current.rating, 0) /
            ratingsData.length
            : 0;

        const roundedRating = Math.ceil(avgRating);

        const trainer: TrainerType = await fetchUtil(`trainers/${classSingle.trainerId}`);

        return (
            <ClassDetailsClient
                classSingle={classSingle}
                classId={classId}
                initialJoinedState={initialJoinedState}
                role={user.role}
                isAuthenticated={isAuthenticated}
                rating={roundedRating}
                trainer={trainer}
            />
        );
    }
```

dette er koden til min classes details page.

- Jeg starter med at destrukturere id ud af params. Jeg bruger await da funktionen er asynkron (hvis ikke der bliver sagt await, bliver der kun retuneret et promise).

- Derefter deklarere og initialisere jeg variablen cookieStore. dens værdi er det objekt der bliver returneret, når promise'et fra cookies() bliver resolved.

- det samme gør jeg med classSingle. Jeg bruger en fetch hjælpe funktion jeg har skrevet, så jeg ikke skal skrive den samme URL hver gang jeg fetcher. værdien ender med at være et objekt med en ClassType data form.

- Jeg bruger cookieStore til at læse cookien med name "userId' og gemmer dens værdi i variablet userId.

- igen gemmer jeg et user objekt der bliver fetchet med en hjælpe funktion jeg har skrevet.

- InitialsJoinedState bruger jeg til at tjekke om den nuværende bruger allerede er tilmeldt class'en. Det gør jeg ved at tjekke om det userId der er i cookies allerede findes på det array over tilmeldte brugere der findes i classSingle objektet. Jeg bruger array metoden some, der enten returnere true eller false, hvis den finder et element i array der opfylder den test funktion, der bliver passed til den.

Jeg "passer" alle disse variabler som props til ClassesDetailsClient komponentet.
Jeg gør det på denne måde da ActivityDetailsClient komponentet gør brug af useActionState. Til at starte med brugte jeg state (destruktureret ud af useActionState) til at checke hvor vidt brugeren havde tilmeldt sig den givne aktivitet. Det gik hurtigt op mig at state blev nulstillet på hvert reload og at det derfor ikke stemte overens med back-enden. derfor checker jeg nu på serveren hvor vidt brugereren er tilmeldt en aktivitet, og passer true eller false til useActionStates, initialState.
Den løsning viste sig også at gøre koden mere overskuelig, da jeg før brugte en useEffect med en async IIFE (immediately invoked function expression) til at initialisere alle mine variabler (noget rod).

