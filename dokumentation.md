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

- React Toastify
  Toastify er bibliotek der gør det nemt at lave toasts, så brugeren får en god respons når de bruger appen. Jeg bruger det kun til contact form og news letter signup, da jeg ikke har fundet det relevant andre steder.

- Lucide
  Lucide er et icon bibliotek - det er en pakke der blev installeret sammen med NextJS, men jeg syntes det er fedt hvor nemt de har gjort det at style SVG'er.

## Valgfri opgave

Jeg har valgt at løse valgfri opgave B

## Valg undervejs

Jeg har forsøgt så vidt som muligt, at splitte logik op og strukturere projektet. Det vil sige en mappe til alle layouts (der ikke er root layout), en fil til auth helpers, en mappe til actions, route groups osv. Dette er for at nemmere at kunne holde overblik og for ikke at komme til lave spaghette kode.
Jeg har valgt ikke at bygge UI til de komponenter der kræver at jeg løser endnu en valgfri opgave. Dette har jeg gjort for at give brugeren en bedre helheds oplevelse - altså ikke lave UI der ikke kan/gør noget.
Jeg har også valgt kun at låse "my profile" siden bag authentication - det har jeg gjort da jeg fandt det nemmere og mere elegant at lave conditional rendering på de komponenter og sider hvor der var enkelte ting låst bag authentication.
I følge kravspecifikationen skal der være en back knap på details, search og profile der leder tilbage til Home. Det har jeg valgt at fortolke lidt, så knappen leder brugeren tilbage til den side de var på før. Efter min erfaring, så er det den forventede funktionalitet af såden en knap og jeg har derfor valgt at implementere det.
Med hensyn til splashScreen har jeg igen fortolket kravspecifikationen lidt. Jeg har valgt at gøre så splashScreen kun vises hver gang du starter en ny browser session. Dette har jeg gjort, da det igen efter min erfaring, er den forventede brugeroplevelse. Jeg ville selv blive irriteret hvis jeg skulle se en splash screen hver gang jeg åbnede den samme side, i løbet af den samme brower session.

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

    if (!classSingle.id || !classSingle.users) {
        notFound();
    }

    const userId = cookieStore.get('userId')?.value;
    const isAuthenticated = await checkAuthentication();

    let user;

    if (isAuthenticated) {
        user = await getUser();
    } else {
        user = {
            role: 'default',
        };
    }

    const initialJoinedState = classSingle?.users?.some((user) => user.id === Number(userId));

    const ratingsData = await fetchUtil(`classes/${classId}/ratings`);

    const avgRating = ratingsData.length
        ? ratingsData.reduce((sum: number, current: RatingType) => sum + current.rating, 0) /
          ratingsData.length
        : 0;

    const roundedRating = Math.ceil(avgRating);

    const trainer: TrainerType = await fetchUtil(`trainers/${classSingle.trainerId}`);

    if (!trainer) {
        notFound();
    }

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

Jeg starter med at destrukturere id ud af params. Jeg bruger await da siden er et asynkront server komponent (hvis ikke der bliver sagt await, bliver der kun retuneret et promise).

```jsx
const { id } = await params;
```

Derefter deklarere og initialisere jeg variablen cookieStore. dens værdi er det objekt der bliver returneret, når promise'et fra cookies() bliver resolved.

```jsx
const cookieStore = await cookies();
```

Derefter laver jeg const classId og initialisere den til at være id coerced til et number. Herefter har jeg et guard clause der tjekker om classId er et heltal eller nul eller mindre hvis det er bliver brugeren ledt til notfound()

```jsx
const classId = Number(id);
if (!Number.isInteger(classId) || classId <= 0) {
    notFound();
}
```

Nu deklarere og initialisere jeg classSingle. Jeg bruger en fetch hjælpe funktion jeg har skrevet - den hjælper mig med at undgå duplikeret kode og hvis nu backendens endpoint skulle ændre sig, så skal jeg kun rette det et sted. Værdien ender med at være et objekt med en ClassType data form.
Igen et guard clause, der tjekker om classSingle har et id eller om users arrayet findes (vi er ligeglade med om arrayet er tomt, det skal bare eksistere)

```jsx
const classSingle: ClassesType = await fetchUtil(`classes/${String(classId)}`);

if (!classSingle?.id || !classSingle.users) {
        notFound();
    }
```

**fetchUtil**

```jsx
export async function fetchUtil(query: string, method?: string, id?: string) {
    const url = id ? `${process.env.API_URL}/${query}/${id}` : `${process.env.API_URL}/${query}`;

    const response = await fetch(url, {
        method: method ? method : 'GET',
    });

    const data = await response.json();

    return data;
}
```

Jeg bruger cookieStore til at læse cookien med name "userId' og gemmer dens værdi i variablet userId. Herefter tjekker jeg om brugeren er authenticated. Funktionen returnere true eller false.

```jsx
const userId = cookieStore.get('userId')?.value;
const isAuthenticated = await checkAuthentication();
```

**checkAuthentication**

```jsx
export async function checkAuthentication() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const userId = cookieStore.get('userId')?.value;

    const response = await fetch(`${process.env.API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        return false;
    }

    return true;
}
```

Jeg gerne vil have at brugeren skal kunne se details siden UDEN at være logget ind, så derfor:

- Deklarere jeg et user variabel UDEN at initialisere det
- Hvis brugeren er authenticated, bliver user et user objekt der bliver fetchet med en hjælpe funktion jeg har skrevet.
- hvis ikke så er user bare 'default'

```jsx
let user;

if (isAuthenticated) {
    user = await getUser();
} else {
    user = {
        role: 'default',
    };
}
```

Herefter tjekker om brugerens id findes i det users array som classSingle indeholder, for at se om brugeren er tilmeldt class'en eller ej.
Jeg bruger Array metoden some, der returnere true hvis der bliver fundet et element der opfylder test funktionen - hvis ikke bliver der returneret false. I test funktionen sammenligner jeg hver brugerens id med det userId der er gemt i cookies.
Denne værdi bliver gemt i variablet initialJoinedState - det bliver passed til et client komponent.

```jsx
const initialJoinedState = classSingle?.users?.some((user) => user.id === Number(userId));
```

Herefter henter jeg ratings for den givne class. Derefter udregner jeg gennemsnittet af ratings ved hjælp af array-metoden reduce(). reduce() tager to argumenter: en callbackFn og en initialValue.

Callback-funktionen modtager to parametre - en accumulator (kaldet sum i dette tilfælde) og currentValue, som repræsenterer det aktuelle element i arrayet. For hver iteration lægges den aktuelle rating til sum. initialValue sættes til 0, så summeringen starter fra nul.

Når alle ratings er lagt sammen, divideres resultatet med antallet af elementer i arrayet for at finde gennemsnittet.

```jsx
const ratingsData = await fetchUtil(`classes/${classId}/ratings`);

    const avgRating = ratingsData.length
        ? ratingsData.reduce((sum: number, current: RatingType) => sum + current.rating, 0) /
          ratingsData.length
        : 0;
```

Da jeg gerne vil have at rating er i heltal runder jeg avgRating op og gemmer den nye værdi roundedRating. Jeg bruger Math.ceil() metoden, der runder et tal op til den næste integer (det vil sige at f.eks 3.01 -> 4), i modsætning til Math.floor() der runder ned af.

```jsx
const roundedRating = Math.ceil(avgRating);
```

Herefter henter jeg den trainer der har class'en.

```jsx
const trainer: TrainerType = await fetchUtil(`trainers/${classSingle.trainerId}`);

    if (!trainer) {
        notFound()
    }
```

Jeg "passer" alle disse variabler som props til ClassesDetailsClient komponentet.
Jeg gør det på denne måde da ClassDetailsClient komponentet gør brug af useActionState. Til at starte med brugte jeg state (destruktureret ud af useActionState) til at checke hvor vidt brugeren havde tilmeldt sig den givne aktivitet. Det gik hurtigt op mig at state blev nulstillet på hvert reload og at det derfor ikke stemte overens med back-enden. Derfor checker jeg nu på serveren hvor vidt brugereren er tilmeldt en class, og passer true eller false til useActionStates, initialState.
Den løsning viste sig også at gøre koden mere overskuelig, da jeg før brugte en useEffect med en async IIFE (immediately invoked function expression) til at initialisere alle mine variabler (noget rod).

## Forbedringer?

Hvis jeg skulle lave opgaven igen er der helt klart nogle ting, der kunne forbedres.  
Jeg kunne f.eks. hente brugeren og tjekke authentication i et layout og passe det til noget context. Lige nu laver jeg næsten et fetch på hver side hvor jeg enten henter brugeren eller tjekker authentication og derefter passer værdierne til client components, da jeg ikke har noget context.

Med context ville jeg kunne undgå prop drilling og få en mere læsbar kodebase, da brugerdata så kun skulle hentes ét sted og derefter kunne bruges flere steder i komponenttræet. Jeg har dog valgt ikke at bruge context, da jeg ikke føler mig særligt stærk i det endnu.

Jeg har i stedet valgt at fetche data direkte på de sider hvor de bliver brugt. Det gør koden lettere at læse, da hver side selv håndterer de data der er brug for, i stedet for at data skal sendes gennem flere komponenter via props.

Det betyder dog også at der nogle steder bliver lavet flere fetches end nødvendigt. Hvis appen skulle skaleres yderligere, ville det derfor give mening at samle noget af den logik et sted og gøre brugerdata tilgængelig via context.

Der er også steder i appen hvor _måden_ der bliver hentet data på kunne optimeres;

**Her er et godt eksempel:**

```jsx
const ratingsArr = await Promise.all(
        classesData.map((classItem: ClassesType, i) => {
            return fetchUtil(`classes/${classItem.id}/ratings`);
        })
    );
```

Lige nu er der kun 4 elementer i classesData, så det her ikke et problem. Men lad os sige at appen vokser og der pludselig er 1000 classes. Ja, så vil denne lille kode bid være meget tung for backenden, da der ville blive lavet 1000 requests på samme tid og 1000 Promises der forsøger at blive resolved parallet. Det kan i værste tilfælde føre til et crash af backend serveren eller en 429 (Too many requests) HTTP error.

Den bedste løsning ville selvfølgelig være at _lave et nyt endpoint_ der med et fetch, kunne give os alle ratings til alle classes, eller alternativt have ratings som en del af classes-objektet.
Hvis ikke dette kan lade sig gøre, så kunne man rate-limit eller throttle ens requests.
Der findes en masse pakker og biblioteker til dette, men det er desværre ikke noget jeg har haft tid til at implementere.

Jeg har skrevet her i min dokumentation at jeg godt kan lide at gå atomiseret til værks - jeg vil dog indrømme at det er skredet lidt nogle steder, f.eks i MenuClient.tsx (når man er i et godt flow, syntes jeg det kan være svært at skulle til at skifte filkontekst). Dette er helt klart også et punkt der ville kunne blive forbedret.
