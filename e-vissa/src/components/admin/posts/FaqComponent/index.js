import { customTextFieldAdmin } from '@/components/Page/CustomMUI/customMUI';
import { Button, Grid, TextField } from '@mui/material';
import stylesAdmin from '@/components/admin/Admin.module.css';
import stylesSystem from '@/app/page.module.css';
import { Editor } from '@tinymce/tinymce-react';

export default function FaqComponent({ faqsList, setFaqsList }) {
    const handleDeleteFaq = (faq) => {
        let currentFaq = Object.assign({}, faqsList);
        currentFaq.data = currentFaq.data.filter((item) => item.id != faq.id);
        setFaqsList(currentFaq);
    };

    const handleChangeFaq = (field, faq, event) => {
        let currentFaq = Object.assign({}, faqsList);

        const index = currentFaq.data.findIndex((item) => item.id == faq.id);
        switch (field) {
            case 'question':
                const valueInput = event.target.value;
                currentFaq.data[index].q = valueInput;
                break;
            case 'answer':
                currentFaq.data[index].a = event;
                break;
            default:
                break;
        }
        setFaqsList(currentFaq);
    };

    const handleAddNewFaq = () => {
        let currentFaq = Object.assign({}, faqsList);
        const newID = currentFaq.data.length > 0 ? currentFaq.data[currentFaq.data.length - 1]?.id + 1 : 1;
        currentFaq.data.push({ id: newID, q: '', a: '' });
        setFaqsList(currentFaq);
    };

    return (
        <>
            {faqsList.published == 1 && (
                <Grid item lg={12} xs={12} md={12} sm={12}>
                    <div className="mt-4 text-[20px] font-[600]">FAQS</div>
                    {faqsList.data &&
                        faqsList.data.length > 0 &&
                        faqsList.data.map((faq, index) => (
                            <div className="border-[1px] border-[#D1D5DB] rounded-md mt-2 p-4 relative">
                                <button
                                    onClick={() => handleDeleteFaq(faq)}
                                    className="absolute right-4 top-2 bg-red-600 px-3 text-white rounded-md"
                                >
                                    Delete
                                </button>
                                <div className={stylesAdmin.admin__label__required}>Question:</div>
                                <TextField
                                    sx={customTextFieldAdmin}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    value={faq.q}
                                    onChange={(e) => handleChangeFaq('question', faq, e)}
                                />
                                <div className={stylesAdmin.admin__label__required}>Answer:</div>
                                {/* <TextField
                                    sx={customTextFieldAdmin}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    multiline
                                    minRows={2}
                                    value={faq.a}
                                    onChange={(e) => handleChangeFaq('answer', faq, e)}
                                /> */}
                                <Editor
                                    value={faq.a}
                                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                    init={{
                                        height: 250,
                                        menubar: false,
                                        image_dimensions: true,
                                        image_advtab: true,
                                        image_title: true,
                                        object_resizing: 'img',
                                        resize_img_proportional: true,
                                        image_class_list: [{ title: 'Watermark', value: 'watermark' }],
                                        plugins: [
                                            'advlist',
                                            'lists',
                                            'link',
                                            'anchor',
                                            'visualblocks',
                                            'table',
                                            'wordcount',
                                        ],
                                        toolbar:
                                            'undo redo casechange blocks bold italic forecolor backcolor ' +
                                            'alignleft aligncenter alignright alignjustify link autolink anchor image table media fullscreen ' +
                                            'bullist numlist checklist outdent indent removeformat a11ycheck code help',
                                        toolbar_mode: 'wrap',
                                    }}
                                    onEditorChange={(data) => handleChangeFaq('answer', faq, data)}
                                />
                            </div>
                        ))}

                    <Button
                        variant="contained"
                        className={`${stylesSystem.admin__button__primary} mt-2`}
                        onClick={handleAddNewFaq}
                        fullWidth
                    >
                        Add new faq
                    </Button>
                </Grid>
            )}
        </>
    );
}
