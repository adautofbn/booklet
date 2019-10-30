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

  plan$: Observable<unknown[]>;
  planId: string;
  planCollectionRef: AngularFirestoreCollection<Plan>;
  planForm: FormGroup;
  planDetails: Plan;

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
        
      ])),

      class: new FormControl('', Validators.compose([
        
      ])),

      subject: new FormControl('', Validators.compose([
        
      ])),

      school: new FormControl('', Validators.compose([
        
      ])),

      keyword: new FormControl('', Validators.compose([
        
      ])),

      goals: new FormControl('', Validators.compose([
        
      ])),

      script: new FormControl('', Validators.compose([
        
      ])),

      materials: new FormControl('', Validators.compose([
        
      ])),

      evaluation: new FormControl('', Validators.compose([
        
      ])),

      duration: new FormControl('', Validators.compose([
        
      ]))
    });
  }

  ionViewWillEnter() { 
    this.plan$ = this.firebaseService.retrieveDocById('plans', this.planId);
    this.plan$.forEach(plan => {
      this.planDetails = plan.pop() as Plan;
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.planForm.invalid) {
      this.alertService.error('Erro ao validar campos do plano de aula');
      return;
    }

    var plan = {
      title:this.planForm.get('title').value ? this.planForm.get('title').value : this.planDetails.title,
      class:this.planForm.get('class').value ? this.planForm.get('class').value : this.planDetails.class,
      subject:this.planForm.get('subject').value ? this.planForm.get('subject').value : this.planDetails.subject,
      school:this.planForm.get('school').value ? this.planForm.get('school').value : this.planDetails.school,
      keyword:this.planForm.get('keyword').value ? this.planForm.get('keyword').value : this.planDetails.keyword,
      goals:this.planForm.get('goals').value ? this.planForm.get('goals').value : this.planDetails.goals,
      script:this.planForm.get('script').value ? this.planForm.get('script').value : this.planDetails.script,
      materials:this.planForm.get('materials').value ? this.planForm.get('materials').value : this.planDetails.materials,
      evaluation:this.planForm.get('evaluation').value ? this.planForm.get('evaluation').value : this.planDetails.evaluation,
      duration:this.planForm.get('duration').value ? this.planForm.get('duration').value : this.planDetails.duration,
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
