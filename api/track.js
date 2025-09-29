export default function handler(req, res) {
    // Extract the 'rid' parameter from the query string
    const { rid } = req.query;

    // Log the RID (this will appear in Vercel logs)
    console.log(`Click tracked: RID=${rid}`);

    // Redirect the user to a fallback page (e.g., Microsoft Forms Thank You page)
    res.writeHead(302, { Location: 'https://forms.office.com/thankyou' });
    res.end();
}
