import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../_services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.scss'],
})
export class PlanPageComponent implements OnInit {

  plan$: Observable<unknown>;
  planId: string;

  pdfObj = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {
    this.planId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.plan$ = this.firebaseService.retrieveDocById('plans', this.planId);
  }

  deletePlan() {
    this.firebaseService.deleteDoc('plans', this.planId);
    this.alertService.info('Plano deletado com sucesso');
  }

  isOwner(uid) {
    return uid === this.authService.userDetails().uid;
  }

  navigateToTeacherPerfil(uid) {
    this.router.navigateByUrl('/perfil/' + uid);
  }

  createPDF(plan) {
    var pdfDef = {
      content: [

        {
          image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBoRXhpZgAASUkqAAgAAAADABIBAwABAAAAAQAAADEBAgAQAAAAMgAAAGmHBAABAAAAQgAAAAAAAABTaG90d2VsbCAwLjI4LjQAAgACoAkAAQAAAL8AAAADoAkAAQAAAIoAAAAAAAAA/+EJ9Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxOTEiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSIxMzgiIHRpZmY6SW1hZ2VXaWR0aD0iMTkxIiB0aWZmOkltYWdlSGVpZ2h0PSIxMzgiIHRpZmY6T3JpZW50YXRpb249IjEiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUE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',
          fit: [100,100],
          alignment: 'center'
        },

        { text: 'PLANO DE AULA', style: 'header' },
        { text: plan.title},
        { text: 'Criado com Booklet', alignment: 'right' },

        { text: 'Professor', style: 'subheader' },
        { text: plan.teacher },

        { text: 'Série', style: 'subheader' },
        { text: plan.class },

        { text: 'Disciplina', style: 'subheader' },
        { text: plan.subject },

        { text: 'Palavra-chave', style: 'subheader' },
        { text: plan.keyword },

        { text: 'Objetivos', style: 'subheader' },
        { text: plan.goals, style: 'story' },

        { text: 'Metologia', style: 'subheader' },
        { text: plan.script, style: 'story' },

        { text: 'Materiais', style: 'subheader' },
        { text: plan.materials, style: 'story' },

        { text: 'Avaliação', style: 'subheader' },
        { text: plan.evaluation, style: 'story' },

        { text: 'Duração', style: 'subheader' },
        { text: plan.duration }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          alignment: 'center',
          width: '50%',
          margin: [0, 20, 0, 20]
        }
      }

    }
    this.pdfObj = pdfMake.createPdf(pdfDef);
    this.downloadPdf(plan);
  }

  downloadPdf(plan) {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'plano_de_aula_' + plan.title + '.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'plano_de_aula_' + plan.title + '.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
