export const CHANNEL_LIST = [
  'STEL_LIVE',
  'AYAYSUNO_YUNI',
  'SHIRAYUKI_HINA',
  'NENEKO_MASHIRO',
  'AKANE_LIZE',
  'ARAHASHI_TABI',
  'TENKO_SHIBUKI',
  'HANAKO_NANA',
  'AOKUMO_RIN',
  'YUZUHA_RIKO',
] as const;

export const FILTER_OPTIONS = {
  SORT: {
    VIEWS: 'views',
    LIKES: 'likes',
    DATE: 'date',
  },
  RANK_TYPE: {
    TOTAL: 'total',
    WEEKLY: 'weekly',
    DAILY: 'daily',
  },
  PLAYLIST_TYPE: {
    ALL: 'all',
    ORIGINAL: 'original',
    COVER: 'cover',
  },
} as const;
