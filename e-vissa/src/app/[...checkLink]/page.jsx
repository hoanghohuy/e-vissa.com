import { notFound, redirect } from 'next/navigation';
import { getCategoryBySlug } from '@/helpers/getCategory';

const PageDetail = async ({ params }) => {
    const segments = params.checkLink;
    const finalIndex = segments.length - 1;
    if (segments[0] !== 'admin' && segments[finalIndex].endsWith('.html') && segments.length > 2) {
        return notFound();
    }

    const listAcceptedlinks = ['usedful-guide'];

    if (listAcceptedlinks.includes(segments[0])) {
        redirect('/');
    }

    const checkCategory = await getCategoryBySlug(segments[0]);
    if (checkCategory === null) {
        return notFound();
    }
};

export default PageDetail;
