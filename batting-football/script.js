'use strict';

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};


// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
const [players1, players2] = game.players; // destructuring array

// const gk = players1[0];
// const fieldPlayers = players1.slice(1,);
const [gk, ...fieldPlayers] = players1; // rest pattern

const allPlayers = [...players1, ...players2]; // spread syntax

const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // spread syntax

// const team1 = game.odds.team1;
// const draw = game.odds.x;
// const teams = game.odds.team2;
const { odds: { team1, x: draw, team2 } } = game; // obeject destructuring
console.log(team1, draw, team2);

// rest pattern
// got the problem wrong and made it harder but solved it
const printGoals = function (...players) {
    let goalers = {};
    for (let player of players) {
        if (player in goalers) {
            goalers[player] += 1;
        } else {
            goalers[player] = 1;
        }
    }
    console.log(`${players.length} goals were scored!`);
    return goalers;
}

// console.log(players1, players2, gk, fieldPlayers, allPlayers, playersFinal);
const scorer = printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich', ...game.scored);
console.log(scorer);

// short circuiting
team1 < team2 && console.log('Team 1 is more likely to win.');
team2 < team1 && console.log('Team 2 is more likely to win.');

// for-of loop and looping entries
let count = 1;
for (let scorer of game.scored) {
    console.log(`Goal ${count}: ${scorer}`);
    count++;
}
// for (const [i, player] of game.scored.entries()) {
//     console.log(`Goal ${i+1}: ${player}`);
// }

// looping object
const odds = Object.values(game.odds);
let sum = 0;
for (const odd of odds) {
    sum += odd;
}
console.log(sum / odds.length);

// looping object
for (let odd of Object.keys(game.odds)) {
    if (odd in game) {
        console.log(`Odd of victory ${game[odd]}: ${game.odds[odd]}`);
    } else {
        console.log(`Odd of draw: ${game.odds[odd]}`);
    }
}
// for (const [team, odd] of Object.entries(game.odds)) {
//     const teamStr = team === 'x'? 'draw' : `victory ${game[team]}`;
//     console.log(`Odd of ${teamStr}: ${odd}`)
// }



const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

// using array
// const events = [];
// for ( const arr of gameEvents ) {
//     if ( !events.includes(arr[1])) {
//         events.push(arr[1]);
//     }
// }

// using set
// const events = new Set();
// for (const arr of gameEvents) {
//     events.add(arr[1]);
// }
const events = new Set(gameEvents.values()); // directly pass array as parameter
console.log(events);

// just delete it...why i used if to check whether has 64 which was absolutely unnecessary
gameEvents.delete(64);
console.log(gameEvents);


console.log(`An event happend, on average, every ${90 / gameEvents.size} minutes.`)

// looping map
for (const [time, event] of gameEvents) {
    const half = time <= 45 ? '[FISRT HALF]' : '[SECOND HALF]';
    console.log(`${half} ${time} : ${event}`);
}


// manipulating string
const capitalize = function (word) {
    return word[0].toUpperCase() + word.slice(1,).toLowerCase();
}

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
    const text = document.querySelector('textarea').value;
    const rows = text.split('\n');

    for (const [i, phrase] of rows.entries()) {
        const [first, second] = phrase.toLowerCase().trim().split("_");

        const output = `${first}${capitalize(second)}`
        
        console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
    }
});