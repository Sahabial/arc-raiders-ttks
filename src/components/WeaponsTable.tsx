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

interface TableRow {
  key: string;
  weaponName: string;
  upgradeLevel: number;
  damage: number;
  magazineSize: number;
  headshotMultiplier: number;
  weaponUpgrade: WeaponUpgrade;
  bodyShotsNoShield: number;
  headshotsNoShield: number;
  bodyShotsLight: number;
  headshotsLight: number;
  bodyShotsMedium: number;
  headshotsMedium: number;
  bodyShotsHeavy: number;
  headshotsHeavy: number;
  bodyMagsNoShield: number;
  headMagsNoShield: number;
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
      const bodyShotsNoShield = calculateShotsToKill(upgrade, null, false);
      const headshotsNoShield = calculateShotsToKill(upgrade, null, true);
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
        bodyShotsNoShield,
        headshotsNoShield,
        bodyShotsLight,
        headshotsLight,
        bodyShotsMedium,
        headshotsMedium,
        bodyShotsHeavy,
        headshotsHeavy,
        bodyMagsNoShield: calculateMagazinesRequired(
          bodyShotsNoShield,
          upgrade.magazineSize
        ),
        headMagsNoShield: calculateMagazinesRequired(
          headshotsNoShield,
          upgrade.magazineSize
        ),
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

  const renderHeader = (title: string, bgColor: string) => {
    return (
      <div
        style={{
          backgroundColor: bgColor,
          padding: '8px',
          margin: '-8px -8px 0 -8px',
          fontWeight: 600,
        }}
      >
        {title}
      </div>
    );
  };

  const getColumnStyle = (bgColor: string) => {
    return {
      backgroundColor: bgColor,
    };
  };

  // Helper function to check if a higher tier shield requires more shots to kill
  const shouldHighlightCell = (
    currentShots: number,
    lowerTierShots: number | null
  ): boolean => {
    if (
      currentShots === Infinity ||
      lowerTierShots === null ||
      lowerTierShots === Infinity
    ) {
      return false;
    }
    // Higher tier shield requires MORE shots than lower tier (with tolerance for floating point)
    // Only highlight if there's a meaningful difference (> 0.01 to account for rounding)
    return currentShots > lowerTierShots + 0.01;
  };

  // Helper to get cell style with green highlighting
  const getCellStyle = (
    bgColor: string,
    currentShots: number,
    lowerTierShots: number | null
  ) => {
    const baseStyle = getColumnStyle(bgColor);
    const shouldHighlight = shouldHighlightCell(currentShots, lowerTierShots);
    if (shouldHighlight) {
      return {
        ...baseStyle,
        backgroundColor: '#aeebf2',
      };
    }
    return baseStyle;
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
      title: renderHeader('HS', '#e6f7ff'),
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
      title: renderHeader('BS (None)', '#fff7e6'),
      dataIndex: 'bodyShotsNoShield',
      key: 'bodyShotsNoShield',
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
                null,
                false
              );
            }}
          >
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('BS (Light)', '#fff7e6'),
      dataIndex: 'bodyShotsLight',
      key: 'bodyShotsLight',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff7e6',
            record.bodyShotsLight,
            record.bodyShotsNoShield
          ),
        };
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('BS (Med)', '#fff7e6'),
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('Body (Heavy)', '#fff7e6'),
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    // Headshot columns (grouped together)
    {
      title: renderHeader('HS (None)', '#f6ffed'),
      dataIndex: 'headshotsNoShield',
      key: 'headshotsNoShield',
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
                null,
                true
              );
            }}
          >
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('HS (Light)', '#f6ffed'),
      dataIndex: 'headshotsLight',
      key: 'headshotsLight',
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f6ffed',
            record.headshotsLight,
            record.headshotsNoShield
          ),
        };
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('HS (Med)', '#f6ffed'),
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    {
      title: renderHeader('HS (Heavy)', '#f6ffed'),
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
            {shots === Infinity ? '∞' : shots.toFixed(1)}
          </span>
        );
      },
    },
    // Body mags columns (grouped together)
    {
      title: renderHeader('BS Mags (None)', '#fff1f0'),
      dataIndex: 'bodyMagsNoShield',
      key: 'bodyMagsNoShield',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: () => {
        return { style: getColumnStyle('#fff1f0') };
      },
    },
    {
      title: renderHeader('BS Mags (Light)', '#fff1f0'),
      dataIndex: 'bodyMagsLight',
      key: 'bodyMagsLight',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#fff1f0',
            record.bodyMagsLight,
            record.bodyMagsNoShield
          ),
        };
      },
    },
    {
      title: renderHeader('BS Mags (Med)', '#fff1f0'),
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
      title: renderHeader('BS Mags (Heavy)', '#fff1f0'),
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
      title: renderHeader('HS Mags (None)', '#f0f5ff'),
      dataIndex: 'headMagsNoShield',
      key: 'headMagsNoShield',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: () => {
        return { style: getColumnStyle('#f0f5ff') };
      },
    },
    {
      title: renderHeader('HS Mags (Light)', '#f0f5ff'),
      dataIndex: 'headMagsLight',
      key: 'headMagsLight',
      render: (mags: number) => {
        return mags === Infinity ? '∞' : mags.toString();
      },
      onCell: (record: TableRow) => {
        return {
          style: getCellStyle(
            '#f0f5ff',
            record.headMagsLight,
            record.headMagsNoShield
          ),
        };
      },
    },
    {
      title: renderHeader('HS Mags (Med)', '#f0f5ff'),
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
      title: renderHeader('HS Mags (Heavy)', '#f0f5ff'),
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
