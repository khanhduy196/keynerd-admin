const KeycapProfiles = {
  None: 'NONE',
  Dom: 'DOM',
  Cube: 'CUBE',
  Oem: 'OEM',
  ShortSA: 'SHORTSA',
  SA: 'SA',
};

const KeycapSizes = {
  U1: 1,
  U2: 2,
  U175: 1.75,
  U225: 2.25,
  U625: 6.25,
};

const DEFAULT_PAGE_SIZE = 15;

const OrderStatuses = Object.freeze({
  TO_DO: 'TO_DO',
  PRODUCT_COMPLETED: 'PRODUCT_COMPLETED',
  DONE: 'DONE',
});

export { KeycapProfiles, KeycapSizes, DEFAULT_PAGE_SIZE, OrderStatuses };
