import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input-form',
  templateUrl: './user-input-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputFormComponent implements OnInit {
  userForm: FormGroup;
  @Output()
  submitFormEvent: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initialiseForm();
  }

  // initialise user form
  initialiseForm() {
    this.userForm = this.fb.group({
      squareBoxes: ['5', [Validators.required, Validators.min(0), Validators.max(2000)]],
      color: ['2000', [Validators.required, Validators.min(0), Validators.max(4000000)]],
      timer: ['2', [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  // emit event when user submit form
  submitForm() {
    this.submitFormEvent.emit(this.userForm.getRawValue());
  }
}
