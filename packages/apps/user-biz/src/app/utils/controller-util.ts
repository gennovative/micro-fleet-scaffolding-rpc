import { decorators as d } from '@micro-fleet/service-communication'

export function trustPayload(ItemClass?: any): any {
	return d.payload({
		ItemClass,
		enableValidation: false,
	})
}
