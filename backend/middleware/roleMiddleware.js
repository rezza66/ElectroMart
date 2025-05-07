import { defineAbilitiesFor } from '../configs/casl.js';

const authorize = (action, subject) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const ability = defineAbilitiesFor(req.user);

    // Jika user bukan admin dan mencoba getUsers atau deleteUser, tolak akses
    if (action === 'read' && subject === 'user' && req.path === '/users') {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admin can see all users' });
      }
    }

    if (action === 'delete' && subject === 'user') {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admin can delete users' });
      }
    }

    // Jika user ingin read/update dirinya sendiri, cek berdasarkan id
    if ((action === 'read' || action === 'update') && subject === 'user') {
      if (req.params.id && req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'Forbidden: You can only manage your own account' });
      }
    }

    if (ability.can(action, subject)) {
      return next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};

export default authorize;


