export default async function handler(req, res) {
    // Hanya izinkan request POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Mengambil API Key dari Environment Variables Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Meneruskan payload (pesan & sistem instruksi) dari frontend langsung ke Google
            body: JSON.stringify(req.body) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error dari Gemini: ${response.status}`);
        }

        const data = await response.json();
        // Mengembalikan jawaban Gemini ke frontend
        return res.status(200).json(data);
    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ error: 'Gagal menghubungi server AI.' });
    }
}