import {Observable, EventData} from 'data/observable';

export class HelloWorldModel extends Observable {
  public _angle: number;


   get angle(): number {
        return this._angle;
    }

    set angle(value: number) {
        this._angle = value;
    }

  constructor() {
    super();

    this.angle = 0;
  }


  public angleChange(args: any) {
    console.log(args.angle);
    this.set('angle', args.angle);
  }


  public completed() {
    console.log('COMPLETE on viewModel');
    alert('Hold Complete, now do something cool.');
  }

  public reset() {
    console.log('Reset on viewModel');
    console.log('Reset to 0');
  }


}