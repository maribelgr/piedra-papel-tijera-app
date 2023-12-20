// game.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerScoreSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  // Obtener la puntuación del jugador como un observable
  getPlayerScore() {
    return this.playerScoreSubject.asObservable();
  }

  incrementPlayerScore() {
    const currentScore = this.playerScoreSubject.value;
    this.playerScoreSubject.next(currentScore + 1);
  }

  // Selección aleatoria para el bot
  makeMachineSelection(): string {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  // Determinar al ganador
  determineWinner(playerSelection: string, machineSelection: string): string {
    if (playerSelection === machineSelection) {
      return "It's a tie ¬¬";
    } else if (
      (playerSelection === 'rock' && machineSelection === 'scissors') ||
      (playerSelection === 'scissors' && machineSelection === 'paper') ||
      (playerSelection === 'paper' && machineSelection === 'rock')
    ) {
      return 'You win! :)';
    } else {
      return 'You lose :(';
    }
  }
}
