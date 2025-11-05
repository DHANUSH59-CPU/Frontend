import { useState } from 'react';
import AvatarCreatorWrapper from '@/components/AvatarCreator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { Download } from 'lucide-react';

export default function CharacterBuilder() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showCreator, setShowCreator] = useState(true);
  const navigate = useNavigate();

  const handleAvatarExported = (url: string) => {
    setAvatarUrl(url);
    setShowCreator(false);
  };

  const getImageUrl = (avatarUrl: string): string | null => {
    // Extract avatar ID from URL patterns
    // Ready Player Me URLs can be: 
    // - https://models.readyplayer.me/{avatarId}.glb
    // - https://models.readyplayer.me/{avatarId}.gltf
    // - https://avatars.readyplayer.me/{avatarId}
    // - https://readyplayer.me/api/v1/avatars/{avatarId}
    let avatarId: string | null = null;
    
    console.log('Attempting to extract avatar ID from URL:', avatarUrl);
    
    // Try different URL patterns
    // Pattern 1: https://models.readyplayer.me/{avatarId}.glb or .gltf
    // Match: models.readyplayer.me/ followed by characters until .glb or .gltf
    const modelsWithExtMatch = avatarUrl.match(/models\.readyplayer\.me\/([^\/.]+)\.(glb|gltf)/i);
    if (modelsWithExtMatch) {
      avatarId = modelsWithExtMatch[1];
      console.log('Matched pattern 1 (with extension), avatar ID:', avatarId);
    } else {
      // Pattern 2: https://models.readyplayer.me/{avatarId} (without extension, just the ID)
      const modelsNoExtMatch = avatarUrl.match(/models\.readyplayer\.me\/([^\/\?]+)/);
      if (modelsNoExtMatch) {
        // Remove any trailing query parameters or fragments
        avatarId = modelsNoExtMatch[1].split('?')[0].split('#')[0];
        console.log('Matched pattern 2 (no extension), avatar ID:', avatarId);
      } else {
        // Pattern 3: https://avatars.readyplayer.me/{avatarId}
        const avatarsMatch = avatarUrl.match(/avatars\.readyplayer\.me\/([^\/\?]+)/);
        if (avatarsMatch) {
          avatarId = avatarsMatch[1].split('?')[0].split('#')[0];
          console.log('Matched pattern 3 (avatars), avatar ID:', avatarId);
        } else {
          // Pattern 4: https://readyplayer.me/api/v1/avatars/{avatarId}
          const apiMatch = avatarUrl.match(/readyplayer\.me\/api\/v1\/avatars\/([^\/\?]+)/);
          if (apiMatch) {
            avatarId = apiMatch[1].split('?')[0].split('#')[0];
            console.log('Matched pattern 4 (API), avatar ID:', avatarId);
          }
        }
      }
    }
    
    if (!avatarId) {
      console.error('Could not extract avatar ID from URL:', avatarUrl);
      console.error('Tried patterns: models.readyplayer.me/{id}.glb, models.readyplayer.me/{id}, avatars.readyplayer.me/{id}, api/v1/avatars/{id}');
      return null;
    }
    
    // Clean up avatar ID (remove any trailing dots or invalid characters)
    avatarId = avatarId.trim();
    
    console.log('Final extracted avatar ID:', avatarId);
    
    // Ready Player Me provides preview images at:
    // https://models.readyplayer.me/{avatarId}.png
    const imageUrl = `https://models.readyplayer.me/${avatarId}.png`;
    console.log('Generated image URL:', imageUrl);
    return imageUrl;
  };

  const handleDownload = async () => {
    if (!avatarUrl) return;

    console.log('Downloading avatar from URL:', avatarUrl);

    try {
      // Get the image URL from the avatar URL
      const imageUrl = getImageUrl(avatarUrl);
      
      if (!imageUrl) {
        console.error('Could not generate image URL');
        alert('Unable to generate image URL. Please try again.');
        return;
      }

      console.log('Fetching image from:', imageUrl);

      // Fetch the image with CORS handling
      const response = await fetch(imageUrl, {
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        console.error('Image fetch failed:', response.status, response.statusText);
        
        // Try alternative image URL formats
        const avatarIdMatch = avatarUrl.match(/\/models\/([^/.]+)/) || 
                             avatarUrl.match(/avatars\.readyplayer\.me\/([^/]+)/);
        const avatarId = avatarIdMatch?.[1];
        
        if (avatarId) {
          // Try JPG format
          const altUrl = `https://models.readyplayer.me/${avatarId}.jpg`;
          console.log('Trying alternative URL:', altUrl);
          const altResponse = await fetch(altUrl, { mode: 'cors', credentials: 'omit' });
          
          if (altResponse.ok) {
            const blob = await altResponse.blob();
            if (blob.type.startsWith('image/')) {
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `avatar-${avatarId}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
              return;
            }
          }
        }
        
        alert('Unable to download avatar image. The preview image may not be available.');
        return;
      }
      
      const blob = await response.blob();
      
      // Check if we got an image
      if (!blob.type.startsWith('image/')) {
        console.error('Downloaded file is not an image:', blob.type);
        alert('Downloaded file is not an image. Please try again.');
        return;
      }
      
      console.log('Image blob type:', blob.type);
      
      // Convert PNG to JPG using Canvas API
      const blobUrl = window.URL.createObjectURL(blob);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      // Extract avatar ID for filename
      const getAvatarId = () => {
        const match = avatarUrl.match(/\/models\/([^/.]+)/) || 
                     avatarUrl.match(/avatars\.readyplayer\.me\/([^/]+)/);
        return match?.[1] || 'avatar';
      };
      
      img.onload = () => {
        try {
          // Create canvas and draw image
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            console.error('Could not get canvas context');
            alert('Unable to convert image. Please try again.');
            window.URL.revokeObjectURL(blobUrl);
            return;
          }
          
          // Draw image to canvas
          ctx.drawImage(img, 0, 0);
          
          // Convert to JPG (quality 0.9 = 90%)
          canvas.toBlob(
            (jpgBlob) => {
              if (!jpgBlob) {
                console.error('Failed to convert to JPG');
                alert('Failed to convert image to JPG format.');
                window.URL.revokeObjectURL(blobUrl);
                return;
              }
              
              // Create download link for JPG
              const url = window.URL.createObjectURL(jpgBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `avatar-${getAvatarId()}.jpg`;
              
              // Trigger download
              document.body.appendChild(link);
              link.click();
              
              // Cleanup
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
              window.URL.revokeObjectURL(blobUrl);
            },
            'image/jpeg',
            0.9 // 90% quality
          );
        } catch (error) {
          console.error('Error in image conversion:', error);
          alert('Error converting image. Please try again.');
          window.URL.revokeObjectURL(blobUrl);
        }
      };
      
      img.onerror = (error) => {
        console.error('Image load error:', error);
        alert('Failed to load image. Please try again.');
        window.URL.revokeObjectURL(blobUrl);
      };
      
      img.src = blobUrl;
    } catch (error) {
      console.error('Failed to download avatar image:', error);
      alert('Failed to download avatar. Please try again.');
    }
  };

  if (!showCreator && avatarUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 mt-20">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Avatar Created Successfully!</h1>
            <p className="text-muted-foreground">
              Your avatar is ready. You can download it below.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Avatar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreator(true);
                setAvatarUrl(null);
              }}
            >
              Create Another Avatar
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
            >
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create Your 3D Avatar</h1>
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
          >
            Back to Profile
          </Button>
        </div>
        <div className="h-[calc(100vh-120px)] rounded-lg border overflow-hidden">
          <AvatarCreatorWrapper
            subdomain="demo"
            onAvatarExported={handleAvatarExported}
            onClose={() => navigate('/profile')}
          />
        </div>
      </div>
    </div>
  );
}

