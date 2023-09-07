/**
 * Authorization Roles
 */
// const authRoles = {
//   admin: ['admin'],
//   staff: ['admin', 'staff'],
//   user: ['admin', 'staff', 'user'],
//   onlyGuest: [],
// };

// export default authRoles;





/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  // staff: ['admin', 'staff'],
  user: [
    'admin',
    'user'
  ],
  onlyGuest: [],
};

export default authRoles;
