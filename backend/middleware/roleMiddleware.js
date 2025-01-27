import { defineAbilitiesFor } from '../configs/casl.js';

const authorize = (action, subject) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const ability = defineAbilitiesFor(req.user);

    if (subject === 'order' && action === 'read' && req.user.role === 'admin') {
      return next();
    }

    if (subject === 'order' && action === 'read' && req.params.userId) {
      if (req.user.id !== req.params.userId) {
        return res.status(403).json({ message: 'Forbidden' });
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
