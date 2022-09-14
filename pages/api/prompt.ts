// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAIModelService } from '../../services/ai.service';
import { getTranslateService } from '../../services/translate.service';

type Data =
  | {
      location: string;
    }
  | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { p } = req.query;
  try {
    if (!p || typeof p !== 'string' || p === '')
      throw new Error('Invalid prompt');
    const translate = getTranslateService();
    const translatedText = await translate.translateText(p);
    console.log('translatedText', translatedText);

    const aiModel = getAIModelService();
    const imageUrl = await aiModel.getPrompt(translatedText);
    console.log('imgurl', imageUrl);

    if (!imageUrl) throw new Error('Error getting prompt');

    res.status(201).json({
      location: imageUrl,
    });
  } catch {
    res.status(500).json('Error getting prompt');
  }
}
