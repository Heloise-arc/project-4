export const getGlassStyle = (bgColor: string) => ({
  background: `rgba(${bgColor}, 0.8)`,
  backdropFilter: 'blur(8px)',
  borderRadius: '16px',
  border: '1px solid rgba(var(--primary), 0.1)',
  transition: 'transform 0.2s ease-out'
});

export const getHoverStyle = {
  transform: 'translateY(-4px)'
};