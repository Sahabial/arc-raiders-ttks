import { useState } from 'react';
import { Table, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { weapons } from '../data/weapons';
import { shields } from '../data/shields';
import type { WeaponUpgrade } from '../data/weapons';
import type { Shield } from '../data/shields';
import {
  calculateShotsToKill,
  calculateMagazinesRequired,
} from '../utils/ttkCalculator';
import ShotsBreakdownModal from './ShotsBreakdownModal';

// Shield icons from public assets
const lightShieldIcon = '/assets/shields/50px-Light_Shield.png.webp';
const mediumShieldIcon = '/assets/shields/50px-Medium_Shield.png.webp';
const heavyShieldIcon = '/assets/shields/50px-Heavy_Shield.png.webp';
const headshotIcon = '/assets/shields/headshot-icon.png';

interface TableRow {
  key: string;
  weaponName: string;
  upgradeLevel: number;
  damage: number;
  magazineSize: number;
  headshotMultiplier: number;
  weaponUpgrade: WeaponUpgrade;
  bodyShotsLight: number;
  headshotsLight: number;
  bodyShotsMedium: number;
  headshotsMedium: number;
  bodyShotsHeavy: number;
  headshotsHeavy: number;
  bodyMagsLight: number;
  headMagsLight: number;
  bodyMagsMedium: number;
  headMagsMedium: number;
  bodyMagsHeavy: number;
  headMagsHeavy: number;
}

interface ModalState {
  open: boolean;
  weaponName: string;
  upgradeLevel: number;
  weaponUpgrade: WeaponUpgrade | null;
  shield: Shield | null;
  isHeadshot: boolean;
}

const WeaponsTable = () => {
  const [weaponFilter, setWeaponFilter] = useState<string>('');

  const lightShield =
    shields.find(s => {
      return s.name === 'Light Shield';
    }) || null;
  const mediumShield =
    shields.find(s => {
      return s.name === 'Medium Shield';
    }) || null;
  const heavyShield =
    shields.find(s => {
      return s.name === 'Heavy Shield';
    }) || null;

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    weaponName: '',
    upgradeLevel: 1,
    weaponUpgrade: null,
    shield: null,
    isHeadshot: false,
  });

  const openModal = (
    weaponName: string,
    upgradeLevel: number,
    weaponUpgrade: WeaponUpgrade,
    shield: Shield | null,
    isHeadshot: boolean
  ) => {
    setModalState({
      open: true,
      weaponName,
      upgradeLevel,
      weaponUpgrade,
      shield,
      isHeadshot,
    });
  };

  const closeModal = () => {
    setModalState({
      open: false,
      weaponName: '',
      upgradeLevel: 1,
      weaponUpgrade: null,
      shield: null,
      isHeadshot: false,
    });
  };

  const tableData: TableRow[] = weapons.flatMap(weapon => {
    return weapon.upgrades.map(upgrade => {
      const bodyShotsLight = calculateShotsToKill(upgrade, lightShield, false);
      const headshotsLight = calculateShotsToKill(upgrade, lightShield, true);
      const bodyShotsMedium = calculateShotsToKill(
        upgrade,
        mediumShield,
        false
      );
      const headshotsMedium = calculateShotsToKill(upgrade, mediumShield, true);
      const bodyShotsHeavy = calculateShotsToKill(upgrade, heavyShield, false);
      const headshotsHeavy = calculateShotsToKill(upgrade, heavyShield, true);

      return {
        key: `${weapon.name}-${upgrade.level}`,
        weaponName: weapon.name,
        upgradeLevel: upgrade.level,
        damage: upgrade.damage,
        magazineSize: upgrade.magazineSize,
        headshotMultiplier: upgrade.headshotMultiplier,
        weaponUpgrade: upgrade,
        bodyShotsLight,
        headshotsLight,
        bodyShotsMedium,
        headshotsMedium,
        bodyShotsHeavy,
        headshotsHeavy,
        bodyMagsLight: calculateMagazinesRequired(
          bodyShotsLight,
          upgrade.magazineSize
        ),
        headMagsLight: calculateMagazinesRequired(
          headshotsLight,
          upgrade.magazineSize
        ),
        bodyMagsMedium: calculateMagazinesRequired(
          bodyShotsMedium,
          upgrade.magazineSize
        ),
        headMagsMedium: calculateMagazinesRequired(
          headshotsMedium,
          upgrade.magazineSize
        ),
        bodyMagsHeavy: calculateMagazinesRequired(
          bodyShotsHeavy,
          upgrade.magazineSize
        ),
        headMagsHeavy: calculateMagazinesRequired(
          headshotsHeavy,
          upgrade.magazineSize
        ),
      };
    });
  });

  const renderHeader = (
    title: string,
    bgColor: string,
    icons?: string | string[]
  ) => {
    const iconArray = icons
      ? Array.isArray(icons)
        ? icons
        : [icons]
      : [];
    return (
      <div
        style={{
          backgroundColor: bgColor,
          padding: '8px',
          margin: '-8px -8px 0 -8px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          justifyContent: 'center',
        }}
      >
        {iconArray.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt=""
            style={{
              width: '20px',
              height: '20px',
              objectFit: 'contain',
            }}
          />
        ))}
        {title && <span>{title}</span>}
      </div>
    );
  };

  const getColumnStyle = (bgColor: string) => {
    return {
      backgroundColor: bgColor,
    };
  };

  // Helper function to determine if shield tier is upgrade or downgrade
  const getShieldTierStatus = (
    currentShots: number,
    lowerTierShots: number | null
  ): 'upgrade' | 'downgrade' | null => {
    if (
      currentShots === Infinity ||
      lowerTierShots === null ||
      lowerTierShots === Infinity
    ) {
      return null;
    }
    // Round both values for comparison
    const currentRounded = Math.round(currentShots);
    const lowerRounded = Math.round(lowerTierShots);
    
    // More shots = upgrade (better shield)
    if (currentRounded > lowerRounded) {
      return 'upgrade';
    }
    // Same shots = downgrade (worse shield, same protection as lower tier)
    if (currentRounded === lowerRounded) {
      return 'downgrade';
    }
    return null;
  };

  // Helper to get cell style with highlighting
  const getCellStyle = (
    bgColor: string,
    currentShots: number,
    lowerTierShots: number | null
  ) => {
    const baseStyle = getColumnStyle(bgColor);
    const status = getShieldTierStatus(currentShots, lowerTierShots);
    if (status === 'upgrade') {
      return {
        ...baseStyle,
        backgroundColor: '#aeebf2',
      };
    }
    if (status === 'downgrade') {
      return {
        ...baseStyle,
        backgroundColor: '#ffccc7',
      };
    }
    return baseStyle;
  };

  // Helper to get arrow indicator
  const getArrowIndicator = (
    currentShots: number,
    lowerTierShots: number | null
  ): string => {
    const status = getShieldTierStatus(currentShots, lowerTierShots);
    if (status === 'upgrade') {
      return ' ↑';
    }
    if (status === 'downgrade') {
      return ' ↓';
    }
    return '';
  };

  const columns: ColumnsType<TableRow> = [
    {
      title: renderHeader('Weapon', '#e6f7ff'),
      dataIndex: 'weaponName',
      key: 'weaponName',
      fixed: 'left',
      onCell: () => {
        return { style: getColumnStyle('#e6f7ff') };
      },
    },
    {
      title: renderHeader('Lvl', '#e6f7ff'),
      dataIndex: 'upgradeLevel',
      key: 'upgradeLevel',
      render: (level: number) => {
        return level;
      },
      onCell: () => {
        return { style: getColumnStyle('#e6f7ff') };
      },
    },
    {
      title: renderHeader('DMG', '#e6f7ff'),
      dataIndex: 'damage',
      key: 'damage',
      render: (damage: number) => {
        return damage.toFixed(1);
      },
      onCell: () => {
        return { style: getColumnStyle('#e6f7ff') };
      },
    },
    {
      title: renderHeader('Mag', '#e6f7ff'),
      dataIndex: 'magazineSize',
      key: 'magazineSize',
      onCell: () => {
        return { style: getColumnStyle('#e6f7ff') };
      },
    },
    {
      title: renderHeader('', '#e6f7ff', headshotIcon),
      dataIndex: 'headshotMultiplier',
      key: 'headshotMultiplier',
      render: (mult: number) => {
        return `${mult}x`;
      },
      onCell: () => {
        return { style: getColumnStyle('#e6f7ff') };
      },
    },
    // Body shots columns (grouped together)
    {
      title: renderHeader('BS', '#fff7e6', lightShieldIcon),
      dataIndex: 'bodyShotsLight',
      key: 'bodyShotsLight',
      onCell: () => {
        return { style: getColumnStyle('#fff7e6') };
      },
      render: (shots: number, record: TableRow) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                lightShield,
                false
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
          </span>
        );
      },
    },
    {
      title: renderHeader('BS', '#fff7e6', mediumShieldIcon),
      dataIndex: 'bodyShotsMedium',
      key: 'bodyShotsMedium',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff7e6',
            record.bodyShotsMedium,
            record.bodyShotsLight !== Infinity ? record.bodyShotsLight : null
          ),
        };
      },
      render: (shots: number, record: TableRow) => {
        const arrow = getArrowIndicator(
          record.bodyShotsMedium,
          record.bodyShotsLight !== Infinity ? record.bodyShotsLight : null
        );
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                mediumShield,
                false
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
            {arrow}
          </span>
        );
      },
    },
    {
      title: renderHeader('BS', '#fff7e6', heavyShieldIcon),
      dataIndex: 'bodyShotsHeavy',
      key: 'bodyShotsHeavy',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff7e6',
            record.bodyShotsHeavy,
            record.bodyShotsMedium !== Infinity ? record.bodyShotsMedium : null
          ),
        };
      },
      render: (shots: number, record: TableRow) => {
        const arrow = getArrowIndicator(
          record.bodyShotsHeavy,
          record.bodyShotsMedium !== Infinity ? record.bodyShotsMedium : null
        );
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                heavyShield,
                false
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
            {arrow}
          </span>
        );
      },
    },
    // Headshot columns (grouped together)
    {
      title: renderHeader('', '#f6ffed', [headshotIcon, lightShieldIcon]),
      dataIndex: 'headshotsLight',
      key: 'headshotsLight',
      onCell: () => {
        return { style: getColumnStyle('#f6ffed') };
      },
      render: (shots: number, record: TableRow) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                lightShield,
                true
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
          </span>
        );
      },
    },
    {
      title: renderHeader('', '#f6ffed', [headshotIcon, mediumShieldIcon]),
      dataIndex: 'headshotsMedium',
      key: 'headshotsMedium',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f6ffed',
            record.headshotsMedium,
            record.headshotsLight !== Infinity ? record.headshotsLight : null
          ),
        };
      },
      render: (shots: number, record: TableRow) => {
        const arrow = getArrowIndicator(
          record.headshotsMedium,
          record.headshotsLight !== Infinity ? record.headshotsLight : null
        );
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                mediumShield,
                true
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
            {arrow}
          </span>
        );
      },
    },
    {
      title: renderHeader('', '#f6ffed', [headshotIcon, heavyShieldIcon]),
      dataIndex: 'headshotsHeavy',
      key: 'headshotsHeavy',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f6ffed',
            record.headshotsHeavy,
            record.headshotsMedium !== Infinity ? record.headshotsMedium : null
          ),
        };
      },
      render: (shots: number, record: TableRow) => {
        const arrow = getArrowIndicator(
          record.headshotsHeavy,
          record.headshotsMedium !== Infinity ? record.headshotsMedium : null
        );
        return (
          <span
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => {
              openModal(
                record.weaponName,
                record.upgradeLevel,
                record.weaponUpgrade,
                heavyShield,
                true
              );
            }}
          >
            {shots === Infinity ? '∞' : Math.round(shots)}
            {arrow}
          </span>
        );
      },
    },
    // Body mags columns (grouped together)
    {
      title: renderHeader('BS Mags', '#fff1f0', lightShieldIcon),
      dataIndex: 'bodyMagsLight',
      key: 'bodyMagsLight',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: () => {
        return { style: getColumnStyle('#fff1f0') };
      },
    },
    {
      title: renderHeader('BS Mags', '#fff1f0', mediumShieldIcon),
      dataIndex: 'bodyMagsMedium',
      key: 'bodyMagsMedium',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff1f0',
            record.bodyMagsMedium,
            record.bodyMagsLight !== Infinity ? record.bodyMagsLight : null
          ),
        };
      },
    },
    {
      title: renderHeader('BS Mags', '#fff1f0', heavyShieldIcon),
      dataIndex: 'bodyMagsHeavy',
      key: 'bodyMagsHeavy',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff1f0',
            record.bodyMagsHeavy,
            record.bodyMagsMedium !== Infinity ? record.bodyMagsMedium : null
          ),
        };
      },
    },
    // Headshot mags columns (grouped together)
    {
      title: renderHeader('Mags', '#f0f5ff', [headshotIcon, lightShieldIcon]),
      dataIndex: 'headMagsLight',
      key: 'headMagsLight',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: () => {
        return { style: getColumnStyle('#f0f5ff') };
      },
    },
    {
      title: renderHeader('Mags', '#f0f5ff', [headshotIcon, mediumShieldIcon]),
      dataIndex: 'headMagsMedium',
      key: 'headMagsMedium',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f0f5ff',
            record.headMagsMedium,
            record.headMagsLight !== Infinity ? record.headMagsLight : null
          ),
        };
      },
    },
    {
      title: renderHeader('Mags', '#f0f5ff', [headshotIcon, heavyShieldIcon]),
      dataIndex: 'headMagsHeavy',
      key: 'headMagsHeavy',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f0f5ff',
            record.headMagsHeavy,
            record.headMagsMedium !== Infinity ? record.headMagsMedium : null
          ),
        };
      },
    },
  ];

  const filteredTableData = tableData.filter(row => {
    return row.weaponName.toLowerCase().includes(weaponFilter.toLowerCase());
  });

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Filter by weapon name..."
          value={weaponFilter}
          onChange={e => {
            setWeaponFilter(e.target.value);
          }}
          allowClear
          style={{ maxWidth: '300px' }}
        />
      </div>
      <Table
        dataSource={filteredTableData}
        columns={columns}
        rowKey="key"
        pagination={false}
        scroll={{ x: 'max-content', y: 'calc(100vh - 250px)' }}
        sticky={{ offsetHeader: 64 }}
        onRow={() => {
          return {
            style: {
              cursor: 'default',
            },
            onMouseEnter: (e: React.MouseEvent<HTMLTableRowElement>) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            },
            onMouseLeave: (e: React.MouseEvent<HTMLTableRowElement>) => {
              e.currentTarget.style.backgroundColor = '';
            },
          };
        }}
      />
      {modalState.weaponUpgrade && (
        <ShotsBreakdownModal
          open={modalState.open}
          onClose={closeModal}
          weaponName={modalState.weaponName}
          upgradeLevel={modalState.upgradeLevel}
          weaponUpgrade={modalState.weaponUpgrade}
          shield={modalState.shield}
          isHeadshot={modalState.isHeadshot}
        />
      )}
    </>
  );
};

export default WeaponsTable;
