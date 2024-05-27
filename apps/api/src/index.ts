import { defineAbilityFor, projectSchema } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user_id' })

const project = projectSchema.parse({ id: 'project_id', ownerId: 'user_id' })

console.log(ability.can('delete', project))
