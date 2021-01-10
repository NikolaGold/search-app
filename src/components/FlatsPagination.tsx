import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { useRouter } from 'next/router';

type FlatsPaginationProps = {
  count: number;
};
const FlatsPagination = ({ count }: FlatsPaginationProps) => {
  const [page, setPage] = React.useState(1);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(
      {
        pathname: '/',
        query: { ...router.query, page: value },
      },
      undefined,
      {
        shallow: false,
      }
    );
  };
  return <Pagination count={count} page={page} onChange={handleChange} />;
};

export default FlatsPagination;
