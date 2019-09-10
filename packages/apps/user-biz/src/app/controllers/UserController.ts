/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:ctrl:user')

import * as cm from '@micro-fleet/common'
const { inject } = cm.decorators
import { decorators as d } from '@micro-fleet/service-communication'

import { Types as T } from '../constants/Types'
import * as dto from '../contracts/dto/user'
import { IUserService } from '../contracts/interfaces/IUserService'
import { trustPayload } from '../utils/controller-util'

const {
	Action: A,
	MODULE_NAME,
} = dto

@d.mediateController(MODULE_NAME)
@d.directController(MODULE_NAME)
export default class UserController {

	constructor(
		@inject(T.USER_SVC) private _userSvc: IUserService,
	) {
		debug('UserController instantiated')
	}


	/*
	* Topic for all actions here:
	* `request.{MODULE_NAME}.{Action.NAME}`
	*/


	/**
	 * @example
	 *
	 * Request body for creating a single user:
	 * {
	 *	name: 'John Nemo'
	 * }
	 *
	 * or
	 *
	 * {
	 *	name: 'John Nemo',
	 *	status: 'active'
	 * }
	 */
	@d.action(A.CREATE)
	public create(@trustPayload() request: dto.CreateUserRequest) {
		return this._userSvc.create(request)
	}

	/**
	 * @example
	 *
	 * {
	 *	id: '123498765',
	 *	name: 'Nemo Doe'
	 * }
	 */
	@d.action(A.EDIT)
	public edit(@trustPayload() request: dto.EditUserRequest) {
		return this._userSvc.edit(request)
	}

	/**
	 * @example
	 *
	 * {
	 *	id: '123498765'
	 * }
	 */
	@d.action(A.GET_BY_ID)
	public getById(@trustPayload() request: dto.GetUserByIdRequest) {
		return this._userSvc.getById(request)
	}

	/**
	 * @example
	 *
	 * {
	 *	pageIndex: 2,
	 *	pageSize: 10,
	 *	sortBy: 'name',
	 *	sortType: 'desc'
	 * }
	 */
	@d.action(A.GET_LIST)
	public getList(@trustPayload() request: dto.GetUserListRequest) {
		return this._userSvc.getList(request)
	}

	/**
	 * @example
	 *
	 * {
	 *	pageIndex: 2,
	 *	pageSize: 10,
	 *	sortBy: 'name',
	 *	sortType: 'desc'
	 * }
	 */
	@d.action(A.GET_ACTIVE_LIST)
	public getActiveList(@trustPayload() request: dto.GetUserListRequest) {
		return this._userSvc.getActiveList(request)
	}

	/**
	 * @example
	 * {
	 *	ids: ['123', '456', '678'],
	 *	isAtomic: true
	 * }
	 */
	@d.action(A.HARD_DELETE)
	public hardDelete(@trustPayload() request: dto.DeleteUserRequest) {
		return this._userSvc.hardDeleteMany(request)
	}
}
