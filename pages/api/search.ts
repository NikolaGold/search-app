import type { NextApiResponse } from 'next';

import { Env } from '@next/env';
import { data } from '../../src/data/data';

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
}

export default (req: NextApiRequestProps, res: NextApiResponse) => {
  const { query } = req;
  const page = query.page || 1;
  const entriesPerPage = Number(query['entries-per-page']) || 8;

  const getCurrentFlats = (queryFlats, flats) => {
    const currentFlats = flats;
    const queryFilter = queryFlats['dimension-from'] || queryFlats['dimension-to'] || queryFlats['cost-from'] || ['cost-to']
        || queryFlats.location || queryFlats.equipment || queryFlats.commission || queryFlats.disposition;
    if (queryFilter) {
      const dimensionFrom = queryFlats['dimension-from']
        ? currentFlats.filter((flat) => flat.dimension >= queryFlats['dimension-from']) : flats;
      const dimensionTo = queryFlats['dimension-to']
        ? currentFlats.filter((flat) => flat.dimension <= queryFlats['dimension-to']) : flats;
      const costFrom = queryFlats['cost-from'] ? currentFlats.filter((flat) => flat.cost >= queryFlats['cost-from']) : flats;
      const costTo = queryFlats['cost-to'] ? currentFlats.filter((flat) => flat.cost <= queryFlats['cost-to']) : flats;
      const location = queryFlats.location ? currentFlats.filter((flat) => flat.location === queryFlats.location) : flats;
      const equipment = queryFlats.equipment
        ? currentFlats.filter((flat) => flat.equipment.toLowerCase() === queryFlats.equipment.toLowerCase()) : flats;
      const commission = queryFlats.commission
        ? currentFlats.filter((flat) => flat.commission.toLowerCase() === queryFlats.commission.toLowerCase()) : flats;
      const disposition = queryFlats.disposition ? currentFlats.filter((flat) => queryFlats.disposition.includes(flat.disposition)) : flats;

      const newData = flats
        .filter((item) => dimensionFrom.includes(item))
        .filter((item) => dimensionTo.includes(item))
        .filter((item) => costFrom.includes(item))
        .filter((item) => costTo.includes(item))
        .filter((item) => location.includes(item))
        .filter((item) => disposition.includes(item))
        .filter((item) => equipment.includes(item))
        .filter((item) => commission.includes(item));

      return (newData);
    }
    return (flats);
  };
  const paginateFlats = (pagePaginate: number, entriesPerPagePagination: number, flats) => flats.slice((pagePaginate - 1)
      * entriesPerPagePagination, pagePaginate * entriesPerPagePagination);

  let newData = getCurrentFlats(query, data);
  const totalPages = Math.ceil(newData.length / entriesPerPage);

  newData = paginateFlats(page, entriesPerPage, newData);
  res.statusCode = 200;
  res.json({
    data: newData,
    totalPages,
  });
};
