import {NextApiResponse} from "next";
import {Env} from "@next/env";

import {data} from "../../../data/data";

type NextApiRequestProps = {
    query: {
        [key: string]: string | string[] | number;
    };
    cookies: {
        [key: string]: string;
    };
    body: any;
    env: Env;
    preview?: boolean;
    previewData?: any;
}

export default function flatHandler(req: NextApiRequestProps, res: NextApiResponse) {
    const {
        query: {id},
    } = req
    const filtered = data.filter((element) => element.id == id)

    if (filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({message: `Flat with id: ${id} not found.`})
    }
}
