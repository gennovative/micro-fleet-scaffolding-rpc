/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:svc:user')

// import { cacheable } from '@micro-fleet/cache'
import { Maybe, decorators as d, PagedData } from '@micro-fleet/common'
import { Types as iT, IIdProvider } from '@micro-fleet/id-generator'
import { Types as pT, AtomicSessionFactory, RepositoryFindOptions } from '@micro-fleet/persistence'

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
			return Maybe.Just('TENANT_NOT_EXISTING')
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

	/**
	 * @override
	 */
	protected $checkEditViolation(params: dto.EditUserRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
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

	/**
	 * @override
	 */
	protected $checkDeleteManyViolation(params: dto.DeleteUserRequest): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Get

	/**
	 * @see IUserService.getById
	 */
	public getById(params: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse> {
		const repoParams: dto.GetUserByIdRequest & RepositoryFindOptions = this._rebuildGetParams(params)
		return this.$getById(
			repoParams,
			dto.GetSingleUserResponse,
		)
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

	private _rebuildGetParams<U extends { fields?: string[] }>(params: U): U & RepositoryFindOptions {
		if (params.fields && params.fields.includes('tenantName')) {
			return {
				...params,
				// Remove "tenantName" because it isn't a table column
				fields: params.fields.filter((f) => f !== 'tenantName'),
				// ObjectionJS relation object expression
				relations: {
					tenant: ['name'],
				},
			}
		}
		return params
	}

	//#endregion Get

}
