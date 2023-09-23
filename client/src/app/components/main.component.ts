import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lot, LotDraw } from '../models';
import { DrawLotService } from '../drawlot.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit{

  drawLotForm!: FormGroup
  lotArray!: FormArray
  resultRestaurant: string = ' No Lots Drawn Yet';
  resultDate: string = '';
  resultMeal: string = '';

  constructor (private fb: FormBuilder, private drawLotSvc: DrawLotService) { }

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

    this.drawLotSvc.drawLot(lotDraw) //returns an observable
      //convert it into a promise
      .then(response => {
        console.info(`result: ${response.result}`)
        this.resultRestaurant = response.result
        this.resultDate = response.date
        this.resultMeal = response.meal
        // clearing form after submitting
        this.drawLotForm = this.createForm()
      })
      .catch (error => {
        console.error('>>> error: ', error)
      })
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
