import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  placeholderText = '';
  isMenuOpen = false;
  private phrases = ["Derecho Penal", "Derecho Civil", "Derecho Administrativo"];
  private currentPhrase = 0;
  private currentLetter = 0;
  private forward = true;
  private typingSpeed = 200;

  constructor() { }

  ngOnInit(): void {
    this.type();
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private type() {
    if (this.forward) {
      if (this.currentLetter < this.phrases[this.currentPhrase].length) {
        this.placeholderText += this.phrases[this.currentPhrase].charAt(this.currentLetter);
        this.currentLetter++;
        setTimeout(() => this.type(), this.typingSpeed);
      } else {
        setTimeout(() => this.type(), this.typingSpeed * 3);
        this.forward = false;
      }
    } else {
      if (this.currentLetter > 0) {
        this.placeholderText = this.placeholderText.substring(0, this.placeholderText.length - 1);
        this.currentLetter--;
        setTimeout(() => this.type(), this.typingSpeed);
      } else {
        this.forward = true;
        this.currentPhrase++;
        if (this.currentPhrase >= this.phrases.length) {
          this.currentPhrase = 0;
        }
        setTimeout(() => this.type(), this.typingSpeed * 3);
      }
    }
  }
}
