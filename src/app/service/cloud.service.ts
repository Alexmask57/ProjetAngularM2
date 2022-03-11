
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CloudService {
  files: any = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "assets/Music/ssbuOpening.mp3",
      name: "SSBU Opening",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/ssbuMenu.mp3",
      name: "SSBU Menu",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/ssbuBattelfield.mp3",
      name: "SSBU Battelfield",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/ssbbOpening.mp3",
      name: "SSBB Opening",
      artist: "Super Smash Bros Brawl"
    },
    {
      url:
        "assets/Music/pokemonDiamantPerleBattle.mp3",
      name: "Pokemon Battle",
      artist: "Pokemon Diamant et Perle"
    },
    {
      url:
        "assets/Music/superMarioBros.mp3",
      name: "Super Mario Bros",
      artist: "Super Mario Bros"
    },
    {
      url:
        "assets/Music/dragonQuest.mp3",
      name: "Dragon Quest",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/pacman.mp3",
      name: "Pacman",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/superMarioGalaxy.mp3",
      name: "Super Mario Galaxy",
      artist: "Super Smash Bros Ultimate"
    },
    {
      url:
        "assets/Music/zelda.mp3",
      name: "Zelda",
      artist: "Super Smash Bros Ultimate"
    },
  ];

  getFiles() {
    return of(this.files);
  }
}
