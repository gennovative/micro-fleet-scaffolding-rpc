/// <reference types="debug" />
const debug: debug.IDebugger = require('debug')('scaffold:repo:user')

import { QueryBuilder } from 'objection'
import { TenantId, PagedData, decorators as cd } from '@micro-fleet/common'
import * as p from '@micro-fleet/persistence'

import { UserStatus } from '../contracts/constants-shared'
import { User } from '../models/domain/User'
import { UserORM } from '../models/orm/UserORM'


/*
 * Provides methods to manage users.
 */
export interface IUserRepository extends p.IRepository<User, TenantId> {
	/**
	 * Gets paged list of active users
	 */
	pageActive(opts: p.RepositoryPageOptions): Promise<PagedData<User>>
}


export class UserRepository
	extends p.PgCrudRepositoryBase<UserORM, User>
	implements IUserRepository {

	constructor(
		@cd.inject(p.Types.DB_CONNECTOR) connector: p.IDatabaseConnector,
	) {
		super(UserORM, User, connector)
		debug('UserRepository instantiated')
	}

	/**
	 * @see IRepository.pageActive
	 */
	public async pageActive(opts: p.RepositoryPageOptions): Promise<PagedData<User>> {
		type PageResult = { total: number, results: Array<UserORM> }
		const foundList: PageResult = await this.executeQuery(
			query => {
				const q = this._buildPageActiveQuery(query, opts) as QueryBuilder<any>
				debug('PAGE ACTIVE: %s', q.toSql())
				return q
			},
			opts.atomicSession
		)

		if (!foundList) {
			return new PagedData<User>()
		}
		const dtoList: User[] = this.toDomainModelMany(foundList.results, false)
		return new PagedData<User>(dtoList, foundList.total)
	}

	/**
	 * @override
	 */
	private _buildPageActiveQuery(query: QueryBuilder<UserORM>,
			opts: p.RepositoryPageOptions): p.QueryCallbackReturn {
		const q = super.$buildPageQuery(query, opts) as QueryBuilder<UserORM>
		q.where('status', UserStatus.ACTIVE)
		return q
	}

}
