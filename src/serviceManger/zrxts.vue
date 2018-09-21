<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    width: 195px;
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
  <div class="container">
    <h2>责任性投诉管理</h2>
    <Tabs value="name1">
      <TabPane label="责任性投诉反馈管理" name="name1">
        <Card style="padding-left: 15px;">
          <Form :model="formItem" :label-width="110">
            <div class="search">
              <FormItem label="选择时间" style="margin: 0">
                <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="formItem.date"
                            class="text_width"></DatePicker>
              </FormItem>
              <FormItem label="分公司" style="margin: 0">
                <Select v-model="formItem.select" :transfer="true" style="width: 195px;">
                  <Option value="beijing">一公司</Option>
                  <Option value="shanghai">二公司</Option>
                  <Option value="shenzhen">三公司</Option>
                </Select>
              </FormItem>
              <Button type="primary" icon="ios-search" class="search_btn">查询</Button>
              <Modal
                v-model="add"
                title="添加责任性投诉反馈">
                  <div style="margin-left: 65px;">
                    <Form :model="formItem" :label-width="110">
                    <FormItem label="公司名称" style="margin-bottom: 15px">
                      <Select v-model="formItem.select" :transfer="true" style="width: 195px;">
                        <Option value="beijing">一公司</Option>
                        <Option value="shanghai">二公司</Option>
                        <Option value="shenzhen">三公司</Option>
                      </Select>
                    </FormItem>
                      <FormItem label="选择时间" style="margin-bottom: 15px">
                        <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="formItem.date"
                                    class="text_width"></DatePicker>
                      </FormItem>
                      <FormItem label="人员" style="margin-bottom: 15px">
                        <Input v-model="formItem.input" placeholder="人员" class="text_width"/>
                      </FormItem>
                      <FormItem label="路别" style="margin-bottom: 15px">
                        <Input v-model="formItem.input" placeholder="路别" class="text_width"/>
                      </FormItem>
                      <FormItem label="原因" style="margin-bottom: 15px">
                        <Input v-model="formItem.input" type="textarea" placeholder="原因" class="text_width"/>
                      </FormItem>
                    </Form>
                  </div>
              </Modal>
              <Button type="primary" icon="plus" class="search_btn" @click="add=true">增加</Button>
              <div class="btn">
                <!--<Button type="primary" icon="android-upload">导入</Button>-->
                <Button type="primary" icon="android-download">导出Excel</Button>
              </div>
            </div>
          </Form>
        </Card>
        <Table :columns="columns11" :data="data10" border height="470" style="margin-top: 10px;" size="small"></Table>
        <Page :total="100" show-total style="margin-top: 10px;"></Page>
      </TabPane>
      <TabPane label="疑难问题反馈管理" name="name2">
        <Card style="padding-left: 15px;">
          <Form :model="formItem" :label-width="110">
            <div class="search">
              <FormItem label="选择时间" style="margin: 0">
                <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="formItem.date"
                            class="text_width"></DatePicker>
              </FormItem>
              <FormItem label="分公司" style="margin: 0">
                <Select v-model="formItem.select" :transfer="true" style="width: 195px;">
                  <Option value="beijing">一公司</Option>
                  <Option value="shanghai">二公司</Option>
                  <Option value="shenzhen">三公司</Option>
                </Select>
              </FormItem>
              <Button type="primary" icon="ios-search" class="search_btn">查询</Button>
              <Modal
                v-model="add1"
                title="添加疑难问题反馈">
                <div style="margin-left: 65px;">
                  <Form :model="formItem" :label-width="110">
                    <FormItem label="处理部门" style="margin-bottom: 15px">
                      <Select v-model="formItem.select" :transfer="true" style="width: 195px;">
                        <Option value="beijing">运营</Option>
                        <Option value="shanghai">安全</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="选择时间" style="margin-bottom: 15px">
                      <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="formItem.date"
                                  class="text_width"></DatePicker>
                    </FormItem>
                    <FormItem label="人员" style="margin-bottom: 15px">
                      <Input v-model="formItem.input" placeholder="人员" class="text_width"/>
                    </FormItem>
                    <FormItem label="路别" style="margin-bottom: 15px">
                      <Input v-model="formItem.input" placeholder="路别" class="text_width"/>
                    </FormItem>
                    <FormItem label="原因" style="margin-bottom: 15px">
                      <Input v-model="formItem.input" type="textarea" placeholder="原因" class="text_width"/>
                    </FormItem>
                  </Form>
                </div>
              </Modal>
              <Button type="primary" icon="plus" class="search_btn" @click="add1=true">增加</Button>
              <div class="btn">
                <!--<Button type="primary" icon="android-upload">导入</Button>-->
                <Button type="primary" icon="android-download">导出Excel</Button>
              </div>
            </div>
          </Form>
        </Card>
        <Table :columns="columns12" :data="data12" border height="470" style="margin-top: 10px;" size="small"></Table>
        <Page :total="100" show-total style="margin-top: 10px;"></Page>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  export default {
    data () {
      return {
          add:false,
          add1:false,
        formItem: {
          input: '',
          select: '',
          date:''
        },
        columns11: [
          {
            title: '公司名称',
            key: 'gsmc',
            align: 'center',

          },
          {
            title: '时间',
            key: 'sj',
            align: 'center',

          },  {
            title: '人员',
            key: 'ry',
            align: 'center',

          },  {
            title: '路别',
            key: 'lb',
            align: 'center',

          },  {
            title: '原因',
            key: 'yy',
            align: 'center',

          },{
            title: '操作',
            align: 'center',
            fixed: 'right',

            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.add=true
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      alert("删除成功")
                    }
                  }
                }, '删除')
              ]);
            }
          },
        ],
        data10: [],






        columns12: [
          {
            title: '处理部门',
            key: 'clbm',
            align: 'center',

          },
          {
            title: '时间',
            key: 'sj',
            align: 'center',

          },  {
            title: '人员',
            key: 'ry',
            align: 'center',

          },  {
            title: '路别',
            key: 'lb',
            align: 'center',

          },  {
            title: '原因',
            key: 'yy',
            align: 'center',

          },{
            title: '操作',
            align: 'center',
            fixed: 'right',

            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.add1=true
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      alert("删除成功")
                    }
                  }
                }, '删除')
              ]);
            }
          },
        ],
        data12: []
      }
    },
    methods: {},
    mounted () {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          xh:i,
          gsmc:i+'公司',
          sj:'2018-10-1'+i,
          xl:'1'+i+'路',
          phone:'17868804701',
          type:'投诉',
          ry:'谢中华',
          zt:'已接收',
          yy:'酒后驾车',
          cljg:'已处理',
          bz:'备注......',
          jlr:'谢中华',
          sy:'违规',
          lb:'706',
          ch:'150',
          key: i,
          name: 'John Brown',
          age: i + 1,
          street: 'Lake Park',
          building: 'C',
          door: 2035,
          caddress: 'Lake Street 42',
          cname: 'SoftLake Co',
          gender: 'M',
        });
      }
      this.data10 = data;





      const data1 = [];
      for (let i = 0; i < 10; i++) {
        data1.push({
          xh:i,
          gsmc:i+'公司',
          clbm:'运营',
          sj:'2018-10-1'+i,
          xl:'1'+i+'路',
          phone:'17868804701',
          type:'投诉',
          ry:'谢中华',
          zt:'已接收',
          yy:'酒后驾车，死不承认',
          cljg:'已处理',
          bz:'备注......',
          jlr:'谢中华',
          sy:'违规',
          lb:'706',
          ch:'150',
          key: i,
          name: 'John Brown',
          age: i + 1,
          street: 'Lake Park',
          building: 'C',
          door: 2035,
          caddress: 'Lake Street 42',
          cname: 'SoftLake Co',
          gender: 'M',
        });
      }
      this.data12 = data1;
    }
  }
</script>
