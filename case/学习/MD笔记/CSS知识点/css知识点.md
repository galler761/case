### (1)修改chrome记住密码后自动填充表单的黄色背景
<pre>
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
</pre>

### (2)让页面里的字体变清晰，变细用CSS怎么做
-webkit-font-smoothing: antialiased;

### (3)让overflow:scroll平滑滚动？
-webkit-overflow-scrolling: touch; 
### (4)手机上的多行省略
<pre>
.overflow-hidden{
    display: box !important;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;/*第几行出现省略号*/
    /*text-align:justify;不能和溢出隐藏的代码一起写，会有bug*/
}
</pre>
### (5)长时间按住页面闪退
<pre>
.element {
    -webkit-touch-callout: none;
}
</pre>
### (6)改变输入框内提示文字颜色
<pre>
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999; }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999; }
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999; }
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999; }
input:focus::-webkit-input-placeholder{ color:#999; } 
</pre>
### (7)消除transtration闪屏
<pre>
.css {
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
}
</pre>
### (8)
### (9)
### (10)