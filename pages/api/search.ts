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
  const flats = data;
  const page = Number(query.page || 1);
  const entriesPerPage = Number(query['entries-per-page']) || 8;

  const filteredFlats = filterFlats();
  const totalPages = Math.ceil(filteredFlats.length / entriesPerPage);

  res.statusCode = 200;
  res.json({
    data: paginateFlats(filteredFlats),
    totalPages,
  });
  function filterFlats() {
    const dimensionFrom = {
      getValue: () => Number(query['dimension-from']),
      apply: (value, flat: any) => flat.dimension >= value,
    };
    const dimensionTo = {
      getValue: () => Number(query['dimension-to']),
      apply: (value, flat: any) => flat.dimension <= value,
    };
    const costFrom = { getValue: () => Number(query['cost-from']), apply: (value, flat: any) => flat.cost >= value };
    const costTo = { getValue: () => Number(query['cost-to']), apply: (value, flat: any) => flat.cost <= value };
    const location = { getValue: () => query.location, apply: (value, flat: any) => flat.location === value };
    const equipment = {
      getValue: () => query.equipment,
      apply: (value, flat: any) => flat.equipment === value,
    };
    const commission = { getValue: () => query.commission, apply: (value, flat: any) => flat.commission === value };
    const disposition = {
      getValue: () => query.disposition,
      apply: (value, flat: any) => flat.filter((element) => value.disposition
        .includes(element.disposition)),
    };
    const filters = [dimensionFrom, dimensionTo, costFrom, costTo, location, equipment, commission, disposition];
    return flats.filter((flat) => filters.every((filter) => applyFilter(flat, filter)));
  }

  function applyFilter(flat, filter) {
    const value = filter.getValue();
    return value ? filter.apply(value, flat) : true;
  }

  function paginateFlats(flatsPaginate) {
    return flatsPaginate.slice((page - 1) * entriesPerPage, page * entriesPerPage);
  }
};
