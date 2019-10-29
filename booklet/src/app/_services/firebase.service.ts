import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';

export class FirebaseService {
    constructor(
        private afs: AngularFirestore,
        private authService: AuthService
    ) { }

    retrieveDocs(collectionName) {
        const result = this.afs.collection(collectionName).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );

        return result;
    }

    retrieveFilteredDocs(collectionName, field, operator, matcher) {
        const result = this.afs.collection(collectionName,
            ref => ref.where(field, operator, matcher)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            )

        return result;
    }

    retrieveUserDocs(collectionName, uid) {
        const result = this.afs.collection(collectionName,
            ref => ref.where('uid', '==', uid)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            )

        return result;
    }

    retrieveLoggedUserDocs(collectionName) {
        const result = this.afs.collection(collectionName,
            ref => ref.where('uid', '==', this.authService.userDetails().uid)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            )

        return result;
    }

    retrieveDocById(collectionName, id) {
        const result = this.afs.collection(collectionName, 
            ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', id))
            .snapshotChanges().pipe(map(actions => actions.map( a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            })))
        return result;
    }

    retrieveUserEvents() {
        const result = this.afs.collection('events',
            ref => ref.where('uid', '==', this.authService.userDetails().uid)).snapshotChanges().pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as any;
                        Object.keys(data).filter(key => data[key] instanceof Timestamp)
                            .forEach(key => data[key] = data[key].toDate())
                        const id = a.payload.doc.id;
                        return {id, ...data};
                    })
                })   
            )
        return result;
    }

    retrieveEventById(id) {
        const result = this.afs.collection('events', 
            ref => ref.where(firebase.firestore.FieldPath.documentId(), '==', id)).snapshotChanges().pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as any;
                        Object.keys(data).filter(key => data[key] instanceof Timestamp)
                            .forEach(key => data[key] = data[key].toDate())
                        const id = a.payload.doc.id;
                        return {id, ...data};
                    })
                })   
            )
        return result;
    }

    deleteDoc(collectionName, id) {
        this.afs.doc(collectionName + "/" + id).delete();
    }
}