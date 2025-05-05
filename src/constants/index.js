const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    PATCH: 'patch',
    OPTIONS: 'options',
}

const PRICE_RANGES = [
    { id: "0-100", label: "$0 - $100", min: 0, max: 100 },
    { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { id: "200-500", label: "$200 - $500", min: 200, max: 500 },
    { id: "500+", label: "$500+", min: 500, max: Infinity },
  ];

export {
    METHODS, PRICE_RANGES
}