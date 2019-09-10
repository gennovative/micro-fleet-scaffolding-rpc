import { constants } from '@micro-fleet/common'

const {
	Cache: C,
	Service: S,
	MessageBroker: M,
	Web: W,
} = constants

export = {
	[S.SERVICE_SLUG]: 'rpc-userrest-service',
	[C.CACHE_NUM_CONN]: 0,
	[C.CACHE_HOST]: 'localhost',
	[M.MSG_BROKER_HOST]: 'localhost',
	[M.MSG_BROKER_USERNAME]: 'guest',
	[M.MSG_BROKER_PASSWORD]: 'guest',
	[M.MSG_BROKER_EXCHANGE]: 'amq.topic',
	[W.WEB_PORT]: 3000,
	[W.WEB_URL_PREFIX]: '/api/v1',
	[W.WEB_CORS]: '*',
}
