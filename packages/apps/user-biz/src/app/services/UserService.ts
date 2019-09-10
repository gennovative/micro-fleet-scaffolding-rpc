/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:svc:user')

// import { cacheable } from '@micro-fleet/cache'
import { Maybe, decorators as d, PagedData } from '@micro-fleet/common'
import { Types as iT, IIdProvider } from '@micro-fleet/id-generator'
import { Types as pT, AtomicSessionFactory } from '@micro-fleet/persistence'

import { Types as T } from '../constants/Types'
import * as dto from '../contracts/dto/user'
import { IUserService } from '../contracts/interfaces/IUserService'
import { User } from '../models/domain/User'
import { IUserRepository } from '../repositories/UserRepository'
import { ManagementServiceBase } from './ManagementServiceBase'



export class UserService
	extends ManagementServiceBase<User>
	implements IUserService {

	private get _userRepo(): IUserRepository {
		return this.$repo as IUserRepository
	}

	constructor(
		@d.inject(pT.ATOMIC_SESSION_FACTORY) sessionFactory: AtomicSessionFactory,
		@d.inject(T.USER_REPO) repo: IUserRepository,
		@d.inject(iT.ID_PROVIDER) private _idGen: IIdProvider,
	) {
		super(User, repo, sessionFactory)
		debug('UserService instantiated')
	}


	//#region Create

	/**
	 * @see IUserService.create
	 */
	public create(params: dto.CreateUserRequest): Promise<dto.CreateUserResponse> {
		return this.$create({
				...params,
				id: this._idGen.nextBigInt(),
			},
			dto.CreateUserResponse,
		)
	}

	/**
	 * @override
	 */
	protected async $checkCreateViolation(params: dto.CreateUserRequest): Promise<Maybe<string>> {
		if (await this.$repo.exists({ name: params.name })) {
			return Maybe.Just('USERNAME_ALREADY_EXISTS')
		}
		return Maybe.Nothing()
	}

	//#endregion Create


	//#region Edit

	/**
	 * @see IUserService.edit
	 */
	public edit(params: dto.EditUserRequest): Promise<dto.EditUserResponse> {
		return this.$edit(params, dto.EditUserResponse)
	}

	//#endregion Edit


	//#region Delete

	/**
	 * @see IUserService.hardDeleteSingle
	 */
	public hardDeleteSingle(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$hardDeleteSingle(
			params,
			dto.DeleteUserResponse,
		)
	}

	/**
	 * @see IUserService.hardDeleteMany
	 */
	public hardDeleteMany(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse> {
		return this.$hardDeleteMany(
			params,
			dto.DeleteUserResponse,
		)
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see IUserService.getById
	 */
	public getById(params: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse> {
		return this.$getById(params, dto.GetSingleUserResponse)
	}

	/**
	 * @see IUserService.getActiveList
	 */
	public async getActiveList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse> {
		const fetchedDomainModels: PagedData<User> = await this._userRepo.pageActive(params as any)

		if (fetchedDomainModels.length) {
			const result = dto.GetUserListResponse.from(fetchedDomainModels)
			return result
		}
		return new dto.GetUserListResponse()
	}

	/**
	 * @see IUserService.getList
	 */
	// @cacheable('userSvc:getList')
	public getList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse> {
		debug('UserService.getList')
		return this.$getList(params, dto.GetUserListResponse)
	}

	//#endregion Get

}
