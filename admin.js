import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import {getAuth,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import {getFirestore,collection,onSnapshot,doc,updateDoc,serverTimestamp,query,where,getDocs} from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';

const firebaseConfig={apiKey:'AIzaSyCrC0nUgGBiIKs1udA51fJaW-WJxsfPXTN8',authDomain:'skillztournament.firebaseapp.com',projectId:'skillztournament',storageBucket:'skillztournament.firebasestorage.app',messagingSenderId:'21286010025',appId:'1:21286010025:web:d3d837c5ef4ed3950f7db8',measurementId:'G-W3RPV1HKT5'};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app),$=x=>document.getElementById(x);
let unsubscribers=[];

window.login=async()=>{try{await signInWithEmailAndPassword(auth,$('email').value.trim(),$('pass').value)}catch(e){$('msg').textContent=e.message}};
window.logout=()=>signOut(auth);

async function isAdmin(uid){
  const s=await getDocs(query(collection(db,'admins'),where('__name__','==',uid)));
  return !s.empty;
}

async function startAdmin(u){
  const ok=await isAdmin(u.uid);
  if(!ok){
    $('msg').textContent='এই account-টি admin নয়। Firebase Console-এ admins/'+u.uid document তৈরি করুন।';
    await signOut(auth); return;
  }
  $('loginCard').classList.add('hidden');$('panel').classList.remove('hidden');$('adminUser').textContent=u.email;
  unsubscribers.forEach(fn=>fn());unsubscribers=[];
  unsubscribers.push(onSnapshot(collection(db,'players'),s=>{
    $('waiting').textContent=s.docs.filter(x=>x.data().status==='waiting').length;
    $('players').innerHTML=s.docs.map(x=>{
      const d=x.data();
      return `<div class="item"><b>${x.id}</b><br>Points: ${d.points||0}<br>Status: ${d.status||'ready'}</div>`;
    }).join('')||'No players';
  }));
  unsubscribers.push(onSnapshot(collection(db,'matches'),s=>{
    $('active').textContent=s.docs.filter(x=>['ready','playing'].includes(x.data().status)).length;
    $('matches').innerHTML=s.docs.map(x=>{
      const d=x.data();return `<div class="item"><b>${x.id}</b><br>Status: ${d.status}<br>Players: ${(d.players||[]).join(', ')}</div>`;
    }).join('')||'No matches';
  }));
  unsubscribers.push(onSnapshot(collection(db,'tournaments'),s=>{
    $('tournaments').innerHTML=s.docs.map(x=>{
      const d=x.data();return `<div class="item"><b>${x.id}</b><br>${d.name||'Tournament'} — ${d.status||'open'}<br>Points: ${d.points||0}</div>`;
    }).join('')||'No tournaments';
  }));
}

onAuthStateChanged(auth,u=>{if(u)startAdmin(u);else{$('loginCard').classList.remove('hidden');$('panel').classList.add('hidden');}});
