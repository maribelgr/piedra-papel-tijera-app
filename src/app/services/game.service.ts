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

  // Incrementar la puntuación del jugador
  incrementPlayerScore() {
    const currentScore = this.playerScoreSubject.value;
    this.playerScoreSubject.next(currentScore + 1);
  }

  // Hacer una selección aleatoria para la "máquina"
  makeMachineSelection(): string {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  // Determinar al ganador entre el jugador y la "máquina"
  determineWinner(playerSelection: string, machineSelection: string): string {
    if (playerSelection === machineSelection) {
      return 'draw';
    } else if (
      (playerSelection === 'rock' && machineSelection === 'scissors') ||
      (playerSelection === 'scissors' && machineSelection === 'paper') ||
      (playerSelection === 'paper' && machineSelection === 'rock')
    ) {
      return 'win';
    } else {
      return 'lose';
    }
  }
}

