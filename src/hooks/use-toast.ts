import { toast as sonnerToast } from 'sonner';

export function useToast() {
  return {
    toast: (props: { title?: string; description?: string }) => {
      if (props.title && props.description) {
        sonnerToast(props.title, { description: props.description });
      } else if (props.title) {
        sonnerToast(props.title);
      } else if (props.description) {
        sonnerToast(props.description);
      }
    },
  };
}
