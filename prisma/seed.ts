import { db } from '@/lib/db';
import { TASK_STATUS } from '@prisma/client';

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
    TASK_STATUS.COMPLETED,
  ];

  return statuses[Math.floor(Math.random() * statuses.length)];
};

const main = async () => {
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Person',
      password: 'testPassword',
      projects: {
        create: new Array(5).fill(null).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2023, 3, 1),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project) =>
      db.task.createMany({
        data: new Array(10).fill(null).map((_, i) => ({
          name: `Task ${i}`,
          ownerId: user.id,
          projectId: project.id,
          description: `Everything that describes Task ${i}`,
          status: getRandomTaskStatus(),
        })),
      })
    )
  );

  console.log({ user, tasks });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
