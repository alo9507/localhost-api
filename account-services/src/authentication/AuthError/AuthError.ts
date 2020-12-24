enum AuthError {
  userNotFound = 'UserNotFound',
  emailAlreadyExists = 'EmailAlreadyExists',
  PasswordNotAllowed = 'PasswordNotAllowed',
  passwordTooShort = 'PasswordTooShort',
  usernameInvalid = 'UsernameInvalid',
  unknownError = 'UnknownError',
  userIsNotConfirmed = 'UserIsNotConfirmed',
  incorrectUsernameOrPassword = 'IncorrectUsernameOrPassword',
  userDoesNotExist = 'UserDoesNotExist',
  notAuthneticated = 'NotAuthenticated',
  usernameCannotBeEmpty = "UsernameCannotBeEmpty"
}

export default AuthError;
