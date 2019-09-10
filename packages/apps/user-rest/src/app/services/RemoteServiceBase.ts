import { decorators as d } from '@micro-fleet/common'

import { IRpcCaller, RpcResponse } from '@micro-fleet/service-communication'


interface IHasFrom {
	from(source: any): any
}

/**
 * Provides base methods to make remote service calls.
 */
@d.injectable()
export class RemoteServiceBase {

	constructor(
		@d.unmanaged() protected readonly $MODULE_NAME: string,
		@d.unmanaged() protected readonly $rpcCaller: IRpcCaller,
	) {}


	protected async $call(action: string, request: any, ResponseClass: IHasFrom): Promise<any> {
		const rpcRes: RpcResponse = await this.$rpcCaller.call({
			moduleName: this.$MODULE_NAME,
			actionName: action,
			params: request,
		})
		if (rpcRes.isSuccess) {
			return ResponseClass.from(rpcRes.payload)
		}
		return Promise.reject(rpcRes.payload)
	}
}
