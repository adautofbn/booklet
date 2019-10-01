import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export class FirebaseService {
    private snapshotChangesSubscription: Observable<DocumentChangeAction<firebase.firestore.DocumentData>[]>;

    constructor(
        private afs: AngularFirestore,
        public afAuth: AngularFireAuth,
    ) { }

    createTask(value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
                title: value.title,
                description: value.description,
                image: value.image
            })
                .then(
                    res => resolve(res),
                    err => reject(err)
                )
        })
    }

    getTasks() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
                    resolve(this.snapshotChangesSubscription);
                }
            })
        });
    }

    updateTask(taskKey, value) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
                .then(
                    res => resolve(res),
                    err => reject(err)
                )
        })
    }

    deleteTask(taskKey) {
        return new Promise<any>((resolve, reject) => {
            let currentUser = firebase.auth().currentUser;
            this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
                .then(
                    res => resolve(res),
                    err => reject(err)
                )
        })
    }
}