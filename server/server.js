import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import crypto from 'crypto';
import { initDB, query, queryGet, queryRun } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

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

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return relative URL that can be requested from the server
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
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

// ==========================================
// PROJECTS API
// ==========================================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM projects');
    const parsedRows = rows.map(row => parseJsonFields(row, PROJECT_JSON_FIELDS));
    res.json(parsedRows);
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
    res.json(parseJsonFields(row, PROJECT_JSON_FIELDS));
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
      challenge, solution, results, features, gallery, technologies, testimonial
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

    const created = await queryGet('SELECT * FROM projects WHERE id = ?', [id]);
    res.status(201).json(parseJsonFields(created, PROJECT_JSON_FIELDS));
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
      challenge, solution, results, features, gallery, technologies, testimonial
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

    const updated = await queryGet('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    res.json(parseJsonFields(updated, PROJECT_JSON_FIELDS));
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

    await queryRun('DELETE FROM projects WHERE id = ?', [req.params.id]);
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
