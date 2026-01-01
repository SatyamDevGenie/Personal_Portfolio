# Static Data System

This directory contains static data for the portfolio homepage, providing fast loading and offline functionality.

## Files

- `staticData.js` - Contains static arrays for services, skills, and projects
- `../utils/dataManager.js` - Utility functions for managing static data

## How It Works

### Data Priority
1. **Regular Users**: Always see static data (fast, reliable)
2. **Admin Users**: See Redux/API data if available, otherwise static data
3. **Fallback**: Static data is always available as backup

### Data Structure

#### Services
```javascript
{
  _id: "unique-id",
  title: "Service Title", 
  description: "Service description",
  category: "Development" // optional
}
```

#### Skills  
```javascript
{
  _id: "unique-id",
  name: "Skill Name",
  category: "Frontend", // optional
  level: 95 // 0-100
}
```

#### Projects
```javascript
{
  _id: "unique-id", 
  name: "Project Name",
  description: "Project description",
  url: "https://demo.com", // optional
  repo: "https://github.com/user/repo", // optional
  stack: "React, Node.js, MongoDB" // comma-separated
}
```

## Managing Static Data

### Adding New Items
Use the admin forms on the homepage when logged in as admin, or directly edit `staticData.js`.

### Editing Existing Items
1. **Via Admin Panel**: Edit through the homepage interface (admin only)
2. **Direct Edit**: Modify the arrays in `staticData.js`

### Data Manager Functions
```javascript
import { dataManager } from '../utils/dataManager.js';

// Add items
dataManager.addService(serviceData);
dataManager.addSkill(skillData); 
dataManager.addProject(projectData);

// Update items
dataManager.updateService(id, updates);
dataManager.updateSkill(id, updates);
dataManager.updateProject(id, updates);

// Delete items
dataManager.deleteService(id);
dataManager.deleteSkill(id);
dataManager.deleteProject(id);

// Export/Import for backup
const backup = dataManager.exportData();
dataManager.importData(backup);
```

## Benefits

1. **Fast Loading**: No API calls needed for homepage
2. **Offline Support**: Works without internet connection
3. **SEO Friendly**: Content available immediately for crawlers
4. **Reliable**: No dependency on external services
5. **Admin Flexibility**: Can still use dynamic data when needed

## Customization

To customize the static data:

1. Edit arrays in `staticData.js`
2. Update data structure if needed
3. Modify `dataManager.js` for new functionality
4. Test with both static and dynamic data scenarios