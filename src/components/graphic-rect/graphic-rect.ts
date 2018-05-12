import { Component, ViewChild } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'graphic-rect',
  templateUrl: 'graphic-rect.html'
})
export class GraphicRectComponent {

  @ViewChild('rectCanvas') rectCanvas;

  x = 100;
  y = 100;

  constructor(private deviceMotion: DeviceMotion) {
  }

  ngAfterViewInit() {
    this.drawRect(100, 100);

    var subscription = this.deviceMotion.watchAcceleration({ frequency: 100 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
        //Converte de m/s² para px/s²
      this.redraw((acceleration.x * 3779.527559)/100, (acceleration.y * 3779.527559)/125);
    });
  }

  drawRect(x, y: number) {
    let ctx = this.rectCanvas.nativeElement.getContext('2d');

    ctx.beginPath();

    console.log("X: ", x);
    console.log("Y: ", y);

    if (this.x + x < 0)
      x = 0;
    else if (x > 200)
      x = 200;
    if (this.y + y < 0)
      y = 0;
    else if (y > 250)
      y = 250;

    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 0, 250, 300);
    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(x, y, 50, 50);

    this.x = x;
    this.y = y;

    console.log("New X: ", x);
    console.log("New Y: ", y);
  }

  redraw(newX, newY: number) {
    let ctx = this.rectCanvas.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.rectCanvas.nativeElement.width, this.rectCanvas.nativeElement.height);
    this.drawRect(newX, newY);
  }
}
