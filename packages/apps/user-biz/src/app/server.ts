import { registerCacheAddOn } from '@micro-fleet/cache'
import { registerIdAddOn } from '@micro-fleet/id-generator'
import { MicroServiceBase } from '@micro-fleet/microservice'
import { registerDbAddOn } from '@micro-fleet/persistence'
import { registerDirectHandlerAddOn, registerMediateHandlerAddOn,
	registerMessageBrokerAddOn } from '@micro-fleet/service-communication'

import { Types as T } from './constants/Types'
import { IUserService } from './contracts/interfaces/IUserService'
import { UserService } from './services/UserService'
import { IUserRepository, UserRepository } from './repositories/UserRepository'


class App extends MicroServiceBase {

	/**
	 * @override
	 */
	public $registerDependencies(): void {
		super.$registerDependencies()

		const dc = this._depContainer
		dc.bind<IUserRepository>(T.USER_REPO, UserRepository).asSingleton()
		dc.bind<IUserService>(T.USER_SVC, UserService).asSingleton()
	}

	/**
	 * @override
	 */
	public $onStarting(): void {
		super.$onStarting()

		this.attachAddOn(registerCacheAddOn())
		this.attachAddOn(registerDbAddOn())
		this.attachAddOn(registerIdAddOn())

		this.attachAddOn(registerMessageBrokerAddOn())

		// If no error handler is registered to RPC handler
		// Uncaught errors will be thrown as normal exceptions.
		const serviceOnError = this.$onError.bind(this)
		let rpcHandler: any = registerMediateHandlerAddOn()
		rpcHandler.onError(serviceOnError)
		this.attachAddOn(rpcHandler)

		rpcHandler = registerDirectHandlerAddOn()
		rpcHandler.onError(serviceOnError)
		this.attachAddOn(rpcHandler)
	}
}

new App().start().catch(console.error)
