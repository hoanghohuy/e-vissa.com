import { NextResponse } from 'next/server';
import { processIPN } from '@/libs/9pay';
import { checkOrderId } from '@/utils/validation';
import { updateOrderPayment } from '@/services/serviceOrder';

// IPN 9Pay
export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const result = formData.get('result');
        const checksum = formData.get('checksum');

        const data = processIPN(result, checksum);
        if (data !== null) {
            const { error_code, invoice_no, payment_no } = data;
            const status = error_code == '000' ? 'Paid' : 'Paid Failed';
            const id = checkOrderId(invoice_no);
            await updateOrderPayment({ id, status, payment_method: '9Pay', transaction: payment_no });
            return NextResponse.json({ status });
        }
    } catch (err) {
        return NextResponse.json('Failed to connect to 9Pay', { status: 406 });
    }
};
