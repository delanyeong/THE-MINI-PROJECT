import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lot, LotDraw } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{

  drawLotForm!: FormGroup
  lotArray!: FormArray

  constructor (private fb: FormBuilder) { }

  ngOnInit(): void {
      this.drawLotForm = this.createForm()
  }

  createForm(): FormGroup {
    this.lotArray = this.fb.array([], [ Validators.minLength(1) ])
    return this.fb.group({
      date: this.fb.control('', [ Validators.required, Validators.minLength(3)]),
      meal: this.fb.control('', [ Validators.required, Validators.minLength(3)]),
      lots: this.lotArray
    })
  }

  processForm() {
    const lotDraw : LotDraw = this.drawLotForm.value as LotDraw
    console.info('>>> lotDraw: ', lotDraw)
  }

  addLot() {
    this.lotArray.push(this.createLot())
  }

  private createLot(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [ Validators.required ]),
      restaurant: this.fb.control('', [ Validators.required ])
    })
  }

  removeLot(i: number) {
    this.lotArray.removeAt(i)
  }

  invalid(): boolean {
    return this.drawLotForm.invalid || this.lotArray.length <= 0
  }

  clearForm() {
    this.drawLotForm = this.createForm()
  }

}
