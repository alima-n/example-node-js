const authGuard = (_, __, next) => {
  const token = localStorage.getItem('access_token')

  if (!token) {
    next({ name: 'login' })
  } else {
    next()
  }
}

export default authGuard
