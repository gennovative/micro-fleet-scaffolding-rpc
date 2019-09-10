import { Moment } from 'moment'
import { Translatable } from '@micro-fleet/common'

import { momentify } from '../../utils/date-utils'
import { UserStatus } from '../../contracts/constants-shared'


export class User extends Translatable {

	public id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it
	public name: string = undefined
	public status: UserStatus = undefined
	public createdAt: string = undefined
	public updatedAt: string = undefined

	public get createdMoment(): Moment {
		return momentify(this.createdAt)
	}

	public get updatedMoment(): Moment {
		return momentify(this.updatedAt)
	}
}
