import * as dto from '../dto/user'

/**
 * Provides methods for common CRUD operations
 */
export interface IUserService {
	/**
	 * Creates new user
	 */
	create(params: dto.CreateUserRequest): Promise<dto.CreateUserResponse>

	/**
	 * Modifies some properties of a user
	 */
	edit(params: dto.EditUserRequest): Promise<dto.EditUserResponse>

	/**
	 * Gets a user's details
	 */
	getById(params: dto.GetUserByIdRequest): Promise<dto.GetSingleUserResponse>

	/**
	 * Gets a paged list of users
	 */
	getList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse>

	/**
	 * Gets a paged list of active users
	 */
	getActiveList(params: dto.GetUserListRequest): Promise<dto.GetUserListResponse>

	/**
	 * Permanently deletes a user and optionally its associated users.
	 */
	hardDeleteSingle(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse>

	/**
	 * Permanently deletes many users and optionally their associated users.
	 */
	hardDeleteMany(params: dto.DeleteUserRequest): Promise<dto.DeleteUserResponse>
}
