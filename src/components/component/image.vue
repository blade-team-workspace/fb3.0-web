<template>
  <BpmFormItem :prop="item.name" :title="item.label">

    <div class="demo-upload-list" v-for="item in uploadList">
    <template v-if="item.status === 'finished'">
      <img :src="item.url">
      <div class="demo-upload-list-cover">
        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </template>
    <template v-else>
      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
    </template>
  </div>
  <Upload
    ref="upload"
    :show-upload-list="false"
    :default-file-list="defaultList"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png']"
    :data="{token:'pBwzxNPBDAAD9cJaND2xh3TkgtTilQERWHSByAQ_:9CNVM9IegER_FjIbGKw3qcjTvIQ=:eyJzY29wZSI6ImJwbXRlc3QiLCJkZWFkbGluZSI6MTU0OTIxNTMxNX0='}"
    :max-size="2048"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :before-upload="handleBeforeUpload"
    multiple
    type="drag"
    action="//up-z1.qiniu.com/"
    style="display: inline-block;width:58px;">
    <div style="width: 58px;height:58px;line-height: 58px;">
      <Icon type="camera" size="20"></Icon>
    </div>
  </Upload>
  <Modal title="View Image" v-model="visible">
    <img :src="'http://olt0d7mfp.bkt.clouddn.com/' + imgName " v-if="visible" style="width: 100%">
  </Modal>

  </BpmFormItem>
</template>
<script>
  import BpmFormItem from './local-form-item'
  import Emitter from 'iview/src/mixins/emitter';
  import logger from '../../utils/logger'
  export default {
    mixins:[ Emitter ],
    props : {
      item : {
        type :Object,
        required : true
      }
    },
    data () {
      return {
        defaultList: [
        ],

        imgName: '',
        visible: false,
        uploadList: [],
        componentValue : this.$store.state.values[this.item.name],

      }
    },
    watch : {
      uploadList : function (val,old) {
        this.componentValue = [];//每次都重新赋值componentValue
        val.forEach(item =>{
          this.componentValue.push({url:item.url,name:item.name})
        })
        this.$emit('input',this.componentValue)
        this.$emit('on-change', this.componentValue);
        this.dispatch('FormItem', 'on-form-change', this.componentValue);
      }
    },
    created() {
      this.defaultList = this.componentValue
      this.$bus.emit('addValues',{
        name:this.item.name,
        value:this.componentValue
      });
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        logger.debug('上传成功');
        file.url = 'http://olt0d7mfp.bkt.clouddn.com/' + res.key;
        logger.debug('文件地址为：')
        logger.debug(file.url)
        file.name = res.key;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < this.item.maxLength;
        if (!check) {
          this.$Notice.warning({
            title: '最多不能超过' + this.item.maxLength + '张图'
          });
        }
        return check;
      }
    },
    components : {
      BpmFormItem
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
