import { NextRouter } from 'next/router';

export function getUsername(router: NextRouter): string {
  let username = router.query.username;
  if (!(typeof username === 'string')) return '';

  username = username.split('@').at(-1);
  if (!(typeof username === 'string')) return '';
  return username;
}

export function getPageNumber(router: NextRouter): number {
  let pageNumber = 1;
  if (router.query.page) {
    pageNumber = Number(router.query.page);
  }
  return pageNumber;
}
