import {NextApiRequest, NextApiResponse} from "next";
import {getProductsByService} from "@/vulog/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET'){
        const accessToken = req.query.access_token;
        const serviceId = req.query.serviceId;
        if (!accessToken) return res.status(400).json({ message: 'Access token is missing in the query parameters.' });
        if (!serviceId) return res.status(400).json({ message: 'serviceId is missing in the query parameters.'})

        getProductsByService(accessToken as string, serviceId as string)
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
}
