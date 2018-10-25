/**
 * Created by qismsom on 2018/7/24.
 */

const baseURL = process.env.BASE_URL;

const NetworkInterface = {

  // **********        数据字典            *********** //
  common_getDictListDataWithCode: 'auth/dic/getByCode',  // 根据code字典数据
  common_getAllDictListDataWithCode: 'auth/dic/getAllByCode', //  获取code节点下所有数据

  // **********人力资源 *********** //
  userManager_userList: '/erp-modules-yygl/userInfo/list', // 人力资源管理列表
  userManager_saveUserInfo: '/erp-modules-yygl/userInfo/save', // 保存人员信息
  userManager_updateUserInfo: '/erp-modules-yygl/userInfo/update', // 更新人员信息
  userManager_exportExcel: '/erp-modules-yygl/userInfo/exportExcel', //导出员工信息
  userManager_importExcel: '/erp-modules-yygl/userInfo/importExcel', // 导入员工信息
  userManager_userChangeList: '/erp-modules-yygl/userInfo/getHis', // 员工变更记录
  userManager_counts: '/erp-modules-yygl/userInfo/getCount', // 员工数据统计
  upload_tpl:'/weix/templateDownload/exportTemplate',

  zzjg:'/auth/group/trees',


  // ********** 安全事故管理 ********** //
  security_LASG_list: '/erp-modules-yygl/lasg/lasgList', // 立案事故信息列表
  security_LASG_add: '/erp-modules-yygl/lasg/saveLasg', // 添加立案事故信息
  security_LASG_update: '/erp-modules-yygl/lasg/updateLasg', //更新立案事故信息
  security_LASG_delete: '/erp-modules-yygl/lasg/deleteLasg', // 删除立案事故
  security_LASG_addLoss: '/erp-modules-yygl/lasg/saveZjsg', // 添加立案事故追加经损信息
  security_LASG_deleteLoss: '/erp-modules-yygl/lasg/deleteZjsg', // 删除立案事故追加经损信息
  security_LASG_updateLoss: '/erp-modules-yygl/lasg/updateZjsg', // 更新立案事故追加经损信息
  security_LASG_lossList: '/erp-modules-yygl/lasg/zjsgList', // 追加事故信息列表
  security_LASG_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportLasgExcel', // 导出立案事故信息列表
  security_JTGSSGHZ_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportLasgExcel',// 集团公司事故情况月汇总表 ---- 和立案事故管理页面一样的接口 --- 需要添加 按月份查询
  security_JTGSSGHZ_list: '/erp-modules-yygl/lasg/lasgList',
  security_GFGSJTSG_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportJtsgbbExcel',  // 各分公司交通事故月报表
  security_GFGSJTSG_list: '/erp-modules-yygl/lasg/jtsgbbList', // 各分公司交通事故月报表列表数据
  security_AQGLYKH_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqglkhbExcel', // 安全管理月考核表
  security_AQGLYKH_list: '/erp-modules-yygl/lasg/aqglkhbList', // 安全管理月考核表列表数据
  security_AQGLYKH_save: '/erp-modules-yygl/lasg/saveAqkh', // 安全管理月考核表， 添加安全相关分数
  security_AQGLYKH_update: '/erp-modules-yygl/lasg/updateAqkh', // 安全管理月考核表， 更新安全相关分数
  security_ZJSGJSSM_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportZjsgjsExcel', // 追加事故经损说明管理
  security_ZJSGJSSM_list: '/erp-modules-yygl/lasg/zjsgjsList', // 追加事故经损说明管理列表数据
  security_AQSCFGS_list: '/erp-modules-yygl/lasg/fgsAqsczbList', // 分公司数据
  security_AQSCJTGS_list: '/erp-modules-yygl/lasg/hzAqsczbList', // 集团公司数据
  security_AQQKFX_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbQkfxExcel', // 安全情况分析 --- 报表导出
  security_LASGFB_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbLasgfbExcel', // 立案事故分布 --- 报表导出
  security_KHSGFB_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbKhsgfbExcel', // 考核事故分布 --- 报表导出
  security_JJSS_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbJjssExcel', // 经济损失 --- 报表导出
  security_SCZRSGPL_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbXczrsgplExcel', // 行车责任事故频率 --- 报表导出
  security_LASGJSLZB_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbLasgjslExcel', // 立案事故经损率指标 --- 报表导出
  security_CLAJ_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbAjtcExcel', // 车辆安检 --- 报表导出
  security_DWTBJQXJPF_exportExcel: baseURL+'/erp-modules-yygl/lasg/exportAqsczbDwtbExcel', // 对外投保交强险及赔付情况 --- 报表导出
  security_SCQKFX_add: '/erp-modules-yygl/lasg/saveClaj',
  
  // **********        维修养护            *********** //
  maintain_BYGL_DATA_WXGXX_list: '/weix/dataDictionary/listWXGXX',                              // 基础数据 - 维修工信息管理列表
  maintain_BYGL_DATA_WXGXX_saveOrUpdate: '/weix/dataDictionary/saveWXGXX',                      // 基础数据 - 维修工信息新增或更新
  maintain_BYGL_DATA_WXGXX_delete: '/weix/dataDictionary/deleteWXGXX',                          // 基础数据 - 维修工信息删除
  maintain_BYGL_DATA_PGXX_list: '/weix/dataDictionary/listPJXX',                                // 基础数据 - 配件信息列表
  maintain_BYGL_DATA_PGXX_saveOrUpdate: '/weix/dataDictionary/savePJXX',                        // 基础数据 - 配件信息新增或更新
  maintain_BYGL_DATA_PGXX_delete: '/weix/dataDictionary/deletePJXX',                            // 基础数据 - 配件信息删除
  maintain_BYGL_DATA_PGXX_exportExcel: baseURL+'/weix/dataDictionary/exportPJXX',               // 基础数据 - 配件信息 - 列表导出excel
  maintain_BYGL_DATA_PGXX_download: baseURL+ '/weix/templateDownload/exportTemplate',           // 基础数据 - 配件信息 - 模板下载
  maintain_BYGL_CLBY_recordList: '/weix/maintenanceManagement/clby/list',                       // 车辆保养 - 列表数据
  maintain_BYGL_CLBY_saveRecord: '/weix/maintenanceManagement/clby/save',                       // 车辆保养 - 新增保养进场登记
  maintain_BYGL_CLBY_updateRecord: '/weix/maintenanceManagement/clby/update',                   // 车辆保养 - 更新保养进场登记
  maintain_BYGL_CLBY_deleteRecord: '/weix/maintenanceManagement/clby/delete',                   // 车辆保养 - 删除保养进场登记
  maintain_BYGL_CLBY_recordDetail: '/weix/maintenanceManagement/clby/info',                     // 车辆保养 - 详情
  maintain_BYGL_CLBY_exportExcel: baseURL+'/weix/maintenanceManagement/clby/listExport',        // 车辆保养 - 列表导出excel
  maintain_BYGL_CLBY_FDJ_saveOrUpdate: '/weix/maintenanceManagement/clbyFdjjc/update',          // 车辆保养详情 - 发动机进场记录更新
  maintain_BYGL_CLBY_FDJCC_saveOrUpdate: '/weix/maintenanceManagement/clbyFdjcc/update',        // 车辆保养详情 - 发动机出厂记录更新
  maintain_BYGL_CLBY_DSJ_saveUpdate: '/weix/maintenanceManagement/clbyMx/saveDspj',             // 车辆保养详情 - 添加或者保存丢失件修配记录
  maintain_BYGL_CLBY_CY_saveUpdate: '/weix/maintenanceManagement/clbyMx/saveCy',                // 车辆保养详情 - 添加或者保存超养作业记录
  maintain_BYGL_CLBY_DJSORCY_delete: '/weix/maintenanceManagement/clbyMx/delete',               // 车辆保养详情 - 删除超养作业记录或丢失件
  maintain_BYGL_CLBY_CL_save: '/weix/maintenanceManagement/llmx/save',                          // 车辆保养详情 - 添加一条领料记录
  maintain_BYGL_CLBY_CL_update: '/weix/maintenanceManagement/llmx/update',                      // 车辆保养详情 - 更新修改一条领料记录
  maintain_BYGL_CLBY_CL_delete: '/weix/maintenanceManagement/llmx/delete',                      // 车辆保养详情 - 删除一条领料记录
  maintain_BYGL_CLBY_JYD_saveOrUpdate: '/weix/maintenanceManagement/jyd/save',                  // 车辆保养详情 - 新增或更新 - 检验单明细
  maintain_BYGL_CLBY_YSD_saveOrUpdate: '/weix/maintenanceManagement/ysd/save',                  // 车辆保养详情 - 新增或更新 - 检验单明细
  maintain_BYGL_JYDGL_recordList: '/weix/maintenanceManagement/jyd/list',                            // 检验单管理 - 列表
  maintain_BYGL_JYDGL_exportExcel: baseURL+'/weix/maintenanceManagement/jyd/listExport',             // 检验单管理 - 列表导出excel
  maintain_BYGL_YSDGL_recordList: '/weix/maintenanceManagement/ysd/list',                            // 验收单管理 - 列表
  maintain_BYGL_YSDGL_exportExcel: baseURL+'/weix/maintenanceManagement/ysd/listExport',             // 验收单管理 - 列表导出excel
  maintain_BYGL_WXLLGL_recordList: '/weix/maintenanceManagement/llmx/list',                          // 维修理领料管理 - 列表
  maintain_BYGL_WXLLGL_exportExcel: baseURL+'/weix/maintenanceManagement/llmx/listExport',           // 维修理领料管理 - 列表导出excel
  maintain_BYGL_FXGL_recordList: '/weix/maintenanceManagement/fxgl/list',                            // 返修管理 - 列表
  maintain_BYGL_FXGL_save: '/weix/maintenanceManagement/fxgl/save',                                  // 返修管理 - 新增
  maintain_BYGL_FXGL_update: '/weix/maintenanceManagement/fxgl/update',                              // 返修管理 - 更新
  maintain_BYGL_FXGL_delete: '/weix/maintenanceManagement/fxgl/delete',                              // 返修管理 - 删除
  maintain_BYGL_FXGL_listDetail: '/weix/maintenanceManagement/fxgl/info',                            // 返修管理 - 列表查看详情
  maintain_BYGL_FXGL_exportExcel: baseURL+'/weix/maintenanceManagement/fxgl/listExport',             // 返修管理 - 列表导出excel
  maintain_DEVICE_list: '/weix/equipmentMaintenanceRecord/list',                                       // 设备保养记录 - 设备管理列表
  maintain_DEVICE_save: '/weix/equipmentMaintenanceRecord/save',                                       // 设备保养记录 - 新增设备信息
  maintain_DEVICE_update: '/weix/equipmentMaintenanceRecord/update',                                   // 设备保养记录 - 更新设备信息
  maintain_DEVICE_delete: '/weix/equipmentMaintenanceRecord/delete',                                   // 设备保养记录 - 删除设备信息
  maintain_DEVICE_exportExcel: baseURL+'/weix/equipmentMaintenanceRecord/listExport',
  maintain_DEVICEBY_list: '/weix/equipmentMaintenanceRecord/wxby/list',                                // 设备保养记录 - 设备保养管理列表
  maintain_DEVICEBY_save: '/weix/equipmentMaintenanceRecord/wxby/save',                                // 设备保养记录 - 新增设备保养信息
  maintain_DEVICEBY_update: '/weix/equipmentMaintenanceRecord/wxby/update',                            // 设备保养记录 - 更新设备保养信息
  maintain_DEVICEBY_delete: '/weix/equipmentMaintenanceRecord/wxby/delete',                            // 设备保养记录 - 删除设备保养信息
  maintain_DEVICEBY_exportExcel: baseURL+'/weix/equipmentMaintenanceRecord/wxby/listExport',
  maintain_BBGL_SJBYTZ_list: '/weix/reportManagement/tertiaryMaintenanceAccount',                                // 报表管理 - 三级保养台账列表
  maintain_BBGL_SJBYTZ_exportExcel: baseURL+'/weix/reportManagement/tertiaryMaintenanceAccountExport',           // 报表管理 - 三级保养台账 导出excel
  maintain_BBGL_SJWHCL_list: '/weix/reportManagement/tertiaryMaintenanceMaterialUsage',                          // 报表管理 - 三级维护材料使用情况列表
  maintain_BBGL_SJWHCL_exportExcel: baseURL+'/weix/reportManagement/tertiaryMaintenanceMaterialUsageExport',     // 报表管理 - 三级维护材料使用情况 导出excel
  // 钢瓶检测

  gpjcList:'/weix/cylinderInspection/fysz/list',   //检测费用设定列表
  addFysd:'/weix/cylinderInspection/fysz/save',   //添加费用设定
  delFysd:'/weix/cylinderInspection/fysz/delete',   //删除费用设定
  updateFysd:'/weix/cylinderInspection/fysz/update',   //删除费用设定
  gpjcdj:'/weix/cylinderInspection/save',   //钢瓶检测登记 -----添加
  gpjcdjDel:'/weix/cylinderInspection/delete',   //钢瓶检测登记 -----删除
  gpjcdjList:'/weix/cylinderInspection/list',   //钢瓶检测登记 -----列表
  updateGpjcdj:'/weix/cylinderInspection/update',   //钢瓶检测登记 -----修改
  yfjcfyjs:'/weix/inspectionFeeSettlement/getMonthlyInspectionFee',   //月份检测费用结算
  jdjcfyjs:'/weix/inspectionFeeSettlement/getQuarterInspectionFee',   //季度检测费用结算列表
  yjcfydc:'/weix/inspectionFeeSettlement/getMonthlyInspectionFeeExport',   //月检测费用导出
  jdjcfydc:'/weix/inspectionFeeSettlement/getQuarterInspectionFeeExport',   //季度测费用导出
  gpjcxqList:'/weix/cylinderInspection/gpxq/list',   //钢瓶检测详情list
  gpjcxqDel:'/weix/cylinderInspection/gpxq/delete',   //钢瓶检测详情list删除
  gpjcxqSave:'/weix/cylinderInspection/gpxq/save',   //钢瓶检测详情list增加
  gpjcxqJQ:'/weix/cylinderInspection/gpxq/cz',   //加气换瓶
  gpjcxqJL:'/weix/cylinderInspection/gpxq/jl',   //操作记录

  // 运营管理
  fgsxcyb:'/erp-modules-bbgl/fgsXcyb/getXcybList',   //分公司行车月报表列表
  exportFgsxcyb:'/erp-modules-bbgl/fgsXcyb/exportXcybExcel',   //分公司行车月报表导出
  yyexportFgsxcyb:'/erp-modules-bbgl/yybbtj/exportLineExcel',   //导出线路车次正点统计表
  getLineList:'/erp-modules-bbgl/yybbtj/getLineList',   //导出线路车次正点统计表
  yyJtexportFgsxcyb:'/erp-modules-bbgl/yybbtj/exportJthzExcel',   //导出各公司与集团汇总表
  getjthzList:'/erp-modules-bbgl/yybbtj/getjthzList',   //导出各公司与集团汇总表
  // 计划管理
  jtgsList:'/erp-modules-yygl/jtyyjh/getJtyyjhList',  ///集团公司运营计划管理
  yyjhtzList:'/erp-modules-yygl/yyjhtz/getYyjhtzList',//运营计划调整列表
  saveYyjh:'/erp-modules-yygl/yyjhtz/saveYyjhtz',//新增运营计划调整
  updateYyjh:'/erp-modules-yygl/yyjhtz/updateYyjhtz',//修改运营计划调整
  fgssrjhList:'/erp-modules-yygl/jtsrjh/getFsrjhList',//分公司收入计划
  saveFgssrjh:'/erp-modules-yygl/fsrjh/saveFsrjh',//分公司收入计划新增
  delFgssrjh:'/erp-modules-yygl/fsrjh/deleteFsrjh',//分公司收入计划删除
  updateFgssrjh:'/erp-modules-yygl/yyscjh/updateJih',//分公计划修改
  updateJtgs:'/erp-modules-yygl/jtyyjh/updateJtyyjh',//集团公司修改
  fgsyyList:'/erp-modules-yygl/yyscjh/getYyjhList',//分公司运营列表
  saveSngj:'/erp-modules-yygl/jtsrjh/saveJtsrjh',//市内公交新增
  delFgsjh:'/erp-modules-yygl/yyscjh/deleteJih',//删除分公司计划
  daochujtyyjh:'/erp-modules-yygl/jtyyjh/exportJtyyjh' ,//导出集团运营计划
  snjhList:'/erp-modules-yygl/jtsrjh/getJtsrjhList',//市内公交总计划制定列表
  addFgsyyjh:'/erp-modules-yygl/yyscjh/saveJih',//分公司运营计划新增
  yyjhgldc:'/erp-modules-yygl/yyjhtz/exportJtyyjh',//运营计划管理导出
  fgssrjhdc:'/erp-modules-yygl/jtsrjh/exportFgssrjh',//分公司收入计划导出
  sngjjhdc:'/erp-modules-yygl/jtsrjh/exportJtsrjh',//市内公交计划导出
  fgsyyjhdc:'/erp-modules-yygl/yyscjh/exportFgsjh',//导出分公司运营计划
  updatefgssrjh:'/erp-modules-yygl/fsrjh/updateFsrjh',//修改分公司收入计划
  updateSnsrjh:'/erp-modules-yygl/jtsrjh/updateJtsrjh',//修改分公司收入计划
  yyjhtzDel:'/erp-modules-yygl/yyjhtz/delete',//修改分公司收入计划



  // 服务管理
  tsqkfl:'/erp-modules-yygl/kfxx/tsqkflHzList',    //投诉情况分类表
  tsqkflExport:'/erp-modules-yygl/kfxx/exportTsqkflHzExcel',    //投诉情况分类表导出
  fgstsqkfl:'/erp-modules-yygl/kfxx/fgsTsqkflHzList',    //分公司投诉情况分类表
  fgstsqkflExport:'/erp-modules-yygl/kfxx/exportFgsTsqkflHzExcel',    //分公司投诉情况分类表导出
  kfxxtj:'/erp-modules-yygl/kfxx/tsxzbTjList',    //客服信息列表
  kfxxtjExport:'/erp-modules-yygl/kfxx/exportTsxzbTjExcel',    //客服信息列表
  kfxxList:'/erp-modules-yygl/kfxx/kfxxList',//客服信息列表
  savekfxx:'/erp-modules-yygl/kfxx/saveKfxx',//客服信息--新增
  daochukfxx:'/erp-modules-yygl/kfxx/exportKfxxExcel',//客服信息-导出
  dwclkfxx:'/erp-modules-yygl/kfxx/dwclkfxxList',//待我处理客服信息-导出
  plclkfxx:'/erp-modules-yygl/kfxx/updateBatchKfxx',//批量处理
  updatekfxx:'/erp-modules-yygl/kfxx/updateKfxx',//更新客服信息
  // 星级评价
  getUserPFList: '/erp-modules-yygl/xjkp/getMbMap', // 获取当前登录用户需要打分的所有条目数据
  commitPFWithID: '/erp-modules-yygl/xjkp/saveOrUpdXjkpKhfs', // 提交评分数据
  getReportData: '/erp-modules-yygl/xjkp/getMbFsMap', // 获取单表的所有打分数据
  jggbskhb: '/erp-modules-yygl/xjkp/exportGdwxjkhdfqkExcel', // 机关各部室考核表
  gejdwyxb: '/erp-modules-yygl/xjkp/exportGejdwldyxbExcel', //导出各二级单位领导月薪表
  // **************************   能源信息管理   **********************************
  fgsdnList:'/erp-modules-bbgl/Dnxxtj/getFgsdnxhList',  //分公司电能列表
  daochufgsdnList:'/erp-modules-bbgl/Dnxxtj/exportFgsdnExcel',  //导出分公司电能列表
  fgstrq:'/erp-modules-bbgl/Trqtj/getFrqtjList',  //分公司天然气
  daochufgstrq:'/erp-modules-bbgl/Trqtj/exportFrqtjExcel',  //分公司天然气导出
  jttrq:'/erp-modules-bbgl/Trqtj/getJtrqList',  //天然气月汇总
  daochujttrq:'/erp-modules-bbgl/Trqtj/exportJtrqtjExcel',  //天然气月汇总--导出
  lljl:'/erp-modules-bbgl/Lljl/getLljlList',  //领料记录
  savell:'/erp-modules-bbgl/Lljl/save',  //新增领料
  updatell:'/erp-modules-bbgl/Lljl/update',  //修改领料
  delll:'/erp-modules-bbgl/Lljl/delete',  //删除领料
  daochull:'/erp-modules-bbgl/Lljl/exportLljlExcel',  //领料导出
  jtdnList:'/erp-modules-bbgl/Dnxxtj/getJtdnxhList',  //集团电能列表
  jtdnListdaochu:'/erp-modules-bbgl/Dnxxtj/exportJtdnExcel',  //集团电能列表导出

  lingliaoSearch:'/erp-modules-weix/dataDictionary/listPJXX',

  // 企业管理
  qygl_nhlctz_fgs: '/erp-modules-bbgl/Sctjtz/getFnhlcList',            //分公司能耗台账
  qygl_nhlctz_jtgs: '/erp-modules-bbgl/Sctjtz/getJtnhlcList',          //集团公司能耗台账
  qygl_nhlctz_fgs_export: baseURL+'/erp-modules-bbgl/Sctjtz/exportFnhlcExcel', //分公司能耗报表导出
  qygl_nhlctz_jtgs_export: baseURL+'/erp-modules-bbgl/Sctjtz/exportJtnhlcExcel',//集团公司能耗报表导出
  qygl_ccxlsrtz_fgs: '/erp-modules-bbgl/Ccxltz/getFccxlsrList',            //分公司车次线路台账
  qygl_ccxlsrtz_jtgs: '/erp-modules-bbgl/Ccxltz/getCcxlsrList',            //集团公司车次线路台账
  qygl_ccxlsrtz_fgs_export: baseURL+'/erp-modules-bbgl/Ccxltz/exportFccxlsrExcel', //分公司车次线路台账报表导出
  qygl_ccxlsrtz_jtgs_export: baseURL+'/erp-modules-bbgl/Ccxltz/exportCcxlsrExcel', //集团公司车次线路台账报表导出
  qygl_yyscyszl_cclchyYDFX: '/erp-modules-bbgl/cclchyYfx/cclchyYfxList',                       //车次里程耗油月度分析列表
  qygl_yyscyszl_cclchyYDFX_export: baseURL+'/erp-modules-bbgl/cclchyYfx/exportCclchyYfxExcel', //导出车次里程耗油月度分析列表
  qygl_yyscyszl_cclchyJDFX: '/erp-modules-bbgl/cclchy/cclchyList',                             //车次里程耗油季度汇总列表
  qygl_yyscyszl_cclchyJDFX_export: baseURL+'/erp-modules-bbgl/cclchy/exportCclchyExcel',       //导出车次里程耗油季度汇总列表
  qygl_yyscyszl_kylyzsr: '/erp-modules-bbgl/kylzsrhz/kylzsrhzList',                            //客运量与总收入汇总
  qygl_yyscyszl_kylyzsr_export: baseURL+'/erp-modules-bbgl/kylzsrhz/exportKylzsrhzExcel',          //导出客运量与总收入汇总
  xlxyList:'/erp-modules-bbgl/qiy/xlxyfx/getXlxyfxList',          //线路效益列表
  xlxyDaochu:baseURL+'/erp-modules-bbgl/qiy/xlxyfx/exportXlxyfx',          //线路效益导出
  ckgsList: '/erp-modules-bbgl/jjzbFgs/jjzbCkgsList',                            //长客公司列表
  ckgsDaochu: '/erp-modules-bbgl/jjzbFgs/exportJjzbCkgsExcel',                            //长客公司列表
  gjhjList: '/erp-modules-bbgl/jjzbFgs/jjzbGjgsHzList',                            //公交合计列表
  gjhjDaochu: '/erp-modules-bbgl/jjzbFgs/exportJjzbGjgsHzExcel',                            //公交合计列表
  xlgsList: '/erp-modules-bbgl/jjzbFgs/jjzbXlgsList',                            //修理公司列表
  xlgsDaochu: '/erp-modules-bbgl/jjzbFgs/exportJjzbXlgsExcel',                            //修理公司列表
  gjfgsList: '/erp-modules-bbgl/jjzbFgs/jjzbGjgsList',                            //公交分公司列表
  gjfgsDaochu: '/erp-modules-bbgl/jjzbFgs/exportJjzbGjgsExcel',                            //公交分公司列表
  yejikaoheList: '/erp-modules-bbgl/jjzbFgs/yejikaoheList',                            //公交分公司列表
  yejikaoheDaochu: '/erp-modules-bbgl/jjzbFgs/exportYejikaoheExcel',                            //公交分公司列表




  getUserInfo:'/3e-platform-modules-auth/user/getUserInfo',
  updatePwd:'/3e-platform-modules-auth/user/updatePass'
};

export default NetworkInterface;
