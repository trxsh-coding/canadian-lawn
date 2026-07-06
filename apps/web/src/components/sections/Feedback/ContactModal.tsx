'use client';

import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';
import { FeedbackForm } from '@/components/sections/Feedback/FeedbackForm';

type ContactModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange} title="Связаться с нами">
      <FeedbackForm submitText="Отправить" onSuccess={() => onOpenChange(false)} />
    </AdaptiveModal>
  );
};
