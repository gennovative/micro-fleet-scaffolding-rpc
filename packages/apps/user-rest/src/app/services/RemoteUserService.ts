/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:svc:user')

// import { cacheable } from '@micro-fleet/cache'
import { decorators as d } from '@micro-fleet/common'
import { Types as sT, IMediateRpcCaller } from '@micro-fleet/service-communication'

import * as dto from '../contracts/dto/user'
import { RemoteServiceBase } from './RemoteServiceBase'
import { IUserService } from '../contracts/interfaces/IUserService'


const {
	Action: A,
} = dto

export class RemoteUserService
	extends RemoteServiceBase
	implements IUserService {

	constructor(
		@d.inject(sT.MEDIATE_RPC_CALLER) rpcCaller: IMediateRpcCaller,
	) {
		super(dto.MODULE_NAME, rpcCaller)
		debug('RemoteUserService instantiated')
	}


	/**
	 * @see IUserService.create
	 */
	public create(request: dto.CreateUserRequest): Promise<dto.CreateUserResponse> {
		return this.$call(A.CREATE, request, dto.CreateUserResponse)
	}


	/**
	 * @see IUserService.edit
	 */
	public edit(request: dto.EditUserRequest): Promise<dto.EditUserResponse> {
		return this.$call(A.EDIT, request, dto.EditUserResponse)
	}


	/**
	 * @see IUserService.hardDeleteSingle
	 */
	public hardDeleteSingle(request: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$call(A.HARD_DELETE, request, dto.DeleteUserResponse)
	}


	/**
	 * @see IUserService.hardDeleteMany
	 */
	public hardDeleteMany(request: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$call(A.HARD_DELETE, request, dto.DeleteUserResponse)
	}


	/**
	 * @see IUserService.getById
	 */
	public getById(request: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse> {
		return this.$call(A.GET_BY_ID, request, dto.GetSingleUserResponse)
	}

	/**
	 * @see IUserService.getActiveList
	 */
	public async getActiveList(request: dto.GetUserListRequest): Promise<dto.GetUserListResponse> {
		return this.$call(A.GET_ACTIVE_LIST, request, dto.GetUserListResponse)
	}

	/**
	 * @see IUserService.getList
	 */
	// @cacheable('userSvc:getList')
	public getList(request: dto.GetUserListRequest): Promise<dto.GetUserListResponse> {
		return this.$call(A.GET_LIST, request, dto.GetUserListResponse)
	}

}
