import { settingsData } from '../../settings';

export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'evissa';
export const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const url = new URL(siteURL);
let hostname = url.hostname;
if (hostname.startsWith('www.')) {
    hostname = hostname.substring(4);
}
export const hostName = hostname.toUpperCase();

export const randomCode = (Math.random() + 1).toString(36).substring(2);

export function generateRandomNumber(minDigits, maxDigits) {
    const min = Math.pow(10, minDigits - 1);
    const max = Math.pow(10, maxDigits) - 1;
    return String(Math.floor(min + Math.random() * (max - min + 1)));
}

export function generateRandomrateRandomId(length = 8) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const hostWebEmail = process.env.NEXT_PUBLIC_WEBSITE_MAILER || process.env.USER_MAILER;

export const listReason = [
    { id: 1, text: 'Expert support.' },
    { id: 2, text: 'Free Initial Assessment.' },
    { id: 3, text: '24/7 support.' },
    { id: 4, text: 'Transparency in procedure and fees.' },
    { id: 5, text: 'Timely delivery guaranteed.' },
];

export const listFaqs = [
    {
        id: 'panel1',
        text: 'How do I apply for an E-Visa with us?',
        content:
            'We simplified the E-Visa procedure to create a favorable condition for visitors to get one before starting their journey. Here are the easy-to-follow steps for obtaining a visa online with us:<br/><ul><li>Step 1: Complete the application form accurately</li><li>Step 2: Pay the visa fee by utilizing the accepted means of payment.</li><li>Step 3: Assemble all the required documents and send them to our email address.</li><li>Step 4: Wait for E-Visa results from us within 3-5 working days (varies depending on the visa services you choose)</li></ul>',
    },
    {
        id: 'panel2',
        text: 'Who qualifies for an E-Visa at E-vissa.com?',
        content:
            'Every passenger will need to familiarize themselves with the different necessary documents in order to enter each country. Travelers are welcome to check all crucial materials and basic visa requirements of various nations easily with our useful tool, which can be found at <a href="https://www.e-vissa.com/visa-applications">https://www.e-vissa.com/visa-applications</a>. Every country has its own entry requirements, visa costs, and other convenient services like emergency services and expedited E-Visa pickup based on your travel schedule.',
    },
    {
        id: 'panel3',
        text: 'Do expats need to print their E-Visa out while traveling?',
        content:
            'An electronic visa (E-Visa) is a valid document that allows admission into and travel within any country where the online visa application process has been implemented. It serves as an alternative to visas obtained at ports of entry and at designated immigration offices. If your visa request is accepted, you will receive an email with a link to download your E-Visa.<br/>At ports of entry, passport control officers can check your E-Visa on their database. <b>It is advised for you to print out the valid E-Visa</b> to present to the immigration officer at the airport if required and in the event that their system malfunctions.  E-Visa holders may be denied entry at the ports of entry, just like with regular visas, if they fail to prove their legal entry permission.',
    },
    {
        id: 'panel4',
        text: 'Why does E-vissa.com charge a service fee?',
        content:
            'Customers who utilize our visa consultant must pay the service fee to make use of our assistance in:<br/><ul><li>Keep customers informed about any changes to immigration and visa regulations.</li><li>Determine which kind of visa best fits the needs and circumstances of the client.</li><li>Gather all the required paperwork, and make sure all information on the application form is filled out accurately.</li><li>Ensure that the visa process goes smoothly, and keep an eye on the entire undertaking.</li><li>Keeping track of the application"s status, answering questions from the authorities, and providing the client with up-to-date information.</li><li>Provide customers with useful advice to solve any unanticipated issues during the whole visa procedure.</li></ul>',
    },
    {
        id: 'panel5',
        text: 'How can I keep track of my visa status?',
        content: `The highly recommended way for you to check the status of your visa is to call our hotline at <a href="tel:${settingsData.siteContactPhone}">${settingsData.siteContactPhone}</a>. Sending an email to <a href="mailto:${settingsData.siteContactEmail}">${settingsData.siteContactEmail}</a> is also another useful option for communicating with our employees. Our customer service representatives are available to assist you in reviewing your visa situation and giving you any notifications. We will inform you via the registered email address with your E-Visa attached if your application is approved.`,
    },
    {
        id: 'panel10',
        text: 'What is an E-visa?',
        content: `An E-visa, or electronic visa, is a digital version of a traditional visa that is stamped or glued into a passport. This visa is a replacement for the choice to apply visa at the ports of entry or visit an embassy/consulate.
<br/>Instead of a physical document, an E-visa is stored electronically, linked to the traveler's passport through a unique identification number. Besides, the E-visa process typically involves submitting an online application form, providing necessary documentation, and making any required payments electronically.
<br/>Once approved, the E-visa is electronically linked to the traveler's passport, and they receive confirmation of their visa approval.
`,
    },
    {
        id: 'panel11',
        text: 'How do I know when I need a visa?',
        content: `You need to check if you need a visa before traveling to a specific country. The visa requirements vary from country to country, and it's essential to know the rules for your destination. 
<br/>To find out if you need a visa, you can:
<ul>
    <li>Check the country's official website: Visit the official website of the embassy or consulate of the country you plan to visit. They usually provide detailed information about visa requirements.</li>
    <li>Check travel advisory websites: Government travel advisory websites, such as those provided by your home country, often have information about visa requirements for different destinations.</li>
    <li>Contact the Embassy or Consulate: If you're unsure, it's a good idea to contact the embassy or consulate of the country you plan to visit. They can provide accurate and up-to-date information about visa requirements.</li>
</ul>
<br/>Or most simply, you can immediately visit our website at Evissa. By simply filling in where you are and where you want to go, we will immediately answer whether you need a visa or not.</li>
<br/>Not only that, we also tell you how to apply for a visa the specific price (the price is completely reasonable), and how you can quickly get an entry ticket right away!</li>
`,
    },
    {
        id: 'panel12',
        text: 'How long is my visa valid for and how much does it cost?',
        content: `The validity and cost of visas can vary widely between countries. Every country has its own set of entry requirements and visa fees. It's crucial to check the latest requirements on official government websites or contact the respective embassies or consulates for the most up-to-date information.
<br/>We will list a few countries for you so you can easily visualize:
<br/><b>United States (U.S.)</b>
<ul>
<li>Validity: The U.S. offers various types of visas with different validity periods, ranging from a few months to several years.</li>
<li>Cost: Visa fees also vary based on the type of visa. As of my last update, the application fee for a visitor visa (B1/B2) was around 160 USD.</li>
</ul>
<b>India</b>
<ul>
<li>Validity: India offers different visa types with varying validity periods, such as tourist visas (up to 10 years for U.S. citizens).</li>
<li>Cost: Visa fees depend on the type and duration of the visa. For example, tourist visa fees can range from 10 to 100 USD or more, depending on the duration and other factors.</li>
</ul>
<b>Turkish</b>
<ul>
<li>Validity: Turkey provides various visa options, including e-Visas for tourism purposes, typically valid for 30 or 90 days.</li>
<li>Cost: The cost of a Turkish E-visa can vary depending on the nationality which is around 100 to 350 USD.</li>
</ul>
<b>Australia</b>
<ul>
<li>Validity: Australia offers different types of visas, each with its own validity period. Tourist visas can range from a few weeks to several months.</li>
<li>Cost: The cost varies based on the type of visa. For example, the visitor visa (subclass 600) application fee was around 145 USD.</li>
</ul>
<b>Vietnam</b>
<ul>
<li>Validity: Vietnam offers various visa types with different validity periods, ranging from single-entry to multiple-entry visas.</li>
<li>Cost: Visa fees can vary. The cost for a single-entry tourist visa was around 25 USD to 60 USD depending on the duration.</li>
</ul>`,
    },
    {
        id: 'panel13',
        text: 'Once I apply, when I will receive my visa?',
        content: `The processing time for visas can vary widely between countries, and it also depends on the type of visa you are applying for. Here's a general overview of some countries that you might be concerned about:
<ul>
    <li><b>United States (US)</b>: The processing time for a U.S. visa can vary, but it is quite quick. It typically takes from 6 hours to 3 working days. Certain visa categories may have expedited processing options for an additional fee.</li>
    <li><b>India</b>: The processing time for an Indian visa also varies. It can take anywhere from 3 to 7 working days depending on different cases.</li>
    <li><b>Turkey</b>: Processing time for Turkish visa application Normally, the Embassy of the Republic of Türkiye will take a minimum of 15 days. For Turkey's E-visa system, the processing time is usually fast. You can receive your E-visa within a few days after applying online. </li>
    <li><b>Canada</b>: The processing time for a Canada visa varies depending on the type of visa and individual circumstances. It can range from 3 or 4 weeks to several months. Applying well ahead of your planned travel date is recommended.</li>
    <li><b>Vietnam</b>: The processing time for a Vietnamese visa can vary too. It may take 10 days to a few weeks. Some expedited processing options may be available for an additional fee.</li>
</ul>`,
    },
    {
        id: 'panel14',
        text: 'What are the specifications for printing the E-vissa?',
        content: `The specifications for printing an E-visa can vary depending on the country that issues the electronic visa. Generally, the instructions for printing an E-visa are provided during the application process or in the approval notification. Here are some common specifications:
<ul>
        <li>Printer quality: Use a high-quality printer to ensure that all details, including text and any barcodes or QR codes, must be printed clearly.</li>
<li>Paper specifications: Print the documents on a sheet of blank A4 white paper. </li>
<li>Paper size: Print the E-visa on standard letter-sized (8.5 x 11 inches) white paper unless otherwise specified in the instructions.</li>
<li>Color printing: Some E-visas in a few countries may require color printing. Ensure that your printer is set to print in color if necessary.</li>
<li>Single-sided printing: Most e-Visas are designed to be printed on one side of the paper. Avoid double-sided printing and reduced printing as it will not be accepted.</li>
</ul>`,
    },
    {
        id: 'panel15',
        text: 'Why choose E-vissa?',
        content: `We assist you in getting your travel visa or health declaration in the easiest and fastest way. Our online forms are simple to use, and our customer service is available 24/7 to help you. 
<br/><br/>We assure to provide all the information for your inquiries. From visa application, requirements, visa fee, the number of entries, the start date, and so on. We promise to make the visa process quick and straightforward! 
<br/><br/>Plus, we take extra care to keep your data and credit card information safe by following the best practices. 
`,
    },
    {
        id: 'panel16',
        text: 'What kind of visas does E-vissa process?',
        content: `At Evissa, our commitment extends beyond merely offering E-visa (electronic visa) services – we aim to be your comprehensive resource for all things related to E-visas. We pride ourselves on being a solution where you can find assistance with your specific destination and travel plans. 
<br/><br/>Whether you have questions about the application process, want to understand the requirements, or seek guidance on any aspect of E-visas, our team is here to provide detailed and personalized answers.
<br/><br/>At Evissa, we believe in making your E-visa experience smooth with no obstacles. Your peace of mind is our priority, and we are dedicated to being your trusted partner throughout the entire process. 

<br/><br/>In conclusion, having a comprehensive understanding of frequently asked questions <b>(FAQs)</b> for visas is crucial for anyone planning international travel. This guide has aimed to demystify the common concerns associated with visa applications, providing a valuable resource for travelers on their international journey.

<br/><br/>In case you have any more questions or need further assistance, feel free to reach out to us by sending an email to <a href='mailto:${settingsData.siteContactEmail}'>${settingsData.siteContactEmail}</a>. Our team is ready to offer the assistance you require!`,
    },
];

export const listFaqsCovidAndQuarantine = [
    {
        id: 'panel6',
        text: 'What is a health declaration?',
        content:
            'A health declaration is like an official form and document that travelers need to fill out. It"s proof to show that visitors don"t have symptoms of COVID-19 or any other sickness that can spread. It"s become a standard thing for people traveling now to make sure everyone stays safe and healthy.',
    },
    {
        id: 'panel7',
        text: 'Do I need a COVID-19 vaccine certificate to travel?',
        content: `Yes, many places now require a Covid-19 vaccine certificate for travel. A Covid-19 vaccine certificate shows that you"ve been vaccinated against the virus, which can help prevent its spread. It"s becoming a common requirement to ensure the safety of travelers and the communities they visit. <br/><br/>However, whether you need to get vaccinated before traveling depends on the rules in the country you"re going to. Sometimes, if you"ve had all your shots, you don"t have to take a COVID-19 test or go through quarantine.<br/>So, before planning your trip, it"s essential to check the specific travel regulations and entry requirements of your destination.`,
    },
    {
        id: 'panel8',
        text: 'Do I need a COVID-19 test to travel?',
        content:
            'Yes, you might need to take a Covid-19 test before traveling. It"s important to check the specific requirements of the place you"re going to, as different locations have different rules.<br/><br/>Some destinations may ask for a negative Covid-19 test result to ensure everyone"s safety. Always check the latest guidelines and regulations to make sure you have the necessary information and meet the travel criteria.',
    },
    {
        id: 'panel9',
        text: 'Do I need to quarantine once I get to my destination?',
        content: `You might need to quarantine when you arrive at your destination. It depends on the rules of the place you're going to. Some locations require travelers to stay in quarantine for a certain period to make sure they're not carrying COVID-19.
<br/><br/>Remember to check the specific guidelines for your destination to know if quarantine is necessary and for how long. This means you need to consider these factors and check the guidelines of your destination to understand if quarantine is required.
Just stay informed about the latest travel regulations to ensure a smooth and safe journey.
`,
    },
];

export const dataReview = [
    {
        id: 1,
        title: '“Impressive experience, many thanks”',
        stars: '5',
        text: 'I wanted to express my gratitude for helping our CEO secure a visa so he could visit Vietnam quickly. The procedure was simple to understand and executed well. I wish I could have searched for your website before struggling to complete the visa application myself. I had a really hard time figuring out the Vietnam government’s instructions. Once more, idk how to say thank you for everything you do. If we ever need a travel visa in the future, we will most definitely use your services.',
        customerName: 'Vardan Ghazarian',
        country: 'Armenia',
    },
    {
        id: 2,
        title: '“Incredibly simple and quick application”',
        stars: '5',
        text: 'I chose to use an agent instead of the Indian government E-Visa website after having extremely troubling problems with it. Not cheap but affordable. Evissa processed my application twice as quickly. Within 3 days only, I went back to the government website to check visa status and (surprisingly) saw my E-Visa had been “granted”. I want to thank you for your kind assistance and quick visa delivery. Be aware that there are several false comments about Evissa on the internet. Please disregard.',
        customerName: 'Anjali Desai',
        country: 'India',
    },
    {
        id: 3,
        title: '“Professional visa services & dedicated consultants!”',
        stars: '5',
        text: 'We appreciate how quickly you processed our applications, and how much effort you took to ensure we had everything ready before submitting them to you. We also appreciated that every time we called with questions, we could talk to a live representative. I really enjoyed working with Evissa, and I’m gonna be back for my upcoming trips.',
        customerName: 'Charlotte',
        country: 'Nigeria',
    },
];
