import {NextApiRequest, NextApiResponse} from 'next';

interface IGetIdApiRequest extends NextApiRequest {
    query: {
        id: string
    }
}

export default function getById(req: IGetIdApiRequest, res: NextApiResponse) {
    res.json({yourId: req.query.id})
}

