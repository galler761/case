### 修改chrome记住密码后自动填充表单的黄色背景
<pre>
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
</pre>

### 让页面里的字体变清晰，变细用CSS怎么做
-webkit-font-smoothing: antialiased;

### 让overflow:scroll平滑滚动？
-webkit-overflow-scrolling: touch; 