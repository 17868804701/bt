<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container {
    padding: 10px;
  }

  .container h2 {
    margin-left: 15px;
  }

  .search_btn {
    margin-left: 10px;
  }

  .text_width {
    width: 100px;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
    align-items: center;
  }

  .btn {
    position: absolute;
    right: 20px;
  }
</style>
<template>
  <div>
    <Card style="padding-left: 15px;">
      <Form :model="formItem3" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="formItem3.sj"
                        class="text_width" style="width: 170px;"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList" v-has="'yyscysyl_cclcydhz_search'">查询</Button>
          <Button type="primary" icon="plus" class="search_btn" @click="add_yd" v-has="'yyscysyl_cclcydhz_search'">新增数据</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'yyscysyl_cclcydhz_daochu'" @click="daochu">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns13" :data="data13" border height="500" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px;">{{sj }}车次里程耗油月度分析</span>
      </div>
    </Table>



    <!--添加-->
    <Modal
      v-model="add_ys"
      title="添加数据"
      width="350px"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="save_yszl">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="单位">
          <Select v-model="formItem.dw" :transfer="true" style="width: 195px;">
            <Option value="公交一公司">公交一公司</Option>
            <Option value="公交二公司">公交二公司</Option>
            <Option value="公交三公司">公交三公司</Option>
            <Option value="公交四公司">公交四公司</Option>
            <Option value="公交五公司">公交五公司</Option>
            <Option value="公交六公司">公交六公司</Option>
          </Select>
        </FormItem>
        <FormItem label="年月">
          <DatePicker type="month" placeholder="选择时间" v-model="formItem.time" style="width: 195px;"></DatePicker>
        </FormItem>
        <FormItem label="定额油">
          <Input v-model="formItem.dey" placeholder="定额油" style="width: 195px;"></Input>
        </FormItem>
        <FormItem label="实耗油">
          <Input v-model="formItem.shy" placeholder="实耗油" style="width: 195px;"></Input>
        </FormItem>
        <FormItem label="国家定额油耗">
          <Input v-model="formItem.gjdeyh" placeholder="国家定额油耗" style="width: 195px;"></Input>
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentTab: 'name1',
        sj:'',
        add_ys:false,
        formItem: {
          time: '',
          dw:'',
          dey:'',
          shy:'',
          gjdeyh:'',
          nd:'',
          yf:''
        },
        formItem3: {
         sj:''
        },
        columns13: [
          {
            title: '单位',
            key: 'dw',
            width: 150,
            align: 'center',
          },
          {
            title: '运营里程',
            key: 'yylc',
            width: 150,
            align: 'center',
          }, {
            title: '实耗油',
            key: 'shy',
            width: 150,
            align: 'center',
          }, {
            title: '定额油',
            key: 'dey',
            width: 150,
            align: 'center',
          }, {
            title: '节超',
            key: 'jc',
            width: 150,
            align: 'center',
          }, {
            title: '实耗/百公里',
            key: 'shbgl',
            width: 150,
            align: 'center',
          }, {
            title: '定额/百公里',
            key: 'debgl',
            width: 150,
            align: 'center',
          }, {
            title: '国家定额油耗',
            key: 'gjdeyh',
            width: 150,
            align: 'center',
          }, {
            title: '较国家定额油耗节油',
            key: 'jgjdejy',
            width: 150,
            align: 'center',
          }
        ],
        data13: []
      }
    },
    methods: {
      add_yd(){
        this.add_ys = true
      },
      clean(){
          this.formItem.time = '',
          this.formItem.dey = '',
          this.formItem.shy = '',
          this.formItem.gjdeyh = '',
          this.formItem.yf = '',
          this.formItem.dw = '',
          this.formItem.nd = ''
      },
      cancel() {
        this.clean()
        this.add_ys = false
        this.getList()
      },
      save_yszl() {
        this.formItem.nd = this.$formatDate(this.formItem.time).substring(0, 4)
        this.formItem.yf = this.$formatDate(this.formItem.time).substring(5, 7)
        this.$post(this.$url.insertCclchy2, this.formItem)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.$Message.success('添加成功');
              this.cancel()
            } else {
              this.$Message.error('添加失败');
              this.cancel()
            }
          })
      },
      getList() {
        if (this.formItem3.sj === '') {
          this.formItem3.sj = ''
        } else {
          this.formItem3.sj = this.$formatDate(this.formItem3.sj).substring(0, 7)
        }
        //console.log(this.formItem3.sj)
        this.sj = this.formItem3.sj

        this.$fetch(this.$url.qygl_yyscyszl_cclchyYDFX, this.formItem3)
          .then(res => {
            console.log(res)
            if (res.success === true) {
              if (res.data.length === 0) {
                this.$Message.info('暂无数据')
                //console.log(res);
                //console.log(res.data);
                this.data13 = res.data
              } else {
                //console.log(res);
                //console.log(res.data);
                this.data13= res.data
              }
            } else {
              this.$Message.info('查询失败')
            }
          })
      },
      daochu(){
        if (this.formItem3.nian === '') {
          this.formItem3.nian = ''
        } else {
          this.formItem3.nian = this.$formatDate(this.formItem3.nian).substring(0, 4)
        }
        this.$getExcel(this.$url.qygl_yyscyszl_cclchyYDFX_export+'?nian='+this.formItem3.nian+'&jidu='+this.formItem3.jidu )
      }
    },
    mounted () {

    }
  }
</script>
