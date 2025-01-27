import { IMAGES } from '../constants/images';

interface ImageCheckResult {
  path: string;
  exists: boolean;
  error?: string;
  environment: 'development' | 'production';
}

export const checkImagePaths = async (isProd = false): Promise<ImageCheckResult[]> => {
  const results: ImageCheckResult[] = [];
  
  const checkImage = async (path: string): Promise<boolean> => {
    try {
      const response = await fetch(path, {
        method: 'HEAD', // Only fetch headers to check existence
        cache: 'no-cache' // Bypass cache
      });
      
      // Log detailed response info in production
      if (process.env.NODE_ENV === 'production') {
        console.log(`Image check [${path}]:`, {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });
      }
      
      return response.ok;
    } catch (error) {
      console.error(`Failed to check image [${path}]:`, error);
      return false;
    }
  };

  const processPath = async (path: string) => {
    // Check both relative and absolute paths
    const pathsToCheck = [
      path,
      path.startsWith('/') ? path.slice(1) : `/${path}`,
      path.replace('/src/assets', '/assets'),
      path.replace('/assets', '/src/assets')
    ];

    for (const p of pathsToCheck) {
      const exists = await checkImage(p);
      results.push({
        path: p,
        exists,
        environment: process.env.NODE_ENV,
        error: exists ? undefined : 'Image not found'
      });

      if (exists) break; // Stop checking alternatives if one works
    }
  };

  // Process all image paths
  const imagePaths = [
    // Logos
    IMAGES.logos.textDark,
    IMAGES.logos.textLight,
    IMAGES.logos.iconDark,
    IMAGES.logos.iconLight,
    // Add other critical images
    '/assets/images/loading-cat.svg',
    '/assets/images/button-click-1.svg',
    '/assets/images/button-click-2.svg'
  ];

  await Promise.all(imagePaths.map(processPath));

  return results;
};