import { initDB, queryRun, queryGet } from './database.js';
import { servicesData } from '../src/data/servicesData.js';
import { projectsData } from '../src/data/projectsData.js';

const seed = async () => {
  try {
    console.log('Initializing database schemas...');
    await initDB();

    console.log('Seeding services...');
    for (const key of Object.keys(servicesData)) {
      const service = servicesData[key];
      
      // Check if it already exists
      const existing = await queryGet('SELECT id FROM services WHERE id = ?', [service.id]);
      if (!existing) {
        await queryRun(
          `INSERT INTO services (
            id, title, category, image, tagline, description, 
            benefits, features, specifications, workflow, projects, testimonial, calculator
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            service.id,
            service.title,
            service.category,
            service.image,
            service.tagline,
            service.description,
            JSON.stringify(service.benefits || []),
            JSON.stringify(service.features || []),
            JSON.stringify(service.specifications || []),
            JSON.stringify(service.workflow || []),
            JSON.stringify(service.projects || []),
            JSON.stringify(service.testimonial || null),
            JSON.stringify(service.calculator || null)
          ]
        );
        console.log(`- Service "${service.title}" inserted.`);
      } else {
        console.log(`- Service "${service.title}" already exists, skipping.`);
      }
    }

    console.log('Seeding projects...');
    for (const key of Object.keys(projectsData)) {
      const project = projectsData[key];
      
      // Check if it already exists
      const existing = await queryGet('SELECT id FROM projects WHERE id = ?', [project.id]);
      if (!existing) {
        await queryRun(
          `INSERT INTO projects (
            id, title, category, image, client, location, duration, date, 
            challenge, solution, results, features, gallery, technologies, testimonial
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            project.id,
            project.title,
            project.category,
            project.image,
            project.client,
            project.location,
            project.duration,
            project.date,
            project.challenge,
            project.solution,
            JSON.stringify(project.results || []),
            JSON.stringify(project.features || []),
            JSON.stringify(project.gallery || []),
            JSON.stringify(project.technologies || []),
            JSON.stringify(project.testimonial || null)
          ]
        );
        console.log(`- Project "${project.title}" inserted.`);
      } else {
        console.log(`- Project "${project.title}" already exists, skipping.`);
      }
    }

    console.log('Seeding contact details...');
    const contactId = 'main';
    const existingContact = await queryGet('SELECT id FROM contact_details WHERE id = ?', [contactId]);
    if (!existingContact) {
      await queryRun(
        `INSERT INTO contact_details (
          id, whatsapp, viber, telegram, email, phone, address, company_name, description, facebook, instagram
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          contactId,
          '+15551234567',
          '+15551234567',
          'elecpro_admin',
          'contact@elecpro.com',
          '+1 (555) 123-4567',
          '123 Rue de l\'Électricité, Paris, France',
          'ELECPRO',
          "Solutions électriques de premier choix, conçues pour la sécurité et l'énergie durable.",
          'https://facebook.com',
          'https://instagram.com'
        ]
      );
      console.log('- Contact details inserted.');
    } else {
      console.log('- Contact details already exist, skipping.');
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seed();
