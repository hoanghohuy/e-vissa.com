export async function getAllDataImages(token) {
    try {
        const images = await fetch(`${process.env.NEXT_PUBLIC_SERVER_FILE_URL}/images`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        const data = await images.json();
        return data;
    } catch (error) {
        throw error;
    }
}
