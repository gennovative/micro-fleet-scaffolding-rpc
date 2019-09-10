import { PagedData, Maybe, ITranslatable, SingleId,
	decorators as d } from '@micro-fleet/common'
import { IRepository, AtomicSessionFactory, AtomicSession } from '@micro-fleet/persistence'

import { ResultResponseConstructor, MaybeResponseConstructor, ListResponseConstructor,
	IAtomicRequest, IMultiIds } from '../contracts/dto/dto-base'
import { momentify } from '../utils/date-utils'


/**
 * Provides methods for common CRUD operations
 */
@d.injectable()
export class ManagementServiceBase<TDomain extends object> {

	constructor(
		@d.unmanaged() protected readonly $DomainClass: ITranslatable,
		@d.unmanaged() protected readonly $repo: IRepository<TDomain>,
		@d.unmanaged() protected readonly $sessionFactory: AtomicSessionFactory,
	) {}


	//#region Create

	protected async $create<T extends InstanceType<ResultResponseConstructor>>(params: any,
			ResponseClass: ResultResponseConstructor): Promise<T> {
		const violation = await this.$checkCreateViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}
		const newDomainModel = this.$DomainClass.from(params)
		const createdDomainModel = await this.$repo.create(newDomainModel)
		const result = ResponseClass.from(createdDomainModel)
		return result
	}

	/**
	 * Can be overriden by derived class to check business rule for creating.
	 */
	protected $checkCreateViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Create


	//#region Delete

	protected async $hardDeleteSingle<T extends InstanceType<ResultResponseConstructor>>(
		params: IMultiIds,
		ResponseClass: ResultResponseConstructor,
	): Promise<T> {
		const violation = await this.$checkDeleteSingleViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}

		const id = new SingleId(params.ids[0])
		const affectedCount: number = await this.$repo.deleteSingle(id)
		if (affectedCount) {
			const result = ResponseClass.from({
				deletedAt: momentify().format(),
			})
			return result
		}
		return new ResponseClass(false) as T
	}

	/**
	 * Can be overriden by derived class to check business rule for deleting.
	 */
	protected $checkDeleteSingleViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}


	protected async $hardDeleteMany<T extends InstanceType<ResultResponseConstructor>>(
		params: IAtomicRequest & IMultiIds,
		ResponseClass: ResultResponseConstructor,
	): Promise<T> {
		const violation = await this.$checkDeleteManyViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as T
		}

		const ids = params.ids.map(id => new SingleId(id))
		let task: Promise<number>
		if (params.isAtomic) {
			task = this.$sessionFactory.startSession()
				.pipe((atomicSession: AtomicSession) => {
					return this.$repo.deleteMany(ids, { atomicSession })
				})
				.closePipe()
		}
		else {
			task = this.$repo.deleteMany(ids)
		}
		const affectedCount: number = await task
		if (affectedCount) {
			const result = ResponseClass.from({
				deletedAt: momentify().format(),
			})
			return result
		}
		return new ResponseClass(false) as T
	}

	/**
	 * Can be overriden by derived class to check business rule for deleting.
	 */
	protected $checkDeleteManyViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Delete


	//#region Edit

	protected async $edit<CT extends InstanceType<ResultResponseConstructor>>(params: any,
			ResponseClass: ResultResponseConstructor): Promise<CT> {
		const violation = await this.$checkEditViolation(params)
		if (violation.isJust) {
			return new ResponseClass(false, violation.value) as CT
		}

		const partialDomainModel = this.$DomainClass.from(params)
		const maybe = await this.$repo.patch(partialDomainModel)
		if (maybe.isJust) {
			const result = ResponseClass.from(maybe.value)
			return result
		}
		return new ResponseClass(false) as CT
	}

	/**
	 * Can be overriden by derived class to check business rule for editing.
	 */
	protected $checkEditViolation(params: any): Promise<Maybe> {
		return Promise.resolve(Maybe.Nothing())
	}

	//#endregion Edit


	//#region Get

	protected async $getById<CT extends InstanceType<MaybeResponseConstructor>>(
		params: any,
		ResponseClass: MaybeResponseConstructor,
	): Promise<CT> {
		// type SpreadParam = {id: string, tenantId?: string} & RepositoryFindOptions
		// const { id, tenantId, ...opts }: SpreadParam = params

		const id = new SingleId(params.id)
		const maybe = await this.$repo.findById(id, params)
		if (maybe.isJust) {
			const result = ResponseClass.from(maybe.value)
			return result
		}
		return new ResponseClass(false) as CT
	}

	protected async $getList<CT extends InstanceType<ListResponseConstructor>>(params: any,
			ResponseClass: ListResponseConstructor): Promise<CT> {
		const fetchedDomainModels: PagedData<TDomain> = await this.$repo.page(params)

		if (fetchedDomainModels.length) {
			const result = ResponseClass.from(fetchedDomainModels)
			return result
		}
		return new ResponseClass() as CT
	}

	//#endregion Get

	/**
	 * Converts string array to Objection's relation expression
	 * @example
	 *
	 * Input: ['tenant', 'category']
	 * Output: {
	 *   tenant: true,
	 *   category: true,
	 * }
	 */
	protected objectifyRelations(relations: string[]): object {
		if (!relations) { return null }
		return relations.reduce((prev, cur) => {
			prev[cur] = true
			return prev
		}, {})
	}
}
