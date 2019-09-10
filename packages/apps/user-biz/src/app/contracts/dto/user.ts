import * as joi from '@hapi/joi'

import { Translatable, decorators as d } from '@micro-fleet/common'

import { ResultResponse, MaybeResponse, GetListRequestBase, DTOListBase } from './dto-base'
import { UserStatus } from '../constants-shared'



//#region RPC Constants

export const MODULE_NAME = 'mcftUserManagement'

export enum Action {
	CREATE = 'create',
	EDIT = 'edit',
	HARD_DELETE = 'hardDelete',
	GET_BY_ID = 'getById',
	GET_LIST = 'getList',
	GET_ACTIVE_LIST = 'getActiveList',
}

//#endregion RPC Constants


const USER_FIELDS = [ 'id', 'name', 'status']
const FIELDS_RULE = { items: joi.string().only(USER_FIELDS) }


//#region Create

export class CreateUserRequest extends Translatable {

	@d.required()
	@d.string({ minLength: 3, maxLength: 100 })
	public readonly name: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.required()
	@d.only(UserStatus.ACTIVE, UserStatus.LOCKED, UserStatus.DELETED)
	public readonly status: string = undefined
}

export class CreateUserResponse extends ResultResponse {
	public id: string = undefined
	public createdAt: string = undefined
}

//#endregion Create


//#region Delete

export class DeleteUserRequest extends Translatable {

	@d.required()
	@d.array({
		items: joi.string().regex(/\d+/).required(),
		allowSingle: true,
		maxLength: 10,
	})
	public readonly ids: string[] = undefined

	/**
	 * If `true`, when failed to delete one ID, the whole operation is
	 * considered failure, all changes are rolled back.
	 *
	 * Default is `true`
	 */
	@d.boolean()
	public readonly isAtomic?: boolean = undefined
}

export class DeleteUserResponse extends ResultResponse {
	public deletedAt: string = undefined
}

//#endregion Delete


//#region Edit

export class EditUserRequest extends Translatable {

	@d.required()
	@d.bigInt()
	public readonly id: string = undefined // Must be initialized, otherwise TypeScript compiler will remove it

	@d.string({ minLength: 3, maxLength: 100 })
	public readonly name?: string = undefined
}

export class EditUserResponse extends ResultResponse {
	public updatedAt: string = undefined
}

//#endregion Edit


//#region Get by ID

export class GetUserByIdRequest extends Translatable {
	@d.required()
	@d.bigInt()
	public readonly id: string = undefined

	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined
}

export class GetSingleUserResponse extends MaybeResponse {

	public id: string = undefined
	public name?: string = undefined
	public status?: string = undefined
}

//#endregion Get by ID


//#region Get List

export class GetUserListRequest extends GetListRequestBase {

	@d.array(FIELDS_RULE)
	public readonly fields?: string[] = undefined
}

export class UserListItem extends Translatable {

	public id: string = undefined
	public name?: string = undefined
	public status?: string = undefined
}

export class GetUserListResponse extends DTOListBase<UserListItem> {
	public constructor(users: object[] = [], total: number = 0) {
		super(UserListItem, users, total)
	}
}

//#endregion Get List
