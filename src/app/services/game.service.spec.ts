import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have player score as 0', () => {
    service.getPlayerScore().subscribe(score => {
      expect(score).toBe(0);
    });
  });

  it('should increment player score', () => {
    service.incrementPlayerScore();

    service.getPlayerScore().subscribe(score => {
      expect(score).toBe(1);
    });
  });

  it('should make a random machine selection', () => {
    const machineSelection = service.makeMachineSelection();
    const options = ['rock', 'paper', 'scissors'];

    expect(options).toContain(machineSelection);
  });

  it('should determine the winner', () => {
    const result = service.determineWinner('rock', 'scissors');
    expect(result).toBe('You win!');

    const result2 = service.determineWinner('paper', 'rock');
    expect(result2).toBe('You win! :)');

    const result3 = service.determineWinner('scissors', 'scissors');
    expect(result3).toBe("It's a tie ¬¬");

    const result4 = service.determineWinner('rock', 'paper');
    expect(result4).toBe('You lose :(');
  });
});
