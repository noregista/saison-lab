const typesList = ['grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'flying', 'bug', 'poison', 'ground', 'rock', 'ghost', 'ice', 'dragon', 'fairy'];
const namePartsEn = ['Star', 'Moon', 'Sun', 'Cloud', 'Mist', 'Spark', 'Frost', 'Bloom', 'Crystal', 'Shadow', 'Light', 'Dream', 'Wish', 'Hope', 'Joy', 'Candy', 'Berry', 'Honey', 'Sugar', 'Petal'];
const nameEndingsEn = ['kit', 'pup', 'ling', 'bit', 'drop', 'fluff', 'wing', 'tail', 'paw', 'bell', 'charm', 'heart', 'sprite', 'wisp', 'bunny'];

console.log('--- Creature Info (77-86) ---');
for (let i = 77; i <= 86; i++) {
    const type1 = typesList[i % 15];
    const type2 = (i % 3 === 0) ? typesList[(i + 5) % 15] : null;
    const nameEn = namePartsEn[i % 20] + nameEndingsEn[i % 15];
    console.log(`ID: ${i}, Name: ${nameEn}, Type: ${type2 ? type1 + '/' + type2 : type1}`);
}
