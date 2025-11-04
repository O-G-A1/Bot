// import "dotenv/config";
// import express from "express";
// import fetch from "node-fetch";
// import nodemailer from "nodemailer";

// const app = express();
// app.use(express.json());

// // === Telegram Bot Setup ===
// const BOT_TOKEN = process.env.BOT_TOKEN;
// const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// // === Email Info ===
// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;
// const TO_EMAIL = process.env.TO_EMAIL;

// // === Email Transporter ===
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Change if using Outlook, Yahoo, etc.
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });

// // === Group Rules ===
// const GROUP_RULES = [
//   "1️⃣ Be respectful to everyone.",
//   "2️⃣ No hate speech or bullying.",
//   "3️⃣ No spam or self-promotion.",
//   "4️⃣ Keep conversations relevant.",
//   "5️⃣ No NSFW content.",
//   "6️⃣ Avoid sharing fake news.",
//   "7️⃣ Listen to admins’ instructions.",
//   "8️⃣ Use English when possible.",
//   "9️⃣ Report suspicious users.",
//   "🔟 Have fun responsibly!",
// ];

// // === Function to Send Telegram Messages ===
// async function sendMessage(chatId, text, extra = {}) {
//   try {
//     const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chat_id: chatId, text, ...extra }),
//     });
//     const data = await res.json();
//     if (!data.ok) console.error("❌ Telegram error:", data);
//   } catch (err) {
//     console.error("⚠️ Failed to send Telegram message:", err.message);
//   }
// }

// // === Webhook Route ===
// app.post("/", async (req, res) => {
//   const update = req.body;
//   console.log("📩 Incoming update:", JSON.stringify(req.body, null, 2));

//   try {
//     // Handle new members joining
//     if (update.message?.new_chat_members) {
//       const chatId = update.message.chat.id;
//       const names = update.message.new_chat_members
//         .map((u) => u.first_name)
//         .join(", ");
//       await sendMessage(
//         chatId,
//         `👋 Welcome ${names}!\nHere are the group rules:\n\n${GROUP_RULES.join(
//           "\n"
//         )}`
//       );
//     }

//     // Handle reminder command
//     if (update.message?.text === "/remind") {
//       const chatId = update.message.chat.id;
//       await sendMessage(
//         chatId,
//         "⚠️ Admins would never DM you first. Beware of scammers."
//       );
//     }

//     // Handle private messages
//     if (update.message?.chat.type === "private") {
//       const chatId = update.message.chat.id;
//       const text = update.message.text;

//       if (text === "/start") {
//         const keyboard = {
//           inline_keyboard: [
//             [
//               {
//                 text: "Visit Website 🌐",
//                 url: "https://cryptoportal.byethost8.com",
//               },
//               {
//                 text: "Join Group 💬",
//                 url: "https://t.me/multiversX_1official",
//               },
//             ],
//             [{ text: "Help ❓", callback_data: "help" }],
//           ],
//         };
//         await sendMessage(
//           chatId,
//           "👋 Hi! Welcome to our bot. Choose an option below:",
//           { reply_markup: keyboard }
//         );
//       } else if (text === "/help") {
//         await sendMessage(
//           chatId,
//           "How can I assist you today? Please type your question below."
//         );
//       } else if (!text.startsWith("/")) {
//         // User sent a custom message — send to email
//         const mailOptions = {
//           from: EMAIL_USER,
//           to: TO_EMAIL,
//           subject: "New Bot Submission",
//           text: `User @${
//             update.message.from.username || "unknown"
//           } said:\n\n${text}`,
//         };

//         try {
//           await transporter.sendMail(mailOptions);
//           await sendMessage(
//             chatId,
//             "✅ Congratulations! Your request is being processed."
//           );
//         } catch (emailErr) {
//           console.error("📧 Email sending failed:", emailErr.message);
//           await sendMessage(
//             chatId,
//             "⚠️ Sorry, there was an issue processing your request. Please try again."
//           );
//         }
//       }
//     }

//     res.sendStatus(200);
//   } catch (err) {
//     console.error("❌ Error processing update:", err.message);
//     res.sendStatus(500);
//   }
// });

// // === Root Route for Testing ===
// app.get("/", (req, res) => res.send("✅ Bot is live and running!"));

// // === Local Server (only when not on Vercel) ===
// const PORT = process.env.PORT || 3000;
// if (process.env.NODE_ENV !== "vercel") {
//   app.listen(PORT, () => console.log(`🚀 Bot listening on port ${PORT}`));
// }

// console.log("✅ Bot script started...");
// console.log("🧩 Loaded BOT_TOKEN:", BOT_TOKEN);

// export default app;
// import "dotenv/config";
// import express from "express";
// import fetch from "node-fetch";
// import nodemailer from "nodemailer";

// const app = express();
// app.use(express.json());

// // === Telegram Bot Setup ===
// const BOT_TOKEN = process.env.BOT_TOKEN;
// const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// // === Email Info ===
// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;
// const TO_EMAIL = process.env.TO_EMAIL;

// // === Email Transporter ===
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });

// // === Group Rules ===
// const GROUP_RULES = [
//   "1️⃣ Be respectful to everyone.",
//   "2️⃣ No hate speech or bullying.",
//   "3️⃣ No spam or self-promotion.",
//   "4️⃣ Keep conversations relevant.",
//   "5️⃣ No NSFW content.",
//   "6️⃣ Avoid sharing fake news.",
//   "7️⃣ Listen to admins’ instructions.",
//   "8️⃣ Use English when possible.",
//   "9️⃣ Report suspicious users.",
//   "🔟 Have fun responsibly!",
// ];

// // === Banned Words ===
// const BANNED_WORDS = ["scam", "spam", "nsfw", "fake", "offensive"];

// // === Track User Violations ===
// const violations = new Map(); // { userId: count }

// // === Function to Send Telegram Messages ===
// async function sendMessage(chatId, text, extra = {}) {
//   try {
//     const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chat_id: chatId, text, ...extra }),
//     });
//     const data = await res.json();
//     if (!data.ok) console.error("❌ Telegram error:", data);
//   } catch (err) {
//     console.error("⚠️ Failed to send Telegram message:", err.message);
//   }
// }

// // === Function to Ban User ===
// async function banUser(chatId, userId) {
//   try {
//     await fetch(`${TELEGRAM_API}/banChatMember`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ chat_id: chatId, user_id: userId }),
//     });
//     console.log(`🚫 Banned user ${userId} in chat ${chatId}`);
//   } catch (err) {
//     console.error("⚠️ Failed to ban user:", err.message);
//   }
// }

// // === Function to Purge Group Messages ===
// async function purgeChat(chatId) {
//   try {
//     await sendMessage(chatId, "🧹 Purging recent messages...");
//     // Telegram bots can’t bulk delete easily; instead, send a notice.
//     // Admins can manually clean up if needed.
//   } catch (err) {
//     console.error("⚠️ Failed to purge chat:", err.message);
//   }
// }

// // === Handle Webhook Updates ===
// app.post("/", async (req, res) => {
//   const update = req.body;
//   console.log("📩 Incoming update:", JSON.stringify(update, null, 2));

//   try {
//     const message = update.message;
//     if (!message) return res.sendStatus(200);

//     const chatId = message.chat.id;
//     const userId = message.from?.id;
//     const username =
//       message.from?.username || message.from?.first_name || "User";
//     const text = message.text?.toLowerCase() || "";

//     // 🧍 New member joins
//     if (message.new_chat_members) {
//       const names = message.new_chat_members
//         .map((u) => u.first_name)
//         .join(", ");
//       await sendMessage(
//         chatId,
//         `👋 Welcome ${names}!\nPlease read and follow our group rules:\n\n${GROUP_RULES.join(
//           "\n"
//         )}`
//       );
//     }

//     // 🚨 Check for banned words
//     if (BANNED_WORDS.some((word) => text.includes(word))) {
//       const count = (violations.get(userId) || 0) + 1;
//       violations.set(userId, count);

//       if (count >= 2) {
//         await banUser(chatId, userId);
//         await sendMessage(
//           chatId,
//           `🚫 @${username} has been banned for repeated rule violations.`
//         );
//       } else {
//         await sendMessage(
//           chatId,
//           `⚠️ @${username}, please avoid using prohibited words.`
//         );
//       }
//     }

//     // ⚙️ Commands
//     if (text === "/remind") {
//       await sendMessage(
//         chatId,
//         "⚠️ Admins would never DM you first. Beware of scammers."
//       );
//     }

//     if (text === "/purge") {
//       await purgeChat(chatId);
//     }

//     // 💬 Private chat logic
//     if (message.chat.type === "private") {
//       if (text === "/start") {
//         const keyboard = {
//           inline_keyboard: [
//             [
//               {
//                 text: "Visit Website 🌐",
//                 url: "https://cryptoportal.byethost8.com",
//               },
//               {
//                 text: "Join Group 💬",
//                 url: "https://t.me/multiversX_1official",
//               },
//             ],
//             [{ text: "Help ❓", callback_data: "help" }],
//           ],
//         };
//         await sendMessage(
//           chatId,
//           `👋 Hi ${username}! Welcome to Xverse. Choose an option below:`,
//           {
//             reply_markup: keyboard,
//           }
//         );
//       } else if (text === "/help") {
//         await sendMessage(
//           chatId,
//           "How can I assist you today? Please type your question below."
//         );
//       } else if (!text.startsWith("/")) {
//         // Ask 3 more questions before sending email
//         const followUpQuestions = [
//           "Kindly input your email address?",
//           "Describe the issue you are having briefly?",
//           "What app or platform do you use?",
//         ];

//         for (const q of followUpQuestions) {
//           await sendMessage(chatId, q);
//         }

//         const mailOptions = {
//           from: EMAIL_USER,
//           to: TO_EMAIL,
//           subject: "New Bot Submission + Follow-up",
//           text: `User @${username} said:\n\n${text}\n\nFollow-up questions were sent.`,
//         };

//         try {
//           await transporter.sendMail(mailOptions);
//           await sendMessage(
//             chatId,
//             "✅ Your responses have been received and processed successfully."
//           );
//         } catch (err) {
//           console.error("📧 Email sending failed:", err.message);
//           await sendMessage(
//             chatId,
//             "⚠️ Failed to send your response. Please try again."
//           );
//         }
//       }
//     }

//     res.sendStatus(200);
//   } catch (err) {
//     console.error("❌ Error processing update:", err.message);
//     res.sendStatus(500);
//   }
// });

// // === Root Route for Testing ===
// app.get("/", (req, res) => res.send("✅ Bot is live and running!"));

// // === Local Server (only when not on Vercel) ===
// const PORT = process.env.PORT || 3000;
// if (process.env.NODE_ENV !== "vercel") {
//   app.listen(PORT, () => console.log(`🚀 Bot listening on port ${PORT}`));
// }

// console.log("✅ Bot script started...");
// console.log("🧩 Loaded BOT_TOKEN:", BOT_TOKEN);

// export default app;
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ====== BOT INITIALIZATION ======
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
app.locals.sessions = new Map(); // for private Q&A sessions

// ====== EMAIL CONFIGURATION ======
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const TO_EMAIL = process.env.TO_EMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

// ====== HELPER FUNCTIONS ======
async function sendMessage(chatId, text) {
  try {
    await bot.sendMessage(chatId, text);
  } catch (err) {
    console.error("🚨 Failed to send message:", err.message);
  }
}

// ====== GROUP MANAGEMENT ======
const bannedWords = ["scam", "fraud", "cheat"];

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim() || "";
  const username = msg.from?.username || "Unknown";
  const userId = msg.from?.id;
  const isGroup = msg.chat.type.endsWith("group");

  // Ignore service messages
  if (!text) return;

  // === Handle /rules command ===
  if (text === "/rules") {
    return sendMessage(
      chatId,
      "📜 Group Rules:\n1️⃣ No spam or scam links\n2️⃣ Be respectful\n3️⃣ Keep discussions relevant\n4️⃣ Admin decisions are final"
    );
  }

  // === Handle /ban command (Admins only) ===
  if (text.startsWith("/ban") && isGroup) {
    if (msg.from.is_bot) return;
    const reply = msg.reply_to_message;
    if (!reply)
      return sendMessage(chatId, "Please reply to the user you want to ban.");
    try {
      await bot.banChatMember(chatId, reply.from.id);
      return sendMessage(
        chatId,
        `🚫 User @${reply.from.username || "Unknown"} has been banned.`
      );
    } catch (err) {
      console.error(err);
      return sendMessage(chatId, "Failed to ban the user.");
    }
  }

  // === Banned word detection ===
  if (
    isGroup &&
    bannedWords.some((word) => text.toLowerCase().includes(word))
  ) {
    try {
      await bot.deleteMessage(chatId, msg.message_id);
      return sendMessage(
        chatId,
        `⚠️ @${username}, your message contained banned words.`
      );
    } catch (err) {
      console.error("Failed to delete message:", err.message);
    }
  }

  // === Handle /purge command ===
  if (text === "/purge" && isGroup) {
    await sendMessage(chatId, "🧹 Group will be purged in 30 seconds!");
    setTimeout(async () => {
      try {
        await sendMessage(chatId, "🚨 Group purged successfully.");
      } catch (err) {
        console.error(err);
      }
    }, 30000);
  }

  // === Handle /remind command ===
  if (text.startsWith("/remind") && isGroup) {
    const parts = text.split(" ");
    const minutes = parseInt(parts[1]);
    const reminderMsg = parts.slice(2).join(" ");
    if (!minutes || !reminderMsg)
      return sendMessage(chatId, "Usage: /remind <minutes> <message>");
    await sendMessage(chatId, `⏰ Reminder set for ${minutes} minute(s).`);
    setTimeout(async () => {
      await sendMessage(chatId, `🔔 Reminder: ${reminderMsg}`);
    }, minutes * 60 * 1000);
  }

  // === Private Chat Flow ===
  if (!isGroup && !text.startsWith("/")) {
    const sessions = app.locals.sessions;
    const userSession = sessions.get(userId) || { step: 0, answers: [] };
    const questions = [
      "📧 Please enter your email address:",
      "📝 Briefly describe the issue you are experiencing:",
      "📱 Which app or platform are you using?",
    ];

    // Step 0 → first user message
    if (userSession.step === 0) {
      userSession.answers.push(text);
      await sendMessage(chatId, questions[0]);
      userSession.step++;
    } else if (userSession.step > 0 && userSession.step <= questions.length) {
      userSession.answers.push(text);

      if (userSession.step < questions.length) {
        await sendMessage(chatId, questions[userSession.step]);
        userSession.step++;
      } else {
        // ✅ All answers collected → send email
        const [initialMsg, email, issue, platform] = userSession.answers;
        const timestamp = new Date().toLocaleString();

        const mailOptions = {
          from: EMAIL_USER,
          to: TO_EMAIL,
          subject: `New Bot Submission from @${username}`,
          text:
            `🧾 New submission received:\n\n` +
            `👤 Username: @${username}\n🆔 User ID: ${userId}\n📅 Time: ${timestamp}\n\n` +
            `💬 Initial Message: ${initialMsg}\n📧 Email: ${email}\n📝 Issue: ${issue}\n📱 Platform: ${platform}`,
        };

        try {
          await transporter.sendMail(mailOptions);
          await sendMessage(
            chatId,
            "✅ Thank you! Your responses have been received and sent successfully."
          );
        } catch (emailErr) {
          console.error("📧 Email sending failed:", emailErr.message);
          await sendMessage(chatId, "⚠️ Failed to send your response.");
        }

        sessions.delete(userId);
        return;
      }
    }

    sessions.set(userId, userSession);
  }
});

// ====== WELCOME MESSAGES ======
bot.on("new_chat_members", async (msg) => {
  const chatId = msg.chat.id;
  for (const member of msg.new_chat_members) {
    await sendMessage(
      chatId,
      `👋 Welcome @${
        member.username || member.first_name
      }! Please read the group rules using /rules.`
    );
  }
});

// ====== EXPRESS SERVER ======
app.get("/", (req, res) =>
  res.send("🤖 Telegram Bot is running successfully.")
);
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
