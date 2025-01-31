

export interface CreateUserDTO {
  username : string,
  fullname : string,
  password : string,
  email : string
}

export interface UserQueryParams {
  loginAfterCreate? : boolean
}