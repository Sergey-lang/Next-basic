import {NextApiRequest, NextApiResponse} from 'next';

interface IMessageNextApiRequest extends NextApiRequest {
    query: {
        message?: string
    }
}

export default function echo(req: IMessageNextApiRequest, res: NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify({
        message: req.query.message ?? 'Base message'
    }))
}
