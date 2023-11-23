export interface IUser {
	email: string
	first_name: string
	last_name: string
	token: string
	refresh_token: string
	role: string
}

export interface ICreateUser {
	email: string
	first_name: string
	last_name: string
	password: string
	confirm_password: string
}
