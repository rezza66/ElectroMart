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
    can('read', 'address');  
    can('create', 'address');
    can('read', 'order');
    can('create', 'order');
  }

  return new Ability(rules);
};
