import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../models';
import { PostService } from '../post.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  form!: FormGroup

  constructor (private fb: FormBuilder, private postSvc: PostService) { }

  ngOnInit(): void {
      this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [ Validators.required, Validators.minLength(3)]),
      restaurant: this.fb.control('', [ Validators.required, Validators.minLength(3)])
    })
  }

  processForm() {
    const entry = this.form.value as Entry

    console.info('>>> entry: ', entry)

    this.postSvc.postEntry(entry)
    .then(response => {
      console.info(`Restaurant Entry: ${response.restaurant}`)
      this.form = this.createForm()
    })
    .catch (error => {
      console.error('>>> error: ', error)
    })
  }

}
