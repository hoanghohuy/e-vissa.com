import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const TableOfContents = ({ headingTags, mode = '' }) => {
    const [expanded, setExpanded] = useState(true);
    const [childCollapsed, setChildCollapsed] = useState([]);

    const extractHeadings = () => {
        const headings = [];
        let currentH2 = null;

        headingTags.forEach((heading) => {
            if (heading.type === 'h2') {
                currentH2 = { ...heading, children: [] };
                headings.push(currentH2);
            } else if (heading.type === 'h3' && currentH2) {
                currentH2.children.push(heading);
            }
        });

        return headings;
    };

    const handleAccordionChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleAccordionChildChange = (panel) => (_, isExpanded) => {
        setChildCollapsed(isExpanded ? [...childCollapsed, panel] : childCollapsed.filter((item) => item !== panel));
    };

    const renderHeadingLink = (heading) => (
        <a className="hover:text-primary" href={`#${heading.id}`}>
            <span
                dangerouslySetInnerHTML={{
                    __html: heading.text,
                }}
            ></span>
            {/* {heading.text} */}
        </a>
    );

    return (
        <nav id="table-of-content" aria-label="Table of contents">
            <Accordion
                key={'table-of-content'}
                sx={{
                    borderRadius: '12px',
                    border: '1px solid #cae3ff',
                    boxShadow: 'none',
                    '&:not(:last-child)': {
                        borderBottom: 0,
                    },
                    '&:before': {
                        display: 'none',
                    },
                }}
                expanded={expanded}
                onChange={handleAccordionChange('table-of-content')}
            >
                <AccordionSummary
                    key={'table-of-content'}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    sx={{
                        fontFamily: 'DM Sans',
                        fontWeight: '600',
                        backgroundColor: '#cae3ff',
                        '&.Mui-expanded': {
                            minHeight: '52px',
                            margin: '0',
                            '.MuiAccordionSummary-content.Mui-expanded': {
                                margin: '0',
                            },
                        },
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    Table of Contents
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '16px' }}>
                    {extractHeadings().map((heading) => (
                        <div key={heading.id}>
                            {heading.children.length > 0 ? (
                                <Accordion
                                    key={heading.id}
                                    sx={{
                                        borderRadius: '12px',
                                        boxShadow: 'none',
                                        '&:not(:last-child)': {
                                            borderBottom: 0,
                                        },
                                        '&:before': {
                                            display: 'none',
                                        },
                                    }}
                                    expanded={childCollapsed.includes(heading.id) ? true : false}
                                    onChange={handleAccordionChildChange(heading.id)}
                                >
                                    <AccordionSummary
                                        key={heading.id}
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                        sx={{
                                            padding: '4px 0',
                                            // fontWeight: '500',
                                            minHeight: 'unset',
                                            flexDirection: 'row-reverse',
                                            gap: '2px',
                                            '.MuiAccordionSummary-content': {
                                                margin: '0',
                                            },
                                            '&.Mui-expanded': {
                                                minHeight: 'unset',
                                                margin: '0',
                                                flexDirection: 'row-reverse',
                                                '.MuiAccordionSummary-content.Mui-expanded': {
                                                    margin: '0',
                                                },
                                            },
                                        }}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <div className={mode ? 'text-[14px]' : ''}>{renderHeadingLink(heading)}</div>
                                    </AccordionSummary>

                                    {heading.children.length > 0 && (
                                        <AccordionDetails sx={{ padding: '0' }}>
                                            <ul className="pl-12">
                                                {heading.children.map((child) => (
                                                    <li
                                                        key={child.id}
                                                        className={`text-[14px] py-1 hover:text-primary ${
                                                            mode ? 'text-[13px]' : ''
                                                        }`}
                                                    >
                                                        {renderHeadingLink(child)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionDetails>
                                    )}
                                </Accordion>
                            ) : (
                                <div className={`pl-[26px] py-1 text-[16px] ${mode ? '!text-[14px]' : ''}`}>
                                    {renderHeadingLink(heading)}
                                </div>
                            )}
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </nav>
    );
};

export default TableOfContents;
