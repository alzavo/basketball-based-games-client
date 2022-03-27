import { IAppState } from "@/interfaces/IAppState";
import { IGame } from "@/interfaces/IGame";

export const Game33: IGame = {
    name: "33",
    isChosen: false,
    description:
        "Mängust võtavad osa vähemalt kaks mängijat. " +
        "Esimene mängija viskab vabaviske joone tagant. Kui ta tabas, siis ta saab 3 punkti ja viskab veel kord samast kohast. " +
        "Kui ta viskas mööda, siis järgmine mängija viskab sealt, kus ta püüdis palli. " +
        "Kui järgmine mängija tabas, siis ta läheb vabaviske joone taga, kui ta pani mööda, siis järgmine mängija viskab sealt, kus ta püüdis palli. " +
        " Niimoodi mäng käib niikaua, kui keegi kogub 30 punkti. " +
        "Kui mängijal on 30 punkti, siis iga kord, kui on tema kord viskama, ta valib vabalt koht kolmepunktijoone taga ja viskab sealt. " +
        "Iga tabamine annab 1 punkt. Võidab see, kes esimesena kogub 33 punkti.",
};

export const Game21: IGame = {
    name: "21",
    isChosen: false,
    description:
        "Mängust võtavad osa vähemalt kaks mängijat. " +
        "Esimene mängija viskab vabaviskejoonest. " +
        "Kui ta tabas, siis ta saab 1 punkt. ",
};
export const GameMinus5: IGame = {
    name: "-5",
    isChosen: false,
    description: "",
};
export const GameAroundTheWorld: IGame = {
    name: "Around the world",
    isChosen: false,
    description: "",
};

export const State: IAppState = {
    players: [],
    games: [Game21, Game33, GameMinus5, GameAroundTheWorld],
    gameStatus: {
        end: false,
        start: false,
    },
};
