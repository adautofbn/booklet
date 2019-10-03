import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.scss'],
})
export class CreatePlanComponent implements OnInit {
  planForm: FormGroup;
  successMessage: string;
  errorMessage: string;

  submitted = false;

  classes = ["3ª Série", "2ª Série", "1ª Série", "9º Ano", "8º Ano", "7º Ano", "6º Ano"];
  
  subjects = ["Artes", "Biologia", "Espanhol", "Física", "Geografia", "Gramática", 
  "História", "História do Brasil", "História Geral", "Inglês", "Literatura",
  "Matemática", "Português", "Química", "Redação"];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.planForm = new FormGroup({
      class: new FormControl('', Validators.compose([
        Validators.required
      ])),

      subject: new FormControl('', Validators.compose([
        Validators.required
      ])),

      school: new FormControl('', Validators.compose([
        Validators.required
      ])),

      keyword: new FormControl('', Validators.compose([
        Validators.required
      ])),

      goals: new FormControl('', Validators.compose([
        Validators.required
      ])),

      script: new FormControl('', Validators.compose([
        Validators.required
      ])),

      materials: new FormControl('', Validators.compose([
        Validators.required
      ])),

      evaluation: new FormControl('', Validators.compose([
        Validators.required
      ])),

      duration: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.planForm.invalid) {
      return;
    }

    var plan = {
      class:this.planForm.get('class').value,
      subject:this.planForm.get('subject').value,
      school:this.planForm.get('school').value,
      keyword:this.planForm.get('keyword').value,
      goals:this.planForm.get('goals').value,
      script:this.planForm.get('script').value,
      materials:this.planForm.get('materials').value,
      evaluation:this.planForm.get('evaluation').value,
      duration:this.planForm.get('duration').value
    }

    this.router.navigateByUrl('home');
  }

}