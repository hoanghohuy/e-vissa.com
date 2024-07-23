import { isEmptyObject } from '@/utils/validation';

export const filterVisaServiceData = (services) => {
    const filteredServices = services.filter(
        (service) =>
            service.label.trim() !== '' && parseFloat(service.processing_times) !== 0 && parseFloat(service.fee) !== 0,
    );
    let result = null;

    if (!isEmptyObject(filteredServices)) {
        result = JSON.stringify(filteredServices);
    }

    return result;
};

export const defaultServices = [
    {
        id: 1,
        label: 'Standard Service',
        processing_times: '0',
        fee: 0,
        type: 'd',
        published: -1,
    },
];
