import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc, Timestamp, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuiHBOjDivzlggSgCC0wQ3QPpS4NLf74U",
    authDomain: "books-2b3d9.firebaseapp.com",
    projectId: "books-2b3d9",
    storageBucket: "books-2b3d9.appspot.com",
    messagingSenderId: "598450284175",
    appId: "1:598450284175:web:6594b5fa87878dc7ee32fa"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'chat'); // 'chat' is the collection name in firebase
//...........


export class Chatroom {
    constructor(room, user) {
        this.room = room;
        this.user = user;
        this.chat = colRef;
        this.unsub;

    }
    async addChat(message) {
        const now = new Date();
        const chat = {
            message: message,
            user: this.user,
            room: this.room,
            time: Timestamp.fromDate(now)

        };
        const response = await addDoc(colRef, chat);
        return response;
    }
    getChat(filterField, filterValue, cb) {
        const chatQuery = query(colRef, where(filterField, '==', filterValue), orderBy('time', 'asc'))
        this.unsub = onSnapshot(chatQuery, snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    cb(change.doc.data());
                }
            })
        })
    };

    updateUsername(user) {
        this.user = user
        // store the name in localStorage
        localStorage.setItem('user', user)
    };
    updateRoom(room) {
        this.room = room;
        if (this.unsub) { //check if the unsub property is true and defined
            this.unsub(); // unsubscribe from the realtime listener
        }
    }
}

/*when updating room we stop the litener from the previous version
and call getChat() to start the listener again on the updated version,
and if we called addChat() we will get realtime data of the object
with the query we have set which is the room name*/
// test.updateRoom('music');
// test.getChat('room', test.room, data => {
//     console.log(data)
// });
