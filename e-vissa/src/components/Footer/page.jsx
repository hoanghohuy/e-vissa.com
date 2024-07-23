import Footer from './Footer';
import { getAllCategories } from '@/helpers/getCategory';

const Page = async () => {
    const category = await getAllCategories();

    return <Footer dataCategory={category} />;
};
export default Page;
