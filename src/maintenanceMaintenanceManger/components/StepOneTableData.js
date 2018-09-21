// 发动机 --- 气缸数据
export const FDJ_QGSJ = [
  {
    title: '部位',
    align: 'center',
    type: 'index'
  },
  {
    title: '气缸',
    align: 'center',
    children: [
      {
        title: '上部',
        align: 'center',
        children: [
          {
            title: '前后',
            key: 'qg_sb_qh',
            align: 'center',
          },
          {
            title: '左右',
            key: 'qg_sb_zy',
            align: 'center',
          },
        ]
      },
      {
        title: '中部',
        align: 'center',
        children: [
          {
            title: '前后',
            key: 'qg_zb_qh',
            align: 'center',
          },
          {
            title: '左右',
            key: 'qg_zb_zy',
            align: 'center',
          },
        ]
      },
      {
        title: '下部',
        align: 'center',
        children: [
          {
            title: '前后',
            key: 'qg_xb_qh',
            align: 'center',
          },
          {
            title: '左右',
            key: 'qg_xb_zy',
            align: 'center',
          },
        ]
      },
    ],
  },
  {
    title: '活塞尺寸',
    align: 'center',
    key: 'hscc',
  },
  {
    title: '凸轮轴',
    align: 'center',
    children: [
      {
        title: '升程',
        align: 'center',
        children: [
          {
            title: '进气',
            key: 'tlz_jq',
            align: 'center'
          },
          {
            title: '排气',
            key: 'tlz_pq',
            align: 'center'
          },
        ]
      }
    ]
  }
];
// 车辆按键台次及合格率 --- 静态数据
export const FDJ_QG_DATA = {
  qg_sb_qh: '101.67',
  qg_sb_zy: '101.68',
  qg_zb_qh: '101.68',
  qg_zb_zy: '101.67',
  qg_xb_qh: '101.68',
  qg_xb_zy: '101.68',
  
  hscc: '101.59',
  
  tlz_jq: '7.24',
  tlz_pq: '7.23',
  
};

export const FDJ_QZ_COLUMNS = [
  {
    title: '曲轴',
    align:'center',
    children: [
      {
        title: '曲轴径',
        align: 'center',
        children: [
          {
            title: '直径',
            key: 'qz_qzj_zj',
            align: 'center'
          },
          {
            title: '圆度',
            key: 'qz_qzj_yd',
            align: 'center'
          },
          {
            title: '圆柱度',
            key: 'qz_qzj_yzd',
            align: 'center'
          }
        ]
      },
      {
        title: '连杆颈',
        align: 'center',
        children: [
          {
            title: '直径',
            key: 'qz_lgj_zj',
            align: 'center'
          },
          {
            title: '圆度',
            key: 'qz_lgj_yd',
            align: 'center'
          },
          {
            title: '圆柱度',
            key: 'qz_lgj_yzd',
            align: 'center'
          }
        ]
      }
    ],
  }
];

export const FDJ_QZ_DATA = {
  qz_qzj_zj: '74.99',
  qz_qzj_yd: '0.01',
  qz_qzj_yzd: '-',
  
  qz_lgj_zj: '61.99',
  qz_lgj_yd: '0.01',
  qz_lgj_yzd: '-',
}


const tableData = {
  // 气缸数据 活塞尺寸 凸轮轴
  FDJ_QG_COLUMNS: FDJ_QGSJ,
  FDJ_QG_DATA: FDJ_QG_DATA,
  // 曲轴
  FDJ_QZ_COLUMNS: FDJ_QZ_COLUMNS,
  FDJ_QZ_DATA: FDJ_QZ_DATA,
};

export default tableData;
