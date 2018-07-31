<template>
  <BpmFormItem :prop="item.name" :title="item.label">
      <span class="record-part">
						// 录音按钮、试听按钮、上传按钮、清空按钮
						<div class="recorder-placeholder" style="height: 34px; line-height: 34px; background-color: #eee; padding-left: 10px;">--录音部分，待渲染--</div>
					</span>
  </BpmFormItem>
</template>


<script>
  import BpmFormItem from './local-form-item'
</script>

<style>
  .play-part .btn, .record-part .btn {
    margin-left: 8px;
  }
  .fb-audio {
    vertical-align: middle;
    height: 34px;
    border: solid 1px #ccc;
  }
  /* 录音闪烁动画 */
  .record-btn .active {
    animation: recording 1.5s infinite;
  }
</style>

