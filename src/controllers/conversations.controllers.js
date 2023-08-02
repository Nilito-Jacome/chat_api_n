const { Conversations, Participants, Users, Messages } = require("../models");

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createdBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createdBy, type });
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // tomar el id de la conversacion creada y agreagar a los participantes
    const { id } = conversation;
    // agregar a los participantes en la tabla pivote
    const participitantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participitantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participitantsArray);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // antes de eliminar la conversacion 3
    // elimino todos los registros en participantes que usen ese id
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const conversationById= async (req, res, next) => {
  try {
    const {id} = req.params;
    const conversation = await Participants.findAll({
      where: {userId:id},
      include: [
        {model: Users,         
          attributes: {
          exclude: ["firstname", "lastname", "email", "password", "profileImage", "validEmail", "createdAt", "updatedAt"],
          },          
        },
        {model: Conversations,
          attributes: {
            exclude: ["title", "conversationImage", "createdAt", "updatedAt"],
            }, 
        }
      ]
    });
    res.json(conversation);
  } catch(error) {
    next(error);
  }
};

const conversationsAndParticipants= async (req, res, next) => {
  try {
    const {id} = req.params;
    const conversation = await Conversations.findAll({
      where: {id},
      attributes: {
        exclude: ["title", "conversationImage", "createdAt", "updatedAt"]
      },
      include: [
        {model: Participants,
          attributes: {
            exclude: ["id"]
          },
          include: 
            {model: Users,         
              attributes: {
              exclude: ["id", "firstname", "lastname", "email", "password", "profileImage", "validEmail", "createdAt", "updatedAt"],
              },
              include:
              {model: Messages,
                attributes: {
                  exclude: ["id", "conversationId", "senderId", "createdAt", "updatedAt"],
                  },
              },
            },
        },
      ]
    })  
  res.json(conversation);
} catch(error) {
  next(error);
}
};

const createMessages= async (req, res, next) => {
  try {
    const {id} = req.params;
    const {content, senderId} = req.body
    const message = await Messages.create({conversationId:id,content, senderId },
    );   
    res.status(201).send();
  } catch(error) {
    next(error);
  }
  };

module.exports = {
  createConversation,
  deleteConversation,
  conversationById,
  conversationsAndParticipants,
  createMessages,
};

// [3, 5, 7, 8, 9]
// tranformar el arreglo de participantes
/* 
[
  { userId: 3, conversationId: id },
  { userId: 5, conversationId: id },
  { userId: 7, conversationId: id },
  { userId: 8, conversationId: id },
  { userId: 9, conversationId: id }
]

const participats = participatns.map(participant => (
  {userId: participant, conversationId: id}
));


*/
