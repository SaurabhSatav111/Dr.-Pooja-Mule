document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length > 0 && tabPanels.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the target tab ID
        const targetTabId = button.getAttribute('data-tab');

        // Hide all panels
        tabPanels.forEach(panel => {
          panel.classList.remove('active');
        });

        // Show target panel
        const targetPanel = document.getElementById(targetTabId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
});
