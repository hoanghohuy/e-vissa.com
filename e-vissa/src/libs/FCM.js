import { prefixOrder } from 'settings';
import { isEmptyObject } from '@/utils/validation';
const firebase_url = 'https://fcm.googleapis.com/fcm/send';
const firebase_token = process.env.FIREBASE_CLOUD_MESSAGING_SERVER_KEY;
const type = {
    // Oder
    1.1: orderPending,
    1.2: orderCancelled,
    1.3: orderPayment,
    // User
    2.1: userPasswordCode,
    // Post
    3.1: postNewsletter,
    // Contact
    4.1: contactSupport,
};

function orderPending(orderData) {
    const { id } = orderData;
    return {
        title: `Your order is pending`,
        content: `You have an incomplete order with code ${prefixOrder}${id}`,
    };
}

function orderCancelled(orderData) {
    const { id } = orderData;
    return {
        title: `Your order is cancelled`,
        content: `Your order with code ${prefixOrder}${id} has been cancelled`,
    };
}

function orderPayment(orderData) {
    const { id } = orderData;
    return {
        title: 'Thank you for your payment',
        content: `Thank you for paying for order code ${prefixOrder}${id}`,
    };
}

function userPasswordCode(userData) {
    const { code } = userData;
    return {
        title: `Your verification code: ${code}`,
        content: `Please use this code ${code} to complete the password reset process.`,
    };
}
function postNewsletter(postData) {
    const { name, desc } = postData;
    return {
        title: name,
        content: desc,
    };
}

function contactSupport(contactData) {
    const { sitename, title } = contactData;
    return {
        title: `There is support for ${sitename}`,
        content: title,
    };
}

function getContentByType(typeKey, data) {
    const contentFunction = type[typeKey];
    if (typeof contentFunction === 'function') {
        return contentFunction(data);
    } else {
        return null;
    }
}

export async function firebaseMessaging(device_info, typeKey, data) {
    if (isEmptyObject(device_info) || !typeKey || isEmptyObject(data)) {
        return false;
    }

    const content = getContentByType(typeKey, data);

    if (content === null) {
        return false;
    }

    const body = {
        to: device_info.fcm_token,
    };

    body[device_info.platform] = {
        priority: 'high',
    };

    if (device_info.platform === 'ios') {
        body.content_available = true;
        body.mutable_content = true;
        body.notification.title = content.title;
        body.notification.body = content.content;
        body.notification.sound = 'default';
        body.data = data;
    }

    if (device_info.platform === 'android') {
        body.data = { ...data, ...content };
    }

    try {
        const response = await fetch(firebase_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${firebase_token}`,
            },
            body: JSON.stringify(body),
        });

        return await response.json();
    } catch (error) {
        console.error('Firebase error: ' + error.message);
        return false;
    }
}
