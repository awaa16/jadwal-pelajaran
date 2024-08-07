import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
  authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
  projectId: "insan-cemerlang-92ee0",
  storageBucket: "insan-cemerlang-92ee0.appspot.com",
  messagingSenderId: "332441427242",
  appId: "1:332441427242:web:73c31309147ef1dab15253",
  measurementId: "G-JW04DZL85R"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambiljadwalpelajaran() {
  const refDokumen = collection(db, "jadwalpelajaran");
  const kueri = query(refDokumen, orderBy("mapel"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().nomor,
      jam: dok.data().nama,
      kelas: dok.data().nis,
      mapel: dok.data().tanggal,
      namaguru: dok.data().alamat,
      waktu: dok.data().notlpn,
      
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahjadwalpelajaran(hari, jam,waktu, mapel, namaguru, kelas,) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwalpelajaran'), {
  
      hari:haru,
      jam:jam,
      waktu:waktu,
      mapel:mapel,
      kelas:kelas,
      namaguru:namaguru,
      

    });
    console.log('Berhasil menambah jadwalpelajaran' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah jadwalpelajaran ' + e);
  }
}

export async function hapusjadwalpelajaran(docid) {
  await deleteDoc(doc(db, "jadwalpelajaran", docid));
}
export async function ubahajadwalpelajaran(docId, hari, jam,waktu, kelas, mapel, namagur) {
  await updateDoc(doc(db, "Jadwalpelajaran", docId), {
    hari: nama,
    jam: nis,
    waktu: tanggal,
    kelas: alamat,
    mapel: notlpn,
    namaguru: kelas,

  });
}

export async function ambiljadwalpelajaran(docId) {
  const docRef = await doc(db, "jadwalpelajaran", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}