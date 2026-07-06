'use client';

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const Captcha = React.forwardRef<ReCAPTCHA>((_, ref) => (
  <ReCAPTCHA ref={ref} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} />
));

Captcha.displayName = 'Captcha';
