import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

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

    retrieveDocsFiltered(collectionName, field, operator, matcher) {
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
}