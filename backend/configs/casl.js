import { Ability, AbilityBuilder } from '@casl/ability';

export const defineAbilitiesFor = (user) => {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else {
    can('read', 'product');  
    can('read', 'category'); 
    can('create', 'cart');   
    can('read', 'cart');   
    can('update', 'cart');   
    can('delete', 'cart');   
    can('read', 'address');  
    can('create', 'address');
    can('read', 'order');
    can('create', 'order', {userId: user.id});
    can('read', 'user', { id: user.id });
    can('update', 'user', { id: user.id });
    cannot('read', 'user').because('Only admin can see all users');
    cannot('delete', 'user').because('Only admin can delete users');
  }

  return new Ability(rules);
};
