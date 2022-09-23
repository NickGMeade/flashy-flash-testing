import {
  getCardData as getCardData,
  setCardData as setCardData,
  getCardsData as getCardsData,
} from '../adapters/supabaseAdapter.js';

export async function getCard(req, res) {
  const rows = await getCardData(req.params.id);
  res.json(rows);
}

export async function getCards(req, res) {
  const cards = [];
  const rows = await getCardsData();
  if (rows.length > 0) {
    rows.map((card) => {
      cards.push({
        id: card.id,
        word: card.word,
        translation: card.translation,
      });
    });
    res.json(cards);
  } else {
    res.status(500);
    res.json({
      title: 'no cards found',
      message: `🥴 We did something wrong`,
    });
  }
}

export async function setCard(req, res) {
  const card = {};
  if (req.body.word && req.body.translation) {
    card.word = req.body.word;
    card.translation = req.body.translation;

    const rows = await setCardData(card);
    console.log(rows);
    if (rows.length >= 0) {
      res.json({
        title: 'card added',
        message: `📅 Card for ${card.word} is made with the translation ${card.translation}`,
      });
    } else {
      res.status(500);
      res.json({
        title: 'cannot add card',
        message: `Unknown causes`,
      });
    }
  } else {
    res.status(422);
    res.json({
      title: 'cannot add card',
      message: `You need to set word and translation`,
    });
  }
}
