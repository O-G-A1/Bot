import "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

// === Replace with your Telegram bot token ===
const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// === Replace with your email info ===
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const TO_EMAIL = process.env.TO_EMAIL;

// === Email setup ===
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this (e.g. "outlook", "yahoo")
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// === 10 group rules ===
const GROUP_RULES = [
  "1️⃣ Be respectful to everyone.",
  "2️⃣ No hate speech or bullying.",
  "3️⃣ No spam or self-promotion.",
  "4️⃣ Keep conversations relevant.",
  "5️⃣ No NSFW content.",
  "6️⃣ Avoid sharing fake news.",
  "7️⃣ Listen to admins’ instructions.",
  "8️⃣ Use English when possible.",
  "9️⃣ Report suspicious users.",
  "🔟 Have fun responsibly!",
];

// === Function to send a message ===
async function sendMessage(chatId, text, extra = {}) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, ...extra }),
  });
}

// === Webhook route ===
app.post("/", async (req, res) => {
  const update = req.body;

  // Handle new chat members
  if (update.message?.new_chat_members) {
    const chatId = update.message.chat.id;
    const names = update.message.new_chat_members
      .map((u) => u.first_name)
      .join(", ");
    await sendMessage(
      chatId,
      `👋 Welcome ${names}!\nHere are the group rules:\n\n${GROUP_RULES.join(
        "\n"
      )}`
    );
  }

  // Handle group reminders at intervals (every 6 hours example)
  // This won't run on a schedule directly since Vercel is serverless,
  // but you can trigger it via a ping service (like cron-job.org)
  if (update.message?.text === "/remind") {
    const chatId = update.message.chat.id;
    await sendMessage(
      chatId,
      "⚠️ Admins would never DM you first. Beware of scammers."
    );
  }

  // Handle private messages
  if (update.message?.chat.type === "private") {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (text === "/start") {
      const keyboard = {
        inline_keyboard: [
          [
            { text: "Visit Website 🌐", url: "https://yourwebsite.com" },
            { text: "Join Group 💬", url: "https://t.me/yourgroup" },
          ],
          [{ text: "Help ❓", callback_data: "help" }],
        ],
      };
      await sendMessage(
        chatId,
        "👋 Hi! Welcome to our bot. Choose an option below:",
        { reply_markup: keyboard }
      );
    }

    if (text === "/help") {
      await sendMessage(
        chatId,
        "How can I assist you today? Please type your question below."
      );
    }

    // If user sends custom info, email it to you
    if (!text.startsWith("/")) {
      const mailOptions = {
        from: EMAIL_USER,
        to: TO_EMAIL,
        subject: "New Bot Submission",
        text: `User @${
          update.message.from.username || "unknown"
        } said:\n\n${text}`,
      };

      await transporter.sendMail(mailOptions);
      await sendMessage(
        chatId,
        "✅ Thank you! Your information has been sent successfully."
      );
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("Bot is live ✅"));
console.log("✅ Bot script started...");

export default app;
