enum AuthError {
  emailAlreadyExists = 'EmailAlreadyExists',
  passwordNotAllowed = 'PasswordNotAllowed',
  passwordTooShort = 'PasswordTooShort',
  passwordUpperCaseMissing = 'PasswordMissingUpperCaseLetters',
  passwordLowerCaseMissing = 'PasswordMissingLowerCaseLetters',
  passwordSepcialCharacterMissing = 'PasswordMissingSpecialCharacters',
  passwordNumericMissing = 'PasswordNumericCharacterMissing',
  usernameInvalid = 'UsernameInvalid',
  unknownError = 'UnknownError',
  userIsNotConfirmed = 'UserIsNotConfirmed',
  incorrectUsernameOrPassword = 'IncorrectUsernameOrPassword',
  userDoesNotExist = 'UserDoesNotExist',
  notAuthneticated = 'NotAuthenticated',
  usernameCannotBeEmpty = "UsernameCannotBeEmpty",
  userdisabled = "UserIsDisabled",
  userIsAlreadyConfirmed = "UserAlreadyConfirmed",
  invalidVerificationCode = "InvalidVerficationCode",
  invalidAccessToken = "AccessTokenInvalid",
  accessTokenRevoked = "AccessTokenHasBeenRevoked",
  attempLimitexceeded = "AttemptLimitExceeded"
}

export default AuthError;
