import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  display = true;
  matrix = [];
  unselectedMatrix = [];
  timer: number;
  timerRef: any;
  winner = false;
  loser = false;
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  // toggle user form visibility
  showDialog() {
    this.display = !this.display;
  }

  // set data when user submit form
  SubmitForm(formData) {
    this.showDialog();
    this.unselectedMatrix = [];
    this.matrix = this.createMatrix(formData['squareBoxes']);
    this.timer = formData['timer'];
  }

  // create 2-D array to make this game
  createMatrix(length) {
    const matrix = [];
    for (let i = 0; i < length; i++) {
      const innerArray = [];
      for (let j = 0; j < length; j++) {
        innerArray.push({ col: j, isSelected: true });
      }
      matrix.push({ row: i, innerArray: innerArray });
    }
    return matrix;
  }

  // uncolor clicked dom and
  toggleColor(x, y) {
    if (this.matrix[x]['innerArray'][y]['isSelected']) {
      if (!this.unselectedMatrix.length) {
        this.setTimer();
      }
      this.unselectedMatrix.push({ x: x, y: y });
      this.matrix[x]['innerArray'][y]['isSelected'] = false;
      if (this.unselectedMatrix.length === this.matrix.length * this.matrix.length) {
        this.clearTimer();
        this.winner = true;
        this.matrix.length = 0;
      }
    }
  }

  // start set interval call when user click on any box
  setTimer() {
    this.timerRef = setInterval(() => {
      if (this.unselectedMatrix.length) {
        const x = this.unselectedMatrix[0]['x'];
        const y = this.unselectedMatrix[0]['y'];
        this.matrix[x]['innerArray'][y]['isSelected'] = true;
        this.unselectedMatrix.shift();
        if (!this.unselectedMatrix.length) {
          this.clearTimer();
          this.loser = true;
          this.matrix.length = 0;
        }
      }
    }, this.timer * 1000);
  }

  // clear interval either user win or loose game
  clearTimer() {
    if (this.timerRef) {
      window.clearInterval(this.timerRef);
    }
  }
}
