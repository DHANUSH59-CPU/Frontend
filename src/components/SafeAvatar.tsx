interface SafeAvatarProps {
  modelSrc: string;
  style?: React.CSSProperties;
  className?: string;
}

// Temporary solution: Using preview images until React 19 compatibility is resolved
// Ready Player Me provides preview images for avatars
export default function SafeAvatar({ modelSrc, style, className }: SafeAvatarProps) {
  // Extract avatar ID from URL patterns
  // Ready Player Me URLs can be: 
  // - https://models.readyplayer.me/{avatarId}.glb
  // - https://avatars.readyplayer.me/{avatarId}
  const avatarIdMatch = modelSrc.match(/\/models\/([^/.]+)/) || 
                       modelSrc.match(/avatars\.readyplayer\.me\/([^/]+)/) ||
                       modelSrc.match(/readyplayer\.me\/api\/v1\/avatars\/([^/.]+)/);
  
  const avatarId = avatarIdMatch?.[1];
  
  // Try to get preview image URL
  // Ready Player Me provides preview images at: https://models.readyplayer.me/{avatarId}.png
  const previewUrl = avatarId 
    ? `https://models.readyplayer.me/${avatarId}.png`
    : null;

  return (
    <div 
      className={`flex items-center justify-center bg-muted overflow-hidden ${className || ''}`}
      style={style}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="3D Avatar Preview"
          className="h-full w-full object-cover"
          onError={(e) => {
            // If preview image fails, show placeholder
            const target = e.currentTarget;
            target.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'text-center p-4';
            placeholder.innerHTML = `
              <p class="text-sm text-muted-foreground mb-2">3D Avatar</p>
              <a href="${modelSrc}" target="_blank" rel="noopener noreferrer" class="text-xs text-primary hover:underline">
                View Avatar
              </a>
            `;
            target.parentElement?.appendChild(placeholder);
          }}
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground mb-2">3D Avatar</p>
          <a 
            href={modelSrc} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            View Avatar
          </a>
        </div>
      )}
    </div>
  );
}

