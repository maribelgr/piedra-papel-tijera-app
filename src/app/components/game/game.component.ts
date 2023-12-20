
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
  playerSelection: any = '';
  machineSelection: string = '';
  result: string = '';

  private playerNameSubscription!: Subscription;

  constructor(
    private router: Router,
    private gameService: GameService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.playerName = this.storageService.getPlayerName();

    this.playerNameSubscription = this.gameService.getPlayerScore().subscribe(score => {
      this.playerScore = score;
    });
  }

  ngOnDestroy(): void {
    this.playerNameSubscription.unsubscribe();
  }

  makeSelection(selection: string): void {
    const machineSelection = this.gameService.makeMachineSelection();
    const result = this.gameService.determineWinner(selection, machineSelection);

    if (result === 'win') {
      this.gameService.incrementPlayerScore();
    }

    this.machineSelection = machineSelection;
    this.result = result;
  }

  exitGame(): void {
    this.router.navigate(['/']);
  }
}

