
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playerName: string = '';

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {}

  startGame(): void {
    if (this.playerName.trim() !== '') {
      this.storageService.setPlayerName(this.playerName);

      this.router.navigate(['/game']);
    }
  }
}

