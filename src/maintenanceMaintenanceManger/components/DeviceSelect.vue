<!--公用组件 下拉框  必须在formitem中使用-->
<template>
  <!--<Select :value="deviceItem.sbid" placeholder="请选择设备" style="width: 120px;" filterable @on-change="selectSB">-->
    <!--<Option v-for="(item, index) in deviceData" :key="item+index" :value="item.id">{{item.sbbh}}</Option>-->
  <!--</Select>-->
    <Select :value="selectValue" placeholder="请选择设备" filterable style="width: 110px;" @on-change="selectOption">
      <Option v-for="(item, index) in sourceData" :key="item+index" :value="item.id">{{item.sbbh}}</Option>
    </Select>
</template>

<script>
  import * as DateTool from '../../../utils/DateTool';
  export default {
    name: 'DeviceSelect',
    props: {
      selectValue: [String, Array],
    },
    components: {
    },
    computed: {
    },
    data () {
      return {
        sourceData: [],
      }
    },
    methods: {
      selectOption(val) {
        this.$parent.form.model[this.$parent._props.prop] = val;
      },
      check(val) {
        this.$parent.form.model[this.$parent._props.prop] = val;
      },
      requestDictData() {

        let params = {
          currPage: 1,
          pageSize: 10,
        };
        this.$fetch(this.$url.maintain_DEVICE_list, params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            res.page.records.forEach(item => {
              item.ccrq = DateTool.timesToDate(item.ccrq);
              item.kssyrq = DateTool.timesToDate(item.kssyrq);
            })
            this.sourceData = res.page.records;
          }
        })
      }
    },
    mounted () {
      this.requestDictData();
    },
    created() {
    }
  }
</script>
