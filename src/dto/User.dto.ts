

export interface CreateUserDTO {
  username : string,
  fullname : string,
  password : string,
  email : string,
  isAdmin? : boolean | null
}

export interface UserQueryParams {
  loginAfterCreate? : boolean
}