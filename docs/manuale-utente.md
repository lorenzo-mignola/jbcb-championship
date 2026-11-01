# Manuale Utente - JBCB Championship

Guida operativa completa per l'amministrazione di tornei di judo, gestione dei tabelloni, refertazione digitale degli incontri e generazione delle classifiche.

---

## 1. Configurazione Iniziale del Torneo

1. **Accesso all'applicazione**: Aprire il browser all'indirizzo dell'applicazione (es. `https://jbcb-championship.vercel.app/`).
2. **Autenticazione**: Effettuare l'accesso con un account Google autorizzato. Se l'account non è presente nella lista di autorizzazione, l'accesso verrà negato con apposita schermata di errore.
3. **Configurazione ID Torneo**:
   - Accedere alla sezione **Impostazioni** dal menu di navigazione.
   - Nel campo **Torneo**, inserire l'identificativo testuale univoco del torneo (es. `campionato-2026`).
   - L'identificativo viene salvato localmente nel browser e associato a tutte le operazioni di creazione e visualizzazione delle categorie.
4. **Gestione Club Predefiniti**:
   - Sempre in **Impostazioni**, è possibile pre-popolare l'elenco dei **Club** partecipanti per facilitare l'inserimento degli atleti durante la creazione delle categorie.

---

## 2. Gestione delle Categorie

### Creazione di una nuova categoria (`/new`)

Dalla schermata principale o dal menu, selezionare **Nuova categoria**:

1. **Nome categoria**: Inserire il nome descrittivo (es. `U15 Maschile -50kg`).
2. **Durata incontro**: Impostare la durata ufficiale dei singoli incontri (in minuti/secondi).
3. **Tipologia di categoria**:
   - **Pool singola**: Girone all'italiana (tutti contro tutti). Consigliato per 3–5 atleti.
   - **Doppia pool**: Due gironi distinti (Pool A e Pool B) con semifinali incrociate (1° A vs 2° B, 1° B vs 2° A) e finale per il 1°/2° posto. I perdenti delle semifinali ottengono il 3° posto a pari merito. Consigliato per 6–8 atleti.
   - **Doppia eliminazione (Tabellone con ripescaggio / 2KO)**: Tabellone principale vincitori con tabellone di recupero completo per l'assegnazione dei due terzi posti. Consigliato per 8 o più atleti.
4. **Inserimento atleti**: Aggiungere i judoka inserendo nome, cognome e club di appartenenza.
5. **Salvataggio**: Premendo il pulsante di conferma, il sistema genera automaticamente la griglia di incontri secondo le regole della formula scelta e assegna il primo incontro in programma.

### Visualizzazione e monitoraggio categoria (`/categories/[category_id]`)

Dall'elenco delle categorie (`/categories`), selezionare la categoria desiderata per visualizzare:

- **Elenco atleti iscritti** e club di appartenenza.
- **Griglia incontri**: Elenco ordinato degli incontri con lo stato attuale (in programma, in corso, concluso con relativo punteggio).
- **Tabelloni grafici**: Per le categorie a doppia pool o a eliminazione diretta, visualizzazione interattiva dei tabelloni e dei turni.
- **Pulsante "Prossimo incontro"**: In alto a destra è presente il pulsante rapido per aprire immediatamente il prossimo incontro da disputare. Se il pulsante non compare, tutti gli incontri della categoria sono stati completati.
- **Classifica in tempo reale**: La classifica finale della categoria viene calcolata ed esposta automaticamente al termine dell'ultimo incontro.

---

## 3. Gestione e Refertazione dell'Incontro (`/match`)

La pagina dell'incontro funge da **tabellone elettronico digitale** (scoreboard) per i giudici di tavolo.

### Avvio e gestione del cronometro di gara

- Premere il pulsante centrale **Play** (o la barra spaziatrice da tastiera) per avviare il timer.
- Premere il pulsante **Pausa** per fermare il tempo di gara.

### Assegnazione dei punteggi tecnici (Regole Ufficiali IJF 2025+)

Il motore di gara è interamente allineato al **Regolamento Arbitrale Ufficiale IJF 2025+ (International Judo Federation)**.

I punteggi possono essere assegnati premendo i pulsanti a schermo o tramite scorciatoie da tastiera:

- **Ippon**:
  - Assegna la vittoria immediata del combattimento (_Sore-made_) e interrompe automaticamente tutti i cronometri.
- **Waza-ari**:
  - Assegna mezzo punto tecnico.
  - Al raggiungimento del secondo Waza-ari da parte dello stesso atleta (_Waza-ari-awasete-ippon_), il sistema assegna automaticamente la vittoria per Ippon e ferma il cronometro.
  - Alla scadenza del tempo regolamentare, se un atleta ha accumulato più Waza-ari dell'avversario, ottiene la vittoria.
- **Yuko**:
  - Assegna il terzo livello di punteggio tecnico (minore).
  - Più Yuko **non** si sommano per formare un Waza-ari o un Ippon.
  - Alla scadenza del tempo regolamentare, se gli atleti sono in parità di Waza-ari, l'atleta con più Yuko vince l'incontro.
  - Durante il Golden Score, qualsiasi punteggio tecnico (incluso il singolo Yuko) assegna la vittoria immediata (_Sore-made_).
- **Shido (Sanzioni)**:
  - Al primo e al secondo Shido viene visualizzato un cartellino giallo sul tabellone. Gli Shido non decidono la parità allo scadere del tempo regolamentare.
  - Al terzo Shido dello stesso atleta viene assegnata la squalifica (_Hansoku-make_), visualizzato il cartellino rosso e attribuita automaticamente la vittoria all'avversario per Ippon.

### Gestione Immobilizzazioni (_Osae-komi_) — Regole IJF 2025+

I pulsanti di immobilizzazione sono attivi esclusivamente mentre il cronometro dell'incontro è in movimento:

1. Quando il controllo a terra ha inizio, premere **Osae-komi** (sotto l'atleta attaccante). Il pulsante si trasforma in **Toketa** e il cronometro dedicato dell'osaekomi inizia a scorrere.
2. **Soglie automatiche di punteggio (IJF 2025+)**:
   - A **5 secondi**: il sistema assegna automaticamente **1 Yuko**. Se l'incontro si trova in **Golden Score**, il raggiungimento di 5s assegna la vittoria immediata (_Sore-made_).
   - A **10 secondi**: il sistema rimuove lo Yuko dell'immobilizzazione e assegna **1 Waza-ari**. Se l'atleta aveva già un Waza-ari a tabellone, a 10s scatta immediatamente la vittoria per _Waza-ari-awasete-ippon_.
   - A **20 secondi**: il sistema rimuove il Waza-ari e assegna **Ippon**, decretando la vittoria dell'incontro e fermando entrambi i timer.
3. Se l'avversario esce dal controllo prima del tempo, premere **Toketa**: il timer dell'osaekomi si arresta e il punteggio acquisito fino a quel momento (es. Yuko a 5–9 secondi) rimane valido a tabellone.
4. **Mate vs Sonomama / Yoshi**:
   - **Mate (Stop generale)**: Premendo il pulsante **Pausa principale** (o la barra spaziatrice), il cronometro di gara si arresta e l'eventuale immobilizzazione attiva viene interrotta e azzerata (salvo in tempo supplementare di immobilizzazione).
   - **Sonomama (Congelamento a terra)**: Quando l'arbitro chiama _Sonomama_, premere l'apposito **pulsante Pausa dedicato situato accanto al cronometro dell'Osae-komi**. Questa azione congela simultaneamente sia il tempo di gara sia il conteggio dell'immobilizzazione senza cancellare il tempo acquisito.
   - **Yoshi (Riavvio)**: Alla chiamata di _Yoshi_, premere il pulsante **Play principale** (o la barra spaziatrice): entrambi i cronometri ripartono sincronizzati mantenendo il controllo a terra.
5. **Osaekomi a fine tempo (Tempo supplementare di controllo)**: Se il tempo regolamentare dell'incontro si azzera (`0:00`) mentre un'azione di Osae-komi è in corso, il cronometro di immobilizzazione continua a scorrere senza interruzione arbitraria fino al raggiungimento del punteggio o alla chiamata di Toketa.

### Golden Score (Tempo Supplementare / Sudden Death)

Se allo scadere del tempo regolamentare i due judoka si trovano in perfetta parità (stesso numero di Waza-ari e stesso numero di Yuko):

- Il cronometro principale passa in modalità **Golden Score** (conteggio in avanti del tempo).
- Il primo atleta a mettere a segno un qualsiasi punteggio tecnico valido (**Yuko**, **Waza-ari** o **Ippon**), oppure a beneficiare della squalifica dell'avversario per 3° Shido, si aggiudica immediatamente la vittoria.

### Modalità Correzione Punteggio

Se un punteggio o una sanzione è stata assegnata per errore:

1. In alto a destra del riquadro dell'atleta compare l'icona della matita (**Modalità Modifica**).
2. Cliccando sull'icona, compaiono i pulsanti di revoca:
   - `🚫 Ippon`
   - `🚫 Waza-ari`
   - `🚫 Yuko`
   - `🚫 Shido`
3. Cliccando sul pulsante desiderato, il punteggio corrispondente viene sottratto e l'eventuale stato di vittoria provvisorio viene revocato.
4. Per correggere più punteggi, ripetere l'operazione.

### Chiusura e Salvataggio dell'Incontro

Quando un atleta ottiene la vittoria (per punteggio o per tempo), compare il pulsante verde **Termina l'incontro**:

- Premendo il pulsante, l'esito dell'incontro viene salvato in modo permanente nel database.
- Il sistema aggiorna automaticamente il tabellone della categoria, avanza i vincitori/ripescati nei rispettivi turni successivi e apre direttamente il prossimo incontro della categoria.

> ⚠️ **Attenzione**: Se la pagina viene ricaricata o abbandonata prima di aver premuto _Termina l'incontro_, i punti non salvati andranno persi.

---

## 4. Scorciatoie da Tastiera (Layout CH-fr / Svizzero Francese)

> 💡 **Nota**: Le scorciatoie utilizzano lettere maiuscole. È necessario mantenere premuto **Shift** oppure attivare il tasto **Caps Lock**.

| Azione Generale              |  Tasto   |
| :--------------------------- | :------: |
| **Avvio / Pausa cronometro** | `Spazio` |

### Judoka Bianco (Sinistra)

| Azione                 | Tasto |
| :--------------------- | :---: |
| **Ippon**              |  `A`  |
| **Waza-ari**           |  `S`  |
| **Yuko**               |  `D`  |
| **Osae-komi / Toketa** |  `G`  |
| **Shido**              |  `Q`  |

### Judoka Blu (Destra)

| Azione                 | Tasto |
| :--------------------- | :---: |
| **Ippon**              |  `J`  |
| **Waza-ari**           |  `K`  |
| **Yuko**               |  `L`  |
| **Osae-komi / Toketa** |  `H`  |
| **Shido**              |  `P`  |

---

## 5. Stampa e Reportistica Ufficiale

L'applicazione include quattro viste di stampa ottimizzate per la carta in formato A4:

1. **Iscrizioni Categorie (`/categories/print/registered`)**:
   - Accessibile dalla sezione **Stampa** principale.
   - Fornisce l'elenco nominativo completo degli atleti suddivisi per categoria con rispettivo club, ideale per il controllo peso e la spunta iniziale dei partecipanti.
2. **Stampa Singola Categoria (`/categories/[category_id]/print`)**:
   - Accessibile dall'interno della pagina della singola categoria tramite il pulsante **Stampa** in alto a destra.
   - Include l'elenco degli atleti, i tabelloni grafici (pool o griglia ad eliminazione), la lista di tutti gli incontri con i risultati e il podio finale.
3. **Stampa Tutte le Categorie (`/categories/print`)**:
   - Accessibile dalla pagina **Impostazioni**.
   - Genera un documento sequenziale contenente tutti i tabelloni e i fogli di gara di tutte le categorie appartenenti al torneo corrente.
4. **Riepilogo Podi e Classifica Club (`/categories/print/summary` e `/club-ranking`)**:
   - **Riepilogo Categorie**: Riepiloga tutti i podi (1°, 2°, 3° classificati) dell'intero torneo per le premiazioni ufficiali.
   - **Classifica Club**: Calcola in tempo reale il medagliere generale dei club partecipanti (ordinato per numero di medaglie d'oro, d'argento e di bronzo).

---

## 6. Criteri di Classifica e Spareggio nelle Pool Singole

Nelle categorie a girone all'italiana (Pool), la classifica finale è determinata automaticamente applicando in sequenza i seguenti criteri:

1. **Punti Incontro (Match Points)**:
   - **2 punti** per ogni incontro vinto.
   - **0 punti** per ogni incontro perso.
2. **Punti Valutazione (Evaluation Points)**: In caso di parità di Punti Incontro, si confrontano i punti tecnici ottenuti nelle vittorie:
   - **10 punti**: Vittoria per Ippon, per doppio Waza-ari o per squalifica dell'avversario (_Hansoku-make_).
   - **7 punti**: Vittoria per singolo Waza-ari.
   - **5 punti**: Vittoria decisa da vantaggio di Yuko.
3. **Scontro Diretto**: Se due atleti hanno lo stesso numero di punti incontro e punti valutazione, prevale il vincitore dello scontro diretto tra i due.
4. **Circolo di Vittorie (Ciclo a 3 o più atleti)**: Se tre o più atleti si battono reciprocamente in circolo (es. A batte B, B batte C, C batte A) con identici punti incontro e punti valutazione, la parità viene risolta in base al **tempo residuo di vittoria** più elevato registrato nei rispettivi incontri vinti (dove gli incontri decisi al Golden Score contano con tempo negativo).
