import { Modal, Progress } from 'antd';
import type { WeaponUpgrade } from '../../data/weapons';
import type { Shield } from '../../data/shields';

interface ShotBreakdownModalProps {
  open: boolean;
  onClose: () => void;
  weaponName: string;
  upgradeLevel: number;
  weaponUpgrade: WeaponUpgrade;
  shield: Shield | null;
  isHeadshot: boolean;
}

interface ShotData {
  shotNumber: number;
  shieldBefore: number;
  shieldAfter: number;
  shieldDiff: number;
  hpBefore: number;
  hpAfter: number;
  hpDiff: number;
}

const PLAYER_HP = 100;

function calculateShotBreakdown(
  weaponUpgrade: WeaponUpgrade,
  shield: Shield | null,
  isHeadshot: boolean
): ShotData[] {
  const baseDamage = weaponUpgrade.damage;
  const damageToHp = isHeadshot
    ? baseDamage * weaponUpgrade.headshotMultiplier
    : baseDamage;

  const breakdown: ShotData[] = [];

  if (!shield) {
    // No shield: simple HP reduction
    // Add initial state (before any shots)
    breakdown.push({
      shotNumber: 0,
      shieldBefore: 0,
      shieldAfter: 0,
      hpBefore: PLAYER_HP,
      hpAfter: PLAYER_HP,
      shieldDiff: 0,
      hpDiff: 0,
    });

    let remainingHP = PLAYER_HP;
    let shotNumber = 1;

    while (remainingHP > 0 && shotNumber < 100) {
      const hpBefore = remainingHP;
      remainingHP = Math.max(0, remainingHP - damageToHp);
      const hpAfter = remainingHP;

      breakdown.push({
        shotNumber,
        shieldBefore: 0,
        shieldAfter: 0,
        hpBefore,
        hpAfter,
        shieldDiff: 0,
        hpDiff: hpAfter - hpBefore,
      });

      if (hpAfter <= 0) {
        break;
      }
      shotNumber++;
    }
  } else {
    // With shield: calculate shot by shot
    // Add initial state (before any shots)
    breakdown.push({
      shotNumber: 0,
      shieldBefore: shield.charge,
      shieldAfter: shield.charge,
      hpBefore: PLAYER_HP,
      hpAfter: PLAYER_HP,
      shieldDiff: 0,
      hpDiff: 0,
    });

    let remainingShieldCharge = shield.charge;
    let remainingHP = PLAYER_HP;
    let shotNumber = 1;
    const healthDamagePerShot = damageToHp * (1 - shield.damageMitigation);

    // First phase: shots while shield is activeF
    while (remainingShieldCharge > 0 && remainingHP > 0 && shotNumber < 100) {
      const shieldBefore = Math.max(0, remainingShieldCharge);
      const hpBefore = remainingHP;

      // Shield takes full damage
      remainingShieldCharge -= baseDamage;
      // Health takes mitigated damage
      remainingHP = Math.max(0, remainingHP - healthDamagePerShot);

      const shieldAfter = Math.max(0, remainingShieldCharge);
      const hpAfter = remainingHP;

      breakdown.push({
        shotNumber,
        shieldBefore,
        shieldAfter,
        hpBefore,
        hpAfter,
        shieldDiff: shieldAfter - shieldBefore,
        hpDiff: hpAfter - hpBefore,
      });

      if (hpAfter <= 0) {
        break;
      }
      if (remainingShieldCharge <= 0) {
        break;
      }
      shotNumber++;
    }

    // Second phase: shots after shield is broken (full damage to health)
    while (remainingHP > 0 && shotNumber < 100) {
      const hpBefore = remainingHP;
      remainingHP = Math.max(0, remainingHP - damageToHp);
      const hpAfter = remainingHP;

      breakdown.push({
        shotNumber,
        shieldBefore: 0,
        shieldAfter: 0,
        hpBefore,
        hpAfter,
        shieldDiff: 0,
        hpDiff: hpAfter - hpBefore,
      });

      if (hpAfter <= 0) {
        break;
      }
      shotNumber++;
    }
  }

  return breakdown;
}

const ShotBreakdownModal = ({
  open,
  onClose,
  weaponName,
  upgradeLevel,
  weaponUpgrade,
  shield,
  isHeadshot,
}: ShotBreakdownModalProps) => {
  const breakdown = calculateShotBreakdown(weaponUpgrade, shield, isHeadshot);

  const maxShield = shield?.charge || 0;
  const maxHP = PLAYER_HP;
  const shieldSteps = maxShield > 0 ? maxShield / 10 : 0;
  const hpSteps = maxHP / 10;
  const progressBarWidth = 200; // Fixed width for both progress bars

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={`${weaponName} Level ${upgradeLevel} - ${isHeadshot ? 'HS' : 'BS'} ${shield ? `(${shield.name})` : '(No Shield)'}`}
      width={600}
      maskClosable
    >
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {breakdown.map(shot => {
          return (
            <div
              key={shot.shotNumber}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                padding: '12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
              }}
            >
              <div style={{ minWidth: '60px', marginRight: '16px' }}>
                <strong>
                  {shot.shotNumber === 0 ? '1.' : `${shot.shotNumber + 1}.`}
                </strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ minWidth: '120px', marginRight: '16px' }}>
                  {shot.shieldAfter.toFixed(1)} / {shot.hpAfter.toFixed(1)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: `${progressBarWidth}px`,
                  }}
                >
                  <div
                    style={{
                      width: `${progressBarWidth}px`,
                    }}
                  >
                    <Progress
                      percent={
                        maxShield > 0 ? (shot.shieldAfter / maxShield) * 100 : 0
                      }
                      strokeColor="#87ceeb"
                      showInfo={false}
                      steps={shieldSteps}
                      style={{
                        width: `${progressBarWidth}px`,
                      }}
                      className="fixed-width-progress"
                    />
                  </div>
                  <div>
                    <Progress
                      percent={(shot.hpAfter / maxHP) * 100}
                      strokeColor="#52c41a"
                      showInfo={false}
                      steps={hpSteps}
                      style={{
                        width: `${progressBarWidth}px`,
                      }}
                      className="fixed-width-progress"
                    />
                  </div>
                </div>
              </div>
              <div style={{ minWidth: '120px', marginLeft: '16px' }}>
                {shot.shieldDiff.toFixed(1)} / {shot.hpDiff.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ShotBreakdownModal;
