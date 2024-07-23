import * as jose from 'jose';
let expiresIn = process.env.JWT_EXPIRED_TIME || '24h';
const secretKey = new TextEncoder().encode(process.env.JWT_KEY);

export async function generateJWT(payload = '') {
    // Generate token from login successfully
    const alg = 'HS256';
    const jwtToken = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime(expiresIn)
        .sign(secretKey);
    return jwtToken;
}

export async function verifyJWT(jwtToken) {
    try {
        const { payload } = await jose.jwtVerify(jwtToken, secretKey).catch(async (err) => {
            console.error('---', err.message);
            return false;
        });

        const { id, email, role, exp } = payload;
        if (!id || !role) return false;

        return payload;
    } catch (error) {
        console.error('---', error.message);
        return false;
    }
}
