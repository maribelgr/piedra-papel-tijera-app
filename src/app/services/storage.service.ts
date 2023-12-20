import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private playerNameKey = 'playerName';

  constructor() {}

  getPlayerName(): string {
    return localStorage.getItem(this.playerNameKey) || '';
  }

  setPlayerName(playerName: string): void {
    localStorage.setItem(this.playerNameKey, playerName);
  }
}

