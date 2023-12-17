// storage.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private playerNameKey = 'playerName';

  constructor() {}

  // Obtener el nombre del jugador desde el almacenamiento local
  getPlayerName(): string {
    return localStorage.getItem(this.playerNameKey) || '';
  }

  // Guardar el nombre del jugador en el almacenamiento local
  setPlayerName(playerName: string): void {
    localStorage.setItem(this.playerNameKey, playerName);
  }
}

