{isAuthenticated ? (
    <LogoutModal/>
  ) : (
    <>
      <Link to="/login" className="btn btn-outline-primary me-2">
        Login
      </Link>
      {!isSignedUp && (
        <Link to="/signUp" className="btn btn-primary"> {/* if the user is not signed up then only show the sign up button */}
          Sign Up
        </Link>
      )}
    </>
  )}