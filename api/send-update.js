export default function handler(req, res) {
  if (req.method === "POST") {
    const { week, message } = req.body;

    console.log("📬 Received weekly update:", week, message);

    // Example: placeholder for sending emails/texts later
    // You can integrate EmailJS, Twilio, or SendGrid here later

    return res.status(200).json({
      success: true,
      info: `Weekly update for week ${week} received.`,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}