import { game } from "./game.js";
import { player } from "./player.js";


const ttt = new game(new player("X"), new player("O")) 
ttt.begin()