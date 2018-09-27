<!--公用组件 下拉框  必须在formitem中使用-->
<template>
    <Select v-if="isSelect" :value="selectValue" style="width: 110px;" @on-change="selectOption" :clearable="true">
      <Option v-for="(item, index) in sourceData" :key="item+index" :value="item.code">{{item.title}}</Option>
    </Select>
    <CheckboxGroup v-else :value="selectValue" @on-change="check">
      <Checkbox v-for="(item, index) in sourceData" :key="item+index" :label="item.code">{{item.title}}</Checkbox>
    </CheckboxGroup>
</template>

<script>

  export default {
    name: 'CommonSelect',
    props: {
      type: String,
      selectValue: [String, Array],
      iviewType: String,
    },
    components: {
    },
    computed: {
      isSelect() {
        if (this.iviewType === '' || typeof this.iviewType == 'undefined') {
          return true;
        }

        if (this.iviewType === 'checkbox') {
          return false;
        }else{
          return true;
        }
      }
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
        let allDict = this.$store.state.dictData.allDict;
        let type = this.type;
        let origanazation = this.$store.state.dictData.orginazationArray;

        this.sourceData = allDict[type];
      }
    },
    mounted () {
      this.requestDictData();
    },
    created() {
    }
  }
</script>
