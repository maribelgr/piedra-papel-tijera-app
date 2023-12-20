import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { GameComponent } from './game.component';
import { GameService } from '../../services/game.service';
import { StorageService } from '../../services/storage.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getPlayerScore', 'makeMachineSelection', 'determineWinner', 'incrementPlayerScore']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['getPlayerName']);

    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize player name and subscribe to player score changes', () => {
    const playerName = 'TestPlayer';
    storageServiceSpy.getPlayerName.and.returnValue(playerName);
    gameServiceSpy.getPlayerScore.and.returnValue(of(0));

    fixture.detectChanges();

    expect(component.playerName).toBe(playerName);
    expect(component.playerScore).toBe(0);

    gameServiceSpy.getPlayerScore.and.returnValue(of(10));
    fixture.detectChanges();

    expect(component.playerScore).toBe(10);
  });

  it('should make selection and update player score', () => {
    const playerSelection = 'rock';
    gameServiceSpy.makeMachineSelection.and.returnValue('scissors');
    gameServiceSpy.determineWinner.and.returnValue('win');

    component.makeSelection(playerSelection);

    expect(gameServiceSpy.incrementPlayerScore).toHaveBeenCalled();
    expect(component.machineSelection).toBe('scissors');
    expect(component.result).toBe('win');
  });

  it('should navigate to Home on exit', () => {
    component.exitGame();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

});
