const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  // Correctly reference the path to the asvs.json file
  const dataPath = path.join(__dirname, "..", "public", "asvs.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  for (const category of data) {
    const createdCategory = await prisma.category.create({
      data: {
        categoryId: category.category_id,
        name: category.category_name,
        summary: category.summary,
        subCategories: {
          create: category.sub_categories.map((subCategory: any) => ({
            subCategoryId: subCategory.sub_category_id,
            name: subCategory.sub_category_name,
            summary: subCategory.summary,
            requirements: {
              create: subCategory.requirements.map((requirement: any) => ({
                requirementId: requirement.requirement_id,
                description: requirement.description,
                level1: requirement.level1,
                level2: requirement.level2,
                level3: requirement.level3,
                cwe: requirement.cwe ? requirement.cwe.toString() : "",
              })),
            },
          })),
        },
      },
    });

    console.log(`Created category with id: ${createdCategory.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
