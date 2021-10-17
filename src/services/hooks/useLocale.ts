import { useRouter } from 'next/router';

import en from '../../locales/en.js';
import pt from '../../locales/pt.js';

export default function useLocale() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;
  return t;
}
