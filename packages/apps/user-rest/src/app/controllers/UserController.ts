/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:ctrl:user')

import { decorators as cd } from '@micro-fleet/common'
import { decorators as wd, RestControllerBase } from '@micro-fleet/web'

import { Types as T } from '../constants/Types'
import * as dto from '../contracts/dto/user'
import { IUserService } from '../contracts/interfaces/IUserService'


@wd.controller('users')
export default class UserController extends RestControllerBase {

	constructor(
		@cd.inject(T.USER_SVC) private _userSvc: IUserService,
	) {
		super()
		debug('UserController instantiated')
	}

	/**
	 * GET {prefix}/users/:id?fields=prop
	 * @example /api/v1/users/123654?fields=id&fields=name
	 */
	@wd.GET(':id')
	public getOne(
		@wd.model({
			extractFn: (r) => ({
				id: r.params.id,
				fields: r.query.fields,
			}),
		})
		params: dto.GetUserByIdRequest,
	) {
		return this._userSvc.getById(params)
	}

	/**
	 * GET {prefix}/users/
	 * @example /api/v1/users?pageIndex=2&pageSize=10&sortBy=name&sortType=desc
	 */
	@wd.GET('/')
	public getList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetUserListRequest,
	) {
		return this._userSvc.getList(params)
	}

	/**
	 * GET {prefix}/users/active
	 * @example /api/v1/users/active?pageIndex=2&pageSize=10&sortBy=name&sortType=desc
	 */
	@wd.GET('/active')
	public getActiveList(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.GetUserListRequest,
	) {
		return this._userSvc.getActiveList(params)
	}

	/**
	 * POST {prefix}/users
	 * @example /api/v1/users
	 *
	 * Request body for creating a single user:
	 * {
	 *	name: 'John Nemo',
	 * }
	 *
	 * or
	 *
	 * {
	 *	name: 'John Nemo',
	 *	status: 'active',
	 * }
	 */
	@wd.POST('/')
	public async create(@wd.model() params: dto.CreateUserRequest) {
		return this._userSvc.create(params)
	}

	/**
	 * PATCH {prefix}/users
	 * @example /api/v1/users
	 *
	 * {
	 *	id: '123498765',
	 *	name: 'Nemo Doe',
	 * }
	 */
	@wd.PATCH('/')
	public edit(
		@wd.model({ isPartial: true }) params: dto.EditUserRequest,
	) {
		return this._userSvc.edit(params)
	}

	/**
	 * DELETE {prefix}/users/:ids
	 * @example /api/v1/users/123654
	 */
	@wd.DELETE(':ids')
	public deleteSingle(
		@wd.model({
			extractFn: (r) => r.params,
		})
		params: dto.DeleteUserRequest
	) {
		return this._userSvc.hardDeleteSingle(params)
	}

	/**
	 * DELETE {prefix}/users
	 * @example /api/v1/users?ids=123&ids=456&ids=789
	 */
	@wd.DELETE('/')
	public deleteMany(
		@wd.model({
			extractFn: (r) => r.query,
		})
		params: dto.DeleteUserRequest
	) {
		return this._userSvc.hardDeleteMany(params)
	}
}
