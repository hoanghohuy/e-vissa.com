export const getServices = async () => {
    const services = await fetch(`/api/services`);
    const data = await services.json();
    return data;
};
