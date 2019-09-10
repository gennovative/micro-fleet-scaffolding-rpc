
// Do not use "SortType" in @micro-fleet/persistence because
// this file is copy to REST service which doesn't depends on @micro-fleet/persistence.
export enum SortType {
	ASC = 'asc',
	DESC = 'desc',
}

export enum UserStatus { ACTIVE = 'active', LOCKED = 'locked', DELETED = 'deleted' }
