import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../_services/firebase.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Plan } from '../_models/plan.model';
import { AlertService } from '../_services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss'],
})
export class EditPlanComponent implements OnInit {

  plan$: Observable<unknown>;
  planId: string;
  planCollectionRef: AngularFirestoreCollection<Plan>;
  planForm: FormGroup;

  submitted = false;

  classes = ["3ª Série", "2ª Série", "1ª Série", "9º Ano", "8º Ano", "7º Ano", "6º Ano"];
  
  subjects = ["Artes", "Biologia", "Espanhol", "Física", "Geografia", "Gramática", 
  "História", "História do Brasil", "História Geral", "Inglês", "Literatura",
  "Matemática", "Português", "Química", "Redação"];

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private alertService: AlertService,
    private authService: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.planId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.planCollectionRef = this.afs.collection('plans');

    this.planForm = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),

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
    });
  }

  ionViewWillEnter() {
    this.plan$ = this.firebaseService.retrieveDocById('plans', this.planId);
  }

  onSubmit() {
    this.submitted = true;

    if(this.planForm.invalid) {
      return;
    }

    var plan = {
      title:this.planForm.get('title').value,
      class:this.planForm.get('class').value,
      subject:this.planForm.get('subject').value,
      school:this.planForm.get('school').value,
      keyword:this.planForm.get('keyword').value,
      goals:this.planForm.get('goals').value,
      script:this.planForm.get('script').value,
      materials:this.planForm.get('materials').value,
      evaluation:this.planForm.get('evaluation').value,
      duration:this.planForm.get('duration').value,
      teacher: this.authService.userDetails().displayName,
      uid: this.authService.userDetails().uid
    } as Plan

    this.planCollectionRef.doc(this.planId).update(plan);

    this.alertService.success('Plano editado com sucesso!');
    this.router.navigateByUrl('/plan/'+ this.planId);
  }

  onCancel() {
    this.alertService.info('Edição de plano cancelada');
    this.router.navigateByUrl('/plan/'+ this.planId);
  }

}
