let moves =
	'{"0,0":{"0,1":"protecting","1,0":"protecting"},"0,1":{"2,0":"valid","2,2":"valid","1,3":"protecting"},"0,2":{"1,3":"protecting","1,1":"protecting"},"0,3":{"0,2":"protecting","0,4":"protecting","1,3":"protecting","1,4":"protecting","1,2":"protecting"},"0,4":{"1,4":"protecting","1,5":"protecting","1,3":"protecting","0,5":"protecting","0,3":"protecting"},"0,5":{"1,6":"protecting","1,4":"protecting"},"0,6":{"2,5":"valid","2,7":"valid","1,4":"protecting"},"0,7":{"0,6":"protecting","1,7":"protecting"},"1,0":{"2,1":"capturing"},"1,1":{"2,2":"capturing","2,0":"capturing"},"1,2":{"2,3":"capturing","2,1":"capturing"},"1,3":{"2,4":"capturing","2,2":"capturing"},"1,4":{"2,5":"capturing","2,3":"capturing"},"1,5":{"2,6":"capturing","2,4":"capturing"},"1,6":{"2,7":"capturing","2,5":"capturing"},"1,7":{"2,6":"capturing"}}';

let newMoves = JSON.parse(moves);

const kingMoves = { "1,0": "capturing" };

let newKingMoves = {};

const moveKeys = Object.keys(kingMoves);
const otherKeys = Object.keys(newMoves);

for (let i = 0; i < moveKeys.length; i++) {
	let moveAllowed = true;
	for (let j = 0; j < otherKeys.length; j++) {
		if (moveKeys[i] in newMoves[otherKeys[j]]) {
			moveAllowed = false;
			break;
		}
	}
	if (moveAllowed) newKingMoves[moveKeys[i]] = "yes";
}

console.log(newKingMoves);
