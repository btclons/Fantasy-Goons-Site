export default function handler(req, res) {
    if (req.method === 'POST') {
        const { week, message } = req.body;
        console.log(`Sending update for week ${week}: ${message}`);
        res.status(200).json({ status: 'Update sent successfully' });

   // (Later, you can add Twilio or EmailJS calls here)
    return res.status(200).json({ success: true, message: `Update for week ${week} received.` });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}