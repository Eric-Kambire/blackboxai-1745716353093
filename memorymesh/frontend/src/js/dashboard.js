document.addEventListener('DOMContentLoaded', () => {
  // Fetch dynamic analytics data (mocked for now)
  fetch('/api/analytics')
    .then(response => response.json())
    .then(data => {
      updateRetention(data.retention);
      updateXPProgress(data.xp);
      updateRecentActivity(data.recentActivity);
    })
    .catch(() => {
      console.warn('Failed to load analytics data, using fallback values.');
      updateRetention(60);
      updateXPProgress({ level: 5, sap: 2100, progressPercent: 60 });
      updateRecentActivity([]);
    });
});

function updateRetention(retentionPercent) {
  const retentionText = document.querySelector('.retention-text');
  if (retentionText) {
    retentionText.textContent = retentionPercent + '%';
  }
  const retentionBar = document.querySelector('.retention-bar');
  if (retentionBar) {
    retentionBar.style.height = retentionPercent + '%';
  }
}

function updateXPProgress(xpData) {
  const levelText = document.querySelector('.xp-level');
  const sapText = document.querySelector('.xp-sap');
  const progressBar = document.querySelector('.progress-bar');
  if (levelText) levelText.textContent = 'Level ' + xpData.level;
  if (sapText) sapText.textContent = xpData.sap + ' SAP';
  if (progressBar) progressBar.style.width = xpData.progressPercent + '%';
}

function updateRecentActivity(activities) {
  const recentActivityContainer = document.getElementById('recent-activity');
  if (!recentActivityContainer) return;
  if (activities.length === 0) {
    recentActivityContainer.innerHTML = '<p>No recent activity.</p>';
    return;
  }
  recentActivityContainer.innerHTML = activities.map(act => `
    <div class="activity-item p-2 border-b border-gray-200">
      <p class="font-semibold">${act.title}</p>
      <p class="text-sm text-gray-600">${act.date}</p>
    </div>
  `).join('');
}
