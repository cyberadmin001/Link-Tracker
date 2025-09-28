export default function handler(req, res) {    const { rid } = req.query;    // Log the RID (this will appear in Vercel logs)    
console.log(`Click tracked: RID=${rid}`);    // Redirect the user to a fallback page    
res.writeHead(302, { Location: 'https://forms.office.com/r/EG2qXBvq4W' });    res.end();}
