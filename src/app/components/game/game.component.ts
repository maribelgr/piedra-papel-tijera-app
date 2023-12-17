
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  playerName: string = '';
  playerScore: number = 0;
  machineSelection: string = '';
  result: string = '';

  private playerNameSubscription!: Subscription;

  constructor(
    private router: Router,
    private gameService: GameService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Obtener el nombre del jugador del almacenamiento local
    this.playerName = this.storageService.getPlayerName();

    // Subscribirse a cambios en la puntuación del jugador
    this.playerNameSubscription = this.gameService.getPlayerScore().subscribe(score => {
      this.playerScore = score;
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse al destruir el componente
    this.playerNameSubscription.unsubscribe();
  }

  makeSelection(selection: string): void {
    // Hacer la selección del jugador y de la "máquina"
    const machineSelection = this.gameService.makeMachineSelection();
    const result = this.gameService.determineWinner(selection, machineSelection);

    // Actualizar la puntuación del jugador
    if (result === 'win') {
      this.gameService.incrementPlayerScore();
    }

    // Mostrar los resultados
    this.machineSelection = machineSelection;
    this.result = result;
  }

  exitGame(): void {
    // Volver a la vista 'Home'
    this.router.navigate(['/']);
  }
}

