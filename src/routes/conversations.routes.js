const { Router } = require("express");
const {
  createConversation,
  deleteConversation,
  conversationById,
  conversationsAndParticipants,
  createMessages,
} = require("../controllers/conversations.controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

// validadores
router.post("/conversations", authenticate, createConversation);

router.delete("/conversations/:id", authenticate, deleteConversation);

router.get("/participants/:id", authenticate, conversationById);

router.get("/conversations/:id", authenticate, conversationsAndParticipants);

router.post("/messages/:id", authenticate, createMessages);

module.exports = router;
