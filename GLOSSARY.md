# Judo Championship Management

Domain language for organizing judo tournaments, conducting digital match scoring, and evaluating tournament bracket and pool classifications.

## Tournament & Competition Structures

**Tournament**:
A named sports event grouping multiple judo weight and age divisions under a single identifier.
_Avoid_: Championship, competition, event

**Category**:
A distinct competition division defined by age, gender, weight class, and a tournament bracket format.
_Avoid_: Division, bracket, group

**Single Pool**:
A round-robin tournament format where every competitor in the category faces all other competitors.
_Avoid_: Round robin, pool, league

**Double Pool**:
A tournament format splitting competitors into two separate pools (Pool A and Pool B) followed by crossover semifinals and a final.
_Avoid_: Dual pool, two-tier pool

**Brackets**:
A double-elimination tournament tree with a championship winner bracket and a full repechage loser bracket.
_Avoid_: 2KO, knockout, elimination ladder

**Repechage**:
The secondary bracket path that gives judoka defeated in earlier championship rounds the opportunity to compete for bronze medals.
_Avoid_: Loser bracket, consolation ladder

**Bye**:
A dummy match slot assigned when a bracket or pool size is uneven, advancing the lone competitor without a fight.
_Avoid_: Walkover, free pass

## Competitors & Match Execution

**Judoka**:
A judo athlete registered in a specific category representing a club.
_Avoid_: Athlete, competitor, fighter, player

**Club**:
A judo sports organization or dojo to which one or more judoka belong.
_Avoid_: Team, school, association

**Match**:
A single scheduled contest between two judoka designated by belt colors (White and Blue).
_Avoid_: Bout, fight, game

**White Judoka**:
The judoka designated as the first competitor on the draw sheet, wearing or tied with a white sash/belt.
_Avoid_: First fighter, home competitor

**Blue Judoka**:
The judoka designated as the second competitor on the draw sheet, wearing or tied with a blue sash/belt.
_Avoid_: Second fighter, away competitor

## Scoring & Penalties (IJF 2025+ Rules)

All scoring criteria, immobilization thresholds, and penalty escalations adhere to the official **International Judo Federation (IJF) 2025+ Refereeing Rules**.

**Ippon**:
The highest score in judo, which immediately awards victory and concludes the match.
_Avoid_: Knockout, full point

**Waza-ari**:
A half-point score awarded for a substantial throwing technique or a 10 to 19 second immobilization.
_Avoid_: Half point, near-ippon

**Waza-ari-awasete-ippon**:
The combination of two Waza-ari scored by the same judoka in one contest, resulting in an immediate victory by Ippon.
_Avoid_: Double waza-ari, two-half-points

**Yuko**:
A minor technical advantage awarded for a lesser throw or a 5 to 9 second immobilization, serving as a tiebreaker when Waza-ari are equal.
_Avoid_: Quarter point, minor score, koka

**Shido**:
A penalty awarded for minor infringements, non-combativity, or prohibited postures.
_Avoid_: Warning, yellow card, foul

**Hansoku-make**:
A disqualification resulting from a grave infringement or an accumulation of three Shido penalties, awarding victory to the opponent by Ippon.
_Avoid_: Red card, expulsion, forfeit

## Timing & Groundwork Controls

**Match Timer**:
The official countdown clock tracking regulation fight time for a category.
_Avoid_: Main clock, stop watch

**Osae-komi**:
An immobilization timer tracking a valid ground hold applied by one judoka against the other.
_Avoid_: Hold-down, pin clock

**Osae-komi Extra Time**:
The continuation of a match past zero on the Match Timer while an Osae-komi is active, lasting until the hold achieves Ippon or Waza-ari-awasete-ippon or is broken by Toketa.
_Avoid_: Hold overtime, pin extension

**Toketa**:
The command and state indicating that an opponent has escaped an active hold-down, stopping the immobilization clock.
_Avoid_: Hold broken, pin break

**Sonomama**:
The referee command freezing both the match countdown and the active hold-down timer simultaneously without breaking the ground position.
_Avoid_: Freeze, hold still

**Yoshi**:
The command resuming both the match countdown and the immobilization clock after a Sonomama pause.
_Avoid_: Resume, fight on

**Golden Score**:
Sudden-death overtime initiated when regulation time expires with identical technical scores, won immediately by the first technical score (including a 5-second Yuko immobilization) or direct/accumulated Hansoku-make.
_Avoid_: Overtime, sudden death

## Standings & Tie-Breaking

**Match Points**:
Points awarded to a judoka for winning a contest (2 points for a win, 0 for a loss) used as primary pool standing criteria.
_Avoid_: Win points, table points

**Evaluation Points**:
Quality score points awarded for victories (10 for Ippon or Hansoku-make, 7 for Waza-ari, 5 for Yuko) used as the secondary pool tie-breaker.
_Avoid_: Quality points, technique points

**Circle of Beating**:
A cyclic tie among three or more judoka with equal Match Points and Evaluation Points where each judoka defeated another in the tied group, broken by Remaining Time in Win among the tied judoka.
_Avoid_: Circular tie, three-way tie

**Remaining Time in Win**:
The net remaining contest time accumulated across victories within a tied group—positive for remaining regulation time and negative for elapsed Golden Score time—used to break a Circle of Beating.
_Avoid_: Fight duration, total match time

**Podium**:
The medal classification of a completed category, awarding one Gold (1st), one Silver (2nd), and two Bronze (3rd ex-aequo) medals across all category formats.
_Avoid_: Top three, single bronze

**Club Ranking**:
The aggregate tournament medal table ranking clubs by total Gold, Silver, and Bronze medals won across all categories.
_Avoid_: Team standings, club medal tally
