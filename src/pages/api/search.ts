import type { NextApiResponse } from 'next';

import { Env } from '@next/env';
import { data } from '../../data/data';

type NextApiRequestProps = {
  query: {
    [key: string]: string | string[] | number;
    page: number;
  };
  cookies: {
    [key: string]: string;
  };
  body: any;
  env: Env;
  preview?: boolean;
  previewData?: any;
};

export default async function search(req: NextApiRequestProps, res: NextApiResponse) {
  res.statusCode = 200;
  res.json(data);
}
