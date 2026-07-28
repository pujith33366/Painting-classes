/* ============================================================
   DATABASE SERVICE LAYER — Painting Studio
   Supports live Firebase Firestore AND seamless Demo Mode
   with rich sample seed data for workshops, students, and ledgers.
   ============================================================ */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isDemoMode } from '../config/firebase';

/* ---- Initial Seed Classes (For Demo Mode & Fallback) ---- */
export const INITIAL_CLASSES = [
  {
    id: 'class-1',
    title: 'Watercolor Landscapes & Sunsets',
    date: '2026-08-05',
    time: '10:00 AM - 12:00 PM',
    instructor: 'Priyanka',
    capacity: 12,
    registeredCount: 8,
    fee: '$45',
    level: 'Beginner',
    status: 'open',
    category: 'Watercolor',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600',
    description: 'Learn fundamental watercolor blending, wet-on-wet techniques, and color theory while creating a glowing sunset landscape.',
    syllabus: ['Understanding paper texture and water control', 'Blending sky gradients seamlessly', 'Layering silhouettes and foreground trees'],
  },
  {
    id: 'class-2',
    title: 'Acrylic Canvas Explorations',
    date: '2026-08-12',
    time: '2:00 PM - 4:30 PM',
    instructor: 'Priyanka',
    capacity: 10,
    registeredCount: 10,
    fee: '$50',
    level: 'Intermediate',
    status: 'full',
    category: 'Acrylic',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=600',
    description: 'Explore bold texture and impasto layering using acrylic paints on canvas boards. Perfect for budding artists who love vibrant colors.',
    syllabus: ['Palette knife techniques and impasto textures', 'Color mixing and blocking shapes', 'Adding highlights and varnish finishes'],
  },
  {
    id: 'class-3',
    title: 'Little Artists Sensory & Finger Painting',
    date: '2026-08-15',
    time: '11:00 AM - 12:15 PM',
    instructor: 'Ananya',
    capacity: 15,
    registeredCount: 6,
    fee: '$35',
    level: 'Kids (Ages 4-7)',
    status: 'open',
    category: 'Kids Fun',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    description: 'A fun, mess-friendly workshop designed for young children to develop motor skills and creative expression through non-toxic finger painting.',
    syllabus: ['Sensory color exploration and mixing', 'Handprints, shapes, and imaginative creatures', 'Group collaborative canvas creation'],
  },
  {
    id: 'class-4',
    title: 'Botanical Illustration & Sketching',
    date: '2026-08-22',
    time: '3:00 PM - 5:00 PM',
    instructor: 'Priyanka',
    capacity: 12,
    registeredCount: 4,
    fee: '$45',
    level: 'All Levels',
    status: 'open',
    category: 'Gouache',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600',
    description: 'Master the delicate art of drawing and painting leaves, flowers, and natural textures using gouache and fine-liner pens.',
    syllabus: ['Anatomy of leaves, petals, and stems', 'Fine-line ink detailing and stippling', 'Layering opaque gouache for vibrant flora'],
  },
  {
    id: 'class-5',
    title: 'Abstract Expressionism & Fluid Art',
    date: '2026-08-28',
    time: '4:00 PM - 6:00 PM',
    instructor: 'Ananya',
    capacity: 8,
    registeredCount: 2,
    fee: '$60',
    level: 'All Levels',
    status: 'open',
    category: 'Abstract',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
    description: 'Unleash spontaneous creativity with pouring mediums, silicone oils, and abstract brushwork on stretched canvas.',
    syllabus: ['Mixing pouring mediums and cell activators', 'Dirty pours, flip cups, and swipe techniques', 'Color harmony in abstract compositions'],
  },
  {
    id: 'class-6',
    title: 'Portrait Basics in Charcoal & Pastel',
    date: '2026-09-03',
    time: '10:00 AM - 1:00 PM',
    instructor: 'Priyanka',
    capacity: 10,
    registeredCount: 9,
    fee: '$55',
    level: 'Advanced',
    status: 'open',
    category: 'Sketching',
    image: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&q=80&w=600',
    description: 'An intensive study of facial proportions, shading, and expressive portraiture using compressed charcoal and soft pastels.',
    syllabus: ['Loomis method for facial structure and proportions', 'Chiaroscuro shading and tonal values', 'Expressive highlights using white chalk and pastel'],
  },
];

/* ---- Helper to manage local Demo Storage ---- */
function getLocalClasses() {
  const saved = localStorage.getItem('painting_demo_classes');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Automatically upgrade storage to USD ($) if any old ₹ currency symbols exist
      if (Array.isArray(parsed) && parsed.some(c => c.fee && c.fee.includes('₹'))) {
        localStorage.setItem('painting_demo_classes', JSON.stringify(INITIAL_CLASSES));
        return INITIAL_CLASSES;
      }
      return parsed;
    } catch (e) {
      localStorage.removeItem('painting_demo_classes');
    }
  }
  localStorage.setItem('painting_demo_classes', JSON.stringify(INITIAL_CLASSES));
  return INITIAL_CLASSES;
}

function saveLocalClasses(classes) {
  localStorage.setItem('painting_demo_classes', JSON.stringify(classes));
}

/* ============================================================
   CRUD METHODS FOR CLASSES / SESSIONS
   ============================================================ */

export async function getClasses() {
  if (isDemoMode || !db) {
    return getLocalClasses();
  }
  try {
    const q = query(collection(db, 'classes'), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_CLASSES;
    }
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (error) {
    console.warn('Firestore fetch failed, using demo fallback:', error);
    return getLocalClasses();
  }
}

export async function getClassById(id) {
  if (isDemoMode || !db) {
    const classes = getLocalClasses();
    return classes.find((c) => c.id === id) || null;
  }
  try {
    const docRef = doc(db, 'classes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    const classes = getLocalClasses();
    return classes.find((c) => c.id === id) || null;
  } catch (error) {
    console.warn('Firestore getDoc failed, using demo fallback:', error);
    const classes = getLocalClasses();
    return classes.find((c) => c.id === id) || null;
  }
}

export async function createClass(classData) {
  const newId = `class-${Date.now()}`;
  const newClass = {
    ...classData,
    id: newId,
    registeredCount: 0,
    status: 'open',
    createdAt: new Date().toISOString(),
    image: classData.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600',
    syllabus: classData.syllabus || ['Introduction to tools and materials', 'Step-by-step guided painting', 'Personalized instructor feedback and photo session'],
  };

  if (isDemoMode || !db) {
    const current = getLocalClasses();
    const updated = [newClass, ...current];
    saveLocalClasses(updated);
    return newClass;
  }
  try {
    await setDoc(doc(db, 'classes', newId), { ...newClass, createdAt: serverTimestamp() });
    return newClass;
  } catch (error) {
    console.warn('Firestore create failed, saving to local demo storage:', error);
    const current = getLocalClasses();
    saveLocalClasses([newClass, ...current]);
    return newClass;
  }
}

export async function updateClass(id, updates) {
  if (isDemoMode || !db) {
    const current = getLocalClasses();
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveLocalClasses(updated);
    return updated.find((c) => c.id === id);
  }
  try {
    const docRef = doc(db, 'classes', id);
    await updateDoc(docRef, updates);
    return { id, ...updates };
  } catch (error) {
    console.warn('Firestore update failed, updating local storage:', error);
    const current = getLocalClasses();
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveLocalClasses(updated);
    return updated.find((c) => c.id === id);
  }
}

export async function deleteClass(id) {
  if (isDemoMode || !db) {
    const current = getLocalClasses();
    const updated = current.filter((c) => c.id !== id);
    saveLocalClasses(updated);
    return true;
  }
  try {
    await deleteDoc(doc(db, 'classes', id));
    return true;
  } catch (error) {
    console.warn('Firestore delete failed, deleting from local storage:', error);
    const current = getLocalClasses();
    saveLocalClasses(current.filter((c) => c.id !== id));
    return true;
  }
}

export function resetDemoData() {
  localStorage.setItem('painting_demo_classes', JSON.stringify(INITIAL_CLASSES));
  return INITIAL_CLASSES;
}
