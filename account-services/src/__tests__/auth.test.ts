// primitives - get account

describe('Authentication Manager', () => {
  // Assume
  // Arrange
  // Act
  // Assert

  beforeEach(() => {

  })

  afterAll(() => {
    // delete all accounts
  })

  // Basics
  it('should create a new account with email and password', () => {
    // Assume - account does not exist
    // Arrange
    // Act
    // Assert - you can sign into the account
  });

  it('should create a new account with phone number and password', () => {
    // Assume - account does not exist
    // Arrange
    // Act
    // Assert - you can sign into the account with phone number and password
  });

  it('should delete an account', () => {
    // Arrange
    //  - create a new account
    //  - show you can sign into that account and get a user back
    // Act - delete the account
    // Assert - you can no longer sign into the account
  });

  it('should let a user sign in', () => {
    // Arrange - create random account
    // Act - sign in with the new account
    // Assert - you had a user returned
  });

  it('should allow for sign out', () => {
    // Arrange 
    // - create random account
    // - sign in
    // Act - sign out
    // Assert - a success message was returned
  });


  // Confirm Account - not sure how to test this, maybe just manually
  it('should send a confirmation email if email is used', () => {

  });

  it('should send a confirmation text if phone is used', () => { })

  it('should confirm the new account when the correct confirmation is received (email)', () => { })

  it('should confirm the new account when the correct confirmation is received (password)', () => { })


  // Account Services (update email/phone number, change password, forgot password)
  it('should update email', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT - change the email
    // ASSERT 
    // - you cannot sign in with the old email
    // - you can sign in with the new email
  })

  it('should update password', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT - change the password
    // ASSERT 
    // - you cannot sign in with the old password
    // - you can sign in with the new password
  })

  it('should send a forgot password email', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT - send a forgot password email
    // ASSERT
    // - you received an email
  })

  it('should send change password after a submitForgotPassword is received', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT
    // - send a forgot password email
    // - submit the confirmation code to forgotPasswordSubmit
    // ASSERT
    // - you cannot sign in with the old password
    // - you can sign in with the new password
  });
});
