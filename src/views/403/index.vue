<template>
  <div class="error">
    <img src="@/assets/images/403.png" alt="">
    <hr>
    哎呀...没有权限访问</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.error {
  font-size: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  // font-weight: bold;
  color: #666;
  img{
    width: 150px;
    height: 200px;
    margin-bottom: 20px;
  }
  text-shadow: 2px 2px 2px #ccc;
  i{
    font-size: 150px;
  }
}
</style>