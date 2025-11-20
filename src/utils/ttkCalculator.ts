import type { Shield } from '../data/shields';
import type { WeaponUpgrade } from '../data/weapons';

const PLAYER_HP = 100;

/**
 * Calculate health damage from a shot considering shield mitigation
 * @param damage - Base damage of the shot
 * @param shield - Shield type (null if no shield)
 * @returns Health damage after shield mitigation
 */
function calculateHealthDamage(damage: number, shield: Shield | null): number {
  if (!shield) {
    return damage;
  }
  return damage * (1 - shield.damageMitigation);
}

/**
 * Calculate shots needed to kill health after shield is broken
 * @param healthDamage - Health damage per shot
 * @param remainingHP - Remaining HP after shield breaks
 * @returns Number of shots needed
 */
function calculateShotsToKillHealth(
  healthDamage: number,
  remainingHP: number
): number {
  if (healthDamage <= 0) {
    return Infinity;
  }
  return Math.ceil(remainingHP / healthDamage);
}

/**
 * Calculate total shots to kill a player with a shield
 * @param weaponUpgrade - Weapon upgrade stats
 * @param shield - Shield type (null for no shield)
 * @param isHeadshot - Whether shots are headshots
 * @returns Total shots needed to kill
 */
export function calculateShotsToKill(
  weaponUpgrade: WeaponUpgrade,
  shield: Shield | null,
  isHeadshot: boolean
): number {
  const baseDamage = weaponUpgrade.damage;
  const damageToHp = isHeadshot
    ? baseDamage * weaponUpgrade.headshotMultiplier
    : baseDamage;

  if (!shield) {
    // No shield: just calculate shots to kill 100 HP
    const healthDamage = damageToHp;
    return calculateShotsToKillHealth(healthDamage, PLAYER_HP);
  }

  // With shield: each shot damages both shield and health simultaneously
  // Shield takes full damage but without multiplier (up to remaining charge), health takes mitigated damage from FULL damage
  // Key: Even if shield has only 1 charge left, it still mitigates the full damage amount
  // Example: Shield 10, Damage 80 -> Shield takes 10, Health takes 80 * (1 - mitigation)
  const healthDamagePerShot = calculateHealthDamage(damageToHp, shield);

  let remainingShieldCharge = shield.charge;
  let remainingHP = PLAYER_HP;
  let shotsFired = 0;

  // Fire shots until either shield breaks or player dies
  while (remainingShieldCharge > 0 && remainingHP > 0 && shotsFired < 1000) {
    shotsFired++;

    // Shield takes full damage (up to remaining charge)
    remainingShieldCharge -= baseDamage;

    // Health ALWAYS takes mitigated damage from the FULL damage amount
    // Even if shield only has 1 charge left, it still mitigates the full 80 damage
    remainingHP -= healthDamagePerShot;

    // If player is dead, return shots fired
    if (remainingHP <= 0) {
      return shotsFired;
    }

    // If shield is broken, break out of loop
    if (remainingShieldCharge <= 0) {
      break;
    }
  }

  // If shield is broken but player is still alive, calculate remaining shots
  // These shots deal full damage (no mitigation since shield is broken)
  if (remainingHP > 0) {
    const additionalShots = calculateShotsToKillHealth(damageToHp, remainingHP);
    return shotsFired + additionalShots;
  }

  return shotsFired;
}

/**
 * Calculate number of magazines required to kill
 * @param shotsToKill - Total shots needed
 * @param magazineSize - Magazine size of the weapon
 * @returns Number of magazines (rounded up)
 */
export function calculateMagazinesRequired(
  shotsToKill: number,
  magazineSize: number
): number {
  if (magazineSize <= 0) {
    return Infinity;
  }
  return Math.ceil(shotsToKill / magazineSize);
}
