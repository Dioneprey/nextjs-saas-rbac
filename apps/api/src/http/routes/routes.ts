import { FastifyInstance } from 'fastify'

import { authenticateWithCredentials } from './auth/authenticate-with-credentials'
import { authenticateWithGithub } from './auth/authenticate-with-github'
import { createAccount } from './auth/create-account'
import { getProfile } from './auth/get-profile'
import { requestPasswordRecover } from './auth/request-password-recover'
import { resetPassword } from './auth/reset-password'
import { getOrganizationBilling } from './billing/get-organization-billing'
import { acceptInvite } from './invites/accept-invite'
import { createInvite } from './invites/create-invite'
import { getInvite } from './invites/get-invite'
import { getInvites } from './invites/get-invites'
import { getPendingInvites } from './invites/get-pending-invites'
import { rejectInvite } from './invites/reject-invite'
import { revokeInvite } from './invites/revoke-invite'
import { getMembers } from './members/get-members'
import { removeMembers } from './members/remove-member'
import { updateMembers } from './members/update-member'
import { createOrganization } from './orgs/create-organization'
import { getMembership } from './orgs/get-membership'
import { getOrganization } from './orgs/get-organization'
import { getOrganizations } from './orgs/get-organizations'
import { shutdownOrganization } from './orgs/shutdown-organization'
import { transferOrganization } from './orgs/transfer-organization'
import { updateOrganization } from './orgs/update-organization'
import { createProject } from './projects/create-project'
import { deleteProject } from './projects/delete-project'
import { getProject } from './projects/get-project'
import { getProjects } from './projects/get-projects'
import { updateProject } from './projects/update-project'

export default function (app: FastifyInstance) {
  // AUTH ROUTES
  app.register(createAccount)
  app.register(authenticateWithCredentials)
  app.register(getProfile)
  app.register(requestPasswordRecover)
  app.register(resetPassword)
  app.register(authenticateWithGithub)

  // ORGANIZATION ROUTES
  app.register(createOrganization)
  app.register(getMembership)
  app.register(getOrganizations)
  app.register(getOrganization)
  app.register(updateOrganization)
  app.register(shutdownOrganization)
  app.register(transferOrganization)

  // PROJECTS ROUTES
  app.register(createProject)
  app.register(deleteProject)
  app.register(getProject)
  app.register(getProjects)
  app.register(updateProject)

  // MEMBERS ROUTES
  app.register(getMembers)
  app.register(updateMembers)
  app.register(removeMembers)

  // INVITE ROUTES
  app.register(createInvite)
  app.register(getInvite)
  app.register(getInvites)
  app.register(acceptInvite)
  app.register(rejectInvite)
  app.register(revokeInvite)
  app.register(getPendingInvites)

  // BILLING ROUTES
  app.register(getOrganizationBilling)
}
