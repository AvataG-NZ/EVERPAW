export function setupGlassEffects() {
  const cards = document.querySelectorAll('.glass-hover');
  const buttons = document.querySelectorAll('.fluent-button');
  const dividers = document.querySelectorAll('.fluent-divider');

  const handleCardMouseMove = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    const rotateY = deltaX * 0.15;
    const rotateX = -deltaY * 0.15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.002, 1.002, 1.002)`;
  };

  const handleButtonMouseMove = (e: MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    button.style.setProperty('--mouse-x', `${x}%`);
    button.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleDividerMouseMove = (e: MouseEvent) => {
    const divider = e.currentTarget as HTMLElement;
    const rect = divider.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    divider.style.setProperty('--mouse-x', `${x}%`);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  cards.forEach((card) => {
    card.addEventListener('mousemove', handleCardMouseMove as EventListener);
    card.addEventListener('mouseleave', handleMouseLeave as EventListener);
  });

  buttons.forEach((button) => {
    button.addEventListener('mousemove', handleButtonMouseMove as EventListener);
  });

  dividers.forEach((divider) => {
    divider.addEventListener('mousemove', handleDividerMouseMove as EventListener);
  });

  return () => {
    cards.forEach((card) => {
      card.removeEventListener('mousemove', handleCardMouseMove as EventListener);
      card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    });
    buttons.forEach((button) => {
      button.removeEventListener('mousemove', handleButtonMouseMove as EventListener);
    });
    dividers.forEach((divider) => {
      divider.removeEventListener('mousemove', handleDividerMouseMove as EventListener);
    });
  };
}
