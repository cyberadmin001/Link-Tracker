export default async function handler(req, res) {
  // 1. Extract the RID (Referral ID) from the query parameters
  const rid = req.query.rid || 'no_rid';  // Default to 'no_rid' if not present

  // 2. Get the user's IP address (from the 'X-Forwarded-For' header or use remoteAddress)
  const xff = req.headers['x-forwarded-for'];
  const userIp = (Array.isArray(xff) ? xff[0] : (xff || '').split(',')[0].trim()) || req.socket?.remoteAddress || 'unknown';

    if (userIp && userIp !== 'unknown') {
    const geoUrl = `http://ip-api.com/json/${encodeURIComponent(userIp)}?fields=status,country,regionName,city,lat,lon,timezone,isp,query`;
    const controllerGeo = new AbortController();
    const geoTimeoutMs = 300; // short timeout so we don't delay redirect
    const timeoutId = setTimeout(() => controllerGeo.abort(), geoTimeoutMs);

  // 3. Capture the user-agent (browser, OS, etc.) from the request headers
  const userAgent = req.headers['user-agent'];

  // 4. Capture the referer (where the user came from before clicking the link)
  const referer = req.headers['referer'];

  // 5. Optional: Capture the timestamp (if provided in the request)
  const timestamp = req.query.timestamp || Date.now(); // Defaults to current time if not provided

  // 6. Log the captured data (RID, IP, User-Agent, Referer, Timestamp)
  console.log(`Tracking click: RID=${rid}, IP=${userIp}, User-Agent=${userAgent}, Referer=${referer}, Timestamp=${timestamp}`);

  // 7. Redirect the user to the form (after tracking)
  res.redirect(302, "https://forms.office.com/r/EG2qXBvq4W");
  // The status 302 indicates a temporary redirect (can also use 301 for permanent)
}
