export const CONFIG = {
  APP_ID: process.env.NEXT_PUBLIC_WORLD_APP_ID || 'app_b1d5fd359d33a8cd66e3197beca434a1',
  ACTION: process.env.NEXT_PUBLIC_WORLD_ACTION || 'go-ruby-claim',
  TOKEN: process.env.NEXT_PUBLIC_RUBY_TOKEN || '0xd5a2ded4fc7b163018714b815cb74ab09ee40de8',
  CLAIM_CONTRACT: process.env.NEXT_PUBLIC_CLAIM_CONTRACT || '0x352dd9e6b11ed8b4efe9e89acf65ace3d0d4b354',
  STAKING_CONTRACT: process.env.NEXT_PUBLIC_STAKING_CONTRACT || '',
  WEBSITE: process.env.NEXT_PUBLIC_BASE_URL || 'https://gorubytoken.onhercules.app/'
};
