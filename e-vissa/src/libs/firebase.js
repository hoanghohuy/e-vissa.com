import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child, remove } from 'firebase/database';
import { notiOrderLimit } from 'settings';

const firebaseConfig = {
    apiKey: 'AIzaSyC5F_GEyDC0yeqenNujoObfwMHHj7dVra4',
    authDomain: 'e-vissa.firebaseapp.com',
    databaseURL: 'https://e-vissa-default-rtdb.firebaseio.com',
    projectId: 'e-vissa',
    storageBucket: 'e-vissa.appspot.com',
    messagingSenderId: '125619557819',
    appId: '1:125619557819:web:9a734d1bfb0ec7e603609e',
    measurementId: 'G-EBVPK6CTC5',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const orderRef = ref(database, 'evissa-orders');
export const presenceRef = ref(database, 'presence');

export async function addOrderRealtime(order) {
    const { id, dataValues } = order;
    const ordersSnapshot = await get(orderRef);
    const orders = ordersSnapshot.val() || {};

    const orderIds = Object.keys(orders).sort((a, b) => orders[a].created_at - orders[b].created_at);

    if (orderIds.length >= notiOrderLimit) {
        const oldestOrderId = orderIds[0];
        await remove(child(orderRef, oldestOrderId));
    }

    await set(child(orderRef, id), {
        ...dataValues,
        created_at: Date.now(),
    });
}
