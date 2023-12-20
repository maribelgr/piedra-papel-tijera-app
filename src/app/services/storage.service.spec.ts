import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have an empty player name', () => {
    const playerName = service.getPlayerName();
    expect(playerName).toBe('');
  });

  it('should set and get player name from localStorage', () => {
    const playerName = 'TestPlayer';

    service.setPlayerName(playerName);

    const retrievedPlayerName = service.getPlayerName();
    expect(retrievedPlayerName).toBe(playerName);
  });
});
