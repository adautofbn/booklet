import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase/app';

export class FirebaseService {
    constructor(
        private afs: AngularFirestore
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

    deleteDoc(collectionName, id) {
        this.afs.doc(collectionName + "/" + id).delete();
    }
}