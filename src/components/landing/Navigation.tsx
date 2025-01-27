// Update the logo image usage
<Link to="/" className="flex items-center">
  <ImageWithFallback 
    src={theme === 'dark' ? IMAGES.logos.textDark : IMAGES.logos.textLight}
    alt="Supurr"
    className="h-8 w-auto"
  />
</Link>