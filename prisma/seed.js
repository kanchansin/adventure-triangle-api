const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample user
  const user = await prisma.user.create({
    data: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      adventureInterests: ["water", "air"],
      experienceLevel: "intermediate",
      location: "California, USA",
      hearAboutUs: "Social Media",
      emailVerified: true
    }
  });

  // Create sample partner
  const partner = await prisma.partner.create({
    data: {
      companyName: "Ocean Adventures Co",
      contactPerson: "Jane Smith",
      email: "jane@oceanadventures.com",
      phone: "+1234567890",
      businessType: "tour_operator",
      adventureTypes: ["water"],
      location: "Miami, FL",
      website: "https://oceanadventures.com",
      description: "Premier water sports operator",
      status: "approved"
    }
  });

  console.log('✅ Seed data created!');
  console.log('User:', user.email);
  console.log('Partner:', partner.companyName);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());