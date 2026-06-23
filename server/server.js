import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import crypto from 'crypto';
import sharp from 'sharp';
import { initDB, query, queryGet, queryRun } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Respect the original HTTPS scheme when running behind nginx.
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Set up uploads folder and static serving
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Helper to compress image in-place
async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    // Only compress common image formats
    if (!['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif'].includes(ext)) {
      return;
    }
    
    const tempPath = filePath + '.tmp';
    
    // Resize to max width of 1200px (preserving aspect ratio) and use quality 80
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();
    
    if (metadata.width && metadata.width > 1200) {
      pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
    }
    
    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 80 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }
    
    await pipeline.toFile(tempPath);
    
    // Replace original file with compressed one
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error('Error compressing image:', err);
    try {
      if (fs.existsSync(filePath + '.tmp')) {
        fs.unlinkSync(filePath + '.tmp');
      }
    } catch (_) {}
  }
}

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Compress the image
    await compressImage(req.file.path);
    
    // Return a relative URL so the browser uses the current site origin.
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Helpers to parse and serialize JSON fields
const SERVICE_JSON_FIELDS = [
  'benefits',
  'features',
  'specifications',
  'workflow',
  'projects',
  'testimonial',
  'calculator',
  'gallery'
];

const PROJECT_JSON_FIELDS = [
  'results',
  'features',
  'gallery',
  'technologies',
  'testimonial'
];

const parseJsonFields = (row, fields) => {
  if (!row) return row;
  const newRow = { ...row };
  fields.forEach(field => {
    if (newRow[field]) {
      try {
        newRow[field] = JSON.parse(newRow[field]);
      } catch (e) {
        newRow[field] = [];
      }
    } else {
      newRow[field] = null;
    }
  });
  return newRow;
};

// ==========================================
// SERVICES API
// ==========================================

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM services');
    const parsedRows = rows.map(row => parseJsonFields(row, SERVICE_JSON_FIELDS));
    res.json(parsedRows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get single service
app.get('/api/services/:id', async (req, res) => {
  try {
    const row = await queryGet('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (!row) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(parseJsonFields(row, SERVICE_JSON_FIELDS));
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Create new service
app.post('/api/services', async (req, res) => {
  try {
    const {
      id, title, category, image, tagline, description,
      benefits, features, specifications, workflow, projects, testimonial, calculator, gallery
    } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: 'ID and Title are required' });
    }

    // Check if ID already exists
    const existing = await queryGet('SELECT id FROM services WHERE id = ?', [id]);
    if (existing) {
      return res.status(400).json({ error: 'Service ID already exists' });
    }

    await queryRun(
      `INSERT INTO services (
        id, title, category, image, tagline, description,
        benefits, features, specifications, workflow, projects, testimonial, calculator, gallery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, category, image, tagline, description,
        JSON.stringify(benefits || []),
        JSON.stringify(features || []),
        JSON.stringify(specifications || []),
        JSON.stringify(workflow || []),
        JSON.stringify(projects || []),
        JSON.stringify(testimonial || null),
        JSON.stringify(calculator || null),
        JSON.stringify(gallery || [])
      ]
    );

    const created = await queryGet('SELECT * FROM services WHERE id = ?', [id]);
    res.status(201).json(parseJsonFields(created, SERVICE_JSON_FIELDS));
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service
app.put('/api/services/:id', async (req, res) => {
  try {
    const {
      title, category, image, tagline, description,
      benefits, features, specifications, workflow, projects, testimonial, calculator, gallery
    } = req.body;

    const existing = await queryGet('SELECT id FROM services WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await queryRun(
      `UPDATE services SET 
        title = ?, category = ?, image = ?, tagline = ?, description = ?,
        benefits = ?, features = ?, specifications = ?, workflow = ?, projects = ?, testimonial = ?, calculator = ?, gallery = ?
      WHERE id = ?`,
      [
        title, category, image, tagline, description,
        JSON.stringify(benefits || []),
        JSON.stringify(features || []),
        JSON.stringify(specifications || []),
        JSON.stringify(workflow || []),
        JSON.stringify(projects || []),
        JSON.stringify(testimonial || null),
        JSON.stringify(calculator || null),
        JSON.stringify(gallery || []),
        req.params.id
      ]
    );

    const updated = await queryGet('SELECT * FROM services WHERE id = ?', [req.params.id]);
    res.json(parseJsonFields(updated, SERVICE_JSON_FIELDS));
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const existing = await queryGet('SELECT id FROM services WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await queryRun('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Helper to append serviceIds to project objects
const appendServiceIdsToProjects = async (projectsArrayOrObject) => {
  const isArray = Array.isArray(projectsArrayOrObject);
  const projects = isArray ? projectsArrayOrObject : [projectsArrayOrObject];
  
  // Fetch all services to build a mapping from projectId to serviceIds
  const services = await query('SELECT id, projects FROM services');
  const projToServices = {};
  
  for (const service of services) {
    let parsedProjects = [];
    try {
      parsedProjects = JSON.parse(service.projects || '[]');
    } catch (e) {}
    
    for (const p of parsedProjects) {
      if (p && p.id) {
        if (!projToServices[p.id]) {
          projToServices[p.id] = [];
        }
        projToServices[p.id].push(service.id);
      }
    }
  }
  
  const result = projects.map(proj => ({
    ...proj,
    serviceIds: projToServices[proj.id] || []
  }));
  
  return isArray ? result : result[0];
};

// ==========================================
// PROJECT CATEGORIES API
// ==========================================

// Get all project categories
app.get('/api/project-categories', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM project_categories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching project categories:', error);
    res.status(500).json({ error: 'Failed to fetch project categories' });
  }
});

// Create new project category
app.post('/api/project-categories', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const id = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const existing = await queryGet('SELECT id FROM project_categories WHERE id = ? OR name = ?', [id, name.trim()]);
    if (existing) {
      return res.status(400).json({ error: 'Category already exists' });
    }
    
    await queryRun('INSERT INTO project_categories (id, name) VALUES (?, ?)', [id, name.trim()]);
    const created = await queryGet('SELECT * FROM project_categories WHERE id = ?', [id]);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating project category:', error);
    res.status(500).json({ error: 'Failed to create project category' });
  }
});

// ==========================================
// PROJECTS API
// ==========================================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM projects');
    const parsedRows = rows.map(row => parseJsonFields(row, PROJECT_JSON_FIELDS));
    const completedRows = await appendServiceIdsToProjects(parsedRows);
    res.json(completedRows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const row = await queryGet('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!row) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const parsedRow = parseJsonFields(row, PROJECT_JSON_FIELDS);
    const completedRow = await appendServiceIdsToProjects(parsedRow);
    res.json(completedRow);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project
app.post('/api/projects', async (req, res) => {
  try {
    const {
      id, title, category, image, client, location, duration, date,
      challenge, solution, results, features, gallery, technologies, testimonial,
      serviceIds
    } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: 'ID and Title are required' });
    }

    // Check if ID already exists
    const existing = await queryGet('SELECT id FROM projects WHERE id = ?', [id]);
    if (existing) {
      return res.status(400).json({ error: 'Project ID already exists' });
    }

    await queryRun(
      `INSERT INTO projects (
        id, title, category, image, client, location, duration, date,
        challenge, solution, results, features, gallery, technologies, testimonial
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, category, image, client, location, duration, date,
        challenge, solution,
        JSON.stringify(results || []),
        JSON.stringify(features || []),
        JSON.stringify(gallery || []),
        JSON.stringify(technologies || []),
        JSON.stringify(testimonial || null)
      ]
    );

    // Sync service associations on project creation
    if (Array.isArray(serviceIds) && serviceIds.length > 0) {
      const services = await query('SELECT * FROM services');
      for (const service of services) {
        if (serviceIds.includes(service.id)) {
          let parsedProjects = [];
          try {
            parsedProjects = JSON.parse(service.projects || '[]');
          } catch (e) {}
          
          if (!parsedProjects.some(p => p.id === id)) {
            parsedProjects.push({
              id,
              name: title,
              image,
              description: challenge || '',
              stat: location || ''
            });
            await queryRun(
              'UPDATE services SET projects = ? WHERE id = ?',
              [JSON.stringify(parsedProjects), service.id]
            );
          }
        }
      }
    }

    const created = await queryGet('SELECT * FROM projects WHERE id = ?', [id]);
    const parsedCreated = parseJsonFields(created, PROJECT_JSON_FIELDS);
    const completedCreated = await appendServiceIdsToProjects(parsedCreated);
    res.status(201).json(completedCreated);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const {
      title, category, image, client, location, duration, date,
      challenge, solution, results, features, gallery, technologies, testimonial,
      serviceIds
    } = req.body;

    const existing = await queryGet('SELECT id FROM projects WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await queryRun(
      `UPDATE projects SET 
        title = ?, category = ?, image = ?, client = ?, location = ?, duration = ?, date = ?,
        challenge = ?, solution = ?, results = ?, features = ?, gallery = ?, technologies = ?, testimonial = ?
      WHERE id = ?`,
      [
        title, category, image, client, location, duration, date,
        challenge, solution,
        JSON.stringify(results || []),
        JSON.stringify(features || []),
        JSON.stringify(gallery || []),
        JSON.stringify(technologies || []),
        JSON.stringify(testimonial || null),
        req.params.id
      ]
    );

    // Sync services: Add/update or remove this project from their projects lists
    const services = await query('SELECT * FROM services');
    for (const service of services) {
      let parsedProjects = [];
      try {
        parsedProjects = JSON.parse(service.projects || '[]');
      } catch (e) {}
      
      const hasProject = parsedProjects.some(p => p.id === req.params.id);
      let shouldHaveProject = false;
      if (Array.isArray(serviceIds)) {
        shouldHaveProject = serviceIds.includes(service.id);
      } else {
        shouldHaveProject = hasProject; // retain association if serviceIds not provided
      }

      if (shouldHaveProject) {
        const updatedProjectInfo = {
          id: req.params.id,
          name: title,
          image: image,
          description: challenge || '',
          stat: location || ''
        };
        const idx = parsedProjects.findIndex(p => p.id === req.params.id);
        if (idx !== -1) {
          parsedProjects[idx] = updatedProjectInfo;
        } else {
          parsedProjects.push(updatedProjectInfo);
        }
      } else {
        parsedProjects = parsedProjects.filter(p => p.id !== req.params.id);
      }

      await queryRun(
        'UPDATE services SET projects = ? WHERE id = ?',
        [JSON.stringify(parsedProjects), service.id]
      );
    }

    const updated = await queryGet('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    const parsedUpdated = parseJsonFields(updated, PROJECT_JSON_FIELDS);
    const completedUpdated = await appendServiceIdsToProjects(parsedUpdated);
    res.json(completedUpdated);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const existing = await queryGet('SELECT id FROM projects WHERE id = ?', [req.params.id]);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete project from projects table
    await queryRun('DELETE FROM projects WHERE id = ?', [req.params.id]);

    // Also remove this project reference from all services
    const services = await query('SELECT * FROM services');
    for (const service of services) {
      let parsedProjects = [];
      try {
        parsedProjects = JSON.parse(service.projects || '[]');
      } catch (e) {}
      
      const filtered = parsedProjects.filter(p => p.id !== req.params.id);
      if (filtered.length !== parsedProjects.length) {
        await queryRun(
          'UPDATE services SET projects = ? WHERE id = ?',
          [JSON.stringify(filtered), service.id]
        );
      }
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ==========================================
// CONTACT DETAILS API
// ==========================================

// Get contact details
app.get('/api/contact', async (req, res) => {
  try {
    const row = await queryGet('SELECT * FROM contact_details WHERE id = ?', ['main']);
    if (!row) {
      return res.status(404).json({ error: 'Contact details not found' });
    }
    res.json(row);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ error: 'Failed to fetch contact details' });
  }
});

// Update contact details
app.put('/api/contact', async (req, res) => {
  try {
    const { whatsapp, viber, telegram, email, phone, address, company_name, description, facebook, instagram } = req.body;

    const existing = await queryGet('SELECT id FROM contact_details WHERE id = ?', ['main']);
    if (!existing) {
      // In case seed wasn't run
      await queryRun(
        `INSERT INTO contact_details (id, whatsapp, viber, telegram, email, phone, address, company_name, description, facebook, instagram)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ['main', whatsapp, viber, telegram, email, phone, address, company_name, description, facebook, instagram]
      );
    } else {
      await queryRun(
        `UPDATE contact_details SET 
          whatsapp = ?, viber = ?, telegram = ?, email = ?, phone = ?, address = ?, company_name = ?, description = ?, facebook = ?, instagram = ?
        WHERE id = ?`,
        [whatsapp, viber, telegram, email, phone, address, company_name, description, facebook, instagram, 'main']
      );
    }

    const updated = await queryGet('SELECT * FROM contact_details WHERE id = ?', ['main']);
    res.json(updated);
  } catch (error) {
    console.error('Error updating contact details:', error);
    res.status(500).json({ error: 'Failed to update contact details' });
  }
});

// Admin Login Authentication Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    const user = await queryGet('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');
    if (hash !== user.password_hash) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    res.json({ success: true, token: 'elecpro_session_token_' + Date.now(), username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erreur interne du serveur lors de la connexion' });
  }
});

// Initialize Database and then Start Express Server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
