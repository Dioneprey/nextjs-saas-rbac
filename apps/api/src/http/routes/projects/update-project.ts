import { projectSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermission } from '@/utils/get-user-permissions'

import { UnathorizedError } from '../_errors/unauthorized-error'

export async function updateProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/projects/:projectId',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Update a project',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
          }),
          params: z.object({
            slug: z.string(),
            projectId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params
        const userId = await request.getCurrentUserId()

        const { membership, organization } =
          await request.getUserMembership(slug)

        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
            organizationId: organization.id,
          },
        })

        if (!project) {
          throw new UnathorizedError('Project not found')
        }

        const { cannot } = getUserPermission(userId, membership.role)
        const authProject = projectSchema.parse(project)

        if (cannot('update', authProject)) {
          throw new UnathorizedError(
            "You're not allowed to update this project.",
          )
        }

        const { description, name } = request.body

        await prisma.project.update({
          where: {
            id: projectId,
          },
          data: {
            description,
            name,
          },
        })

        return reply.status(204).send()
      },
    )
}
