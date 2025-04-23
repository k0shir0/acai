module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;

            // **Important Security:**
            // In a real application, you would never hardcode credentials like this.
            // You should store them securely (e.g., in environment variables, a database, or a secrets management service)
            // and use proper password hashing (like bcrypt) for comparison.
            const validUsername = "DIH";
            const validPassword = "DIH";

            if (!validUsername || !validPassword) {
                console.error('VIP credentials not configured in environment variables.');
                return res.status(500).json({ success: false, message: 'VIP authentication not properly configured.' });
            }

            if (username === validUsername && password === validPassword) {
                return res.status(200).json({ success: true, message: 'VIP access granted.' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid username or password.' });
            }
        } catch (error) {
            console.error('Error during VIP authentication:', error);
            return res.status(500).json({ success: false, message: 'Authentication failed due to a server error.' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed. Only POST requests are accepted.' });
    }
  
};
