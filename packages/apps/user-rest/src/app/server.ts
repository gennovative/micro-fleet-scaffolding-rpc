import { registerCacheAddOn } from '@micro-fleet/cache'
import { MicroServiceBase } from '@micro-fleet/microservice'
import { registerMessageBrokerAddOn, registerMediateCaller } from '@micro-fleet/service-communication'
import { registerWebAddOn } from '@micro-fleet/web'

import { Types as T } from './constants/Types'
import { IUserService } from './contracts/interfaces/IUserService'
import { RemoteUserService } from './services/RemoteUserService'


class App extends MicroServiceBase {

	/**
	 * @override
	 */
	public $registerDependencies(): void {
		super.$registerDependencies()

		const dc = this._depContainer
		dc.bind<IUserService>(T.USER_SVC, RemoteUserService).asSingleton()
	}

	/**
	 * @override
	 */
	public $onStarting(): void {
		super.$onStarting()

		this.attachAddOn(registerCacheAddOn())
		this.attachAddOn(registerWebAddOn())

		this.attachAddOn(registerMessageBrokerAddOn())
		registerMediateCaller()
	}
}

new App().start().catch(console.error)
