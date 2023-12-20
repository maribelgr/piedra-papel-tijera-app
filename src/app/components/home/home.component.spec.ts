import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { StorageService } from '../../services/storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['setPlayerName']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start game and navigate to Game if player name is provided', () => {
    const playerName = 'TestPlayer';
    component.playerName = playerName;

    fixture.detectChanges();

    const startGameButton = fixture.debugElement.query(By.css('button'));
    startGameButton.triggerEventHandler('click', null);

    expect(storageServiceSpy.setPlayerName).toHaveBeenCalledWith(playerName);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/game']);
  });

  it('should not start game if player name is not provided', () => {
    component.playerName = '';

    fixture.detectChanges();

    const startGameButton = fixture.debugElement.query(By.css('button'));
    startGameButton.triggerEventHandler('click', null);

    expect(storageServiceSpy.setPlayerName).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
