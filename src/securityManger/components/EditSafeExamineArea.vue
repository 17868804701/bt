<!--编辑 运营安全体系执行规范-->
<template>
  <div >
    <Form v-model="formItem" :label-width="120">

      <Tabs value="name1" style="margin-top: 5px;" type="card">
        <TabPane label="安全教育及管理制度落实" name="name1">
          <div>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="职工安全教育">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.zgaqjy" style="width: 4vw;"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="安全宣传">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.aqxc" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="安全例会">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.aqlh" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="线路安全稽查">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.xlanqjc" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="酒精检测">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.jjjc" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="四不放过">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.sbfg" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="安全标准化">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.aqbzh" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>

        <TabPane label="驾驶员安全管理" name="name2">
          <div>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="吸烟">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.xy" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="接打手机">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.jdsj" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="闯信号">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.cxh" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="未礼让斑马线">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.wlrbmx" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="超速行驶">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.csxs" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="驾驶中闲谈">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.jszxt" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>

        <TabPane label="车辆安全管理" name="name3">
          <div>
            <Row style="margin-left: -20px;">
              <Col span="8">
              <FormItem label="行车十检">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.xcsj" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="车辆安全设施抽检">
                <InputNumber :max="10" :min="0" :step="0.1"  v-model="formItem.claqsscj" style="width: 4vw"></InputNumber>
              </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>

    </Form>
  </div>
</template>

<script>

  export default {
    name: 'EditSafeExamineArea',
    props: {
      formItem: {
        aqlh: Number,
        xy: Number,
        csxs: Number,
        khsj: String,
        jszxt: Number,
        wlrbmx: Number,
        sjqw: Number,
        jjjc: Number,
        claqsscj: Number,
        yjqw: Number,
        cxh: Number,
        dw: String,
        id: String,
        jdsj: Number,
        ejqw: Number,
        zgaqjy: Number,
        ybsg: Number,
        sbfg: Number,
        xlanqjc: Number,
        aqbzh: Number,
        yylc: Number,
        sgssKf: Number,
        zjkf: Number,
        xczrsgKf: Number,
        aqxc: Number,
        gxsj: String,
        xcsj: Number
      }
    },
    components: {
    },
    computed: {
    },
    data () {
      return {
      }
    },
    methods: {

    },
    mounted () {
      debugger
    }
  }
</script>

