import qs from 'qs';

export function parse(querystring) {
  const normalize = querystring =>
    querystring[0] === '?' ? querystring.slice(1) : querystring;
  const normalizedQuerystring = normalize(querystring);

  return qs.parse(normalizedQuerystring);
}