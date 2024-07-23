export const getStandardFee = (services) => {
    if (services) {
        const servicesList = JSON.parse(services);
        if (servicesList && servicesList.length > 0) {
            const standardService = servicesList.find((item) => item.published == -1);
            if (standardService) {
                return parseInt(standardService.fee);
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};
