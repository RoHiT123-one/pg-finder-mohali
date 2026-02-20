import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

interface ContactButtonsProps {
  phone: string;
  pgName: string;
}

export default function ContactButtons({ phone, pgName }: ContactButtonsProps) {
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${encodeURIComponent(pgName)}. Can you provide more details?`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={`tel:${phone}`} className="flex-1">
        <Button className="w-full" size="lg">
          <Phone className="mr-2 h-5 w-5" />
          Call Owner
        </Button>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
        <Button
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp
        </Button>
      </a>
    </div>
  );
}
