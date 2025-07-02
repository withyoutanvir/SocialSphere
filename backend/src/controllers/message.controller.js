import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    console.log("📩 Send Message Request:", {
      senderId,
      receiverId,
      text,
      hasImage: !!image,
    });

    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender or receiver is missing" });
    }

    if (!text && !image) {
      return res.status(400).json({ error: "Message must contain text or image" });
    }

    let imageUrl;
    if (image) {
      try {
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "chat_images",
        });
        imageUrl = uploadRes.secure_url;
        console.log("🖼️ Image uploaded to Cloudinary:", imageUrl);
      } catch (err) {
        console.error("❌ Cloudinary upload failed:", err.message);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
    });

    await newMessage.save();
    console.log("✅ Message saved:", newMessage);

    // Notify receiver via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("📡 Message sent via socket to", receiverSocketId);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("❌ sendMessage error:", error.message, error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
};
