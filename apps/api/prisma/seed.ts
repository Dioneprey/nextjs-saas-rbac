import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@doe.com',
      avatarUrl:
        'https://xesque.rocketseat.dev/users/avatar/profile-2818416a-8e53-471c-ae95-eec2d779bb08-1688857224380.jpg',
      password: passwordHash,
    },
  })
  const userTwo = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      password: passwordHash,
    },
  })
  const userThree = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      password: passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Sim (Admin)',
      domain: 'sim.com',
      slug: 'sim-admin',
      avatarUrl: faker.image.avatarGitHub(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'ADMIN',
            },
            {
              userId: userTwo.id,
              role: 'MEMBER',
            },
            {
              userId: userThree.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Sim (Member)',
      slug: 'sim-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'MEMBER',
            },
            {
              userId: userTwo.id,
              role: 'ADMIN',
            },
            {
              userId: userThree.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Sim (Billing)',
      slug: 'sim-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: user.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
            {
              name: faker.lorem.words(5),
              slug: faker.lorem.slug(5),
              description: faker.lorem.paragraph(),
              ownerId: faker.helpers.arrayElement([
                user.id,
                userTwo.id,
                userThree.id,
              ]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            {
              userId: user.id,
              role: 'BILLING',
            },
            {
              userId: userTwo.id,
              role: 'ADMIN',
            },
            {
              userId: userThree.id,
              role: 'MEMBER',
            },
          ],
        },
      },
    },
  })
}

seed().then(() => {
  console.log('Database seeded')
})
