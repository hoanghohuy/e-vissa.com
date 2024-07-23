import Header from './Header';
import { getAllCategories } from '@/helpers/getCategory';

const Page = async () => {
    const category = await getAllCategories();

    return <Header dataCategory={category} />;
};
export default Page;
