<!--追加事故经损记录-->
<!--追加公司、追加车内、追加车损、三者、合计追加、追加扣分、备注-->
<template>
  <div>
    <Form ref="lossForm" :model="lossForm" :rules="ruleValidate" :label-width="80">

      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <FormItem prop="zjgs" label="追加公司">

          <CommonSelect type="EJGS" :selectValue="lossForm.zjgs"></CommonSelect>

        </FormItem>
        <FormItem label="合计追加">
          <div style="width: 110px;">{{HJZJ}}</div>
        </FormItem>
        <FormItem label="结案经损">
          <InputNumber v-model="lossForm.jajs" placeholder="结案经损..." style="width: 110px"></InputNumber>
        </FormItem>
      </div>

      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <FormItem prop="zjcn" label="追加车内">
          <InputNumber v-model="lossForm.zjcn" placeholder="追加车内..." style="width: 110px"></InputNumber>
        </FormItem>
        <FormItem prop="zjcs" label="追加车损">
          <InputNumber v-model="lossForm.zjcs" placeholder="追加车损..." style="width: 110px"></InputNumber>
        </FormItem>
        <FormItem prop="zjsz" label="三者">
          <InputNumber v-model="lossForm.zjsz" placeholder="三者..." style="width: 110px"></InputNumber>
        </FormItem>
        <FormItem prop="zjkf" label="追加扣分">
          <InputNumber :max="10" :min="0" :step="0.1"  v-model="lossForm.zjkf" placeholder="追加扣分..." style="width: 110px"></InputNumber>
        </FormItem>
      </div>

      <FormItem prop="bz" label="备注">
        <Input v-model="lossForm.bz" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入追加说明..."></Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import CommonSelect from '../../components/common/CommonSelect.vue';
  export default {
    name: 'AddLossDiv',
    props: {
      lossForm: {
        jsyxm: String,
        laid: String,
        lb: String,
        pz: String,
        jajs: String,
        ygjs: String,
        hjzj: String,
        zjcn: String,
        zjcs: String,
        zjgs: String,
        zjkf: String,
        zjsz: String,
        bz: String
      }
    },
    components: {
      CommonSelect,
    },
    computed: {
      HJZJ() {
        return Number(this.lossForm.zjcn) + Number(this.lossForm.zjcs) + Number(this.lossForm.zjsz);
      }
    },
    data () {
      return {
        ruleValidate: {
          zjgs: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>
