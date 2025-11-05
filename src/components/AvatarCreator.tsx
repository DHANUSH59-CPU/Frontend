import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import SafeAvatar from './SafeAvatar';
import { useState } from 'react';

type Language = 'en' | 'en-IE' | 'de' | 'fr' | 'es' | 'es-MX' | 'it' | 'pt' | 'pt-BR' | 'tr' | 'ja' | 'kr' | 'ch';

interface AvatarCreatorConfig {
  clearCache?: boolean;
  bodyType?: 'halfbody' | 'fullbody';
  quickStart?: boolean;
  language?: Language;
}

interface AvatarExportedEvent {
  data: {
    url: string;
  };
}

interface AvatarCreatorWrapperProps {
  subdomain?: string;
  onAvatarExported: (url: string) => void;
  onClose?: () => void;
}

export default function AvatarCreatorWrapper({ 
  subdomain = 'demo', 
  onAvatarExported,
  onClose 
}: AvatarCreatorWrapperProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [showCreator, setShowCreator] = useState(true);

  const config: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en' as Language,
  };

  const style = { width: '100%', height: '100%', border: 'none' };

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    const url = event.data.url;
    setAvatarUrl(url);
    onAvatarExported(url);
    setShowCreator(false);
  };

  if (!showCreator && avatarUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-4 h-full">
        <div className="w-full max-w-md">
          <h3 className="mb-4 text-lg font-semibold">Avatar Preview</h3>
          <div className="mb-4 aspect-square w-full rounded-lg border bg-background overflow-hidden">
            <SafeAvatar 
              modelSrc={avatarUrl} 
              className="w-full h-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowCreator(true);
                setAvatarUrl('');
              }}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Create New Avatar
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <AvatarCreator 
        subdomain={subdomain} 
        config={config} 
        style={style} 
        onAvatarExported={handleOnAvatarExported} 
      />
    </div>
  );
}

