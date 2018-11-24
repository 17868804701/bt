// 2018 年第一季度安全生产情况分析   少车内事故所有内容
export const PA_Quarter_Columns = [
  {
    title: '立案事故',
    key: 'xczrsgcsSum',
    align: 'center',
    width: 90,
  },
  {
    title: '考核事故',
    key: 'khsgSum',
    align: 'center',
    width: 90,
  },
  {
    title: '立案事故比较去年同期比较',
    align: 'center',
    children: [
      {
        title: '去年同期（起）',
        key: 'oldxczrsgcsSum',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势',
        key: 'xczrsgcsqs',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势值',
        key: 'xczrsgcsqsVal',
        align: 'center',
        width: 90,
      },
      {
        title: '幅度',
        key: 'xczrsgcsqsFd',
        align: 'center',
        width: 90,
      },
    ],
  },
  {
    title: '考核事故一般事故比较去年同期比较',
    align: 'center',
    children: [
      {
        title: '本期',
        key: 'ybsgSum',
        align: 'center',
        width: 90,
      },
      {
        title: '去年同期（起）',
        key: 'ybsgSum',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势',
        key: 'ybsgqs',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势值',
        key: 'ybsgqsVal',
        align: 'center',
        width: 90,
      },
      {
        title: '幅度',
        key: 'ybsgqsFd',
        align: 'center',
        width: 90,
      },
    ],
  },
  {
    title: '考核事故二级轻微事故比较去年同期比较',
    align: 'center',
    children: [
      {
        title: '本期',
        key: 'ejqwSum',
        align: 'center',
        width: 90,
      },
      {
        title: '去年同期（起）',
        key: 'oldejqwSum',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势',
        key: 'ejqwqs',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势值',
        key: 'ejqwqsVal',
        align: 'center',
        width: 90,
      },
      {
        title: '幅度',
        key: 'ejqwqsFd',
        align: 'center',
        width: 90,
      },
    ],
  },
  {
    title: '考核事故三级轻微事故比较去年同期比较',
    align: 'center',
    children: [
      {
        title: '本期',
        key: 'sjqwSum',
        align: 'center',
        width: 90,
      },
      {
        title: '去年同期（起）',
        key: 'oldsjqwSum',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势',
        key: 'sjqwqs',
        align: 'center',
        width: 90,
      },
      {
        title: '趋势值',
        key: 'sjqwqsVal',
        align: 'center',
        width: 90,
      },
      {
        title: '幅度',
        key: 'sjqwqsFd',
        align: 'center',
        width: 90,
      },
    ],
  }
];

// 2018 年第一季度安全生产情况分析 --- 静态数据
export const PA_Quarter_Data = {
  lasg: '54',
  khsg: '24',
  cnsg: '21',

  lasgbj_qntq: '54',
  lasgbj_qs: '持平',
  lasgbj_qsz: '0',
  lasgbj_fd: '0.00%',

  cnsgbj_qntq: '18',
  cnsgbj_qs: '上升',
  cnsgbj_qsz: '3',
  cnsgbj_fd: '16.67%',

  khybsgbj_bq: '0',
  khybsgbj_qntq: '0',
  khybsgbj_qs: '0',
  khybsgbj_qsz: '0',
  khybsgbj_fd: '0.00%',

  khejsgbj_bq: '8',
  khejsgbj_qntq: '27',
  khejsgbj_qs: '下降',
  khejsgbj_qsz: '19',
  khejsgbj_fd: '70.37%',

  khsjsgbj_bq: '16',
  khsjsgbj_qntq: '27',
  khsjsgbj_qs: '下降',
  khsjsgbj_qsz: '11',
  khsjsgbj_fd: '40.74%',
}

// 立案事故分布情况
export const PA_LASG_Columns = [
  {
    title: '单位',
    key: 'dw',
    align: 'center',
  },
  {
    title: '本期',
    key: 'xczrsgcsSum',
    align: 'center',
  },
  {
    title: '去年同期',
    key: 'oldxczrsgcsSum',
    align: 'center',
  },
  {
    title: '趋势',
    key: 'xczrsgcsqs',
    align: 'center',
  },
  {
    title: '趋势值',
    key: 'xczrsgcsqsVal',
    align: 'center',
  },
  {
    title: '幅度',
    key: 'xczrsgcsqsFd',
    align: 'center',
  }
];
// 立案事故分布情况 --- 静态数据
export const PA_LASG_Data = {
  dw: '长客公司',
  bq: '3',
  qntq: '4',
  qs: '下降',
  qsz: '1',
  fd: '25%',
}

// 经济损失
export const PA_Economic_Losses = [
  {
    title: '本期',
    key: 'jsSum',
    align: 'center',
  },
  {
    title: '去年同期',
    key: 'oldjsSum',
    align: 'center',
  },
  {
    title: '趋势',
    key: 'jsqs',
    align: 'center',
  },
  {
    title: '趋势值',
    key: 'jsqsVal',
    align: 'center',
  },
  {
    title: '幅度',
    key: 'jsqsFd',
    align: 'center',
  }
]
// 经济损失 --- 静态数据
export const PA_Economic_Losses_Data = {
  dw: '公交一公司',
  bq: '155.81',
  qntq: '96.17',
  qs: '上升',
  qsz: '59.64',
  fd: '62.01%',
}

// 考核事故分布
export const PA_Examine = [
  {
    title: '单位',
    key: 'dw',
    align: 'center',
  },
  {
    title: '考核事故',
    key: 'khsgSum',
    align: 'center',
  },
  {
    title: '一般事故',
    key: 'ybsgSum',
    align: 'center',
  },
  {
    title: '二级轻微事故',
    key: 'ejqwSum',
    align: 'center',
  },
  {
    title: '三级轻微事故',
    key: 'sjqwSum',
    align: 'center',
  }
];
// 考核事故分布 --- 静态数据
export const PA_Examine_Data = {
  dw: '公交一公司',
  khsg: '4',
  ybsg: '0',
  ejsg: '2',
  sjsg: '2',
};

//行车责任事故频率
export const PA_XCZR_Rate = [
  {
    title: '单位',
    key: 'dw',
    align: 'center',
  },
  {
    title: '行车责任事故频率',
    key: 'sgplSum',
    align: 'center',
  },
  {
    title: '计划比较',
    align: 'center',
    children: [
      {
        title: '计划',
        key: 'sgpljhSum',
        align: 'center',
      },
      {
        title: '趋势',
        key: 'sgpljhqs',
        align: 'center',
      },
      {
        title: '趋势值',
        key: 'sgpljhVal',
        align: 'center',
      },
    ],
  },
  {
    title: '去年同期比较',
    align: 'center',
    children: [
      {
        title: '去年同期',
        key: 'oldsgplSum',
        align: 'center',
      },
      {
        title: '趋势',
        key: 'sgplqs',
        align: 'center',
      },
      {
        title: '趋势值',
        key: 'sgplqsVal',
        align: 'center',
      },
      {
        title: '幅度',
        key: 'sgplqsFd',
        align: 'center',
      },
    ],
  },
];
//行车责任事故频率 --- 静态数据
export const PA_XCZR_Rate_Data = {
  dw: '公交一公司',
  xczr_rate: '0.85次/百万公里',

  jhbj_jh: '1.6次/百万公里',
  jhbj_qs: '下降',
  jhbj_qsz: '0.75次/百万公里',

  qntqbj_qntq: '2.13次/百万公里',
  qntqbj_qs: '下降',
  qntqbj_qsz: '1.28次/百万公里',
  qntqbj_fd: '60.09%',
};

//立案事故经损率指标完成情况 --- 静态数据
export const PA_LASG_LossRateTarget = [
  {
    title: '单位',
    key: 'dw',
    align: 'center',
  },
  {
    title: '事故（起）',
    key: 'xczrsgcsSum',
    align: 'center',
  },
  {
    title: '经损（万元）',
    key: 'jsSum',
    align: 'center',
  },
  {
    title: '经损率（元/万公里）',
    key: 'jslSum',
    align: 'center',
  },
  {
    title: '计划比较',
    align: 'center',
    children: [
      {
        title: '计划（元/万公里）',
        key: 'jsljhSum',
        align: 'center',
      },
      {
        title: '趋势',
        key: 'jsljhqs',
        align: 'center',
      },
      {
        title: '趋势值',
        key: 'jsljhqsVal',
        align: 'center',
      },
    ],
  },
  {
    title: '去年同期比较',
    align: 'center',
    children: [
      {
        title: '去年同期（元/万公里）',
        key: 'oldjslSum',
        align: 'center',
      },
      {
        title: '趋势',
        key: 'oldjslSum',
        align: 'center',
      },
      {
        title: '趋势值',
        key: 'jslqsVal',
        align: 'center',
      },
      {
        title: '幅度',
        key: 'jslqsVal',
        align: 'center',
      },
    ],
  },
];
//立案事故经损率指标完成情况 --- 静态数据
export const PA_LASG_LossRateTarget_Data = {
  dw: '公交一公司',
  sg: '16',
  js: '54.64',
  jsl: '1164.81',

  jhbj_jh: '900',
  jhbj_qs: '增加',
  jhbj_qsz: '264.81',

  qntqbj_qntq: '159',
  qntqbj_qs: '增加',
  qntqbj_qsz: '1005.81',
  qntqbj_fd: '623.58%',
};

// 车辆按键台次及合格率
export const PA_CLAJ_Yield = [

];
// 车辆按键台次及合格率 --- 静态数据
export const PA_CLAJ_Yield_Data = {
  dw: '公交一公司',
  jctc: '359',
  bhg: '1',
  hgl: '99.72%',
};


// 对外投保交强险及赔付情况
export const PA_Insure_Paid = [

];
// 对外投保交强险及赔付情况  --- 静态数据
export const PA_Insure_Paid_Data = {
  dw: '公交一公司',
  hpe1: '16.28',
  sj: '10',
  hpe2: '10',
};

const tableData = {
  // 2018 年第一季度安全生产情况分析
  PA_Quarter_Columns: PA_Quarter_Columns,
  PA_Quarter_Data: PA_Quarter_Data,
  // 立案事故分布情况
  PA_LASG_Columns: PA_LASG_Columns,
  PA_LASG_Data: PA_LASG_Data,
  // 经济损失
  PA_Economic_Losses: PA_Economic_Losses,
  PA_Economic_Losses_Data: PA_Economic_Losses_Data,
  // 考核事故分布
  PA_Examine: PA_Examine,
  PA_Examine_Data: PA_Examine_Data,
  //行车责任事故频率
  PA_XCZR_Rate: PA_XCZR_Rate,
  PA_XCZR_Rate_Data: PA_XCZR_Rate_Data,
  //立案事故经损率指标完成情况
  PA_LASG_LossRateTarget: PA_LASG_LossRateTarget,
  PA_LASG_LossRateTarget_Data: PA_LASG_LossRateTarget_Data,
  //车辆安检台次及合格率
  PA_CLAJ_Yield: PA_CLAJ_Yield,
  PA_CLAJ_Yield_Data: PA_CLAJ_Yield_Data,
  //对外投保交强险及赔付情况
  PA_Insure_Paid: PA_Insure_Paid,
  PA_Insure_Paid_Data: PA_Insure_Paid_Data,
};

export default tableData;
